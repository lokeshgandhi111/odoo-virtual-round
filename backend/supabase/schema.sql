-- ============================================================
-- TRAVELOOP – Complete Supabase Schema + Seed Data
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ─── EXTENSIONS ─────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PROFILES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── CITIES (master data) ───────────────────────────────────
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  cost_index DECIMAL(8,2),
  popularity_score INT DEFAULT 0,
  image_url TEXT,
  lat DECIMAL(10,6),
  lng DECIMAL(10,6),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── ACTIVITIES (master data) ───────────────────────────────
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT,
  cost DECIMAL(10,2) DEFAULT 0,
  duration_hours DECIMAL(4,1),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── TRIPS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  start_date DATE,
  end_date DATE,
  is_public BOOLEAN DEFAULT false,
  share_token UUID DEFAULT uuid_generate_v4() UNIQUE,
  total_budget DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── STOPS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  city_id UUID REFERENCES cities(id),
  order_index INT NOT NULL DEFAULT 0,
  arrival_date DATE,
  departure_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── STOP ACTIVITIES ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stop_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stop_id UUID REFERENCES stops(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  scheduled_date DATE,
  scheduled_time TIME,
  custom_cost DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── BUDGET ITEMS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS budget_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  stop_id UUID REFERENCES stops(id) ON DELETE SET NULL,
  category TEXT,
  label TEXT NOT NULL,
  amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── CHECKLIST ITEMS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  category TEXT DEFAULT 'other',
  is_packed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── TRIP NOTES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trip_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  stop_id UUID REFERENCES stops(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE stop_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own
DROP POLICY IF EXISTS "profiles_own" ON profiles;
CREATE POLICY "profiles_own" ON profiles FOR ALL USING (auth.uid() = id);

-- Trips: own trips + public read
DROP POLICY IF EXISTS "trips_own" ON trips;
CREATE POLICY "trips_own" ON trips FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "trips_public_read" ON trips;
CREATE POLICY "trips_public_read" ON trips FOR SELECT USING (is_public = true);

-- Stops: own via trip ownership
DROP POLICY IF EXISTS "stops_own" ON stops;
CREATE POLICY "stops_own" ON stops FOR ALL
  USING (trip_id IN (SELECT id FROM trips WHERE user_id = auth.uid()));

-- Stop activities: own via stop → trip
DROP POLICY IF EXISTS "stop_activities_own" ON stop_activities;
CREATE POLICY "stop_activities_own" ON stop_activities FOR ALL
  USING (stop_id IN (
    SELECT s.id FROM stops s
    JOIN trips t ON s.trip_id = t.id
    WHERE t.user_id = auth.uid()
  ));

-- Budget items: own via trip
DROP POLICY IF EXISTS "budget_items_own" ON budget_items;
CREATE POLICY "budget_items_own" ON budget_items FOR ALL
  USING (trip_id IN (SELECT id FROM trips WHERE user_id = auth.uid()));

-- Checklist items: own via trip
DROP POLICY IF EXISTS "checklist_items_own" ON checklist_items;
CREATE POLICY "checklist_items_own" ON checklist_items FOR ALL
  USING (trip_id IN (SELECT id FROM trips WHERE user_id = auth.uid()));

-- Trip notes: own via trip
DROP POLICY IF EXISTS "trip_notes_own" ON trip_notes;
CREATE POLICY "trip_notes_own" ON trip_notes FOR ALL
  USING (trip_id IN (SELECT id FROM trips WHERE user_id = auth.uid()));

-- Cities: public read
DROP POLICY IF EXISTS "cities_public_read" ON cities;
CREATE POLICY "cities_public_read" ON cities FOR SELECT USING (true);

-- Activities: public read
DROP POLICY IF EXISTS "activities_public_read" ON activities;
CREATE POLICY "activities_public_read" ON activities FOR SELECT USING (true);

-- Cities and Activities are public read (no RLS needed)
-- ============================================================
-- TRIGGER: Auto-create profile on signup
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, country, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    COALESCE(new.raw_user_meta_data->>'country', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- SEED DATA – Cities (25 popular destinations)
-- ============================================================

INSERT INTO cities (name, country, region, cost_index, popularity_score, lat, lng) VALUES
  ('Paris', 'France', 'Europe', 150.00, 98, 48.8566, 2.3522),
  ('Tokyo', 'Japan', 'Asia', 120.00, 97, 35.6762, 139.6503),
  ('New York', 'USA', 'North America', 200.00, 96, 40.7128, -74.0060),
  ('Bali', 'Indonesia', 'Asia', 60.00, 95, -8.3405, 115.0920),
  ('London', 'United Kingdom', 'Europe', 175.00, 94, 51.5074, -0.1278),
  ('Rome', 'Italy', 'Europe', 130.00, 93, 41.9028, 12.4964),
  ('Barcelona', 'Spain', 'Europe', 110.00, 92, 41.3851, 2.1734),
  ('Dubai', 'UAE', 'Middle East', 180.00, 91, 25.2048, 55.2708),
  ('Singapore', 'Singapore', 'Asia', 140.00, 90, 1.3521, 103.8198),
  ('Sydney', 'Australia', 'Oceania', 160.00, 89, -33.8688, 151.2093),
  ('Bangkok', 'Thailand', 'Asia', 50.00, 88, 13.7563, 100.5018),
  ('Amsterdam', 'Netherlands', 'Europe', 145.00, 87, 52.3676, 4.9041),
  ('Istanbul', 'Turkey', 'Europe/Asia', 80.00, 86, 41.0082, 28.9784),
  ('Prague', 'Czech Republic', 'Europe', 70.00, 85, 50.0755, 14.4378),
  ('Santorini', 'Greece', 'Europe', 170.00, 84, 36.3932, 25.4615),
  ('Kyoto', 'Japan', 'Asia', 100.00, 83, 35.0116, 135.7681),
  ('Marrakech', 'Morocco', 'Africa', 45.00, 82, 31.6295, -7.9811),
  ('New Delhi', 'India', 'Asia', 35.00, 81, 28.6139, 77.2090),
  ('Cape Town', 'South Africa', 'Africa', 65.00, 80, -33.9249, 18.4241),
  ('Lisbon', 'Portugal', 'Europe', 90.00, 79, 38.7223, -9.1393),
  ('Vienna', 'Austria', 'Europe', 125.00, 78, 48.2082, 16.3738),
  ('Maldives', 'Maldives', 'Asia', 300.00, 77, 3.2028, 73.2207),
  ('Rio de Janeiro', 'Brazil', 'South America', 85.00, 76, -22.9068, -43.1729),
  ('Seoul', 'South Korea', 'Asia', 95.00, 75, 37.5665, 126.9780),
  ('Zurich', 'Switzerland', 'Europe', 220.00, 74, 47.3769, 8.5417);

-- ============================================================
-- SEED DATA – Activities (3-5 per city)
-- ============================================================

-- Paris
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Eiffel Tower Visit', 'Skip-the-line tickets with summit access', 'sightseeing', 28.00, 2.0 FROM cities WHERE name = 'Paris';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Louvre Museum Tour', 'Guided tour of the world''s largest art museum', 'culture', 22.00, 3.0 FROM cities WHERE name = 'Paris';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Seine River Cruise', 'Romantic evening cruise along the Seine', 'leisure', 18.00, 1.5 FROM cities WHERE name = 'Paris';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'French Cooking Class', 'Learn to cook authentic French cuisine', 'food', 85.00, 3.0 FROM cities WHERE name = 'Paris';

-- Tokyo
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Tsukiji Fish Market Tour', 'Early morning sushi breakfast at the fish market', 'food', 40.00, 2.5 FROM cities WHERE name = 'Tokyo';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Shibuya Crossing & Harajuku', 'Explore the iconic crossing and fashion district', 'sightseeing', 0.00, 3.0 FROM cities WHERE name = 'Tokyo';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'teamLab Borderless', 'Immersive digital art museum experience', 'culture', 32.00, 3.0 FROM cities WHERE name = 'Tokyo';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Mt. Fuji Day Trip', 'Guided day trip to Mt. Fuji and Hakone', 'adventure', 95.00, 10.0 FROM cities WHERE name = 'Tokyo';

-- Bali
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Ubud Rice Terrace Trek', 'Morning trek through stunning Tegallalang rice terraces', 'adventure', 25.00, 3.0 FROM cities WHERE name = 'Bali';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Tanah Lot Sunset Tour', 'Visit the iconic sea temple at sunset', 'sightseeing', 15.00, 2.0 FROM cities WHERE name = 'Bali';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Balinese Cooking Class', 'Traditional Balinese cooking with market visit', 'food', 45.00, 4.0 FROM cities WHERE name = 'Bali';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Surf Lesson Kuta Beach', 'Beginner surf lesson at Kuta Beach', 'adventure', 30.00, 2.0 FROM cities WHERE name = 'Bali';

-- London
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Tower of London Tour', 'Guided tour including Crown Jewels', 'culture', 35.00, 2.5 FROM cities WHERE name = 'London';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'British Museum', 'Explore 8 million works of human history and culture', 'culture', 0.00, 3.0 FROM cities WHERE name = 'London';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Thames River Cruise', 'Sightseeing cruise from Westminster to Greenwich', 'leisure', 22.00, 2.0 FROM cities WHERE name = 'London';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Afternoon Tea Experience', 'Traditional English afternoon tea at a luxury hotel', 'food', 60.00, 1.5 FROM cities WHERE name = 'London';

-- Bangkok
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Grand Palace & Wat Pho', 'Visit the iconic palace and reclining Buddha', 'sightseeing', 20.00, 3.0 FROM cities WHERE name = 'Bangkok';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Street Food Night Tour', 'Guided walking tour of Bangkok''s best street food', 'food', 35.00, 3.0 FROM cities WHERE name = 'Bangkok';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Chao Phraya River Tour', 'Long-tail boat ride through the floating market', 'leisure', 18.00, 2.5 FROM cities WHERE name = 'Bangkok';

-- Dubai
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Burj Khalifa At the Top', 'Visit observation decks on 124th & 148th floors', 'sightseeing', 55.00, 2.0 FROM cities WHERE name = 'Dubai';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Desert Safari', 'Dune bashing, camel ride, and traditional dinner', 'adventure', 75.00, 6.0 FROM cities WHERE name = 'Dubai';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Dubai Mall & Fountain Show', 'Shopping and world''s largest fountain show', 'leisure', 0.00, 3.0 FROM cities WHERE name = 'Dubai';

-- New York
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Statue of Liberty & Ellis Island', 'Ferry tour to iconic landmarks', 'sightseeing', 25.00, 4.0 FROM cities WHERE name = 'New York';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Central Park Bike Tour', 'Guided cycling tour of Central Park highlights', 'adventure', 40.00, 2.0 FROM cities WHERE name = 'New York';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Broadway Show', 'Evening Broadway musical experience', 'culture', 120.00, 3.0 FROM cities WHERE name = 'New York';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours)
SELECT id, 'Food Tour Manhattan', 'Walk and eat through diverse NYC neighborhoods', 'food', 65.00, 3.5 FROM cities WHERE name = 'New York';
