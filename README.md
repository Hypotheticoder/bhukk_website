# 🍺 BHUKK — India's Smart Beverages Delivery Platform

> A premium, production-grade **React + TypeScript** landing & onboarding website for **Bhukk** — a B2B beverages delivery platform connecting licensed retailers, distributors, manufacturers, and delivery partners with end customers.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CDN-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Directory Structure](#directory-structure)
- [Navigation & Routing System](#navigation--routing-system)
- [Page Breakdown](#page-breakdown)
- [Component Breakdown](#component-breakdown)
- [Backend API Integration](#backend-api-integration)
- [Form Submission Workflow](#form-submission-workflow)
- [Data Flow Diagrams](#data-flow-diagrams)
- [State Management](#state-management)
- [Styling & Animations](#styling--animations)
- [Environment Variables](#environment-variables)
- [Docker Deployment](#docker-deployment)
- [Getting Started](#getting-started)
- [Extending the Project](#extending-the-project)

---

## Project Overview

Bhukk is a **B2B beverages delivery ecosystem** that:
- Connects **licensed retailers** with local customers for hyperlocal delivery
- Enables **distributors** to expand their retail network digitally
- Allows **manufacturers** to access direct-to-retailer/distributor channels
- Onboards **delivery partners** with flexible hours and weekly payouts
- Provides a **contact** system and **terms & conditions** fetched from the backend

The website serves as the **public marketing site + partner onboarding portal**, with multi-step forms that submit data (including file uploads) to a FastAPI backend.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19.2 + TypeScript 5.8 | UI components, type safety |
| **Build Tool** | Vite 6.2 | Fast HMR, ESBuild bundling |
| **Styling** | Tailwind CSS (CDN) + Custom CSS | Utility-first responsive design |
| **Animations** | Framer Motion + CSS Keyframes | Page transitions, scroll reveals |
| **Forms** | React Hook Form + Zod | Validation, multi-step forms |
| **HTTP Client** | Axios | API calls, file upload (multipart/form-data) |
| **Icons** | Lucide React | Consistent icon system |
| **Lottie** | @lottiefiles/dotlottie-react | Animated illustrations |
| **Containerization** | Docker + Docker Compose | Production deployment |
| **Fonts** | Google Fonts (Poppins) | Typography |

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        index.html                            │
│          (Tailwind CDN, Poppins font, CSS animations)        │
└────────────────────────┬─────────────────────────────────────┘
                         │
                    index.tsx
                   ReactDOM.createRoot
                         │
                      App.tsx
              ┌──────────┼──────────┐
              │          │          │
           Navbar     Pages      Footer
              │          │          │
              │    ┌─────┴──────┐  │
              │    │  Pages     │  │
              │    ├────────────┤  │
              │    │ Home       │  │
              │    │ About      │  │
              │    │ AddStore   │  │
              │    │ Contact    │  │
              │    │ Trust      │  │
              │    │ Partnership│  │
              │    │ Delivery   │  │
              │    │ Partner    │  │
              │    │ *FormPages │  │
              │    └─────┬──────┘  │
              │          │         │
              │    Components      │
              │    ┌───────────┐   │
              │    │ Hero      │   │
              │    │ B2BSection│   │
              │    │ *Forms    │   │
              │    │ Modals    │   │
              │    │ Sections  │   │
              │    └─────┬─────┘   │
              │          │         │
              │     API Layer      │
              │    ┌───────────┐   │
              │    │ axios     │   │
              │    │ instance  │   │
              │    ├───────────┤   │
              │    │ services/ │   │
              │    │ ├ contact │   │
              │    │ ├ partner │   │
              │    │ ├ retailer│   │
              │    │ ├ distrib.│   │
              │    │ ├ manufac.│   │
              │    │ ├ delivery│   │
              │    │ └ terms   │   │
              │    └─────┬─────┘   │
              │          │         │
              │   Backend API      │
              │ (FastAPI @ remote)  │
              └──────────┴─────────┘
```

---

## Directory Structure

```
BHUKK-WEBSITE/
│
├── index.html                  # Entry HTML — Tailwind CDN, fonts, CSS animations, importmap
├── index.tsx                   # React root — mounts <App /> into #root
├── App.tsx                     # Root component — hash router, page renderer, global events
├── constants.tsx               # Shared constants (colors, nav links, footer, features)
├── types.ts                    # Shared TypeScript interfaces (FeatureCardProps, BetterForSection)
├── metadata.json               # App metadata (name, description, permissions)
│
├── vite.config.ts              # Vite config — port 3000, env vars, path aliases (@/)
├── tsconfig.json               # TS config — ES2022, bundler module, @/* alias
├── package.json                # Dependencies & scripts (dev, build, preview)
├── Dockerfile.frontend         # Multi-stage Docker build → vite preview on port 3001
├── docker-compose.yml          # Single-service compose for frontend container
│
├── api/                        # 🔌 Backend integration layer
│   ├── axiosinstance.ts        # Axios instance — baseURL from VITE_API_BASE env
│   ├── vite-env.d.ts           # TypeScript declaration for import.meta.env
│   └── services/               # One service file per backend entity
│       ├── contact.service.ts          # POST /api/bhukk_contacts/post
│       ├── partner.service.ts          # POST /api/bhukk_partners/post
│       ├── retailer.service.ts         # POST /api/retailers/create
│       ├── distributor.service.ts      # POST /api/distributors/create
│       ├── manufacturer.service.ts     # POST /api/manufacturers/create
│       ├── deliverypartner.service.ts  # POST /api/partners/create
│       └── termsconditions.service.ts  # GET  /api/terms-conditions/get-all
│
├── components/                 # 🧩 Reusable UI components
│   ├── Navbar.tsx              # Fixed nav — scroll-aware, hash-based navigation
│   ├── Footer.tsx              # Global footer — links, social media, app badges
│   ├── Hero.tsx                # Home hero — CTA buttons, partner quick-links
│   ├── FeatureCards.tsx        # Feature grid (4 cards from constants)
│   ├── BetterForEveryone.tsx   # "Better for" sections with modal + navigation
│   ├── B2BSection.tsx          # B2B partnership hero + store owner benefits + dashboard
│   ├── DistributorRetailer.tsx # Ecosystem cards (Dist↔Ret, Ret→Cust, Dist↔Store)
│   ├── AppPromotion.tsx        # "Get the app" section with download links
│   ├── TrustSection.tsx        # Trust & safety information cards
│   ├── ComingSoon.tsx          # Animated "Coming Soon" overlay modal
│   ├── SectionModal.tsx        # Generic modal for "Learn More" actions
│   ├── TermsConditionsModal.tsx# Fetches T&C from backend API, displays in modal
│   │
│   ├── RetailerForm.tsx        # Multi-section retailer onboarding form (manual state)
│   ├── DistributorForm.tsx     # Multi-section distributor form (react-hook-form + zod)
│   ├── ManufacturerForm.tsx    # Multi-section manufacturer form (react-hook-form + zod)
│   ├── DeliveryPartnerForm.tsx # Multi-section delivery partner form (react-hook-form + zod)
│   │
│   ├── AboutHero.tsx           # About page hero animation
│   ├── AboutMission.tsx        # Mission & Vision cards
│   ├── AboutValues.tsx         # Core values grid (6 values)
│   ├── AboutStory.tsx          # Timeline milestones (2024–2026)
│   ├── AboutStats.tsx          # Animated counter stats
│   └── AboutCTA.tsx            # "Be Part of the Revolution" CTA
│
├── pages/                      # 📄 Page-level compositions
│   ├── Home.tsx                # Hero → B2B → DistributorRetailer → Features → Better → Trust → App
│   ├── About.tsx               # AboutHero → Mission → Stats → Values → Story → CTA
│   ├── Contact.tsx             # Contact form + company info (sends to API)
│   ├── Trust.tsx               # Full trust & safety page
│   ├── AddStore.tsx            # Partner landing — Retailer/Distributor/Manufacturer cards → forms
│   ├── Partnership.tsx         # Property listing (warehouse/retail) + B2B section
│   ├── DeliveryPartner.tsx     # Delivery partner landing — perks, steps, FAQ
│   ├── DeliveryPartnerFormPage.tsx  # Wrapper → DeliveryPartnerForm
│   ├── DistributorFormPage.tsx      # Wrapper → DistributorForm
│   ├── ManufacturerFormPage.tsx     # Wrapper → ManufacturerForm
│   └── RetailerFormPage.tsx         # Wrapper → RetailerForm
│
└── public/
    └── assets/                 # Static images, logos, badges
        ├── bhukk_with_bg.png, Bhukk_without_bg.png  (logos)
        ├── hero.png, b2b1.png, b2b2.png              (hero/section images)
        ├── playstore.png, App.png                     (store badges)
        ├── delivery.png, partner.png, logistics.png   (feature cards)
        ├── store_owner.png, delivery_partner.png      (section images)
        └── ... (other marketing assets)
```

---

## Navigation & Routing System

The app uses a **custom hash-based SPA router** (no React Router dependency).

### Algorithm: Hash Router

```
┌─────────────┐     hashchange      ┌──────────────┐
│  User clicks │ ──────────────────► │  Browser URL  │
│  nav link    │                     │  #page-name   │
└─────────────┘                      └──────┬───────┘
                                            │
                                   syncWithHash()
                                            │
                                    ┌───────▼───────┐
                                    │ Is hash in     │
                                    │ VALID_PAGES[]? │
                                    └───┬───────┬───┘
                                    YES │       │ NO
                                        │       │
                               ┌────────▼┐  ┌───▼──────┐
                               │ setState │  │ Redirect │
                               │ page     │  │ to #home │
                               └────────┬┘  └──────────┘
                                        │
                               ┌────────▼────────┐
                               │ renderPage()    │
                               │ switch(page) →  │
                               │ return <Page /> │
                               └─────────────────┘
```

**Valid Pages (PageType union):**

| Hash | Page Component | Description |
|------|---------------|-------------|
| `#home` | `<Home />` | Landing page |
| `#about` | `<About />` | Company story |
| `#store` | `<AddStore />` | Partner with us (Retailer/Distributor/Manufacturer) |
| `#partner` | `<DeliveryPartner />` | Delivery partner landing |
| `#contact` | `<Contact />` | Contact form |
| `#trust` | `<Trust />` | Trust & safety |
| `#partnership` | `<Partnership />` | Property listing |
| `#distributor-form` | `<DistributorFormPage />` | Distributor registration |
| `#manufacturer-form` | `<ManufacturerFormPage />` | Manufacturer registration |
| `#retailer-form` | `<RetailerFormPage />` | Retailer registration |
| `#delivery-partner-form` | `<DeliveryPartnerFormPage />` | Delivery partner registration |

### Special Navigation Behaviors

1. **Scroll-to-section:** When navigating to `#store` from B2BSection, it stores target section (`retailer`/`distributor`/`manufacturer`) in `sessionStorage` and dispatches a `scrollToPartnerSection` event. App.tsx picks this up and auto-scrolls to the `section-{target}` DOM element.

2. **Coming Soon modal:** Any component can dispatch a `show-coming-soon` CustomEvent to trigger the global `<ComingSoon />` overlay (used for app download buttons).

3. **Back/Forward:** The `hashchange` listener ensures browser back/forward buttons work correctly.

---

## Page Breakdown

### 1. Home (`pages/Home.tsx`)
```
┌────────────────────────────┐
│         Hero               │  ← Full-screen hero with CTA + partner quick-links
├────────────────────────────┤
│      B2BSection            │  ← "Partner with Bhukk" hero + store owner benefits
├────────────────────────────┤
│   DistributorRetailer      │  ← Ecosystem cards (3 partner types + how Bhukk helps)
├────────────────────────────┤
│      FeatureCards          │  ← 4 feature cards from constants.tsx
├────────────────────────────┤
│    BetterForEveryone       │  ← Alternating sections (Customers/Stores/Partners/Mfg)
├────────────────────────────┤
│      TrustSection          │  ← Trust & safety cards
├────────────────────────────┤
│     AppPromotion           │  ← "Get the Bhukk app" with download links
└────────────────────────────┘
```

### 2. About (`pages/About.tsx`)
```
┌────────────────────────────┐
│       AboutHero            │  ← Animated dark hero "Reimagining How India Drinks"
├────────────────────────────┤
│      AboutMission          │  ← Mission & Vision gradient cards
├────────────────────────────┤
│       AboutStats           │  ← Animated counters (50+ cities, 5000+ partners...)
├────────────────────────────┤
│      AboutValues           │  ← 6 core value cards
├────────────────────────────┤
│       AboutStory           │  ← Timeline milestones (2024–2026)
├────────────────────────────┤
│        AboutCTA            │  ← "Be Part of the Revolution" CTA
└────────────────────────────┘
```

### 3. AddStore (`pages/AddStore.tsx`)
```
┌────────────────────────────┐
│      Dark Hero             │  ← "Grow Your Business With Us" + partner type chips
├────────────────────────────┤
│  Partner Type Cards (x3)   │  ← Retailer / Distributor / Manufacturer
│  Each card → navigates to  │     #retailer-form / #distributor-form / #manufacturer-form
├────────────────────────────┤
│    Why Partner (6 cards)   │  ← Access customers, delivery, dashboard, etc.
├────────────────────────────┤
│   How It Works (3 steps)   │  ← Apply → Verify → Go Live
├────────────────────────────┤
│    Platform Features       │  ← Grid of capabilities
└────────────────────────────┘
```

### 4. Contact (`pages/Contact.tsx`)
- Contact form with name, email, subject dropdown, message
- Calls `sendContactMessage()` → `POST /api/bhukk_contacts/post`
- Displays company HQ address, phone, email, social links

### 5. DeliveryPartner (`pages/DeliveryPartner.tsx`)
- Landing page with hero, workflow steps, perks, FAQ, earnings info
- CTA buttons navigate to `#delivery-partner-form`

### 6. Form Pages
Each form page is a thin wrapper rendering the corresponding form component:
- `DeliveryPartnerFormPage` → `<DeliveryPartnerForm />`
- `DistributorFormPage` → `<DistributorForm />`
- `ManufacturerFormPage` → `<ManufacturerForm />`
- `RetailerFormPage` → `<RetailerForm />`

---

## Component Breakdown

### Form Components — Validation & Submission Pattern

All forms (except RetailerForm) use **React Hook Form + Zod** for validation.

| Component | Validation Library | Fields | File Uploads | API Endpoint |
|-----------|-------------------|--------|-------------|-------------|
| `DeliveryPartnerForm` | react-hook-form + zod | 20+ text, 5 files | profile_photo, id_proof, vehicle_rc, driving_license, cancelled_cheque | `POST /api/partners/create` |
| `DistributorForm` | react-hook-form + zod | 20+ text, 9 files | gst_cert, pan, msme_cert, fire_safety, excise, incorporation, trade, cheque, logistics | `POST /api/distributors/create` |
| `ManufacturerForm` | react-hook-form + zod | 15+ text, 9 files | incorporation, pan, gst_cert, excise, fssai, trade, auth_letter, cheque, images | `POST /api/manufacturers/create` |
| `RetailerForm` | Manual useState | 20+ text, 7 files | shop_photo, cancelled_cheque, excise, trade, shop_establishment, gst_cert, fire_noc | `POST /api/retailers/create` |

### Modal Components

| Component | Trigger | Purpose |
|-----------|---------|---------|
| `ComingSoon` | `show-coming-soon` CustomEvent | Waitlist email collection overlay |
| `SectionModal` | "Learn More" in BetterForEveryone | Shows section features, "Continue" navigates |
| `TermsConditionsModal` | "Terms" link in forms | Fetches T&C from API, displays in scrollable modal |

---

## Backend API Integration

### Axios Instance Configuration

```typescript
// api/axiosinstance.ts
baseURL: import.meta.env.VITE_API_BASE || 'https://bhukkwebbackend.naiyo24.com'
timeout: 10000  // 10 seconds
```

### API Endpoints Map

```
┌──────────────────────────────────────────────────────────────────────┐
│                        BACKEND API ENDPOINTS                         │
├──────────────────────┬──────────┬────────────────────────────────────┤
│ Service File         │ Method   │ Endpoint                           │
├──────────────────────┼──────────┼────────────────────────────────────┤
│ contact.service      │ POST     │ /api/bhukk_contacts/post           │
│ partner.service      │ POST     │ /api/bhukk_partners/post           │
│ retailer.service     │ POST     │ /api/retailers/create              │
│ distributor.service  │ POST     │ /api/distributors/create           │
│ manufacturer.service │ POST     │ /api/manufacturers/create          │
│ deliverypartner.svc  │ POST     │ /api/partners/create               │
│ termsconditions.svc  │ GET      │ /api/terms-conditions/get-all      │
└──────────────────────┴──────────┴────────────────────────────────────┘
```

### Request/Response Patterns

**All POST endpoints** use `multipart/form-data` (FormData) to support file uploads alongside text fields.

**Terms & Conditions** (GET) returns:
```typescript
interface TermsCondition {
  id: number;
  headline: string;
  description: string;
  created_at: string;
  updated_at: string;
}
```

---

## Form Submission Workflow

### Algorithm: Form Submission (React Hook Form + Zod)

```
┌──────────────┐
│ User fills   │
│ form fields  │
│ + uploads    │
│ files        │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ User clicks  │
│  "Submit"    │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  Zod Schema          │
│  Validation          │
│  (zodResolver)       │
└──────┬───────┬───────┘
       │       │
    PASS     FAIL
       │       │
       │       ▼
       │  ┌─────────────┐
       │  │ Display     │
       │  │ field-level │
       │  │ errors      │
       │  └─────────────┘
       │
       ▼
┌──────────────────────┐
│  Build FormData      │
│  ┌─────────────────┐ │
│  │ Append required │ │
│  │ text fields     │ │
│  ├─────────────────┤ │
│  │ Append optional │ │
│  │ text fields     │ │
│  │ (if non-empty)  │ │
│  ├─────────────────┤ │
│  │ Append file     │ │
│  │ fields (File    │ │
│  │ objects from    │ │
│  │ FileList)       │ │
│  ├─────────────────┤ │
│  │ Duplicate files │ │
│  │ with *_url keys │ │
│  │ (backend compat)│ │
│  └─────────────────┘ │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Axios POST          │
│  (multipart/form-    │
│   data)              │
└──────┬───────┬───────┘
       │       │
    SUCCESS   ERROR
       │       │
       ▼       ▼
┌──────────┐ ┌────────────────────────┐
│ Show     │ │ Parse error:           │
│ success  │ │ ├ detail[] → field msg │
│ toast    │ │ ├ detail string        │
│ Reset    │ │ ├ message              │
│ form     │ │ └ fallback string      │
└──────────┘ │ Set root form error    │
             └────────────────────────┘
```

### File Upload — Dual Key Pattern

The backend expects files on **two keys** (e.g., `gst_certificate_file` AND `gst_certificate_url`). The frontend appends the same `File` object to both keys:

```typescript
if (gstCert) {
  form.append("gst_certificate_file", gstCert);   // Physical file
  form.append("gst_certificate_url", gstCert);     // Backend stores URL after upload
}
```

> **Important for future devs:** This dual-key pattern is required by the FastAPI backend. Never remove one without updating the backend schema.

---

## Data Flow Diagrams

### User → Form → Backend Flow

```
┌─────────┐    navigate     ┌──────────┐    render    ┌──────────────┐
│  Navbar  │ ──────────────► │  App.tsx  │ ──────────► │  FormPage    │
│  /Hero   │  (hash change) │  (router) │             │  (wrapper)   │
└─────────┘                  └──────────┘             └──────┬───────┘
                                                             │
                                                      ┌──────▼───────┐
                                                      │  FormComponent│
                                                      │  (validation) │
                                                      └──────┬───────┘
                                                             │ onSubmit
                                                      ┌──────▼───────┐
                                                      │  Service      │
                                                      │  (api/services)│
                                                      └──────┬───────┘
                                                             │ axios.post
                                                      ┌──────▼───────┐
                                                      │  Backend API  │
                                                      │  (FastAPI)    │
                                                      └──────────────┘
```

### Contact Form Flow

```
Contact Page                contact.service.ts              Backend
┌──────────────┐           ┌──────────────────┐           ┌───────────┐
│ name         │           │                  │           │           │
│ email        │──submit──►│ sendContactMsg() │──POST────►│ /api/     │
│ subject      │           │ {name,email,     │           │ bhukk_    │
│ message      │           │  subject,message}│           │ contacts/ │
└──────────────┘           └──────────────────┘           │ post      │
                                                          └───────────┘
```

### Terms & Conditions Fetch Flow

```
TermsConditionsModal          termsconditions.service       Backend
┌──────────────┐           ┌───────────────────┐         ┌───────────┐
│ useEffect    │           │                   │         │           │
│ (on open)    │──fetch───►│ fetchTerms        │──GET───►│ /api/     │
│              │           │ Conditions()      │         │ terms-    │
│ Render list  │◄──data────│ → TermsCondition[]│◄────────│ conditions│
│ of headlines │           │                   │         │ /get-all  │
│ + descriptions│          └───────────────────┘         └───────────┘
└──────────────┘
```

---

## State Management

The application uses **local component state only** (no Redux/Context). State is managed at these levels:

| Level | Mechanism | Example |
|-------|-----------|---------|
| **App-level** | `useState` in App.tsx | `currentPage`, `scrolled`, `showComingSoon` |
| **Form-level** | React Hook Form / useState | Form fields, file states, submit status |
| **Cross-component** | `sessionStorage` + CustomEvents | Scroll-to-section, Coming Soon trigger |
| **Persistence** | `localStorage` | Waitlist signup status (`bhukk_waitlist`) |

### Global Events Registry

| Event Name | Dispatched By | Handled By | Purpose |
|------------|--------------|------------|---------|
| `hashchange` | Browser | App.tsx | Route sync |
| `show-coming-soon` | Hero, AppPromotion, DeliveryPartner | App.tsx → ComingSoon | Show overlay |
| `scrollToPartnerSection` | B2BSection, DistributorRetailer | App.tsx | Scroll to partner section |

---

## Styling & Animations

### Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary Red | `#E23744` | CTAs, highlights, icons |
| Brand Dark Red | `#981A1E` | Headers, accent, gradient |
| Dark | `#1C1C1C` | Text, dark backgrounds |
| Grey | `#696969` | Body text, descriptions |
| Light Grey | `#F8F8F8` | Section backgrounds |
| Warm BG | `#FFFBF7` | Soft section backgrounds |

### Animation Classes (defined in `index.html <style>`)

| Class | Effect |
|-------|--------|
| `animate-fade-in-up` | Slide up + fade in (0.8s) |
| `animate-fade-in-right` | Slide right + fade in |
| `animate-fade-in-left` | Slide left + fade in |
| `animate-scale-in` | Scale from 0.9 + fade in |
| `animate-bounce-slow` | Gentle continuous bounce |
| `delay-100` to `delay-500` | Animation delay utilities |

### Framer Motion Usage

- **Page hero sections** — `initial/animate` for entrance animations
- **Scroll-triggered** — `whileInView` with `viewport={{ once: true }}`
- **Hover effects** — `whileHover` / `whileTap` on buttons
- **AnimatePresence** — ComingSoon modal enter/exit

---

## Environment Variables

| Variable | Description | Default |
|----------|------------|---------|
| `VITE_API_BASE` | Backend API base URL | `https://bhukkwebbackend.naiyo24.com` |
| `GEMINI_API_KEY` | (Reserved) Gemini API key | — |

Create a `.env` file at the project root:

```env
VITE_API_BASE=https://bhukkwebbackend.naiyo24.com
```

For local backend development:

```env
VITE_API_BASE=http://localhost:8000
```

---

## Docker Deployment

### Dockerfile (Multi-stage Build)

```dockerfile
# Build stage: installs deps & builds production bundle
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage: runs vite preview server
EXPOSE 3001
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3001"]
```

### Docker Compose

```yaml
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    container_name: token_frontend
    ports:
      - "3001:3001"
    restart: unless-stopped
```

### Commands

```bash
# Build & run
docker-compose up --build -d

# View logs
docker-compose logs -f frontend

# Stop
docker-compose down
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **npm** or **yarn**

### Local Development

```bash
# 1. Clone the repository
git clone <repo-url>
cd BHUKK-WEBSITE

# 2. Install dependencies
npm install

# 3. Set environment variables
echo "VITE_API_BASE=https://bhukkwebbackend.naiyo24.com" > .env

# 4. Start dev server (port 3000)
npm run dev

# 5. Open http://localhost:3000
```

### Production Build

```bash
npm run build    # Output in dist/
npm run preview  # Preview production build
```

---

## Extending the Project

### Adding a New Page

1. Create `pages/NewPage.tsx`
2. Add `"new-page"` to the `PageType` union and `VALID_PAGES` array in `App.tsx`
3. Add a `case "new-page":` to `renderPage()` switch
4. Add navigation entry in `Navbar.tsx` → `handleLinkClick()`
5. Optionally add link in `constants.tsx` → `NAV_LINKS`

### Adding a New API Service

1. Create `api/services/newentity.service.ts`
2. Define the TypeScript `type` for the form data
3. Export an async function that:
   - Accepts `FormData` or typed data
   - Converts to `FormData` if needed
   - Calls `axios.post('/api/endpoint', payload)`
4. Import and use in the corresponding form component

### Adding a New Form

1. Create the Zod schema with all fields
2. Create the form component using `useForm({ resolver: zodResolver(schema) })`
3. Build `FormData` in `onSubmit` — include both `*_file` and `*_url` keys for uploads
4. Handle errors by parsing `detail` from backend response
5. Create a page wrapper in `pages/` and register it in the router

### Backend Expectations

The FastAPI backend expects:

- **Content-Type:** `multipart/form-data` for all partner/form endpoints
- **File fields:** Sent as binary `File` objects in FormData
- **Dual keys:** For each file, send both `field_name_file` and `field_name_url`
- **Boolean fields:** Sent as string `"true"` / `"false"`
- **Error format:** `{ detail: string | Array<{ loc: string[], msg: string }> }`

---

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Hash-based routing (no React Router) | Simpler deployment, no server config needed for SPA |
| Tailwind via CDN (not PostCSS) | Faster setup, no build pipeline complexity |
| Zod + React Hook Form | Type-safe validation, minimal re-renders |
| Manual FormData construction | Full control over multipart encoding, dual-key pattern |
| CustomEvents for cross-component | Avoids prop drilling for fire-and-forget actions |
| sessionStorage for scroll target | Survives navigation but not page refresh (intentional) |
| Axios with central instance | Consistent base URL, timeout, interceptors-ready |

---

> **Note:** Bhukk does not sell alcohol directly. All alcohol sales are fulfilled by licensed retail partners in accordance with applicable laws.