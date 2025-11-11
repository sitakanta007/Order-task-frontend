# Ecommerce System Architecture

# Django Admin + Node API + React Frontend + MySQL(Railway)

This project is a fully functional ecommerce architecture built using a 3-service system:

- Django Admin Panel (EC2)
- - The source of truth for the database.
- - Manages products, customers, coupons, and orders.

- Node.js API (EC2) with Prisma
- - Handles all customer-side logic: cart, coupons, checkout, orders.
- - Reads/writes to the same MySQL database Django owns.

- React Frontend (S3 Static Website)
- - Customer-facing UI that calls Node API.

- MySQL Database (Railway)
- - Central database shared between Django and Node.

## High-Level Architecture Diagram
```
                      ┌───────────────────────────────┐
                      │           S3 Bucket            │
                      │      React Frontend (UI)       │
                      │  http://<bucket-website-url>   │
                      └───────────────┬────────────────┘
                                      │ HTTP API Calls
                                      ▼
                          ┌────────────────────────┐
                          │      EC2 Instance      │
                          │  Node.js API + PM2     │
                          │  Swagger, Prisma       │
                          │  http://<ip>:3000      │
                          └────────────┬───────────┘
                                       │
                            Prisma SQL Queries
                                       ▼
                      ┌────────────────────────────────┐
                      │           MySQL (Railway)       │
                      │  Central Data (Products, etc.)  │
                      └────────────────────────────────┘
                                       ▲
                            Django ORM │
                                       │
                          ┌────────────┴───────────┐
                          │      EC2 Instance      │
                          │  Django Admin + Gunicorn│
                          │ http://<ip>:8000/admin  │
                          └─────────────────────────┘
```
## Responsibilities of Each Service
- Django Admin (EC2)
> - Owns the entire database schema
> - Manages: Products, Customers, Orders, Coupons, UserCoupon (tracking coupon usage)
> - Generates the MySQL tables Node uses
> - Runs via Gunicorn on port 8000

- Node API (EC2)
> - Stateless API layer that interacts with MySQL via Prisma
> - Uses Prisma Client generated from the Django-managed schema
> - Runs via PM2, typically on port 3000
> - Provides Swagger docs at /api-docs

- React Frontend (S3 Bucket Website)
> - Public-facing UI
> - Consumes Node APIs over HTTP
> - Hosted via S3 Static Website Hosting (HTTP mode)

- MySQL (Railway)
> - Central relational DB for all systems
> - Django performs migrations
> - Node performs queries (read/write) only
> - Prisma schema is introspected from this DB (no migrations)
