import { ColorPattern, IColorGenerator } from "./interface";

type ColorGradientItem = {
  position: number;
  red: number;
  green: number;
  blue: number;
};

class ColorGenerator implements IColorGenerator {
  private readonly colorTable: ColorGradientItem[] = [];
  private readonly resolution = 256;

  private readonly gradientHeat: ColorGradientItem[] = [
    { position: 0, red: 0, green: 0, blue: 0 },
    { position: (1 * this.resolution) / 4, red: 0, green: 0, blue: 255 },
    { position: (2 * this.resolution) / 4, red: 255, green: 0, blue: 0 },
    { position: (3 * this.resolution) / 4, red: 255, green: 255, blue: 0 },
    { position: this.resolution - 1, red: 255, green: 255, blue: 255 },
  ];

  private _colorToHex = (color: number) => {
    const hex = Math.round(color).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  constructor(pattern: ColorPattern) {
    const gradient: ColorGradientItem[] = (() => {
      switch (pattern) {
        case ColorPattern.Heat:
          return this.gradientHeat;
      }
    })();

    let endIndex = 1;
    let start = gradient[0];
    let end = gradient[1];
    for (let i = 0; i < this.resolution; i++) {
      const ratio = (i - start.position) / (end.position - start.position);
      const red = start.red + ratio * (end.red - start.red);
      const green = start.green + ratio * (end.green - start.green);
      const blue = start.blue + ratio * (end.blue - start.blue);
      this.colorTable.push({ position: i, red, green, blue });
      if (end.position == i) {
        start = end;
        end = gradient[++endIndex];
      }
    }
  }

  getColor(position: number): string {
    if (position < 0 || position > 1) {
      throw new Error("position must be in 0 <= position <= 1");
    }
    const index = position * (this.resolution - 1);
    const beforeIndex = Math.floor(index);
    const afterIndex = Math.ceil(index) !== this.colorTable.length ? Math.ceil(index) : 0;
    const beforeWeight = index - beforeIndex;
    const afterWeight = 1 - beforeWeight;
    const color = {
      red: Math.floor(beforeWeight * this.colorTable[beforeIndex].red + afterWeight * this.colorTable[afterIndex].red),
      green: Math.floor(
        beforeWeight * this.colorTable[beforeIndex].green + afterWeight * this.colorTable[afterIndex].green
      ),
      blue: Math.floor(
        beforeWeight * this.colorTable[beforeIndex].blue + afterWeight * this.colorTable[afterIndex].blue
      ),
    };
    return "#" + this._colorToHex(color.red) + this._colorToHex(color.green) + this._colorToHex(color.blue);
  }
}

export default ColorGenerator;
