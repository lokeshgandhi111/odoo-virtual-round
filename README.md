# Traveloop – Backend API

Node.js + Express + Supabase REST API for the Traveloop travel planning platform.

## Quick Start

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in your Supabase credentials in .env
```

### 3. Set up the database
- Go to your Supabase project → SQL Editor → New Query
- Paste and run the contents of `supabase/schema.sql`
- This creates all tables, RLS policies, triggers, and seed data

### 4. Run the server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server starts at: `http://localhost:5000`
Health check: `http://localhost:5000/health`

---

## API Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <supabase_access_token>
```
The token is returned from `POST /api/auth/login` as `access_token`.

---

## Endpoints Summary

### Auth (no token required)
| Method | Endpoint | Body |
|---|---|---|
| POST | `/api/auth/signup` | `{ email, password, full_name }` |
| POST | `/api/auth/login` | `{ email, password }` |
| POST | `/api/auth/logout` | — |
| POST | `/api/auth/forgot-password` | `{ email }` |

### Profile (token required)
| Method | Endpoint | Body |
|---|---|---|
| GET | `/api/profile` | — |
| PUT | `/api/profile` | `{ full_name, avatar_url, language }` |
| DELETE | `/api/profile` | — |

### Trips (token required)
| Method | Endpoint | Body |
|---|---|---|
| GET | `/api/trips` | — |
| POST | `/api/trips` | `{ name, description, start_date, end_date, cover_photo_url, total_budget }` |
| GET | `/api/trips/:id` | — |
| PUT | `/api/trips/:id` | Same as create |
| DELETE | `/api/trips/:id` | — |
| GET | `/api/trips/share/:token` | — (public, no token needed) |
| POST | `/api/trips/:id/copy` | — |

### Stops (token required)
| Method | Endpoint | Body |
|---|---|---|
| GET | `/api/trips/:tripId/stops` | — |
| POST | `/api/trips/:tripId/stops` | `{ city_id, arrival_date, departure_date, notes }` |
| PUT | `/api/trips/:tripId/stops/reorder` | `{ order: [{id, order_index}] }` |
| PUT | `/api/stops/:stopId` | `{ city_id, arrival_date, departure_date, notes }` |
| DELETE | `/api/stops/:stopId` | — |
| POST | `/api/stops/:stopId/activities` | `{ activity_id, scheduled_date, scheduled_time, custom_cost }` |
| DELETE | `/api/stops/:stopId/activities/:activityId` | — |

### Cities & Activities (public)
| Method | Endpoint | Query Params |
|---|---|---|
| GET | `/api/cities` | `search, country, region, limit` |
| GET | `/api/cities/:id` | — |
| GET | `/api/activities` | `city_id, type, max_cost, search, limit` |
| GET | `/api/activities/:id` | — |

### Budget (token required)
| Method | Endpoint | Body |
|---|---|---|
| GET | `/api/trips/:tripId/budget` | — |
| POST | `/api/trips/:tripId/budget` | `{ label, amount, category, stop_id }` |
| DELETE | `/api/trips/:tripId/budget/:itemId` | — |

### Checklist (token required)
| Method | Endpoint | Body |
|---|---|---|
| GET | `/api/trips/:tripId/checklist` | — |
| POST | `/api/trips/:tripId/checklist` | `{ label, category }` |
| PUT | `/api/trips/:tripId/checklist/:itemId` | `{ label, category, is_packed }` |
| DELETE | `/api/trips/:tripId/checklist/:itemId` | — |
| PUT | `/api/trips/:tripId/checklist/reset` | — |

### Notes (token required)
| Method | Endpoint | Body |
|---|---|---|
| GET | `/api/trips/:tripId/notes` | `?stop_id=` (optional) |
| POST | `/api/trips/:tripId/notes` | `{ content, stop_id }` |
| PUT | `/api/trips/:tripId/notes/:noteId` | `{ content }` |
| DELETE | `/api/trips/:tripId/notes/:noteId` | — |

### Admin (token required)
| Method | Endpoint |
|---|---|
| GET | `/api/admin/stats` |
| GET | `/api/admin/top-cities` |
| GET | `/api/admin/top-activities` |
| GET | `/api/admin/users` |

---

## Data Sources & Seed Data

The database is pre-seeded with **real-world data** researched manually from official tourism websites and reputable travel guides. No third-party APIs were used — all data was collected by browsing public web sources.

### 🌆 Cities — 40 Destinations Across 6 Continents

City data including `cost_index`, `popularity_score`, and GPS coordinates was compiled from:

| Source | Data Used |
|---|---|
| [Numbeo Cost of Living](https://www.numbeo.com) | Average daily travel cost per city (USD) |
| [Google Maps](https://maps.google.com) | Verified GPS coordinates (lat/lng) |
| [Lonely Planet](https://www.lonelyplanet.com) | Popularity rankings and regional classifications |
| [Nomad Numbers](https://nomadnumbers.com) | Budget travel cost indices for Asia & Europe |

**Full city list:**

| # | City | Country | Region | Avg Daily Cost |
|---|---|---|---|---|
| 1 | Paris | France | Europe | $150 |
| 2 | Tokyo | Japan | Asia | $120 |
| 3 | New York | USA | North America | $200 |
| 4 | Bali | Indonesia | Asia | $60 |
| 5 | London | UK | Europe | $175 |
| 6 | Rome | Italy | Europe | $130 |
| 7 | Barcelona | Spain | Europe | $110 |
| 8 | Dubai | UAE | Middle East | $180 |
| 9 | Singapore | Singapore | Asia | $140 |
| 10 | Bangkok | Thailand | Asia | $50 |
| 11 | Amsterdam | Netherlands | Europe | $145 |
| 12 | Istanbul | Turkey | Europe/Asia | $80 |
| 13 | Prague | Czech Republic | Europe | $70 |
| 14 | Santorini | Greece | Europe | $170 |
| 15 | Kyoto | Japan | Asia | $100 |
| 16 | Marrakech | Morocco | Africa | $45 |
| 17 | New Delhi | India | Asia | $35 |
| 18 | Cape Town | South Africa | Africa | $65 |
| 19 | Lisbon | Portugal | Europe | $90 |
| 20 | Vienna | Austria | Europe | $125 |
| 21 | Maldives | Maldives | Asia | $300 |
| 22 | Rio de Janeiro | Brazil | South America | $85 |
| 23 | Seoul | South Korea | Asia | $95 |
| 24 | Zurich | Switzerland | Europe | $220 |
| 25 | Sydney | Australia | Oceania | $160 |
| 26 | Mumbai | India | Asia | $30 |
| 27 | Mexico City | Mexico | North America | $55 |
| 28 | Cairo | Egypt | Africa | $40 |
| 29 | Toronto | Canada | North America | $155 |
| 30 | Petra | Jordan | Middle East | $75 |

---

### 🎯 Activities — 90+ Real-Price Attractions

All ticket prices sourced directly from official attraction websites and verified via booking platforms:

| Source | City | Verified Price |
|---|---|---|
| [toureiffel.paris](https://www.toureiffel.paris) | Paris | Eiffel Tower summit €29.40 |
| [louvre.fr](https://www.louvre.fr) | Paris | Louvre Museum €22 |
| [tokyo-skytree.jp](https://www.tokyo-skytree.jp) | Tokyo | Skytree Tembo Deck ¥2,100 |
| [borderless.teamlab.art](https://borderless.teamlab.art) | Tokyo | teamLab Borderless ¥3,200 |
| [hrp.org.uk](https://www.hrp.org.uk) | London | Tower of London £34.80 |
| [britishmuseum.org](https://www.britishmuseum.org) | London | British Museum — Free |
| [rijksmuseum.nl](https://www.rijksmuseum.nl) | Amsterdam | Rijksmuseum €27.50 |
| [annefrank.org](https://www.annefrank.org) | Amsterdam | Anne Frank House €16.50 |
| [sagradafamilia.org](https://www.sagradafamilia.org) | Barcelona | Sagrada Família ~€36 |
| [coopculture.it](https://www.coopculture.it) | Rome | Colosseum €22 |
| [museivaticani.va](https://www.museivaticani.va) | Rome | Vatican Museums €27 |
| [burjkhalifa.ae](https://www.burjkhalifa.ae) | Dubai | At the Top AED 159 (~$43) |
| [hrad.cz](https://www.hrad.cz) | Prague | Castle Circuit 450 CZK (~$19) |
| [inari.jp](https://inari.jp) | Kyoto | Fushimi Inari — Free |
| [sydney.com](https://www.sydney.com) | Sydney | Opera House Tour AU$36 |
| [schoenbrunn.at](https://www.schoenbrunn.at) | Vienna | Grand Tour €25 |
| [seoulism.com](https://english.visitseoul.net) | Seoul | Gyeongbokgung Palace ₩3,000 |
| [bondinho.com.br](https://bondinho.com.br) | Rio | Sugarloaf Cable Car R$180 |
| [tablemountain.net](https://www.tablemountain.net) | Cape Town | Cableway R400 |
| [patrimoniocultural.gov.pt](https://patrimoniocultural.gov.pt) | Lisbon | Jerónimos Monastery €12 |
| [egyptmuseum.gov.eg](https://egyptmuseum.gov.eg) | Cairo | Egyptian Museum EGP 400 |
| [cntower.ca](https://www.cntower.ca) | Toronto | Observation Deck CAD 43 |
| [visitpetra.jo](https://visitpetra.jo) | Petra | 1-Day Entry JOD 50 |
| [headout.com](https://www.headout.com) | Multiple | Bangkok, Istanbul, Singapore prices |
| [getyourguide.com](https://www.getyourguide.com) | Multiple | Safari, cruise & tour prices |

---

### 🖼️ Images

All city and activity images are sourced from **[Unsplash](https://unsplash.com)** — a free, open-access photography platform. Images are served directly via Unsplash CDN URLs with `?w=800&q=80` for optimized loading. No API key required.

### 📁 Seed Files — Run in Order

| Order | File | Description |
|---|---|---|
| 1 | `supabase/schema.sql` | Full DB schema + RLS + initial 25 cities & activities |
| 2 | `supabase/seed_images.sql` | Adds Unsplash image URLs to the first 25 cities |
| 3 | `supabase/seed_activities_real.sql` | Replaces initial activities with verified real-price data |
| 4 | `supabase/seed_new_cities.sql` | Adds 15 more cities (Sydney, Seoul, Cairo, Petra, etc.) |
| 5 | `supabase/seed_new_activities.sql` | Adds 55+ activities for the 15 new cities |

---

## Environment Variables

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (admin operations) |
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | `development` or `production` |
| `FRONTEND_URL` | Frontend URL for CORS (default: http://localhost:5173) |
