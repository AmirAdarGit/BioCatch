# Server – API flow simulation

TypeScript Express server for the BioCatch assignment: **init** and **getScore** endpoints with mock responses.

## Setup

```bash
cd server
npm install
cp .env.example .env
```

## Scripts

- **`npm run dev`** – run with ts-node-dev (hot reload)
- **`npm run build`** – compile to `dist/`
- **`npm start`** – run compiled `dist/index.js`

## Environment

| Variable   | Default | Description   |
|-----------|---------|---------------|
| `PORT`    | 3001    | Server port   |
| `NODE_ENV`| development | Environment |

## Endpoints

| Method | Path           | Description |
|--------|----------------|-------------|
| GET    | `/health`      | Health check |
| POST   | `/api/init`    | Session init (required before getScore) |
| POST   | `/api/getScore`| Mock score (only after init for same CSID) |

### POST /api/init

**Body (JSON):** `customerSessionId` (or `customersessionId`), `activityType`, `uuid`; optional: `brand`, `solution`, `iam`, `customerId`, `action`.

**Response (200):** `{ attempt, id, request_id, status: "success" }`

### POST /api/getScore

**Body (JSON):** `customerSessionId` (or `customersessionId`). Must have called `/api/init` first for that session.

**Response (200):** `{ score, request_id, status: "success" }`

## Testing with curl

```bash
# Health
curl http://localhost:3001/health

# Init
curl -X POST http://localhost:3001/api/init \
  -H "Content-Type: application/json" \
  -d '{"customerSessionId":"my-csid-123","activityType":"LOGIN","uuid":"a1b2c3d4-e5f6-7890-abcd-ef1234567890"}'

# GetScore (same CSID as init)
curl -X POST http://localhost:3001/api/getScore \
  -H "Content-Type: application/json" \
  -d '{"customerSessionId":"my-csid-123"}'
```
