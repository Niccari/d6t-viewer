export enum ColorPattern {
  Heat = "Heat",
}

export interface IColorGenerator {
  getColor(position: number): string;
}
