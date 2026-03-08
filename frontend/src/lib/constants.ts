export enum CategoryType {
  RANDOM_THOUGHTS = "Random Thoughts",
  SCHOOL = "School",
  PERSONAL = "Personal",
  DRAMA = "Drama",
}

export const CATEGORY_COLORS: Record<string, string> = {
  [CategoryType.RANDOM_THOUGHTS]: "#EF9C66",
  [CategoryType.SCHOOL]: "#FCDC94",
  [CategoryType.PERSONAL]: "#78ABA8",
  [CategoryType.DRAMA]: "#C8CFA0",
};

export const DEFAULT_BG_COLOR = "#FDF7F0";
export const PRIMARY_TEXT_COLOR = "#2D2D2D";
export const SECONDARY_TEXT_COLOR = "#6B7280";
export const ACCENT_COLOR = "#846E54";
export const BUTTON_BG_COLOR = "#EFE7DB";
