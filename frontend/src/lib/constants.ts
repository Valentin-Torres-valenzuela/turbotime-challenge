export enum CategoryType {
  PERSONAL = "Personal",
  SCHOOL = "School",
  RANDOM_THOUGHTS = "Random Thoughts",
  DRAMA = "Drama",
}

export const CATEGORY_COLORS: Record<string, string> = {
  [CategoryType.PERSONAL]: "#8EB6AD",
  [CategoryType.SCHOOL]: "#FEE29C",
  [CategoryType.RANDOM_THOUGHTS]: "#F8B182",
  [CategoryType.DRAMA]: "#CBD6B3",
};

export const DEFAULT_BG_COLOR = "#FDF7F0";
export const PRIMARY_TEXT_COLOR = "#2D2D2D";
export const SECONDARY_TEXT_COLOR = "#6B7280";
export const ACCENT_COLOR = "#846E54";
export const BUTTON_BG_COLOR = "#EFE7DB";
