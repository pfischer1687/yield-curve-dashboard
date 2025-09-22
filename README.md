# Yield Curve Dashboard

Visualize the U.S. Treasury yield curve and manage bond order submissions. Built with FastAPI, React, and PostgreSQL.

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running via Docker](#running-via-docker)
  - [Running in Development](#running-in-development)
- [License](#license)

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) for containerization
- [PostgreSQL](https://www.postgresql.org/) (running locally or via Docker)
- [uv](https://docs.astral.sh/uv/) for managing virtual environments, dependencies, and server builds
- [Python 3.13](https://www.python.org/downloads/) for development
- [Alembic](https://alembic.sqlalchemy.org/en/latest/index.html) for running database migrations
- [Node](https://nodejs.org/en) for installing client dependencies
- [nvm](https://github.com/nvm-sh/nvm) for installing Node

---

### Running via Docker

1. Clone the repo

```bash
git clone git@github.com:pfischer1687/yield-curve-dashboard.git
cd yield-curve-dashboard
```

2. Start the Docker containers (DB, server, and client)

```bash
docker compose up
```

3. Enter `localhost:5173` in your browser

---

### Running in Development

1. Compose the Postgres DB

```bash
docker compose up db
```

2. Set up Python virtual environment

```bash
cd server
uv venv --python 3.13
source .venv/bin/activate
pip install -r pyproject.toml --all-extras
```

3. Run the database migration via Alembic

First you have to replace the `db` in `sqlalchemy.url` in `server/src/yieldcurve/alembic.ini` with `localhost` (also in
`db_url` in `server/src/yieldcurve/core/config.py`), then you
can run the migration:

```bash
cd server/src/yieldcurve
uv run alembic upgrade head
```

If you need to generate your own migrations after updating the DB models:

```bash
uv run alembic revision --autogenerate -m "<COMMIT_MSG>"
```

4. Start the server

```bash
uv run fastapi dev src/yieldcurve/main.py
```

5. Set up the client (requires Node)

```bash
cd client
npm install
npm run dev
```

6. Open `localhost:3000` in a browser

---

## License

MIT License
