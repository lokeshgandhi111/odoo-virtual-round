require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const tripRoutes = require('./routes/trips.routes');
const stopsRoutes = require('./routes/stops.routes');
const citiesRoutes = require('./routes/cities.routes');
const activitiesRoutes = require('./routes/activities.routes');
const budgetRoutes = require('./routes/budget.routes');
const checklistRoutes = require('./routes/checklist.routes');
const notesRoutes = require('./routes/notes.routes');
const adminRoutes = require('./routes/admin.routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// ─── Security & Logging ───────────────────────────────────────────────────────
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Traveloop API' });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/trips', tripRoutes);

// Nested routes under trips
app.use('/api/trips/:tripId/stops', stopsRoutes);
app.use('/api/trips/:tripId/budget', budgetRoutes);
app.use('/api/trips/:tripId/checklist', checklistRoutes);
app.use('/api/trips/:tripId/notes', notesRoutes);

// Standalone stop operations (update/delete/activities)
app.use('/api/stops', stopsRoutes);

// Master data (public)
app.use('/api/cities', citiesRoutes);
app.use('/api/activities', activitiesRoutes);

// Admin
app.use('/api/admin', adminRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
