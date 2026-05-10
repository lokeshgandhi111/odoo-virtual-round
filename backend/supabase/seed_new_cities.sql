-- NEW CITIES SEED – Run in Supabase SQL Editor
-- Sources: Numbeo, Google Maps, Lonely Planet (2024)

INSERT INTO cities (name, country, region, cost_index, popularity_score, image_url, lat, lng) VALUES
('Sydney', 'Australia', 'Oceania', 160.00, 89, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80', -33.8688, 151.2093),
('Vienna', 'Austria', 'Europe', 125.00, 78, 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80', 48.2082, 16.3738),
('Seoul', 'South Korea', 'Asia', 95.00, 75, 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80', 37.5665, 126.9780),
('Rio de Janeiro', 'Brazil', 'South America', 85.00, 76, 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80', -22.9068, -43.1729),
('Cape Town', 'South Africa', 'Africa', 65.00, 80, 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80', -33.9249, 18.4241),
('Lisbon', 'Portugal', 'Europe', 90.00, 79, 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80', 38.7223, -9.1393),
('Mumbai', 'India', 'Asia', 30.00, 77, 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80', 19.0760, 72.8777),
('New Delhi', 'India', 'Asia', 35.00, 71, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80', 28.6139, 77.2090),
('Marrakech', 'Morocco', 'Africa', 45.00, 72, 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80', 31.6295, -7.9811),
('Zurich', 'Switzerland', 'Europe', 220.00, 68, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 47.3769, 8.5417),
('Maldives', 'Maldives', 'Asia', 300.00, 77, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', 3.2028, 73.2207),
('Mexico City', 'Mexico', 'North America', 55.00, 73, 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80', 19.4326, -99.1332),
('Cairo', 'Egypt', 'Africa', 40.00, 74, 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80', 30.0444, 31.2357),
('Toronto', 'Canada', 'North America', 155.00, 70, 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800&q=80', 43.6532, -79.3832),
('Petra', 'Jordan', 'Middle East', 75.00, 76, 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800&q=80', 30.3285, 35.4444);
