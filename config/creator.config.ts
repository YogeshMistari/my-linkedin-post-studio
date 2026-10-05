/**
 * ================================================================
 * EDIT THIS FILE TO PERSONALIZE THE ENTIRE APP FOR A NEW CREATOR.
 * ================================================================
 *
 * Keep only facts you are comfortable publishing publicly.
 * Do not put passwords, access tokens, private client information,
 * compensation, family details, or confidential project data here.
 */
export const creatorConfig = {
  app: {
    name: "Post Studio",
    brandInitial: "DWA",
    tagline: "Create authentic content. Build trust. Grow professionally.",
    logoPath: "/brand/data-with-anurag-logo.png",
    logoAlt: "Data With Anurag Logo",
    initiativeBy: "Anurag Srivastava",
    initiativeRole: "Founder, Data With Anurag",
  },

  creator: {
    name: "Anurag Srivastava",

    positioning: {
      primaryIdentity:
        "Lead Data Engineer, Data Engineering Mentor and Content Creator",
      experience: "5+ years in Data Engineering",
      currentAngle:
        "Hands-on engineer who teaches Data Engineering from practical project and interview experience",
    },

    targetAudience: [
      "Data Engineers",
      "Aspiring Data Engineers",
      "Freshers",
      "Career switchers",
      "Working professionals preparing for Data Engineering interviews",
    ],

    coreExpertise: [
      "Databricks",
      "Apache Spark",
      "PySpark",
      "SQL",
      "Python",
      "Snowflake",
      "BigQuery",
      "Azure data platforms",
      "AWS data platforms",
      "GCP data platforms",
      "ETL and ELT pipelines",
      "data warehousing",
      "data modelling",
      "cloud and data-platform migrations",
      "production data pipelines",
      "pipeline reliability",
      "performance and cost optimization",
      "Unity Catalog",
      "MLflow",
      "Airflow and orchestration",
      "data validation and data quality",
      "AI and Data Engineering",
      "RAG, embeddings and vector-search fundamentals",
    ],

    publicCredentials: [
      "Databricks Certified Professional Data Engineer",
      "Google Professional Data Engineer",
    ],

    approvedExperiences: [
      "Has led and contributed to end-to-end cloud and Databricks migration work",
      "Has worked across Azure, AWS and GCP data platforms",
      "Has built, migrated, validated and optimized production data pipelines",
      "Has worked on Spark and Databricks performance optimization",
      "Has practical experience with Unity Catalog and MLflow migration work",
      "Has handled stakeholder discussions and translated business requirements into engineering work",
      "Has guided other engineers and worked with teams on delivery",
      "Progressed into a Lead Data Engineer role after 5+ years in the domain",
      "Mentors freshers, career switchers and working professionals preparing for Data Engineering roles",
      "Creates practical Data Engineering roadmaps, interview preparation and career guidance content",
      "Has spoken at technical community events including Microsoft Bengaluru",
      "Builds and teaches through the DataX Data Engineering learning community/bootcamp",
      "Creates long-form and short-form educational content for a large Data Engineering audience",
    ],

    creatorIdentity: {
      brand: "Data With Anurag",
      youtube: "Be a Programmer",
      teachingFocus:
        "Make Data Engineering, interviews and career decisions easier to understand through practical examples",
    },

    voice: {
      principles: [
        "Practical over theoretical",
        "Experience-backed over generic advice",
        "Simple everyday English",
        "Explain things the way an engineer would explain them to another engineer",
        "Use concrete examples when they improve the point",
        "Confident but not arrogant",
        "Opinionated when experience supports the opinion",
        "Realistic rather than manufactured controversy",
        "Helpful mentor tone without sounding preachy",
        "Prefer short, scan-friendly LinkedIn writing over essay-style paragraphs",
      ],

      avoid: [
        "Thrilled to announce",
        "Game changer",
        "In today's fast-paced world",
        "Unlock the power of",
        "Let's dive in",
        "Here's the thing",
        "The key takeaway",
        "At the end of the day",
        "Whether you are a beginner or an experienced professional",
        "It is not about X, it is about Y",
        "Excessive emojis",
        "Hashtag stuffing",
        "Fake personal stories",
        "Invented metrics",
        "Invented client names",
        "Generic motivational endings",
        "Corporate copywriting tone",
        "Overly polished AI language",
      ],
    },
  },

  contentStrategy: {
    northStar:
      "Build professional trust and authenticity first, then convert that trust into relevant follower growth.",

    requiredHashtags: [
      "#DataXMentor",
      "#DataWithAnurag",
    ],

    topicLibrary: [
      {
        id: "de-roadmap",
        category: "Career",
        topic: "If I had to start Data Engineering again, this is the roadmap I would follow",
        angles: [
          "Keep it practical: SQL → Python → data modelling → Spark → one cloud. Explain why this order matters.",
          "Focus on what beginners waste time learning and what they should prioritize instead.",
          "Frame it as a 90-day roadmap for someone trying to become job-ready.",
        ],
      },
      {
        id: "lead-de-lessons",
        category: "Career",
        topic: "What helped me grow into a Lead Data Engineer in 5+ years",
        angles: [
          "Talk about ownership, understanding business context, communication and visibility, not only technical skills.",
          "Share the difference between being a good coder and being trusted with delivery.",
          "Keep it as 5 practical lessons I wish I understood earlier.",
        ],
      },
      {
        id: "certifications",
        category: "Career",
        topic: "Are Data Engineering certifications actually worth it?",
        angles: [
          "Take a balanced view: certifications help visibility, but they cannot replace practical depth.",
          "Explain when certifications are useful and when they become certificate collecting.",
          "Compare one strong project plus one relevant certification versus many certificates with weak fundamentals.",
        ],
      },
      {
        id: "switch-plan",
        category: "Career",
        topic: "How I would prepare for a Data Engineering job switch in the next 60 days",
        angles: [
          "Break it into fundamentals, projects, interview scenarios, resume and targeted applications.",
          "Focus on experienced professionals who already know tools but need interview readiness.",
          "Make it a weekly checklist that people can save.",
        ],
      },
      {
        id: "resume-ats",
        category: "Career",
        topic: "Stop optimizing your Data Engineering resume only for an ATS score",
        angles: [
          "Explain why clear impact, numbers and believable project depth matter more than a random ATS percentage.",
          "Give a short checklist for an ATS-friendly but human-readable resume.",
          "Call out common mistakes: tool dumping, vague bullets and responsibilities without outcomes.",
        ],
      },
      {
        id: "databricks-interview",
        category: "Databricks",
        topic: "Databricks interview questions that actually test a Data Engineer",
        angles: [
          "Use scenario-based questions around Delta Lake, Jobs, Unity Catalog and performance.",
          "Explain what a strong candidate should think about instead of giving only definitions.",
          "Frame it as 5 questions I would ask in a real Data Engineering interview.",
        ],
      },
      {
        id: "databricks-production",
        category: "Databricks",
        topic: "What changes when a Databricks pipeline moves from demo to production",
        angles: [
          "Cover retries, observability, bad data, idempotency, costs and ownership.",
          "Contrast a notebook that works once with a pipeline that can be trusted every day.",
          "Use a checklist format that working Data Engineers can save.",
        ],
      },
      {
        id: "spark-performance",
        category: "Spark",
        topic: "More compute is not the first answer to every slow Spark job",
        angles: [
          "Talk about skew, shuffles, joins, partitions and reading the execution plan before scaling compute.",
          "Use a simple before/after troubleshooting sequence.",
          "Frame it as a performance mistake I see engineers make too quickly.",
        ],
      },
      {
        id: "happy-path",
        category: "Pipelines",
        topic: "A pipeline that works only for the happy path is not production-ready",
        angles: [
          "Use examples like late data, duplicates, schema changes, partial failures and retries.",
          "Give 5 questions to ask before calling a pipeline production-ready.",
          "Make the hook about why a green job status does not always mean correct data.",
        ],
      },
      {
        id: "late-data",
        category: "Pipelines",
        topic: "How I think about late-arriving data in real pipelines",
        angles: [
          "Explain event time versus processing time in simple English with one small example.",
          "Cover watermarking, backfills and idempotent processing without making it too theoretical.",
          "Frame it as an interview scenario plus the production answer.",
        ],
      },
      {
        id: "sql-depth",
        category: "Fundamentals",
        topic: "The SQL skills a Data Engineer should be genuinely strong at",
        angles: [
          "Focus on joins, window functions, aggregations, CTEs, debugging and performance thinking.",
          "Explain why memorizing syntax is less useful than reasoning about data.",
          "Make it a practical checklist for interview preparation.",
        ],
      },
      {
        id: "data-modelling",
        category: "Fundamentals",
        topic: "Data modelling is one of the most underrated Data Engineering skills",
        angles: [
          "Explain why good pipelines can still produce hard-to-use data if the model is poor.",
          "Use simple examples around grain, facts, dimensions and business questions.",
          "Frame it as what interviewers expect beyond definitions.",
        ],
      },
      {
        id: "ai-data-engineering",
        category: "AI + DE",
        topic: "AI will not remove the need for strong Data Engineers, but it will raise the expectations",
        angles: [
          "Explain which work AI can accelerate and which fundamentals still need engineering judgement.",
          "Focus on how Data Engineers should adapt their learning strategy.",
          "Keep it practical and avoid generic AI hype.",
        ],
      },
    ],

    growthPrinciples: [
      "Virality is an outcome, not a promise. Never sacrifice credibility for clicks.",
      "Every post should give the reader a reason to trust the creator more.",
      "Every post should contain at least one useful insight, framework, example, opinion, or lesson worth remembering.",
      "Optimize for saves, shares, thoughtful comments and follow intent instead of empty impressions.",
      "Use strong hooks, but never fake controversy, urgency, fear, results, or personal stories.",
      "Use relevant proof naturally: hands-on experience, credentials, examples, trade-offs or transparent limitations.",
      "Make the reader feel they learned something from a practitioner, not from generic internet content.",
      "Do not promote a product in every post. Repeated value builds more trust than repeated selling.",
    ],

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
      "Direct opinion",
      "Experience-backed observation",
      "Specific pain point",
      "Useful warning",
      "Contrarian-but-defensible professional view",
      "Clear promise of a practical framework or checklist",
      "Problem-first technical observation",
    ],

    formatting: {
      linkedin: [
        "Write for LinkedIn feed consumption, not like a blog article.",
        "Start with a strong hook in the first 1-2 lines.",
        "Keep most paragraphs to 1-2 sentences.",
        "Use bullets or short point-style sections whenever they improve scanning.",
        "Prefer 3-6 useful points over long paragraphs.",
        "For roadmaps, checklists, mistakes and interview posts, default to point-style formatting.",
        "Keep a normal post around 140-280 words unless the topic genuinely needs more depth.",
        "Use whitespace deliberately.",
        "Always include the configured required brand hashtags at the end of every post.",
        "Do not add extra hashtags unless they are highly relevant.",
        "Use 1-3 relevant emojis maximum when they improve scanning or emphasis. Do not decorate every line.",
        "Never use Markdown bold/italic markers such as **, *, __, _, or backticks in post text.",
        "Use plain text headings or simple bullets like • instead of Markdown formatting.",
      ],
      x: [
        "Write independently for X instead of shortening LinkedIn.",
        "Lead with the strongest idea immediately.",
        "Keep one clear opinion or insight per post.",
        "Prefer a single post when possible.",
        "Use a short thread only when the idea genuinely needs it.",
        "No LinkedIn-style motivational conclusion.",
        "Make the post quotable, useful or discussion-worthy without engagement bait.",
        "Always include the configured required brand hashtags and keep the full post within the platform character limit when possible.",
      ],
    },

    contentModes: {
      defaultEducational: {
        tone:
          "Simple, practical, experienced, concise and easy to scan.",
        cta:
          "Usually end with one useful takeaway. Ask a question only when it genuinely improves the discussion.",
      },

      careerOpinion: {
        tone:
          "Direct and realistic. Take a position when experience supports it.",
        cta: "Do not force engagement bait.",
      },

      technicalBreakdown: {
        tone:
          "Open with the technical pain point, then break the explanation into short practical points.",
        cta: "Usually none.",
      },

      resourcePromotion: {
        tone:
          "More energetic and action-oriented than normal posts, but still human and credible.",
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

    generationRules: [
      "Do not insert achievements just because they are available.",
      "Use only creator facts relevant to the topic.",
      "Do not invent a result, number, employer, client or story.",
      "If current user notes conflict with this configuration, follow the current user notes.",
      "Do not automatically turn every post into promotion.",
      "Do not automatically add a comment-keyword CTA.",
      "Do not make every post motivational.",
      "Keep technical claims practical and defensible.",
      "Prefer trust and usefulness over forced virality.",
    ],
  },
} as const;
