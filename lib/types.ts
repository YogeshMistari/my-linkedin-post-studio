export type Platform = "linkedin" | "x";
export type GenerationMode = Platform | "both";
export type ContentGoal =
  | "trust-growth"
  | "authority"
  | "engagement"
  | "education";

export type GeneratedContent = {
  linkedin: string;
  x: string;
  imageConcept: string;
  contextUsed: string[];
};

export type ApprovalState = {
  linkedin: boolean;
  x: boolean;
};
