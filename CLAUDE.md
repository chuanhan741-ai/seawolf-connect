# CLAUDE.md — Seawolf Connect

## Project Overview

Seawolf Connect is an academic engagement mentorship web application for Stony Brook University (SBU). It connects current students (especially freshmen/sophomores) with upperclassmen and alumni for course guidance, academic support, and career networking.

This is a **CSE 300 Technical Communications** class project (Group 3, Spring 2026). The deliverable is a **high-fidelity interactive prototype** (not a production app) to be presented to university administrators during a 15-minute oral presentation.

## Tech Stack

- **Framework:** React 18+ with JSX
- **Styling:** Tailwind CSS (utility classes only — no compiler, use pre-defined classes)
- **Icons:** lucide-react
- **Charts:** recharts
- **No backend** — all data is simulated/hardcoded
- **No localStorage/sessionStorage** — use React state only
- **Single-file components** — each page is one `.jsx` file

## SBU Brand System

All UI must follow official Stony Brook University brand guidelines.

### Colors (CSS variables to define)

```
--sbu-red: #990000           /* Primary — buttons, logo, key accents */
--sbu-bright-red: #D52027    /* Hover states, notifications */
--sbu-dark-red: #6B000D      /* Headers, sidebar backgrounds */
--sbu-black: #000000          /* Body text */
--sbu-navy: #002244           /* Charts, data labels */
--sbu-royal-blue: #00549A    /* Links, info tooltips */
--sbu-dark-gray: #4B4B4B     /* Secondary text */
--sbu-medium-gray: #828282   /* Placeholders, borders */
--sbu-light-gray: #BEBEBE    /* Dividers, backgrounds */
--sbu-cream: #F8F2C5          /* Highlight backgrounds */
```

### Color Rules

- Red to non-red ratio: **80:20**
- Gradients: always **linear, angled up-right (20°–70°)**. Never radial.
- All text/background combos must pass **WCAG 4.5:1** contrast.

### Typography

- **Headings:** Georgia, Merriweather, or serif — formal institutional tone
- **Body:** system-ui, Calibri, Source Sans Pro, or clean sans-serif
- **Data/Mono:** JetBrains Mono or monospace

### Design Aesthetic: "Institutional Elegance"

- Clean, card-based layouts with generous whitespace
- Professional and trustworthy — NOT startup/flashy
- SBU Red for primary CTAs, Navy for informational elements, Grays for structure
- Desktop-first, fully responsive

## Pages to Build

### 1. Landing Page (`/`)
- Hero: "Find Your Seawolf Mentor" with SBU campus imagery
- 3 feature cards: Smart Match, Flash Mentoring, Community Hub
- SBU stats counter (27,200 students, 200K+ alumni, #59 US News)
- CTA: "Sign In with SBU NetID"

### 2. Dashboard (`/dashboard`)
- Welcome banner with user name and quick actions
- AI-recommended mentor cards (3-4 cards)
- Upcoming appointments list
- Recent messages
- Active community topics sidebar

### 3. Explore Mentors (`/explore`)
- Search bar + filter sidebar:
  - Major (CS, Biology, Psychology, Business, EE, Math, PoliSci, Chem, Econ, IS)
  - Industry
  - Support type (Resume Review, Course Help, Interview Prep, Career Advice)
  - Availability (Available Now, This Week, This Month)
- Mentor card grid: avatar, name, major, grad year, skill tags, rating, session count, "Connect" button
- Pagination

### 4. Mentor Profile (`/mentor/:id`)
- Header with avatar, name, role, major, graduation year
- About / background section
- Expertise tags
- Availability calendar (visual weekly grid)
- Past mentee reviews (star rating + text)
- Actions: "Request Meeting" / "Send Message"

### 5. Messages (`/messages`)
- Left: conversation list with avatars, names, last message preview, timestamp
- Right: chat window with message bubbles
- Integrated meeting scheduling

### 6. My Profile (`/profile`)
- Editable personal info
- Academic/career goals
- Skills and interest tags
- Mentor preference settings (major, industry, meeting format)

### 7. Admin Dashboard (`/admin`) — MOST IMPORTANT FOR PRESENTATION
- Top stats cards: Active Users, New Registrations, Monthly Matches, Sessions, Satisfaction Score
- Engagement rate trend line chart (recharts)
- Users by department bar/pie chart
- User growth curve (monthly)
- Mentor-to-student ratio gauge
- Export Reports button

## Simulated Data

### User Personas

| Name | Role | Major | Year | Tags |
|------|------|-------|------|------|
| Sarah Chen | Mentee | Computer Science | Freshman | Course planning, internship prep |
| Marcus Williams | Mentee | Biology | Sophomore | Switching majors, research |
| Priya Patel | Mentor | Information Systems | Senior | Resume guidance, interviews |
| David Kim | Alumni Mentor | Computer Science | Class of 2022 | Industry insights, career dev |
| Dr. Emily Rodriguez | Admin | Career Center | Director | Platform management |
| James Thompson | Alumni Mentor | Mechanical Eng. | Class of 2018 | Entrepreneurship, engineering |

### SBU Stats

- Total enrollment: ~27,200 (2025, record high)
- Undergrad: ~18,600
- Graduate: ~8,600
- Fall 2024 freshman class: 4,042 (largest ever)
- US News: #59 national, #1 public in NY
- Applications: 71,000+ (most in SUNY)
- Alumni network: 200,000+

### Departments for Filters

Computer Science, Biology, Psychology, Business Management, Electrical Engineering, Applied Mathematics, Political Science, Chemistry, Economics, Information Systems

## Core Features

### Smart Match
Multi-dimensional matching by major, interests, career goals. Users set preference weights. Based on Haas et al. (2018) two-sided matching research.

### Flash Mentoring
One-time, low-commitment conversations. Quick questions mode. Based on ACSN (2023) best practices.

### Structured Mentoring
Semester-long pairing with milestones, goal tracking, check-in reminders. Based on Guerreiro & de Jesus (2025).

### Community Hub
Major/interest discussion groups, resource library, alumni AMA events.

### Privacy & Safety
- SBU NetID SSO (Shibboleth)
- FERPA-compliant data handling
- 3-tier privacy: Public / Community / Private
- Report/block system
- Code of Conduct on registration

### Analytics (Admin)
Engagement tracking, department distribution, retention metrics, exportable reports.

## Presentation Context

- **Audience:** University administrators (IT leadership, Provost, DoIT)
- **Goal:** Persuade them Seawolf Connect deserves institutional support and funding
- **Key admin concerns to address:**
  - Data visibility and analytics (Admin Dashboard)
  - Privacy/FERPA compliance
  - Integration with existing campus services (Career Center, Advising)
  - Low maintenance burden on DoIT
  - Realistic development cost and timeline

## Project Team

| Member | Role |
|--------|------|
| Brian Cao | Project Manager |
| Jensen Jacob | Note Writer |
| Xingyang Wang | Software Designer & Creator |
| Aidan Le | Editor |
| Matteo Facchini | Designer |
| Mark Xiang | Formatter |

## File Structure Convention

```
src/
├── components/        # Shared UI components (Navbar, Footer, MentorCard, etc.)
├── pages/             # Page-level components
│   ├── Landing.jsx
│   ├── Dashboard.jsx
│   ├── Explore.jsx
│   ├── MentorProfile.jsx
│   ├── Messages.jsx
│   ├── Profile.jsx
│   └── AdminDashboard.jsx
├── data/              # Simulated data (mentors.js, stats.js, messages.js)
├── App.jsx            # Router setup
└── index.css          # Tailwind + CSS variables
```

## Code Style

- Functional components with hooks
- Default exports for pages
- Tailwind utility classes for all styling
- No inline style objects unless absolutely necessary
- Use lucide-react for all icons
- Use recharts for all charts/graphs
- Descriptive component and variable names
- Comments for non-obvious logic only

## Important Constraints

- This is a PROTOTYPE, not production code — prioritize visual fidelity over engineering purity
- All data is hardcoded — no API calls, no fetch, no backend
- No localStorage/sessionStorage (not supported in artifact environment)
- No `<form>` tags in React — use onClick handlers
- Available libraries: react, lucide-react, recharts, lodash, d3, tailwind (pre-built classes), shadcn/ui
- Every page should feel complete and polished — no "coming soon" placeholders
- The Admin Dashboard is the HIGHEST PRIORITY page for the presentation
