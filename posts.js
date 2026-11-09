/* =========================================================
   YOUR BLOG SETTINGS  —  edit these first
   ========================================================= */
const BLOG = {
  title: "488 Hours",
  subtitle: "A weekly journal of my on-the-job training",
  author: "Your Name",            // ← your name
  role: "OJT Trainee",            // ← your role / program
  company: "Company Name",        // ← where you're training
  startDate: "2026-11-09",        // ← Monday of Week 1 (YYYY-MM-DD)
  requiredHours: 488,
  hoursPerWeek: 40,               // 8 hrs/day × 5 days → 13 weeks total
};

/* =========================================================
   WEEKLY POSTS
   ---------------------------------------------------------
   To add a new week, copy one { ... } block below, paste it
   at the end of the list, change the week number, and fill
   it in. Weeks you haven't written yet show as "Upcoming".

   Fields:
     week        number of the week (1, 2, 3 ...)
     hours       hours you rendered that week
     title       short headline for the week
     summary     1–2 sentence overview (shown on the card)
     tasks       list of what you did
     learnings   list of what you learned
     challenges  list of difficulties + how you handled them
     reflection  a closing paragraph
     photos      optional: ["images/week1-a.jpg", ...]
   ========================================================= */
const POSTS = [
  {
    week: 1,
    hours: 40,
    title: "First Week: Orientation & Getting Settled",
    summary:
      "Met the team, learned how the office runs, and set up everything I need for the weeks ahead.",
    tasks: [
      "Attended the company orientation and reviewed policies",
      "Got introduced to my supervisor and teammates",
      "Set up my workstation, accounts, and tools",
      "Observed the team's daily workflow and meetings",
    ],
    learnings: [
      "How the company is organized and who to approach for what",
      "The tools and systems the team uses every day",
      "The importance of asking questions early",
    ],
    challenges: [
      "Adjusting to the daily schedule — solved by preparing the night before",
      "Remembering everyone's names and roles — kept a small notebook",
    ],
    reflection:
      "The first week was mostly about adjusting and observing. I'm excited to start taking on real tasks next week and to keep track of my growth here every Friday.",
    photos: [],
  },

  // {
  //   week: 2,
  //   hours: 40,
  //   title: "",
  //   summary: "",
  //   tasks: [],
  //   learnings: [],
  //   challenges: [],
  //   reflection: "",
  //   photos: [],
  // },
];
