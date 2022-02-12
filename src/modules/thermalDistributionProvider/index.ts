import { ThermalDistribution, ThermalDistributionFrame } from "../../models/thermalDistribution";
import { IThermalDistributionProvider } from "./interface";

class ThermalDistributionProvider implements IThermalDistributionProvider {
  private readonly thermalDistribution: ThermalDistribution;

  public constructor() {
    this.thermalDistribution = {
      numRows: 0,
      frames: [],
    };
  }

  private setThermalDistribution(thermalDistribution: ThermalDistribution): void {
    this.thermalDistribution.numRows = thermalDistribution.numRows;
    this.thermalDistribution.frames = thermalDistribution.frames;
  }

  private getThermalDistribution(): ThermalDistribution {
    if (this.thermalDistribution.frames.length === 0) {
      throw new Error("No thermal distribution loaded.");
    }
    return this.thermalDistribution;
  }

  public getByFrame(imageNo: number): ThermalDistributionFrame {
    return this.getThermalDistribution().frames[imageNo];
  }

  public getNumRows(): number {
    return this.getThermalDistribution().numRows;
  }

  public getAll(): ThermalDistribution {
    return this.getThermalDistribution();
  }

  public getAmbientCelciusAll(): number[] {
    return this.getThermalDistribution().frames.map((t) => t.ambientCelcius);
  }

  // eslint-disable-next-line class-methods-use-this
  private parseCustomDate(str: string): Date {
    // 本来 Date.parse などを使う方がよいが、データ互換性のためパーサを実装
    const split = str.split("-");
    const year = parseInt(split[0], 10);
    const month = parseInt(split[1], 10) - 1;
    const day = parseInt(split[2], 10);
    const hour = parseInt(split[3], 10);
    const minutes = parseInt(split[4], 10);
    const seconds = parseInt(split[5], 10);
    return new Date(year, month, day, hour, minutes, seconds);
  }

  public async load(csvValues: string[][]): Promise<void> {
    const header: string[] = csvValues[0];

    const headerTypes: string[] = ["Date", "Room"];

    const numCells = header.length - 3;
    if (numCells !== 16 && numCells !== 64) {
      return Promise.reject(new Error(`The number of cells should be equal to 16 or 64. actual:${numCells}`));
    }

    for (let i = 0; i < numCells; i += 1) {
      headerTypes.push(`P[${i}]`);
    }
    const rowNumbers: number[] = headerTypes.map((key) => {
      return header.findIndex((h) => h === key);
    });

    const numRows = Math.round(Math.sqrt(numCells));
    const body = csvValues.slice(1);
    const frames: ThermalDistributionFrame[] = body.map((b) => {
      const cellRowNumbers = rowNumbers.slice(2);
      const cells = cellRowNumbers.map((n) => parseFloat(b[n]));
      return {
        date: this.parseCustomDate(b[rowNumbers[0]]),
        ambientCelcius: parseFloat(b[rowNumbers[1]]) * 10,
        cells,
      };
    });

    this.setThermalDistribution({ numRows, frames });
    return Promise.resolve();
  }
}

export default ThermalDistributionProvider;
