# Seawolf Connect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-fidelity interactive prototype of the Seawolf Connect mentorship platform for SBU, with 7 complete pages optimized for a 15-minute presentation to university administrators.

**Architecture:** Single-page React app with client-side routing (react-router-dom). All data is hardcoded in JS files under `src/data/`. No backend, no localStorage. State managed via React hooks. SBU brand system implemented through CSS custom properties and Tailwind utilities.

**Tech Stack:** Vite, React 18, React Router DOM 6, Tailwind CSS 3, lucide-react, recharts

---

## File Map

```
seawolf-connect/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── sbu-logo.svg
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Router setup with all routes
│   ├── index.css             # Tailwind directives + SBU CSS variables
│   ├── data/
│   │   ├── mentors.js        # Mentor/mentee persona data
│   │   ├── stats.js          # SBU stats + admin dashboard data
│   │   └── messages.js       # Chat conversation data
│   ├── components/
│   │   ├── Navbar.jsx         # Top navigation bar
│   │   ├── Footer.jsx         # Page footer
│   │   └── MentorCard.jsx     # Reusable mentor card (used in Explore + Dashboard)
│   └── pages/
│       ├── Landing.jsx        # Landing/hero page
│       ├── AdminDashboard.jsx # Admin analytics dashboard (HIGHEST PRIORITY)
│       ├── Dashboard.jsx      # Student dashboard
│       ├── Explore.jsx        # Explore mentors with filters
│       ├── MentorProfile.jsx  # Individual mentor profile
│       ├── Messages.jsx       # Messaging interface
│       └── Profile.jsx        # User profile editor
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`

- [ ] **Step 1: Scaffold Vite + React project**

```bash
cd "/Users/kankawa/Documents/SBU作业/ISE300_Prototype"
npm create vite@latest . -- --template react
```

Select: React, JavaScript

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom lucide-react recharts
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Tailwind via Vite plugin**

Replace `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 4: Set up index.html with SBU fonts**

Replace `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seawolf Connect — Stony Brook University</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Source+Sans+3:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Set up main.jsx**

Replace `src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 6: Delete boilerplate files**

```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server running on localhost

- [ ] **Step 8: Commit**

```bash
git init
echo "node_modules\ndist\n.DS_Store" > .gitignore
git add .
git commit -m "chore: scaffold Vite + React project with Tailwind, React Router, lucide-react, recharts"
```

---

### Task 2: Global Styles & SBU Brand System

**Files:**
- Create: `src/index.css`

- [ ] **Step 1: Write index.css with Tailwind + SBU brand**

Replace `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-sbu-red: #990000;
  --color-sbu-bright-red: #D52027;
  --color-sbu-dark-red: #6B000D;
  --color-sbu-black: #000000;
  --color-sbu-navy: #002244;
  --color-sbu-royal-blue: #00549A;
  --color-sbu-dark-gray: #4B4B4B;
  --color-sbu-medium-gray: #828282;
  --color-sbu-light-gray: #BEBEBE;
  --color-sbu-cream: #F8F2C5;

  --font-heading: 'Merriweather', Georgia, serif;
  --font-body: 'Source Sans 3', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

body {
  font-family: var(--font-body);
  color: var(--color-sbu-black);
  background-color: #f9fafb;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
```

- [ ] **Step 2: Verify styles load**

```bash
npm run dev
```

Open browser, check that fonts load and background is light gray.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: add SBU brand system with colors, typography, and Tailwind theme"
```

---

### Task 3: Simulated Data Files

**Files:**
- Create: `src/data/mentors.js`, `src/data/stats.js`, `src/data/messages.js`

- [ ] **Step 1: Create mentors.js**

Create `src/data/mentors.js`:

```js
export const mentors = [
  {
    id: 1,
    name: "Priya Patel",
    role: "Mentor",
    major: "Information Systems",
    year: "Senior",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    rating: 4.9,
    sessions: 47,
    tags: ["Resume Review", "Interview Prep", "Career Advice"],
    industry: "Technology",
    availability: "Available Now",
    bio: "Senior IS major with internship experience at Deloitte and IBM. Passionate about helping underclassmen navigate the job market and build strong resumes. President of the Women in Tech club.",
    expertise: ["Resume Writing", "Behavioral Interviews", "LinkedIn Optimization", "Career Planning", "Networking"],
    reviews: [
      { name: "Sarah Chen", rating: 5, text: "Priya helped me completely revamp my resume. Got 3 interview callbacks within a week!", date: "2026-03-15" },
      { name: "Marcus Williams", rating: 5, text: "Amazing mock interview session. She gave really specific feedback that helped me land my internship.", date: "2026-03-01" },
      { name: "Anonymous", rating: 4, text: "Very knowledgeable about the tech industry recruiting process.", date: "2026-02-20" }
    ],
    weeklySchedule: {
      Monday: ["10:00 AM", "2:00 PM", "4:00 PM"],
      Tuesday: ["11:00 AM", "3:00 PM"],
      Wednesday: ["10:00 AM", "1:00 PM", "4:00 PM"],
      Thursday: ["2:00 PM", "5:00 PM"],
      Friday: ["10:00 AM", "11:00 AM"]
    }
  },
  {
    id: 2,
    name: "David Kim",
    role: "Alumni Mentor",
    major: "Computer Science",
    year: "Class of 2022",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 4.8,
    sessions: 62,
    tags: ["Career Advice", "Course Help", "Interview Prep"],
    industry: "Software Engineering",
    availability: "This Week",
    bio: "Software engineer at Google NYC. SBU CS Class of 2022. Happy to share insights about the tech industry, grad school applications, and navigating CS coursework at Stony Brook.",
    expertise: ["Software Engineering", "System Design", "Algorithms", "Graduate School", "Big Tech Recruiting"],
    reviews: [
      { name: "Alex Rodriguez", rating: 5, text: "David's system design tips were invaluable for my Google interview prep.", date: "2026-03-10" },
      { name: "Jenny Liu", rating: 5, text: "Gave me a realistic picture of what to expect in the industry. Very honest and helpful.", date: "2026-02-28" },
      { name: "Tom Anderson", rating: 4, text: "Great advice on which CS electives to take. Wish I talked to him sooner.", date: "2026-02-15" }
    ],
    weeklySchedule: {
      Monday: [],
      Tuesday: ["6:00 PM", "7:00 PM"],
      Wednesday: [],
      Thursday: ["6:00 PM", "7:00 PM", "8:00 PM"],
      Friday: [],
    }
  },
  {
    id: 3,
    name: "James Thompson",
    role: "Alumni Mentor",
    major: "Mechanical Engineering",
    year: "Class of 2018",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    rating: 4.7,
    sessions: 35,
    tags: ["Career Advice", "Resume Review"],
    industry: "Entrepreneurship",
    availability: "This Month",
    bio: "Co-founded a clean energy startup after graduating from SBU ME. Previously worked at SpaceX. I love helping students explore entrepreneurship and non-traditional career paths in engineering.",
    expertise: ["Entrepreneurship", "Startup Culture", "Mechanical Design", "Clean Energy", "Fundraising"],
    reviews: [
      { name: "Chris Park", rating: 5, text: "James gave me the courage to pursue my startup idea. His mentorship has been life-changing.", date: "2026-03-05" },
      { name: "Maria Santos", rating: 4, text: "Really insightful about the engineering startup world.", date: "2026-02-18" }
    ],
    weeklySchedule: {
      Monday: ["12:00 PM"],
      Tuesday: [],
      Wednesday: ["12:00 PM", "5:00 PM"],
      Thursday: [],
      Friday: ["12:00 PM"],
    }
  },
  {
    id: 4,
    name: "Dr. Lisa Wang",
    role: "Faculty Mentor",
    major: "Biology",
    year: "Associate Professor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    rating: 4.9,
    sessions: 28,
    tags: ["Course Help", "Career Advice"],
    industry: "Research / Academia",
    availability: "This Week",
    bio: "Associate Professor of Biology at SBU. Research focus on marine ecology. Mentoring students interested in research careers, graduate programs, and pre-med pathways.",
    expertise: ["Research Methods", "Graduate School Apps", "Pre-Med Advising", "Lab Techniques", "Academic Writing"],
    reviews: [
      { name: "Marcus Williams", rating: 5, text: "Dr. Wang helped me figure out that switching to bio was the right move. So grateful!", date: "2026-03-12" },
      { name: "Anonymous", rating: 5, text: "Incredibly supportive and knowledgeable about grad school applications.", date: "2026-02-25" }
    ],
    weeklySchedule: {
      Monday: ["10:00 AM", "3:00 PM"],
      Tuesday: ["10:00 AM"],
      Wednesday: ["10:00 AM", "3:00 PM"],
      Thursday: ["10:00 AM"],
      Friday: []
    }
  },
  {
    id: 5,
    name: "Aisha Johnson",
    role: "Mentor",
    major: "Psychology",
    year: "Senior",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    rating: 4.6,
    sessions: 19,
    tags: ["Course Help", "Career Advice", "Resume Review"],
    industry: "Mental Health",
    availability: "Available Now",
    bio: "Senior Psychology major minoring in Public Health. Planning to pursue a PsyD. I can help with psych coursework, research opportunities, and navigating pre-grad school requirements.",
    expertise: ["Psychology Coursework", "Research Assistant Positions", "Grad School Prep", "Public Health", "Study Strategies"],
    reviews: [
      { name: "Jordan Lee", rating: 5, text: "Aisha's study strategies for PSY 310 saved my grade.", date: "2026-03-08" },
      { name: "Anonymous", rating: 4, text: "Really helpful for understanding grad school options in psychology.", date: "2026-02-22" }
    ],
    weeklySchedule: {
      Monday: ["1:00 PM", "3:00 PM"],
      Tuesday: ["11:00 AM", "2:00 PM"],
      Wednesday: ["1:00 PM"],
      Thursday: ["11:00 AM", "2:00 PM", "4:00 PM"],
      Friday: ["10:00 AM"]
    }
  },
  {
    id: 6,
    name: "Ryan Martinez",
    role: "Alumni Mentor",
    major: "Business Management",
    year: "Class of 2020",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
    rating: 4.8,
    sessions: 41,
    tags: ["Interview Prep", "Career Advice", "Resume Review"],
    industry: "Finance",
    availability: "This Week",
    bio: "Financial analyst at Goldman Sachs. SBU Business Management '20. I specialize in helping students break into finance and consulting — resume prep, case interviews, and networking strategy.",
    expertise: ["Investment Banking", "Case Interviews", "Financial Modeling", "Consulting", "Networking"],
    reviews: [
      { name: "Wei Zhang", rating: 5, text: "Ryan's mock case interviews were the best prep I could have asked for.", date: "2026-03-14" },
      { name: "Sarah Chen", rating: 5, text: "His networking tips helped me connect with people at JP Morgan.", date: "2026-02-27" },
      { name: "Anonymous", rating: 4, text: "Very responsive and genuinely cares about helping students.", date: "2026-02-10" }
    ],
    weeklySchedule: {
      Monday: [],
      Tuesday: ["7:00 PM", "8:00 PM"],
      Wednesday: [],
      Thursday: ["7:00 PM", "8:00 PM"],
      Friday: [],
    }
  },
  {
    id: 7,
    name: "Mei Chen",
    role: "Mentor",
    major: "Electrical Engineering",
    year: "Junior",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mei",
    rating: 4.5,
    sessions: 12,
    tags: ["Course Help"],
    industry: "Hardware / Embedded Systems",
    availability: "Available Now",
    bio: "Junior EE major with a focus on embedded systems. I tutor for ESE 218 and ESE 224. If you're struggling with circuits or signals, I'm here to help!",
    expertise: ["Circuit Analysis", "Signals & Systems", "MATLAB", "Embedded C", "Lab Reports"],
    reviews: [
      { name: "Anonymous", rating: 5, text: "Mei explained Fourier transforms better than my professor.", date: "2026-03-02" },
      { name: "Kevin Patel", rating: 4, text: "Super patient and explains things clearly.", date: "2026-02-19" }
    ],
    weeklySchedule: {
      Monday: ["11:00 AM", "4:00 PM"],
      Tuesday: ["11:00 AM"],
      Wednesday: ["11:00 AM", "4:00 PM"],
      Thursday: ["11:00 AM"],
      Friday: ["11:00 AM", "2:00 PM"]
    }
  },
  {
    id: 8,
    name: "Carlos Rivera",
    role: "Alumni Mentor",
    major: "Political Science",
    year: "Class of 2021",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    rating: 4.7,
    sessions: 23,
    tags: ["Career Advice", "Interview Prep"],
    industry: "Government / Policy",
    availability: "This Month",
    bio: "Policy analyst at the NYC Mayor's Office. SBU PoliSci '21. I can help with government internships, law school prep, and building a career in public service.",
    expertise: ["Government Careers", "Policy Analysis", "Law School Prep", "Public Speaking", "Grant Writing"],
    reviews: [
      { name: "Taylor Brown", rating: 5, text: "Carlos helped me land an internship at the State Department!", date: "2026-03-11" },
      { name: "Anonymous", rating: 5, text: "Invaluable insights into careers in government.", date: "2026-02-24" }
    ],
    weeklySchedule: {
      Monday: ["5:00 PM"],
      Tuesday: [],
      Wednesday: ["5:00 PM"],
      Thursday: [],
      Friday: ["5:00 PM"]
    }
  }
];

export const mentees = [
  {
    id: 101,
    name: "Sarah Chen",
    role: "Mentee",
    major: "Computer Science",
    year: "Freshman",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    tags: ["Course Planning", "Internship Prep"],
    goals: ["Land a summer internship", "Build a project portfolio", "Learn data structures"],
    preferences: { major: "Computer Science", industry: "Technology", format: "Virtual" }
  },
  {
    id: 102,
    name: "Marcus Williams",
    role: "Mentee",
    major: "Biology",
    year: "Sophomore",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    tags: ["Switching Majors", "Research"],
    goals: ["Explore biology research labs", "Decide on pre-med vs. research track", "Improve GPA"],
    preferences: { major: "Biology", industry: "Research / Academia", format: "In-Person" }
  }
];

export const currentUser = {
  id: 101,
  name: "Sarah Chen",
  role: "Mentee",
  major: "Computer Science",
  year: "Freshman",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  email: "sarah.chen@stonybrook.edu",
  sbuId: "114012345",
  tags: ["Course Planning", "Internship Prep"],
  goals: ["Land a summer internship", "Build a project portfolio", "Learn data structures"],
  preferences: { major: "Computer Science", industry: "Technology", format: "Virtual" },
  bio: "Freshman CS major at Stony Brook. Excited about web development and AI. Looking for guidance on course planning and internship preparation."
};
```

- [ ] **Step 2: Create stats.js**

Create `src/data/stats.js`:

```js
export const sbuStats = {
  totalEnrollment: 27200,
  undergrad: 18600,
  graduate: 8600,
  freshmanClass: 4042,
  usNewsRank: 59,
  publicNYRank: 1,
  applications: 71000,
  alumniNetwork: 200000
};

export const adminStats = {
  activeUsers: 3847,
  newRegistrations: 312,
  monthlyMatches: 186,
  totalSessions: 1429,
  satisfactionScore: 4.7
};

export const engagementData = [
  { month: "Sep", rate: 42 },
  { month: "Oct", rate: 58 },
  { month: "Nov", rate: 65 },
  { month: "Dec", rate: 51 },
  { month: "Jan", rate: 68 },
  { month: "Feb", rate: 74 },
  { month: "Mar", rate: 82 },
  { month: "Apr", rate: 79 }
];

export const departmentData = [
  { name: "Computer Science", users: 892, color: "#990000" },
  { name: "Biology", users: 634, color: "#002244" },
  { name: "Psychology", users: 521, color: "#00549A" },
  { name: "Business Mgmt", users: 478, color: "#6B000D" },
  { name: "Electrical Eng.", users: 356, color: "#D52027" },
  { name: "Applied Math", users: 298, color: "#4B4B4B" },
  { name: "Political Science", users: 245, color: "#828282" },
  { name: "Chemistry", users: 198, color: "#990000" },
  { name: "Economics", users: 156, color: "#002244" },
  { name: "Info Systems", users: 69, color: "#00549A" }
];

export const userGrowthData = [
  { month: "Sep '25", students: 820, mentors: 45 },
  { month: "Oct '25", students: 1240, mentors: 78 },
  { month: "Nov '25", students: 1680, mentors: 112 },
  { month: "Dec '25", students: 1890, mentors: 134 },
  { month: "Jan '26", students: 2340, mentors: 156 },
  { month: "Feb '26", students: 2890, mentors: 189 },
  { month: "Mar '26", students: 3420, mentors: 215 },
  { month: "Apr '26", students: 3847, mentors: 238 }
];

export const mentorRatioData = {
  students: 3847,
  mentors: 238,
  ratio: "16:1",
  target: "12:1"
};

export const appointments = [
  { id: 1, mentor: "Priya Patel", topic: "Resume Review Session", date: "Apr 10, 2026", time: "2:00 PM", type: "Virtual" },
  { id: 2, mentor: "David Kim", topic: "Career Planning Discussion", date: "Apr 12, 2026", time: "6:00 PM", type: "Virtual" },
  { id: 3, mentor: "Ryan Martinez", topic: "Mock Interview Practice", date: "Apr 15, 2026", time: "7:00 PM", type: "Virtual" }
];

export const communityTopics = [
  { id: 1, title: "Best CS electives for AI/ML track?", replies: 23, category: "Computer Science", hot: true },
  { id: 2, title: "Summer research opportunities in Bio", replies: 15, category: "Biology", hot: false },
  { id: 3, title: "Internship timeline for sophomores", replies: 31, category: "Career Advice", hot: true },
  { id: 4, title: "Study group for AMS 310", replies: 12, category: "Applied Math", hot: false },
  { id: 5, title: "Tips for the Career Center fair", replies: 19, category: "Career Advice", hot: false }
];
```

- [ ] **Step 3: Create messages.js**

Create `src/data/messages.js`:

```js
export const conversations = [
  {
    id: 1,
    participant: {
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      role: "Mentor",
      online: true
    },
    lastMessage: "Sounds great! I'll review your resume before our meeting.",
    timestamp: "2:30 PM",
    unread: 2,
    messages: [
      { id: 1, sender: "Sarah Chen", text: "Hi Priya! I saw you specialize in resume reviews. Could you help me with mine?", time: "1:45 PM", isMe: true },
      { id: 2, sender: "Priya Patel", text: "Of course, Sarah! I'd love to help. Can you send me your current resume?", time: "1:52 PM", isMe: false },
      { id: 3, sender: "Sarah Chen", text: "Here it is! I'm mainly looking for feedback on my project descriptions and skills section.", time: "2:10 PM", isMe: true },
      { id: 4, sender: "Priya Patel", text: "Got it! I'll take a detailed look. A few quick things I notice — your bullet points could use more quantifiable metrics.", time: "2:22 PM", isMe: false },
      { id: 5, sender: "Priya Patel", text: "Sounds great! I'll review your resume before our meeting on Thursday.", time: "2:30 PM", isMe: false }
    ]
  },
  {
    id: 2,
    participant: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      role: "Alumni Mentor",
      online: false
    },
    lastMessage: "Let's discuss system design next session!",
    timestamp: "Yesterday",
    unread: 0,
    messages: [
      { id: 1, sender: "Sarah Chen", text: "Hi David! I'm a freshman in CS and would love advice on which courses to prioritize.", time: "Mon 4:00 PM", isMe: true },
      { id: 2, sender: "David Kim", text: "Hey Sarah! Great question. Definitely focus on CSE 214 and CSE 220 early — they're foundational.", time: "Mon 6:15 PM", isMe: false },
      { id: 3, sender: "Sarah Chen", text: "Thanks! Any tips for 214? I heard it's tough.", time: "Mon 6:30 PM", isMe: true },
      { id: 4, sender: "David Kim", text: "Practice LeetCode easy problems alongside the course. Also, start the projects early — they take longer than you think!", time: "Mon 7:00 PM", isMe: false },
      { id: 5, sender: "David Kim", text: "Let's discuss system design next session! It'll be super useful for internship interviews.", time: "Tue 6:00 PM", isMe: false }
    ]
  },
  {
    id: 3,
    participant: {
      name: "Ryan Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
      role: "Alumni Mentor",
      online: true
    },
    lastMessage: "See you Thursday for the mock interview!",
    timestamp: "Monday",
    unread: 1,
    messages: [
      { id: 1, sender: "Ryan Martinez", text: "Hi Sarah! I see you're interested in interview prep. Want to schedule a mock behavioral interview?", time: "Sat 3:00 PM", isMe: false },
      { id: 2, sender: "Sarah Chen", text: "Yes please! I have a Google interview coming up and I'm really nervous.", time: "Sat 4:20 PM", isMe: true },
      { id: 3, sender: "Ryan Martinez", text: "No worries, we'll get you ready! I'll prepare some STAR-method questions focused on tech.", time: "Sun 10:00 AM", isMe: false },
      { id: 4, sender: "Ryan Martinez", text: "See you Thursday for the mock interview! Come prepared with 3 stories about your projects.", time: "Mon 8:00 PM", isMe: false }
    ]
  },
  {
    id: 4,
    participant: {
      name: "Mei Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mei",
      role: "Mentor",
      online: false
    },
    lastMessage: "Let me know if you need help with the lab report!",
    timestamp: "Last week",
    unread: 0,
    messages: [
      { id: 1, sender: "Sarah Chen", text: "Hi Mei! I'm taking ESE 123 and struggling with the circuits homework.", time: "Mar 28 2:00 PM", isMe: true },
      { id: 2, sender: "Mei Chen", text: "Happy to help! Which topics are you stuck on?", time: "Mar 28 3:15 PM", isMe: false },
      { id: 3, sender: "Sarah Chen", text: "Mainly Thevenin equivalents and superposition.", time: "Mar 28 3:30 PM", isMe: true },
      { id: 4, sender: "Mei Chen", text: "Those are tricky at first! Let me know if you need help with the lab report too!", time: "Mar 28 4:00 PM", isMe: false }
    ]
  }
];
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add simulated data for mentors, stats, and messages"
```

---

### Task 4: Shared Components (Navbar, Footer, MentorCard)

**Files:**
- Create: `src/components/Navbar.jsx`, `src/components/Footer.jsx`, `src/components/MentorCard.jsx`

- [ ] **Step 1: Create Navbar.jsx**

Create `src/components/Navbar.jsx`:

```jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Home, Search, MessageSquare, User, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/explore', label: 'Explore', icon: Search },
    { to: '/messages', label: 'Messages', icon: MessageSquare },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/admin', label: 'Admin', icon: LayoutDashboard },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-sbu-dark-red text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight">
            <GraduationCap className="w-8 h-8" />
            <span>Seawolf Connect</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/10"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/20">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
                isActive(to) ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Create Footer.jsx**

Create `src/components/Footer.jsx`:

```jsx
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sbu-dark-red text-white/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-heading text-lg font-bold mb-3">
              <GraduationCap className="w-6 h-6" />
              Seawolf Connect
            </div>
            <p className="text-sm leading-relaxed">
              Connecting Stony Brook students with mentors for academic success and career growth.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Seawolf Connect</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy (FERPA)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">SBU Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Career Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Academic Advising</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Affairs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IT Help Desk (DoIT)</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2026 Stony Brook University. All rights reserved.</p>
          <p className="mt-1 text-white/60">A CSE 300 Group 3 Project — Prototype for Demonstration Purposes</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create MentorCard.jsx**

Create `src/components/MentorCard.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';

export default function MentorCard({ mentor }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-14 h-14 rounded-full bg-gray-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-sbu-black truncate">{mentor.name}</h3>
          <p className="text-sm text-sbu-dark-gray">{mentor.role} &middot; {mentor.major}</p>
          <p className="text-xs text-sbu-medium-gray">{mentor.year}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3 text-sm">
        <span className="flex items-center gap-1 text-amber-600">
          <Star className="w-3.5 h-3.5 fill-current" />
          {mentor.rating}
        </span>
        <span className="flex items-center gap-1 text-sbu-dark-gray">
          <Clock className="w-3.5 h-3.5" />
          {mentor.sessions} sessions
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {mentor.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-sbu-red/10 text-sbu-red text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          mentor.availability === 'Available Now'
            ? 'bg-green-100 text-green-700'
            : mentor.availability === 'This Week'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {mentor.availability}
        </span>
        <Link
          to={`/mentor/${mentor.id}`}
          className="flex items-center gap-1 text-sm font-medium text-sbu-red hover:text-sbu-bright-red transition-colors"
        >
          Connect <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/
git commit -m "feat: add shared Navbar, Footer, and MentorCard components"
```

---

### Task 5: App Router Setup

**Files:**
- Create: `src/App.jsx`

- [ ] **Step 1: Create App.jsx with all routes**

Replace `src/App.jsx`:

```jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import MentorProfile from './pages/MentorProfile';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/mentor/:id" element={<MentorProfile />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
```

- [ ] **Step 2: Create placeholder pages so the app compiles**

Create each page file with a minimal placeholder:

`src/pages/Landing.jsx`:
```jsx
export default function Landing() {
  return <div className="p-8 text-center text-2xl">Landing Page (building...)</div>;
}
```

Repeat for: `Dashboard.jsx`, `Explore.jsx`, `MentorProfile.jsx`, `Messages.jsx`, `Profile.jsx`, `AdminDashboard.jsx` — each with their respective name.

- [ ] **Step 3: Verify routing works**

```bash
npm run dev
```

Navigate to `/`, `/dashboard`, `/explore`, `/messages`, `/profile`, `/admin`. Each should show the placeholder text with Navbar + Footer on non-landing pages.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/pages/
git commit -m "feat: add React Router with all page routes and placeholder pages"
```

---

### Task 6: Landing Page

**Files:**
- Create: `src/pages/Landing.jsx`

- [ ] **Step 1: Build the complete Landing page**

Replace `src/pages/Landing.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles, Zap, Users, ArrowRight, Shield, ChevronRight } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Sparkles,
      title: "Smart Match",
      description: "AI-powered matching by major, interests, and career goals. Find the mentor who truly understands your path."
    },
    {
      icon: Zap,
      title: "Flash Mentoring",
      description: "Quick, one-time conversations for immediate guidance. Get answers without long-term commitment."
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Join major-specific groups, attend alumni AMAs, and access shared resources from the Seawolf network."
    }
  ];

  const stats = [
    { value: "27,200+", label: "Students Enrolled" },
    { value: "200K+", label: "Alumni Network" },
    { value: "#59", label: "US News National" },
    { value: "#1", label: "Public University in NY" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-sbu-dark-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-heading text-xl font-bold">
            <GraduationCap className="w-8 h-8" />
            Seawolf Connect
          </div>
          <Link
            to="/dashboard"
            className="bg-white text-sbu-red px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Sign In with SBU NetID
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sbu-dark-red via-sbu-red to-sbu-dark-red text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm mb-6">
              <Shield className="w-4 h-4" />
              FERPA Compliant &middot; SBU NetID Secured
            </div>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your<br />Seawolf Mentor
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Connect with experienced upperclassmen and alumni who've walked your path at Stony Brook. Get personalized guidance for courses, careers, and campus life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-white text-sbu-red px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border border-white/30"
              >
                Browse Mentors <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-sbu-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-heading font-bold">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-sbu-black mb-4">
              How Seawolf Connect Works
            </h2>
            <p className="text-sbu-dark-gray text-lg max-w-2xl mx-auto">
              Three powerful ways to find the guidance you need at every stage of your Stony Brook journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-sbu-red/10 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-sbu-red" />
                </div>
                <h3 className="font-heading text-xl font-bold text-sbu-black mb-3">{feature.title}</h3>
                <p className="text-sbu-dark-gray leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-sbu-black mb-4">
            Ready to Connect with Your Seawolf Community?
          </h2>
          <p className="text-sbu-dark-gray text-lg mb-8">
            Join thousands of Stony Brook students already building meaningful mentorship connections.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-sbu-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sbu-bright-red transition-colors shadow-lg"
          >
            Sign In with SBU NetID <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-sbu-medium-gray mt-4">
            Secured with Shibboleth SSO &middot; FERPA Compliant
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sbu-dark-red text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm">
          <p>&copy; 2026 Stony Brook University. All rights reserved.</p>
          <p className="mt-1 text-white/60">A CSE 300 Group 3 Project</p>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Verify Landing page renders**

```bash
npm run dev
```

Navigate to `/`. Should see hero, stats, features, and CTA.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Landing.jsx
git commit -m "feat: build Landing page with hero, stats, features, and CTA"
```

---

### Task 7: Admin Dashboard (HIGHEST PRIORITY)

**Files:**
- Create: `src/pages/AdminDashboard.jsx`

- [ ] **Step 1: Build the complete Admin Dashboard**

Replace `src/pages/AdminDashboard.jsx`:

```jsx
import { useState } from 'react';
import {
  Users, UserPlus, Handshake, CalendarCheck, Star,
  TrendingUp, Download, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  adminStats, engagementData, departmentData,
  userGrowthData, mentorRatioData
} from '../data/stats';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('semester');

  const statCards = [
    { label: 'Active Users', value: adminStats.activeUsers.toLocaleString(), change: '+12.3%', up: true, icon: Users, color: 'bg-sbu-red' },
    { label: 'New Registrations', value: adminStats.newRegistrations, change: '+8.7%', up: true, icon: UserPlus, color: 'bg-sbu-navy' },
    { label: 'Monthly Matches', value: adminStats.monthlyMatches, change: '+15.2%', up: true, icon: Handshake, color: 'bg-sbu-royal-blue' },
    { label: 'Total Sessions', value: adminStats.totalSessions.toLocaleString(), change: '+6.1%', up: true, icon: CalendarCheck, color: 'bg-sbu-dark-red' },
    { label: 'Satisfaction Score', value: `${adminStats.satisfactionScore}/5.0`, change: '+0.2', up: true, icon: Star, color: 'bg-amber-600' },
  ];

  const ratioPercent = Math.min(
    (parseInt(mentorRatioData.ratio) / parseInt(mentorRatioData.target)) * 100,
    100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-sbu-black">Admin Dashboard</h1>
          <p className="text-sbu-dark-gray mt-1">Platform analytics and engagement metrics</p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 bg-sbu-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sbu-bright-red transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-sbu-dark-gray">{card.label}</span>
              <div className={`${card.color} p-2 rounded-lg`}>
                <card.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-sbu-black font-heading">{card.value}</div>
            <div className={`flex items-center gap-1 mt-1 text-sm ${card.up ? 'text-green-600' : 'text-red-600'}`}>
              {card.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {card.change} vs last period
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Engagement Rate Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black">Engagement Rate Trend</h2>
            <TrendingUp className="w-5 h-5 text-sbu-medium-gray" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#990000" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#990000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#4B4B4B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#4B4B4B' }} unit="%" />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value) => [`${value}%`, 'Engagement Rate']}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#990000"
                strokeWidth={2.5}
                fill="url(#engagementGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Users by Department */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-6">Users by Department</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#4B4B4B' }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#4B4B4B' }}
                width={110}
              />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value) => [value, 'Users']}
              />
              <Bar dataKey="users" radius={[0, 4, 4, 0]}>
                {departmentData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-6">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#4B4B4B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#4B4B4B' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                name="Students"
                stroke="#990000"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="mentors"
                name="Mentors"
                stroke="#002244"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mentor-to-Student Ratio Gauge */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-6">Mentor-to-Student Ratio</h2>
          <div className="flex flex-col items-center justify-center h-[260px]">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={[
                    { value: ratioPercent },
                    { value: 100 - ratioPercent }
                  ]}
                  cx="50%"
                  cy="80%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#990000" />
                  <Cell fill="#f0f0f0" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-8">
              <div className="text-3xl font-heading font-bold text-sbu-black">{mentorRatioData.ratio}</div>
              <div className="text-sm text-sbu-dark-gray mt-1">Current Ratio</div>
              <div className="text-xs text-sbu-medium-gray mt-0.5">Target: {mentorRatioData.target}</div>
            </div>
            <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center text-sm">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-sbu-black">{mentorRatioData.mentors}</div>
                <div className="text-xs text-sbu-dark-gray">Mentors</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-bold text-sbu-black">{mentorRatioData.students.toLocaleString()}</div>
                <div className="text-xs text-sbu-dark-gray">Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify Admin Dashboard renders with all charts**

```bash
npm run dev
```

Navigate to `/admin`. Should see stat cards, engagement chart, department bar chart, user growth line chart, and ratio gauge.

- [ ] **Step 3: Commit**

```bash
git add src/pages/AdminDashboard.jsx
git commit -m "feat: build Admin Dashboard with stats cards, engagement, department, growth, and ratio charts"
```

---

### Task 8: Student Dashboard

**Files:**
- Create: `src/pages/Dashboard.jsx`

- [ ] **Step 1: Build the complete Dashboard page**

Replace `src/pages/Dashboard.jsx`:

```jsx
import { Link } from 'react-router-dom';
import {
  Search, Calendar, MessageSquare, TrendingUp,
  ArrowRight, Sparkles, Clock, Users
} from 'lucide-react';
import MentorCard from '../components/MentorCard';
import { mentors } from '../data/mentors';
import { currentUser } from '../data/mentors';
import { appointments, communityTopics } from '../data/stats';

export default function Dashboard() {
  const recommendedMentors = mentors.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-sbu-dark-red to-sbu-red rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, {currentUser.name.split(' ')[0]}!
            </h1>
            <p className="text-white/90">
              {currentUser.major} &middot; {currentUser.year} &middot; Stony Brook University
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <Link to="/explore" className="flex items-center gap-2 bg-white text-sbu-red px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
              <Search className="w-4 h-4" /> Find Mentors
            </Link>
            <Link to="/messages" className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors border border-white/30">
              <MessageSquare className="w-4 h-4" /> Messages
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recommended Mentors */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold text-sbu-black flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sbu-red" />
                Recommended Mentors
              </h2>
              <Link to="/explore" className="text-sm text-sbu-red hover:text-sbu-bright-red font-medium flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </section>

          {/* Upcoming Appointments */}
          <section>
            <h2 className="font-heading text-xl font-bold text-sbu-black flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-sbu-red" />
              Upcoming Appointments
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              {appointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-sbu-red/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-sbu-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sbu-black">{apt.topic}</h3>
                      <p className="text-sm text-sbu-dark-gray">with {apt.mentor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-sbu-black">{apt.date}</div>
                    <div className="text-xs text-sbu-medium-gray">{apt.time} &middot; {apt.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-heading font-bold text-sbu-black mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sbu-red" />
              Your Progress
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-sbu-dark-gray">Sessions Completed</span>
                <span className="font-bold text-sbu-black">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-sbu-dark-gray">Mentors Connected</span>
                <span className="font-bold text-sbu-black">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-sbu-dark-gray">Goals Achieved</span>
                <span className="font-bold text-sbu-black">1 / 3</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-sbu-medium-gray mb-1">
                  <span>Profile Completion</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-sbu-red h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Community Topics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-heading font-bold text-sbu-black mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-sbu-red" />
              Active Community Topics
            </h3>
            <div className="space-y-3">
              {communityTopics.map((topic) => (
                <div key={topic.id} className="group cursor-pointer">
                  <div className="flex items-start gap-2">
                    {topic.hot && <span className="text-xs bg-sbu-bright-red text-white px-1.5 py-0.5 rounded font-medium mt-0.5">HOT</span>}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-sbu-black group-hover:text-sbu-red transition-colors truncate">
                        {topic.title}
                      </p>
                      <p className="text-xs text-sbu-medium-gray">{topic.replies} replies &middot; {topic.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-sbu-black flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sbu-red" />
                Recent Messages
              </h3>
              <Link to="/messages" className="text-xs text-sbu-red hover:text-sbu-bright-red font-medium">View all</Link>
            </div>
            <div className="space-y-3">
              {[
                { name: "Priya Patel", msg: "I'll review your resume before our meeting.", time: "2:30 PM", unread: true },
                { name: "David Kim", msg: "Let's discuss system design next session!", time: "Yesterday", unread: false },
                { name: "Ryan Martinez", msg: "See you Thursday for the mock interview!", time: "Monday", unread: true }
              ].map((m) => (
                <Link to="/messages" key={m.name} className="flex items-start gap-3 group">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name.split(' ')[0]}`}
                    alt={m.name}
                    className="w-8 h-8 rounded-full bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-sbu-black">{m.name}</span>
                      {m.unread && <span className="w-2 h-2 bg-sbu-bright-red rounded-full" />}
                    </div>
                    <p className="text-xs text-sbu-dark-gray truncate">{m.msg}</p>
                  </div>
                  <span className="text-xs text-sbu-medium-gray whitespace-nowrap">{m.time}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify Dashboard renders**

```bash
npm run dev
```

Navigate to `/dashboard`. Should show welcome banner, mentor cards, appointments, sidebar with stats and community topics.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Dashboard.jsx
git commit -m "feat: build student Dashboard with welcome banner, mentors, appointments, and sidebar"
```

---

### Task 9: Explore Mentors Page

**Files:**
- Create: `src/pages/Explore.jsx`

- [ ] **Step 1: Build the complete Explore page**

Replace `src/pages/Explore.jsx`:

```jsx
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import MentorCard from '../components/MentorCard';
import { mentors } from '../data/mentors';

const MAJORS = [
  'Computer Science', 'Biology', 'Psychology', 'Business Management',
  'Electrical Engineering', 'Applied Mathematics', 'Political Science',
  'Chemistry', 'Economics', 'Information Systems'
];
const SUPPORT_TYPES = ['Resume Review', 'Course Help', 'Interview Prep', 'Career Advice'];
const AVAILABILITY = ['Available Now', 'This Week', 'This Month'];
const INDUSTRIES = ['Technology', 'Software Engineering', 'Finance', 'Research / Academia',
  'Mental Health', 'Entrepreneurship', 'Government / Policy', 'Hardware / Embedded Systems'];

export default function Explore() {
  const [search, setSearch] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSupport, setSelectedSupport] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    return mentors.filter((m) => {
      if (search && !m.name.toLowerCase().includes(search.toLowerCase()) &&
          !m.major.toLowerCase().includes(search.toLowerCase()) &&
          !m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
      if (selectedMajor && m.major !== selectedMajor) return false;
      if (selectedIndustry && m.industry !== selectedIndustry) return false;
      if (selectedSupport && !m.tags.includes(selectedSupport)) return false;
      if (selectedAvailability && m.availability !== selectedAvailability) return false;
      return true;
    });
  }, [search, selectedMajor, selectedIndustry, selectedSupport, selectedAvailability]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const clearFilters = () => {
    setSearch('');
    setSelectedMajor('');
    setSelectedIndustry('');
    setSelectedSupport('');
    setSelectedAvailability('');
    setPage(1);
  };

  const hasFilters = selectedMajor || selectedIndustry || selectedSupport || selectedAvailability;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-sbu-black">Explore Mentors</h1>
        <p className="text-sbu-dark-gray mt-1">Find the perfect mentor for your academic and career goals</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sbu-medium-gray" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, major, or expertise..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
            showFilters ? 'bg-sbu-red text-white border-sbu-red' : 'bg-white text-sbu-dark-gray border-gray-300 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        {showFilters && (
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-sbu-black">Filters</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-sbu-red hover:text-sbu-bright-red font-medium flex items-center gap-1">
                    <X className="w-3 h-3" /> Clear all
                  </button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-sbu-dark-gray mb-2 block">Major</label>
                  <select value={selectedMajor} onChange={(e) => { setSelectedMajor(e.target.value); setPage(1); }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red">
                    <option value="">All Majors</option>
                    {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-sbu-dark-gray mb-2 block">Industry</label>
                  <select value={selectedIndustry} onChange={(e) => { setSelectedIndustry(e.target.value); setPage(1); }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red">
                    <option value="">All Industries</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-sbu-dark-gray mb-2 block">Support Type</label>
                  <div className="space-y-2">
                    {SUPPORT_TYPES.map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="support"
                          checked={selectedSupport === type}
                          onChange={() => { setSelectedSupport(selectedSupport === type ? '' : type); setPage(1); }}
                          className="accent-sbu-red"
                        />
                        <span className="text-sm text-sbu-dark-gray">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-sbu-dark-gray mb-2 block">Availability</label>
                  <div className="space-y-2">
                    {AVAILABILITY.map(a => (
                      <label key={a} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="availability"
                          checked={selectedAvailability === a}
                          onChange={() => { setSelectedAvailability(selectedAvailability === a ? '' : a); setPage(1); }}
                          className="accent-sbu-red"
                        />
                        <span className="text-sm text-sbu-dark-gray">{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mentor Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-sbu-dark-gray">
              Showing <span className="font-semibold text-sbu-black">{filtered.length}</span> mentors
            </p>
          </div>

          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginated.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
              <Search className="w-12 h-12 text-sbu-light-gray mx-auto mb-4" />
              <h3 className="font-heading text-lg font-bold text-sbu-black mb-2">No mentors found</h3>
              <p className="text-sbu-dark-gray text-sm">Try adjusting your filters or search terms.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    page === p
                      ? 'bg-sbu-red text-white'
                      : 'bg-white text-sbu-dark-gray border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify Explore page**

Navigate to `/explore`. Should see search, filters, mentor grid, pagination.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Explore.jsx
git commit -m "feat: build Explore Mentors page with search, filters, and pagination"
```

---

### Task 10: Mentor Profile Page

**Files:**
- Create: `src/pages/MentorProfile.jsx`

- [ ] **Step 1: Build the complete Mentor Profile page**

Replace `src/pages/MentorProfile.jsx`:

```jsx
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Star, Clock, MapPin, Calendar,
  MessageSquare, Video, Award
} from 'lucide-react';
import { mentors } from '../data/mentors';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function MentorProfile() {
  const { id } = useParams();
  const mentor = mentors.find(m => m.id === Number(id));

  if (!mentor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-sbu-black mb-4">Mentor Not Found</h1>
        <Link to="/explore" className="text-sbu-red hover:text-sbu-bright-red font-medium">
          &larr; Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm text-sbu-dark-gray hover:text-sbu-red mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-5">
              <img src={mentor.avatar} alt={mentor.name} className="w-20 h-20 rounded-full bg-gray-100" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-heading text-2xl font-bold text-sbu-black">{mentor.name}</h1>
                    <p className="text-sbu-dark-gray">{mentor.role} &middot; {mentor.major}</p>
                    <p className="text-sm text-sbu-medium-gray">{mentor.year}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    mentor.availability === 'Available Now'
                      ? 'bg-green-100 text-green-700'
                      : mentor.availability === 'This Week'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {mentor.availability}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-amber-600">
                    <Star className="w-4 h-4 fill-current" /> {mentor.rating}
                  </span>
                  <span className="flex items-center gap-1 text-sbu-dark-gray text-sm">
                    <Clock className="w-4 h-4" /> {mentor.sessions} sessions
                  </span>
                  <span className="flex items-center gap-1 text-sbu-dark-gray text-sm">
                    <MapPin className="w-4 h-4" /> Stony Brook, NY
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black mb-3">About</h2>
            <p className="text-sbu-dark-gray leading-relaxed">{mentor.bio}</p>
          </div>

          {/* Expertise */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-sbu-red" /> Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-sbu-red/10 text-sbu-red text-sm font-medium rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Availability Calendar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sbu-red" /> Weekly Availability
            </h2>
            <div className="grid grid-cols-5 gap-2">
              {DAYS.map(day => (
                <div key={day}>
                  <div className="text-center text-xs font-semibold text-sbu-dark-gray mb-2 pb-2 border-b border-gray-100">
                    {day}
                  </div>
                  <div className="space-y-1.5">
                    {(mentor.weeklySchedule[day] || []).length > 0 ? (
                      mentor.weeklySchedule[day].map(time => (
                        <div
                          key={time}
                          className="text-center text-xs bg-green-50 text-green-700 rounded-md py-1.5 px-1 font-medium border border-green-200 cursor-pointer hover:bg-green-100 transition-colors"
                        >
                          {time}
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-xs text-sbu-light-gray py-1.5">—</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-lg font-bold text-sbu-black mb-4">
              Reviews ({mentor.reviews.length})
            </h2>
            <div className="space-y-4">
              {mentor.reviews.map((review, i) => (
                <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sbu-black text-sm">{review.name}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, j) => (
                          <Star
                            key={j}
                            className={`w-3.5 h-3.5 ${j < review.rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-sbu-medium-gray">{review.date}</span>
                  </div>
                  <p className="text-sm text-sbu-dark-gray">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-heading font-bold text-sbu-black mb-4">Connect with {mentor.name.split(' ')[0]}</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-sbu-red text-white py-3 rounded-lg font-semibold hover:bg-sbu-bright-red transition-colors">
                <Video className="w-4 h-4" /> Request Meeting
              </button>
              <Link
                to="/messages"
                className="w-full flex items-center justify-center gap-2 bg-white text-sbu-red py-3 rounded-lg font-semibold border-2 border-sbu-red hover:bg-sbu-red/5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Send Message
              </Link>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sbu-dark-gray">Industry</span>
                <span className="font-medium text-sbu-black">{mentor.industry}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sbu-dark-gray">Response Time</span>
                <span className="font-medium text-sbu-black">~2 hours</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sbu-dark-gray">Meeting Format</span>
                <span className="font-medium text-sbu-black">Virtual / In-Person</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify Mentor Profile page**

Navigate to `/mentor/1`. Should show full profile with header, about, expertise, calendar, reviews, and actions.

- [ ] **Step 3: Commit**

```bash
git add src/pages/MentorProfile.jsx
git commit -m "feat: build Mentor Profile page with details, calendar, reviews, and actions"
```

---

### Task 11: Messages Page

**Files:**
- Create: `src/pages/Messages.jsx`

- [ ] **Step 1: Build the complete Messages page**

Replace `src/pages/Messages.jsx`:

```jsx
import { useState } from 'react';
import { Send, Search, Calendar, Video, MoreVertical } from 'lucide-react';
import { conversations } from '../data/messages';

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState({});

  const getMessages = (convo) => {
    return [...convo.messages, ...(localMessages[convo.id] || [])];
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: "Sarah Chen",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      isMe: true
    };
    setLocalMessages(prev => ({
      ...prev,
      [activeConvo.id]: [...(prev[activeConvo.id] || []), msg]
    }));
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-3xl font-bold text-sbu-black mb-6">Messages</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex h-[600px] overflow-hidden">
        {/* Conversation List */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sbu-medium-gray" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:ring-2 focus:ring-sbu-red/20 focus:bg-white border border-transparent focus:border-sbu-red"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(convo => (
              <div
                key={convo.id}
                onClick={() => setActiveConvo(convo)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                  activeConvo.id === convo.id ? 'bg-sbu-red/5 border-l-3 border-sbu-red' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <img src={convo.participant.avatar} alt={convo.participant.name} className="w-10 h-10 rounded-full bg-gray-100" />
                  {convo.participant.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-sbu-black truncate">{convo.participant.name}</span>
                    <span className="text-xs text-sbu-medium-gray">{convo.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-sbu-dark-gray truncate">{convo.lastMessage}</p>
                    {convo.unread > 0 && (
                      <span className="ml-2 w-5 h-5 bg-sbu-bright-red text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img src={activeConvo.participant.avatar} alt="" className="w-9 h-9 rounded-full bg-gray-100" />
              <div>
                <h3 className="font-semibold text-sbu-black text-sm">{activeConvo.participant.name}</h3>
                <p className="text-xs text-sbu-medium-gray">
                  {activeConvo.participant.role} {activeConvo.participant.online ? '· Online' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Schedule Meeting">
                <Calendar className="w-4 h-4 text-sbu-dark-gray" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Video Call">
                <Video className="w-4 h-4 text-sbu-dark-gray" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-sbu-dark-gray" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {getMessages(activeConvo).map(msg => (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.isMe ? 'order-2' : ''}`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isMe
                      ? 'bg-sbu-red text-white rounded-br-md'
                      : 'bg-gray-100 text-sbu-black rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-xs text-sbu-medium-gray mt-1 ${msg.isMe ? 'text-right' : ''}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              />
              <button
                onClick={handleSend}
                className="bg-sbu-red text-white p-2.5 rounded-xl hover:bg-sbu-bright-red transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify Messages page**

Navigate to `/messages`. Should show conversation list with chat window.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Messages.jsx
git commit -m "feat: build Messages page with conversation list and chat window"
```

---

### Task 12: My Profile Page

**Files:**
- Create: `src/pages/Profile.jsx`

- [ ] **Step 1: Build the complete Profile page**

Replace `src/pages/Profile.jsx`:

```jsx
import { useState } from 'react';
import { User, BookOpen, Target, Settings, Save, Camera } from 'lucide-react';
import { currentUser } from '../data/mentors';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    major: currentUser.major,
    year: currentUser.year,
    bio: currentUser.bio,
    goals: currentUser.goals,
    tags: currentUser.tags,
    prefMajor: currentUser.preferences.major,
    prefIndustry: currentUser.preferences.industry,
    prefFormat: currentUser.preferences.format,
  });
  const [saved, setSaved] = useState(false);

  const update = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const allTags = ['Course Planning', 'Internship Prep', 'Research', 'Resume Writing',
    'Interview Prep', 'Career Advice', 'Switching Majors', 'Graduate School',
    'Networking', 'Study Groups', 'Leadership', 'Entrepreneurship'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold text-sbu-black">My Profile</h1>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-sbu-red text-white hover:bg-sbu-bright-red'
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-5 flex items-center gap-2">
            <User className="w-5 h-5 text-sbu-red" /> Personal Information
          </h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <img src={currentUser.avatar} alt="" className="w-20 h-20 rounded-full bg-gray-100" />
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-sbu-red text-white rounded-full flex items-center justify-center shadow-md hover:bg-sbu-bright-red">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-sbu-black">{profile.name}</h3>
              <p className="text-sm text-sbu-dark-gray">SBU ID: {currentUser.sbuId}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-sbu-medium-gray"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Major</label>
              <input
                type="text"
                value={profile.major}
                onChange={(e) => update('major', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Year</label>
              <select
                value={profile.year}
                onChange={(e) => update('year', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              >
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Graduate</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => update('bio', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red resize-none"
            />
          </div>
        </section>

        {/* Academic Goals */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-5 flex items-center gap-2">
            <Target className="w-5 h-5 text-sbu-red" /> Academic & Career Goals
          </h2>
          <div className="space-y-3">
            {profile.goals.map((goal, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-sbu-red/10 text-sbu-red rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => {
                    const newGoals = [...profile.goals];
                    newGoals[i] = e.target.value;
                    update('goals', newGoals);
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Interests */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sbu-red" /> Skills & Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  const newTags = profile.tags.includes(tag)
                    ? profile.tags.filter(t => t !== tag)
                    : [...profile.tags, tag];
                  update('tags', newTags);
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  profile.tags.includes(tag)
                    ? 'bg-sbu-red text-white'
                    : 'bg-gray-100 text-sbu-dark-gray hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Mentor Preferences */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-heading text-lg font-bold text-sbu-black mb-5 flex items-center gap-2">
            <Settings className="w-5 h-5 text-sbu-red" /> Mentor Preferences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Preferred Major</label>
              <select
                value={profile.prefMajor}
                onChange={(e) => update('prefMajor', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              >
                <option>Computer Science</option>
                <option>Biology</option>
                <option>Psychology</option>
                <option>Business Management</option>
                <option>Electrical Engineering</option>
                <option>Information Systems</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Preferred Industry</label>
              <select
                value={profile.prefIndustry}
                onChange={(e) => update('prefIndustry', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              >
                <option>Technology</option>
                <option>Finance</option>
                <option>Research / Academia</option>
                <option>Healthcare</option>
                <option>Government / Policy</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-sbu-dark-gray mb-1.5 block">Meeting Format</label>
              <select
                value={profile.prefFormat}
                onChange={(e) => update('prefFormat', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              >
                <option>Virtual</option>
                <option>In-Person</option>
                <option>Either</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify Profile page**

Navigate to `/profile`. Should show editable form with personal info, goals, tags, and preferences.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Profile.jsx
git commit -m "feat: build Profile page with editable personal info, goals, tags, and preferences"
```

---

## Final Verification

- [ ] **All routes work:** `/`, `/dashboard`, `/explore`, `/mentor/1`, `/messages`, `/profile`, `/admin`
- [ ] **Navbar navigation works** on all non-landing pages
- [ ] **SBU brand colors** are consistent across all pages
- [ ] **Responsive layout** works at desktop and tablet widths
- [ ] **Admin Dashboard charts** render correctly with all data
