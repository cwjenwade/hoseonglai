import type { ContentGovernanceFields } from "@/lib/content-governance";

export type ResearchScheduling = ContentGovernanceFields & {
  projectId: string;
  projectTitleZh: string;
  projectTitleEn: string;
  schedulingPrompt: string;
  selectionNote: string;
  allowMultiple: boolean;
  availabilitySlots: string[];
};

export const DEFAULT_RESEARCH_SCHEDULING: ResearchScheduling[] = [];
