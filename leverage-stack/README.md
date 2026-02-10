# Leverage Stack (Monorepo)
A for‑profit, full‑stack SaaS starter aligned to: **career leverage → optional business leverage → capital leverage**.

## Stack
- Client: Vite + React + TypeScript
- Server: Node + Express + TypeScript + Zod
- DB: Postgres via Prisma
- Auth: JWT + bcrypt
- Billing: Stripe-ready stub endpoints

## Local run
1) Install
```bash
npm install
npm run install:all
```
2) Create `server/.env`
```bash
DATABASE_URL=postgresql://USER:PASS@HOST:5432/dbname
JWT_SECRET=change_me_please
APP_ORIGIN=http://localhost:5173
```
3) Migrate + seed
```bash
npm run db:migrate
npm run db:seed
```
4) Run
```bash
npm run dev
```

Seed login:
- DemoOrg / admin / admin1234
- DemoOrg / user1 / user1234
