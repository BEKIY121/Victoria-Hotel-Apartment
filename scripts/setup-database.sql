-- Run as PostgreSQL superuser (pgAdmin or psql) if the database does not exist yet.
-- Example: psql -U postgres -f scripts/setup-database.sql

ALTER USER postgres PASSWORD 'victoriahotel';

SELECT 'CREATE DATABASE victoria_hotel'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'victoria_hotel')\gexec
