export type Platform = "linkedin" | "x";
export type GenerationMode = Platform | "both";

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
