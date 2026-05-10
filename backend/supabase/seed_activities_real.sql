-- Real activity data sourced from official tourism sites & travel guides (2024)
-- Run in Supabase SQL Editor

-- Clear old activities
DELETE FROM stop_activities;
DELETE FROM activities;

-- ── PARIS ──────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Eiffel Tower – Summit Access', 'Skip-the-line ticket to the top floor with panoramic views of Paris. Official price €29.40 adults.', 'sightseeing', 29.40, 2.0, 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80' FROM cities WHERE name = 'Paris';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Louvre Museum', 'World''s largest art museum, home to the Mona Lisa & Venus de Milo. Official ticket €22.', 'culture', 22.00, 3.5, 'https://images.unsplash.com/photo-1565799557186-5c4c2e5e9d02?w=800&q=80' FROM cities WHERE name = 'Paris';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Palace of Versailles Day Trip', 'Guided tour of the royal palace and gardens, 45 min from Paris. Ticket ~€21.', 'culture', 21.00, 6.0, 'https://images.unsplash.com/photo-1597910037310-a3c406b22e42?w=800&q=80' FROM cities WHERE name = 'Paris';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Seine River Evening Cruise', 'Bateaux Mouches cruise along the Seine past Notre-Dame & the Eiffel Tower. ~€17.', 'leisure', 17.00, 1.5, 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80' FROM cities WHERE name = 'Paris';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'French Pastry & Market Tour', 'Morning food walk through Marché d''Aligre with a professional pastry chef. ~€75.', 'food', 75.00, 3.0, 'https://images.unsplash.com/photo-1612540130969-a9e6a7d5e5d8?w=800&q=80' FROM cities WHERE name = 'Paris';

-- ── TOKYO ──────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Tokyo Skytree Observation Deck', 'World''s second tallest structure at 634m. Tembo Deck ticket ¥2,100 (~$14).', 'sightseeing', 14.00, 2.0, 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80' FROM cities WHERE name = 'Tokyo';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'teamLab Borderless Museum', 'Immersive digital art world with 60+ interconnected artworks. Ticket ¥3,200 (~$22).', 'culture', 22.00, 3.0, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80' FROM cities WHERE name = 'Tokyo';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Senso-ji Temple & Nakamise', 'Tokyo''s oldest temple in Asakusa with famous shopping street. Free entry.', 'culture', 0.00, 2.0, 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=800&q=80' FROM cities WHERE name = 'Tokyo';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Tsukiji Outer Market Food Tour', 'Guided breakfast tour of fresh sushi, tamagoyaki & street food. ~¥5,000 ($34).', 'food', 34.00, 2.5, 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80' FROM cities WHERE name = 'Tokyo';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Mt. Fuji & Hakone Day Trip', 'Guided day trip with bullet train, lake cruise & volcano views. ~¥14,000 ($95).', 'adventure', 95.00, 11.0, 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80' FROM cities WHERE name = 'Tokyo';

-- ── BALI ───────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Tegallalang Rice Terrace Trek', 'Iconic UNESCO-listed rice terraces in Ubud with swing experience. Entry ~$3.', 'adventure', 5.00, 3.0, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' FROM cities WHERE name = 'Bali';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Tanah Lot Sunset Temple', 'Sea temple perched on a rock, best visited at sunset. Entry ~IDR 75,000 ($5).', 'sightseeing', 5.00, 2.5, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80' FROM cities WHERE name = 'Bali';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Ubud Cooking Class', 'Market visit + cook 5 traditional Balinese dishes. ~$35–$45.', 'food', 40.00, 4.0, 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&q=80' FROM cities WHERE name = 'Bali';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Kuta Beach Surf Lesson', '2-hour beginner lesson with certified instructor. ~$25–$30.', 'adventure', 28.00, 2.0, 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80' FROM cities WHERE name = 'Bali';

-- ── LONDON ─────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Tower of London', 'Royal fortress housing the Crown Jewels. Official adult ticket £34.80.', 'culture', 44.00, 3.0, 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80' FROM cities WHERE name = 'London';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'British Museum', 'Home to 8 million works including the Rosetta Stone. Completely free.', 'culture', 0.00, 3.0, 'https://images.unsplash.com/photo-1605283176568-9b41fde3672e?w=800&q=80' FROM cities WHERE name = 'London';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'London Eye', 'Giant Ferris wheel with panoramic Thames views. Standard ticket ~£32.', 'sightseeing', 32.00, 1.5, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80' FROM cities WHERE name = 'London';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Afternoon Tea at The Savoy', 'Traditional English afternoon tea with sandwiches, scones & pastries. ~£75.', 'food', 75.00, 2.0, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' FROM cities WHERE name = 'London';

-- ── ROME ───────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Colosseum & Roman Forum', 'Skip-the-line access to the ancient amphitheatre & Forum. Ticket €18–€22.', 'culture', 22.00, 3.0, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80' FROM cities WHERE name = 'Rome';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Vatican Museums & Sistine Chapel', 'Michelangelo''s ceiling and 7km of galleries. Ticket €20–€27.', 'culture', 27.00, 4.0, 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80' FROM cities WHERE name = 'Rome';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Roman Food & Wine Tour', 'Guided tasting walk through Trastevere: pasta, cheese, wine & gelato. ~€75.', 'food', 75.00, 3.5, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' FROM cities WHERE name = 'Rome';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Trevi Fountain & Pantheon Walk', 'Self-guided walk to Rome''s iconic fountains and the free ancient Pantheon.', 'sightseeing', 0.00, 2.0, 'https://images.unsplash.com/photo-1529944036-2571e537bf87?w=800&q=80' FROM cities WHERE name = 'Rome';

-- ── BARCELONA ──────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Sagrada Família', 'Gaudí''s UNESCO masterpiece, still under construction. Fast-track ticket ~€36.', 'culture', 36.00, 2.5, 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80' FROM cities WHERE name = 'Barcelona';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Park Güell', 'Gaudí''s mosaic park with city views. Ticket zone entry ~€10.', 'sightseeing', 10.00, 2.0, 'https://images.unsplash.com/photo-1561626423-a51b45aef0a1?w=800&q=80' FROM cities WHERE name = 'Barcelona';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'La Boqueria Food Market Tour', 'Guided tasting tour of Barcelona''s legendary market. ~€45.', 'food', 45.00, 2.5, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' FROM cities WHERE name = 'Barcelona';

-- ── DUBAI ──────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Burj Khalifa At the Top (L124)', 'Observation deck on 124th floor. Standard ticket AED 159 (~$43).', 'sightseeing', 43.00, 2.0, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80' FROM cities WHERE name = 'Dubai';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Desert Safari with BBQ Dinner', 'Dune bashing, camel ride, sandboarding & traditional dinner. AED 250 (~$68).', 'adventure', 68.00, 6.0, 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=80' FROM cities WHERE name = 'Dubai';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Dubai Frame', 'Iconic picture-frame landmark bridging old & new Dubai. AED 50 (~$14).', 'sightseeing', 14.00, 1.5, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80' FROM cities WHERE name = 'Dubai';

-- ── SINGAPORE ──────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Gardens by the Bay (Cloud Forest)', 'Iconic supertrees & Cloud Forest biodome. Combo ticket S$40 (~$30).', 'sightseeing', 30.00, 3.0, 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80' FROM cities WHERE name = 'Singapore';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Marina Bay Sands SkyPark', 'Rooftop observation deck 200m above city. S$30 (~$22).', 'sightseeing', 22.00, 1.5, 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80' FROM cities WHERE name = 'Singapore';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Singapore Night Safari', 'World''s first nocturnal wildlife park. Ticket S$55 (~$41).', 'adventure', 41.00, 3.0, 'https://images.unsplash.com/photo-1534759926855-842e3b1af974?w=800&q=80' FROM cities WHERE name = 'Singapore';

-- ── BANGKOK ────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Grand Palace & Wat Phra Kaew', 'Royal palace complex & Temple of the Emerald Buddha. 500 THB (~$14).', 'culture', 14.00, 3.0, 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80' FROM cities WHERE name = 'Bangkok';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Bangkok Street Food Night Tour', 'Guided tuk-tuk & walking tour of the best street eats. ~$35.', 'food', 35.00, 3.0, 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&q=80' FROM cities WHERE name = 'Bangkok';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Wat Arun Temple of Dawn', 'Riverside temple with intricate porcelain mosaic spires. 100 THB (~$3).', 'sightseeing', 3.00, 1.5, 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80' FROM cities WHERE name = 'Bangkok';

-- ── ISTANBUL ───────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Hagia Sophia', '1,500-year-old Byzantine cathedral turned mosque. Foreign visitor fee ~€25.', 'culture', 25.00, 2.0, 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80' FROM cities WHERE name = 'Istanbul';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Topkapi Palace', 'Former Ottoman imperial palace with treasure collections. ~€50.', 'culture', 50.00, 3.0, 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80' FROM cities WHERE name = 'Istanbul';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Bosphorus Dinner Cruise', 'Cruise between Europe & Asia with Turkish dinner & entertainment. ~€35.', 'leisure', 35.00, 3.0, 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80' FROM cities WHERE name = 'Istanbul';

-- ── AMSTERDAM ──────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Rijksmuseum', 'Dutch Golden Age masterpieces incl. Rembrandt & Vermeer. Ticket €27.50.', 'culture', 27.50, 3.0, 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&q=80' FROM cities WHERE name = 'Amsterdam';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Anne Frank House', 'Historic hiding place of Anne Frank. Must book online. Ticket €16.50.', 'culture', 16.50, 1.5, 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&q=80' FROM cities WHERE name = 'Amsterdam';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Canal Boat Tour', 'Guided 1-hour cruise through the UNESCO canal ring. ~€17.', 'leisure', 17.00, 1.0, 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&q=80' FROM cities WHERE name = 'Amsterdam';

-- ── PRAGUE ─────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Prague Castle Circuit', 'St. Vitus Cathedral, Royal Palace & Golden Lane. Circuit B ticket 450 CZK (~$19).', 'culture', 19.00, 3.0, 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80' FROM cities WHERE name = 'Prague';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Old Town & Astronomical Clock', 'Gothic Old Town Square with hourly astronomical clock show. Free.', 'sightseeing', 0.00, 2.0, 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80' FROM cities WHERE name = 'Prague';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Czech Beer & Food Tour', 'Walk through historic cellars tasting traditional Czech food & craft beer. ~€35.', 'food', 35.00, 3.0, 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80' FROM cities WHERE name = 'Prague';

-- ── SANTORINI ──────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Caldera Catamaran Cruise', 'Half-day cruise with volcano swim, hot springs & BBQ lunch. ~€130.', 'leisure', 130.00, 5.0, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80' FROM cities WHERE name = 'Santorini';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Oia Sunset Watching', 'Walk to Oia village for the world-famous caldera sunset. Free.', 'sightseeing', 0.00, 2.0, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80' FROM cities WHERE name = 'Santorini';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Santorini Wine Tasting', 'Tour of Assyrtiko vineyards with 5 wine pairings & meze. ~€55.', 'food', 55.00, 2.5, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80' FROM cities WHERE name = 'Santorini';

-- ── KYOTO ──────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Fushimi Inari Shrine Hike', 'Thousands of torii gates winding up a mountain. Completely free, open 24/7.', 'adventure', 0.00, 3.0, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80' FROM cities WHERE name = 'Kyoto';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Arashiyama Bamboo Forest', 'Iconic bamboo grove walk in western Kyoto. Free to walk through.', 'sightseeing', 0.00, 1.5, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80' FROM cities WHERE name = 'Kyoto';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Kinkaku-ji Golden Pavilion', 'Zen temple covered in gold leaf reflecting in a mirror pond. ¥500 (~$3.50).', 'culture', 3.50, 1.5, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80' FROM cities WHERE name = 'Kyoto';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Tea Ceremony Experience', 'Traditional matcha tea ceremony in a Gion teahouse. ~¥3,000 ($20).', 'culture', 20.00, 1.5, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80' FROM cities WHERE name = 'Kyoto';

-- ── NEW YORK ───────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Statue of Liberty & Ellis Island', 'Ferry + pedestal access. Reserve tickets $24 adults.', 'sightseeing', 24.00, 4.0, 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=800&q=80' FROM cities WHERE name = 'New York';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'One World Observatory', 'Views from 100th+ floors of the Western Hemisphere''s tallest building. ~$44.', 'sightseeing', 44.00, 2.0, 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=800&q=80' FROM cities WHERE name = 'New York';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Broadway Show', 'Tony Award-winning musicals like Hamilton or Lion King. Avg ~$120.', 'culture', 120.00, 3.0, 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=800&q=80' FROM cities WHERE name = 'New York';

INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'NYC Food Tour – Brooklyn', 'Walk & eat through DUMBO, Williamsburg: pizza, bagels, pierogi. ~$65.', 'food', 65.00, 3.5, 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=800&q=80' FROM cities WHERE name = 'New York';
