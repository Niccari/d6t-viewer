import { ColorPattern, IColorGenerator } from "./interface";

type ColorGradientItem = {
  position: number;
  red: number;
  green: number;
  blue: number;
};

class ColorGenerator implements IColorGenerator {
  private readonly colorTable: ColorGradientItem[] = [];
  private readonly resolution = 128;

  private toPosition = (index: number): number => {
    return index / (this.resolution - 1);
  };

  private toIndex = (position: number): number => {
    return position * (this.resolution - 1);
  };

  private readonly gradientHeat: ColorGradientItem[] = [
    { position: 0.0, red: 0, green: 0, blue: 0 },
    { position: 0.25, red: 0, green: 0, blue: 255 },
    { position: 0.5, red: 255, green: 0, blue: 0 },
    { position: 0.75, red: 255, green: 255, blue: 0 },
    { position: 1.0, red: 255, green: 255, blue: 255 },
  ];

  // eslint-disable-next-line class-methods-use-this
  private colorToHex = (color: number) => {
    const hex = Math.round(color).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  public constructor(pattern: ColorPattern) {
    const gradient: ColorGradientItem[] = (() => {
      switch (pattern) {
        case ColorPattern.Heat:
          return this.gradientHeat;
        default:
          return this.gradientHeat;
      }
    })();

    let endIndex = 1;
    let start = gradient[0];
    let end = gradient[1];
    for (let i = 0; i < this.resolution; i += 1) {
      const position = this.toPosition(i);
      const ratio = (position - start.position) / (end.position - start.position);
      const red = start.red + ratio * (end.red - start.red);
      const green = start.green + ratio * (end.green - start.green);
      const blue = start.blue + ratio * (end.blue - start.blue);
      this.colorTable.push({ position, red, green, blue });
      if (end.position <= position) {
        start = end;
        endIndex += 1;
        end = gradient[endIndex];
      }
    }
  }

  public getColor(position: number): string {
    if (position < 0 || position > 1) {
      throw new Error("position must be in 0 <= position <= 1");
    }
    const index = this.toIndex(position);
    const beforeIndex = Math.floor(index);
    const afterIndex = Math.min(beforeIndex + 1, this.resolution - 1);
    const beforeWeight = 1 - (index - beforeIndex);
    const afterWeight = 1 - beforeWeight;
    const beforeColor = this.colorTable[beforeIndex];
    const afterColor = this.colorTable[afterIndex];
    const color = {
      red: beforeWeight * beforeColor.red + afterWeight * afterColor.red,
      green: beforeWeight * beforeColor.green + afterWeight * afterColor.green,
      blue: beforeWeight * beforeColor.blue + afterWeight * afterColor.blue,
    };
    return `#${this.colorToHex(color.red)}${this.colorToHex(color.green)}${this.colorToHex(color.blue)}`;
  }
}

export default ColorGenerator;
