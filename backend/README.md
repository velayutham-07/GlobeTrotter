# GlobeTrotter Backend

FastAPI backend for the GlobeTrotter travel planning application.

## Prerequisites

- Python 3.11+
- PostgreSQL database (local or cloud like Neon)
- pip or poetry for dependency management

## Setup Instructions

### 1. Create Virtual Environment

```bash
# Create virtual environment
python -m venv .venv

# Activate on Windows PowerShell
.\.venv\Scripts\Activate.ps1

# Activate on Windows CMD
.\.venv\Scripts\activate.bat

# Activate on Linux/Mac
source .venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Database Connection (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/globetrotter

# For cloud databases with SSL (e.g., Neon)
# DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Security
SECRET_KEY=your-super-secret-key-minimum-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Origins (comma-separated)
BACKEND_CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Note:** The config automatically converts `postgresql://` to `postgresql+asyncpg://` for async support.

### 4. Database Migration

```bash
# Generate initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations to database
alembic upgrade head
```

### 5. Seed Sample Data

```bash
python -m app.seed_data
```

This will populate the database with sample cities and activities.

### 6. Run Development Server

```bash
uvicorn app.main:app --reload
```

The API will be available at:
- API: http://localhost:8000
- Interactive Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login (OAuth2 form)
- `POST /api/v1/auth/login/json` - Login (JSON)
- `GET /api/v1/auth/me` - Get current user

### Trips
- `GET /api/v1/trips` - List user's trips
- `POST /api/v1/trips` - Create trip
- `GET /api/v1/trips/{id}` - Get trip details
- `PUT /api/v1/trips/{id}` - Update trip
- `DELETE /api/v1/trips/{id}` - Delete trip

### Itinerary
- `POST /api/v1/itinerary/stops/{trip_id}` - Add stop to trip
- `DELETE /api/v1/itinerary/stops/{stop_id}` - Remove stop
- `POST /api/v1/itinerary/activities/{stop_id}` - Add activity to stop
- `DELETE /api/v1/itinerary/activities/{activity_id}` - Remove activity

### Explore
- `GET /api/v1/explore/cities` - Search cities
- `GET /api/v1/explore/activities` - Search activities

### Profile
- `GET /api/v1/profile` - Get user profile
- `PUT /api/v1/profile` - Update profile

### Community
- `GET /api/v1/community/shared/{token}` - View shared trip
- `POST /api/v1/community/copy/{trip_id}` - Copy trip

## Database Schema

The application uses the following main tables:
- `users` - User accounts
- `cities` - Available destinations
- `activities` - Things to do in cities
- `trips` - User travel plans
- `trip_stops` - Cities in a trip
- `stop_activities` - Activities scheduled in stops
- `trip_expenses` - Budget tracking

## Troubleshooting

### Migration Issues

If you see `psycopg2 is not async` error:
- Ensure your `.env` uses `DATABASE_URL` (the config auto-fixes it)
- Or manually use `postgresql+asyncpg://` in the connection string

### Invalid Migration Files

If migration files are empty or invalid:
```bash
# Delete the invalid migration file
# Then regenerate
alembic revision --autogenerate -m "Initial migration"
```

### Database Connection

Test your connection:
```python
python -c "from app.database import engine; import asyncio; asyncio.run(engine.connect())"
```

## Development

### Project Structure
```
backend/
├── alembic/           # Database migrations
├── app/
│   ├── api/          # API endpoints
│   │   └── v1/       # Version 1 routes
│   ├── core/         # Security utilities
│   ├── models/       # SQLAlchemy models
│   ├── schemas/      # Pydantic schemas
│   ├── services/     # Business logic
│   ├── config.py     # Configuration
│   ├── database.py   # DB connection
│   ├── main.py       # FastAPI app
│   └── seed_data.py  # Data seeding
└── requirements.txt
```

## License

MIT
