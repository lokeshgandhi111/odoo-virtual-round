-- ACTIVITIES FOR NEW CITIES – Run AFTER seed_new_cities.sql
-- Sources: Official attraction sites, GetYourGuide, Headout (2024)

-- ── SYDNEY ─────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Sydney Opera House Tour', 'Guided backstage tour of the iconic UNESCO-listed performing arts centre. AU$36 (~$24).', 'culture', 24.00, 1.5, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80' FROM cities WHERE name = 'Sydney';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Sydney Tower Eye', 'Observation deck 309m above the city with 360° views. AU$32 (~$21).', 'sightseeing', 21.00, 1.5, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80' FROM cities WHERE name = 'Sydney';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Taronga Zoo', 'World-class zoo with native Australian wildlife overlooking the harbour. AU$53 (~$35).', 'adventure', 35.00, 4.0, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80' FROM cities WHERE name = 'Sydney';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Bondi to Coogee Coastal Walk', 'Scenic 6km clifftop walk along the Pacific Ocean. Free.', 'adventure', 0.00, 3.0, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80' FROM cities WHERE name = 'Sydney';

-- ── VIENNA ─────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Schönbrunn Palace & Gardens', 'Habsburg imperial palace with 1,441 rooms and baroque gardens. Grand Tour €25.', 'culture', 25.00, 3.0, 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80' FROM cities WHERE name = 'Vienna';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Belvedere Palace & Klimt', 'Home to Gustav Klimt''s "The Kiss". Upper Belvedere ticket €16.', 'culture', 16.00, 2.5, 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80' FROM cities WHERE name = 'Vienna';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Vienna State Opera Tour', 'Guided tour of one of the world''s finest opera houses. ~€14.', 'culture', 14.00, 1.0, 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80' FROM cities WHERE name = 'Vienna';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Viennese Coffee House Experience', 'Traditional Viennese café culture with Wiener Melange & Sachertorte. ~€15.', 'food', 15.00, 1.5, 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80' FROM cities WHERE name = 'Vienna';

-- ── SEOUL ──────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Gyeongbokgung Palace', 'Main royal palace of the Joseon dynasty with guard changing ceremony. ₩3,000 (~$2.20).', 'culture', 2.20, 2.0, 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80' FROM cities WHERE name = 'Seoul';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'N Seoul Tower Observatory', 'Iconic tower on Namsan Mountain with panoramic city views. ₩21,000 (~$16).', 'sightseeing', 16.00, 2.0, 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80' FROM cities WHERE name = 'Seoul';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Korean BBQ & Makgeolli Tour', 'Guided evening food tour of samgyeopsal BBQ & traditional rice wine. ~₩65,000 ($49).', 'food', 49.00, 3.0, 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80' FROM cities WHERE name = 'Seoul';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'DMZ Day Tour', 'Guided tour to the Demilitarized Zone between North & South Korea. ~₩80,000 ($60).', 'culture', 60.00, 8.0, 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80' FROM cities WHERE name = 'Seoul';

-- ── RIO DE JANEIRO ─────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Christ the Redeemer by Train', 'Cog train to the iconic 38m statue atop Corcovado. ~R$127 ($25).', 'sightseeing', 25.00, 3.0, 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80' FROM cities WHERE name = 'Rio de Janeiro';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Sugarloaf Mountain Cable Car', 'Two-stage cable car to 396m summit with Guanabara Bay views. ~R$180 ($36).', 'sightseeing', 36.00, 2.0, 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80' FROM cities WHERE name = 'Rio de Janeiro';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Copacabana & Ipanema Beach', 'World-famous beaches with volleyball, caipirinhas & samba. Free.', 'leisure', 0.00, 3.0, 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80' FROM cities WHERE name = 'Rio de Janeiro';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Favela Walking Tour', 'Responsible guided tour through Santa Marta favela community. ~R$100 ($20).', 'culture', 20.00, 2.5, 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80' FROM cities WHERE name = 'Rio de Janeiro';

-- ── CAPE TOWN ──────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Table Mountain Cableway', 'Revolving cable car to the flat-topped mountain summit. R400 (~$22) return.', 'adventure', 22.00, 3.0, 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80' FROM cities WHERE name = 'Cape Town';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Cape Point & Cape of Good Hope', 'Scenic drive to the southwesternmost tip of Africa. R400 (~$22) entry.', 'adventure', 22.00, 5.0, 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80' FROM cities WHERE name = 'Cape Town';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Boulders Beach Penguin Colony', 'Walk among African penguins at a protected beach. R190 (~$10).', 'adventure', 10.00, 2.0, 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80' FROM cities WHERE name = 'Cape Town';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Cape Winelands Day Tour', 'Stellenbosch & Franschhoek wine tasting with cellar tour. ~R600 ($33).', 'food', 33.00, 7.0, 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80' FROM cities WHERE name = 'Cape Town';

-- ── LISBON ─────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Jerónimos Monastery', 'Manueline UNESCO masterpiece where Vasco da Gama is buried. €12.', 'culture', 12.00, 2.0, 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80' FROM cities WHERE name = 'Lisbon';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Sintra & Pena Palace Day Trip', 'Colourful hilltop royal palace 40 min from Lisbon. Palace €14 + train ~€5.', 'culture', 19.00, 6.0, 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80' FROM cities WHERE name = 'Lisbon';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Alfama Fado Night', 'Traditional Portuguese Fado music dinner in historic Alfama district. ~€40.', 'culture', 40.00, 3.0, 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80' FROM cities WHERE name = 'Lisbon';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'LX Factory Sunday Market', 'Trendy market in a repurposed industrial complex with food & arts. Free entry.', 'leisure', 0.00, 2.0, 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80' FROM cities WHERE name = 'Lisbon';

-- ── MUMBAI ─────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Gateway of India', 'Iconic 1924 arch monument overlooking the Arabian Sea. Free entry.', 'sightseeing', 0.00, 1.0, 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80' FROM cities WHERE name = 'Mumbai';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Elephanta Caves', 'UNESCO rock-cut Hindu cave temples on an island. Ferry + entry ₹600 (~$7).', 'culture', 7.00, 4.0, 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80' FROM cities WHERE name = 'Mumbai';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Dharavi Slum Tour', 'Eye-opening responsible guided tour through Asia''s largest slum. ~₹1500 ($18).', 'culture', 18.00, 2.5, 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80' FROM cities WHERE name = 'Mumbai';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Mumbai Street Food Walk', 'Guided tour of vada pav, pav bhaji & chaat in Chowpatty. ~₹1200 ($14).', 'food', 14.00, 2.5, 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80' FROM cities WHERE name = 'Mumbai';

-- ── NEW DELHI ──────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Red Fort', 'Magnificent Mughal fort and UNESCO World Heritage site. ₹600 (~$7) for foreigners.', 'culture', 7.00, 2.0, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80' FROM cities WHERE name = 'New Delhi';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Taj Mahal Day Trip (Agra)', 'UNESCO Wonder of the World, 3 hours from Delhi. Entry ₹1100 (~$13) + transport.', 'sightseeing', 40.00, 10.0, 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80' FROM cities WHERE name = 'New Delhi';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Qutub Minar', '73m tall 12th-century minaret and UNESCO Heritage site. ₹550 (~$7) foreigners.', 'culture', 7.00, 1.5, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80' FROM cities WHERE name = 'New Delhi';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Old Delhi Food Tour', 'Guided rickshaw tour through Chandni Chowk tasting street food. ~₹2000 ($24).', 'food', 24.00, 3.0, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80' FROM cities WHERE name = 'New Delhi';

-- ── MARRAKECH ──────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Majorelle Garden & Yves Saint Laurent Museum', 'Vivid blue Cubist garden owned by YSL. Entry 170 MAD (~$18).', 'culture', 18.00, 2.0, 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80' FROM cities WHERE name = 'Marrakech';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Medina Souk Walking Tour', 'Guided walk through ancient souks: spices, leather, ceramics. ~$25.', 'culture', 25.00, 3.0, 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80' FROM cities WHERE name = 'Marrakech';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Sahara Desert Overnight Trip', 'Camel trek to Erg Chebbi dunes with Berber camp stay. ~$120.', 'adventure', 120.00, 36.0, 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80' FROM cities WHERE name = 'Marrakech';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Traditional Hammam Experience', 'Full body scrub and steam bath at a historic bathhouse. ~300 MAD ($30).', 'leisure', 30.00, 2.0, 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80' FROM cities WHERE name = 'Marrakech';

-- ── ZURICH ─────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Lindt Home of Chocolate Museum', 'Immersive chocolate museum with unlimited tastings. CHF 17 (~$19).', 'food', 19.00, 2.0, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' FROM cities WHERE name = 'Zurich';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Swiss National Museum', 'Switzerland''s largest cultural history museum in a castle-like building. CHF 13 (~$14).', 'culture', 14.00, 2.0, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' FROM cities WHERE name = 'Zurich';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Lake Zurich Boat Cruise', 'Scenic cruise on one of Switzerland''s clearest lakes. CHF 8–20 (~$9–$22).', 'leisure', 15.00, 2.0, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' FROM cities WHERE name = 'Zurich';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Jungfraujoch Day Trip', '"Top of Europe" train excursion to 3,454m glacier. ~CHF 200 ($220).', 'adventure', 220.00, 10.0, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' FROM cities WHERE name = 'Zurich';

-- ── MALDIVES ───────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Snorkelling with Manta Rays', 'Guided snorkel trip to Hanifaru Bay, UNESCO Biosphere Reserve. ~$50.', 'adventure', 50.00, 3.0, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80' FROM cities WHERE name = 'Maldives';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Sunset Dolphin Cruise', 'Dhoni boat cruise to spot spinner dolphins at sunset. ~$35.', 'leisure', 35.00, 2.0, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80' FROM cities WHERE name = 'Maldives';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Overwater Bungalow Experience', 'Stay in a glass-floor overwater villa above the turquoise lagoon. ~$400/night.', 'leisure', 400.00, 24.0, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80' FROM cities WHERE name = 'Maldives';

-- ── MEXICO CITY ────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Teotihuacan Pyramids Day Trip', 'Explore the ancient Pyramid of the Sun & Moon. Entry $5 + transport ~$15.', 'culture', 20.00, 6.0, 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80' FROM cities WHERE name = 'Mexico City';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'National Museum of Anthropology', 'World''s finest pre-Columbian collection including Aztec Sun Stone. MXN 90 (~$5).', 'culture', 5.00, 3.0, 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80' FROM cities WHERE name = 'Mexico City';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Xochimilco Trajinera Canal Ride', 'Colourful flower boats through ancient Aztec canals with mariachi. ~MXN 500 ($28).', 'leisure', 28.00, 3.0, 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80' FROM cities WHERE name = 'Mexico City';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Mexico City Street Food Tour', 'Tacos, tamales, elotes & mezcal in the historic centre. ~MXN 600 ($33).', 'food', 33.00, 3.0, 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80' FROM cities WHERE name = 'Mexico City';

-- ── CAIRO ──────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Giza Pyramids & Sphinx', 'The only surviving Wonder of the Ancient World. Entry EGP 660 (~$13).', 'sightseeing', 13.00, 4.0, 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80' FROM cities WHERE name = 'Cairo';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Egyptian Museum', 'Tutankhamun''s golden mask & 120,000 ancient artefacts. EGP 400 (~$8).', 'culture', 8.00, 3.0, 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80' FROM cities WHERE name = 'Cairo';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Nile Felucca Sunset Sail', 'Traditional wooden sailboat cruise at sunset on the Nile. ~EGP 500 ($10).', 'leisure', 10.00, 2.0, 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80' FROM cities WHERE name = 'Cairo';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Khan el-Khalili Bazaar Tour', 'Guided walk through Cairo''s 14th-century Islamic bazaar. Free (guide ~$15).', 'culture', 15.00, 2.0, 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80' FROM cities WHERE name = 'Cairo';

-- ── TORONTO ────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'CN Tower EdgeWalk', 'Walk hands-free along the outside ledge 356m above Toronto. ~CAD 225 ($165).', 'adventure', 165.00, 1.5, 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800&q=80' FROM cities WHERE name = 'Toronto';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'CN Tower Observation Deck', 'Glass floor observation deck with views of Lake Ontario. CAD 43 (~$32).', 'sightseeing', 32.00, 1.5, 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800&q=80' FROM cities WHERE name = 'Toronto';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Royal Ontario Museum', 'Canada''s largest museum of world cultures and natural history. CAD 28 (~$21).', 'culture', 21.00, 3.0, 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800&q=80' FROM cities WHERE name = 'Toronto';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Kensington Market Food Tour', 'Multicultural neighbourhood with global street food & vintage shops. Free.', 'food', 0.00, 2.0, 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=800&q=80' FROM cities WHERE name = 'Toronto';

-- ── PETRA ──────────────────────────────────────────────────────────────────
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'The Treasury (Al-Khazneh)', 'Iconic 1st-century BCE rose-red rock-cut temple. Petra entry JOD 50 (~$70) for 1 day.', 'sightseeing', 70.00, 6.0, 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800&q=80' FROM cities WHERE name = 'Petra';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Petra by Night', 'Candlelit walk to the Treasury through the Siq canyon. JOD 17 (~$24).', 'culture', 24.00, 2.5, 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800&q=80' FROM cities WHERE name = 'Petra';
INSERT INTO activities (city_id, name, description, type, cost, duration_hours, image_url)
SELECT id, 'Wadi Rum Desert Jeep Tour', 'Red sand desert camp & jeep safari 1 hour from Petra. ~JOD 25 ($35).', 'adventure', 35.00, 4.0, 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800&q=80' FROM cities WHERE name = 'Petra';
