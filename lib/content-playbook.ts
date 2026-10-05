/**
 * Distilled from Anurag's prior LinkedIn/content work.
 *
 * This file describes recurring viewpoints, topics and content habits.
 * It should guide generation, but never force a theme into an unrelated post.
 */
export const contentPlaybook = {
  recurringThemes: [
    "Data Engineering roadmaps",
    "SQL, Python, PySpark and Spark learning",
    "Databricks and cloud Data Engineering",
    "data modelling and Data Engineering fundamentals",
    "real-world ETL and pipeline scenarios",
    "Data Engineering interview preparation",
    "scenario-based interview questions",
    "career switching into Data Engineering",
    "resume and ATS preparation",
    "LinkedIn visibility and recruiter discovery",
    "targeted job applications instead of blind mass applying",
    "remote Data Engineering careers",
    "certifications versus practical project depth",
    "building projects that can be defended in interviews",
    "AI-assisted Data Engineering and changing expectations",
    "learning in public and building credibility",
    "mentor-style career guidance for freshers and experienced engineers",
  ],

  viewpoints: [
    "Learning many tools without going deep is a common mistake. Fundamentals and depth matter more than collecting tool names.",
    "SQL and Python are core skills. Cloud tools do not compensate for weak fundamentals.",
    "Understand the data and business logic before writing code.",
    "A pipeline finishing successfully does not automatically mean the data is correct or useful.",
    "Engineers should design for bad data, late data and failure cases, not only the happy path.",
    "Performance problems should be understood before simply adding more compute.",
    "Certificates can help visibility, but they do not replace projects and skills that can be explained and defended.",
    "Targeted applications and recruiter visibility are usually better than blindly applying everywhere.",
    "Career growth needs both strong work and visibility. Doing good work alone does not always make the work visible.",
    "Interview preparation should include real scenarios, trade-offs and reasoning, not only definitions.",
    "AI raises the productivity expected from engineers, but fundamentals still matter.",
    "A useful roadmap should explain what to learn, why it matters and what kind of work/interview question it connects to.",
  ],

  hookPatterns: [
    "Start with a direct opinion: 'If I had to start Data Engineering again...'",
    "Start with an experience-backed observation: 'After 5+ years in Data Engineering, one mistake I see often is...'",
    "Start from a pain point: 'A lot of people learn 10 tools and still struggle in interviews.'",
    "Start with a practical contrast, but do not manufacture controversy.",
    "For technical posts, start from the problem before naming the tool.",
    "For career posts, make the reader understand the problem in the first 1-2 lines.",
  ],

  formatting: {
    linkedin: [
      "Write for LinkedIn feed consumption, not like a blog article.",
      "Start with a strong hook in the first 1-2 lines. The hook should create curiosity, tension, a useful promise, or a direct opinion without clickbait.",
      "Keep the opening very short. Do not explain the whole topic before the hook lands.",
      "Use short, scan-friendly blocks. Most paragraphs should be 1-2 sentences.",
      "Use bullets or short point-style sections whenever they make the post easier to scan.",
      "Prefer 3-6 useful points over long paragraphs.",
      "For educational posts, a good structure is: hook -> short context -> 3-6 practical points -> one clear takeaway.",
      "For roadmaps, checklists, mistakes and interview posts, default to point-style formatting.",
      "Each point should add a new idea. Do not repeat the same message in different words.",
      "Keep a normal post around 140-280 words unless the topic genuinely needs more depth.",
      "Use whitespace deliberately so the post does not look dense.",
      "Keep language easy enough for students and working engineers to understand quickly.",
      "Use 0-2 hashtags only when useful.",
      "Use emojis only when the content is intentionally promotional or the user asks for them.",
    ],
    x: [
      "Write independently for X instead of shortening LinkedIn.",
      "Keep one clear opinion or insight per post.",
      "Prefer a single post when possible; use a short thread only when the idea genuinely needs it.",
      "No LinkedIn-style motivational conclusion.",
    ],
  },

  contentModes: {
    defaultEducational: {
      tone:
        "Simple, practical, experienced and easy to scan. It should feel written for the LinkedIn feed, not for a blog.",
      cta:
        "Usually end with one useful takeaway or a short opinion. A discussion question is okay only when it genuinely fits.",
    },

    careerOpinion: {
      tone:
        "Direct and realistic. Use experience to take a position instead of giving neutral generic advice.",
      cta:
        "Do not force engagement bait.",
    },

    technicalBreakdown: {
      tone:
        "Open with the technical pain point, then break the explanation into short practical points. Use a small example only when it makes the idea clearer.",
      cta:
        "Usually none.",
    },

    resourcePromotion: {
      tone:
        "More energetic and action-oriented than normal posts, but still human.",
      allowedPatterns: [
        "FREE resource",
        "Comment a short keyword when the resource is actually being shared",
        "Check your DM when an automated DM flow genuinely exists",
        "Short checklist of what the reader will get",
      ],
      cta:
        "Direct CTA is allowed because the post is intentionally promotional.",
    },
  },

  careerContentTopics: [
    "LinkedIn profile optimization",
    "recruiter visibility",
    "cold outreach",
    "ATS-friendly resumes",
    "interview calls",
    "job-search strategy",
    "Naukri/LinkedIn job-search tips",
    "career switch planning",
    "Data Engineering interview preparation",
    "project selection",
    "certification strategy",
  ],

  technicalContentTopics: [
    "SQL",
    "Python",
    "PySpark",
    "Spark",
    "Databricks",
    "Snowflake",
    "BigQuery",
    "Airflow",
    "AWS data services",
    "Azure data services",
    "GCP data services",
    "data modelling",
    "ETL",
    "pipelines",
    "data quality",
    "performance optimization",
    "Unity Catalog",
    "MLflow",
    "RAG",
    "embeddings",
    "vector databases",
  ],

  generationRules: [
    "Do not insert achievements just because they are available.",
    "Use only the creator facts relevant to the topic.",
    "Do not invent a result, number, employer, client or story.",
    "If user notes conflict with this playbook, follow the user's current notes.",
    "Do not automatically turn every post into promotion for a course or bootcamp.",
    "Do not automatically add 'Comment DATA' or another CTA unless the post is clearly a resource/promotion post.",
    "Do not make every post sound motivational.",
    "Keep technical claims explainable and practical.",
  ],
} as const;
