export type ContentGovernanceFields = {
  isPublished?: boolean;
  displayOrder?: number;
  updatedAt?: string;
  internalNote?: string;
};

export type NormalizedContentGovernance = {
  isPublished: boolean;
  displayOrder: number;
  updatedAt: string;
  internalNote: string;
};

export function normalizeContentGovernance(
  value: ContentGovernanceFields | null | undefined,
  fallbackOrder = 0,
): NormalizedContentGovernance {
  const rawDisplayOrder = Number(value?.displayOrder);

  return {
    isPublished: value?.isPublished !== false,
    displayOrder: Number.isFinite(rawDisplayOrder) ? rawDisplayOrder : fallbackOrder,
    updatedAt: String(value?.updatedAt || "").trim(),
    internalNote: String(value?.internalNote || "").trim(),
  };
}

export function stripUpdatedAt<T extends ContentGovernanceFields>(value: T): Omit<T, "updatedAt"> {
  const rest = { ...value };
  delete (rest as Partial<T>).updatedAt;
  return rest as Omit<T, "updatedAt">;
}

export function sortByDisplayOrder<T extends ContentGovernanceFields>(
  items: T[],
): T[] {
  return [...items].sort((left, right) => {
    const leftOrder = Number(left.displayOrder);
    const rightOrder = Number(right.displayOrder);
    const normalizedLeft = Number.isFinite(leftOrder) ? leftOrder : Number.MAX_SAFE_INTEGER;
    const normalizedRight = Number.isFinite(rightOrder) ? rightOrder : Number.MAX_SAFE_INTEGER;

    if (normalizedLeft !== normalizedRight) {
      return normalizedLeft - normalizedRight;
    }

    return 0;
  });
}

export function formatAdminTimestamp(value?: string): string {
  const raw = String(value || "").trim();
  if (!raw) return "未記錄";

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;

  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Taipei",
  }).format(date);
}
