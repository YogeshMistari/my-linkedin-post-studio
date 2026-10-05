/**
 * Public-safe facts only.
 *
 * Anything in this file may be used in a public LinkedIn/X post.
 * Keep confidential client names, compensation, private family details,
 * secrets and unapproved claims out of this profile.
 */
export const creatorProfile = {
  name: "Anurag Srivastava",

  positioning: {
    primaryIdentity: "Lead Data Engineer, Data Engineering Mentor and Content Creator",
    experience: "5+ years in Data Engineering",
    currentAngle:
      "Hands-on engineer who teaches Data Engineering from practical project and interview experience",
  },

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
} as const;
