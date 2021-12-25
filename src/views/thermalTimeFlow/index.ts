import { ThermalDistribution } from "../../models/thermalDistribution";
import { IColorGenerator } from "../../modules/colorGenerator/interface";
import { CanvasInfo } from "../models";
import { IThermalTimeFlowView } from "./interface";

interface FrameRectangleSize {
  width: number;
  height: number;
}

class ThermalTimeFlowView implements IThermalTimeFlowView {
  private readonly colorGenerator: IColorGenerator;
  private readonly scanmapRasterX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  public constructor(colorGenerator: IColorGenerator) {
    this.colorGenerator = colorGenerator;
  }

  // eslint-disable-next-line class-methods-use-this
  private getCanvas(): HTMLCanvasElement {
    const canvas = document.getElementById("thermalTimeFlow");
    if (!canvas) {
      throw new Error("Cannot acquire canvas");
    }
    return canvas as HTMLCanvasElement;
  }

  private getCanvasInfo(): CanvasInfo {
    const canvas = this.getCanvas();
    const context = (canvas as HTMLCanvasElement).getContext("2d");
    if (!context) {
      throw new Error("Cannot acquire context");
    }
    return {
      context,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private setColorPositionRange(min: number, max: number): (value: number) => number {
    return (value) => (value - min) / (max - min);
  }

  // eslint-disable-next-line class-methods-use-this
  private measureFrameRectangleSize(numRows: number, frameLength: number, drawInfo: CanvasInfo): FrameRectangleSize {
    return {
      width: drawInfo.canvasWidth / (numRows ** 2 + 1 + 1), // includes ambient temperature and padding
      height: drawInfo.canvasHeight / frameLength,
    };
  }

  public drawTimeFlow(
    distribution: ThermalDistribution,
    numRows: number,
    minCelcius: number,
    maxCelcius: number
  ): void {
    const drawInfo = this.getCanvasInfo();
    const { context } = drawInfo;

    const { width, height } = this.measureFrameRectangleSize(numRows, distribution.frames.length, drawInfo);

    const map = this.scanmapRasterX;
    const calcColorPosition = this.setColorPositionRange(minCelcius, maxCelcius);
    context.fillStyle = "#000";
    for (let y = 0; y < distribution.frames.length; y += 1) {
      const frame = distribution.frames[y];
      context.fillStyle = this.colorGenerator.getColor(calcColorPosition(frame.ambientCelcius));
      context.fillRect(0, y * height, width, height);

      context.fillStyle = "#333333";
      context.fillRect(width, y * height, width, height);
      for (let x = 0; x < numRows ** 2; x += 1) {
        context.fillStyle = this.colorGenerator.getColor(calcColorPosition(frame.cells[map[x]]));
        context.fillRect(width * (2 + x), y * height, width, height);
      }
    }
  }

  public drawCurrentFrame(frameNo: number, numRows: number, frameLength: number): void {
    const drawInfo = this.getCanvasInfo();
    const { context } = drawInfo;
    const { width, height } = this.measureFrameRectangleSize(numRows, frameLength, drawInfo);

    context.fillStyle = "#333";
    context.fillRect(width, 0, width, height * frameLength);
    context.fillStyle = "#0F0";
    context.fillRect(width, frameNo * height, width, height);
  }
}

export default ThermalTimeFlowView;
