export const ColorPattern = {
  Heat: "Heat",
} as const;
export type ColorPattern = typeof ColorPattern[keyof typeof ColorPattern];

export interface IColorGenerator {
  getColor(position: number): string;
}
