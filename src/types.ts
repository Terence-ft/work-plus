export type CategoryId = "strength" | "cardio" | "stretch" | "yoga" | "hiit" | "mobility" | "lifestyle";

export type Step = {
  title: string;
  cue: string;
};

export type Session = {
  id: string;
  title: string;
  category: CategoryId;
  difficulty: string;
  duration: string;
  equipment: string;
  prescription: string;
  featured: boolean;
  summary: string;
  purpose: string;
  setup: string;
  steps: Step[];
  mistakes: string[];
  easier: string;
};

export type Category = {
  id: Exclude<CategoryId, "lifestyle">;
  label: string;
  blurb: string;
};
