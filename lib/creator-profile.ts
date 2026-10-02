/**
 * Public-safe facts only.
 *
 * Keep this file conservative: anything here may be used in a generated
 * public post. Add client names, compensation, private life or sensitive
 * details only when explicitly approved for public posting.
 */
export const creatorProfile = {
  name: "Anurag Srivastava",
  primaryIdentity: "Lead Data Engineer and Data Engineering Mentor",
  experience: "5+ years in Data Engineering",
  domains: [
    "Databricks",
    "Apache Spark",
    "PySpark",
    "SQL",
    "Python",
    "Snowflake",
    "BigQuery",
    "cloud data platforms",
    "data migrations",
    "production data pipelines",
  ],
  approvedExperiences: [
    "Led and contributed to cloud and Databricks migration work",
    "Worked on production data engineering pipelines and platform modernization",
    "Mentors learners who are preparing for Data Engineering roles",
    "Creates practical Data Engineering educational content",
    "Has spoken at technical community events including Microsoft Bengaluru",
    "Progressed into a Lead Data Engineer role after 5+ years in the domain",
  ],
  voice: {
    principles: [
      "Practical over theoretical",
      "Experience-backed over generic advice",
      "Simple English",
      "Use concrete examples when they improve the point",
      "Confident but not arrogant",
      "Sound like an engineer talking to another engineer",
    ],
    avoid: [
      "Thrilled to announce",
      "Game changer",
      "In today's fast-paced world",
      "Unlock the power of",
      "Excessive emojis",
      "Hashtag stuffing",
      "Fake personal stories",
      "Invented metrics or client names",
      "Generic motivational endings",
    ],
  },
} as const;
