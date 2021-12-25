import { ThermalDistributionFrame } from "../../models/thermalDistribution";
import { IColorGenerator } from "../../modules/colorGenerator/interface";
import { CanvasInfo } from "../models";
import { IThermalDistributionView } from "./interface";

class ThermalDistributionView implements IThermalDistributionView {
  private readonly colorGenerator: IColorGenerator;

  public constructor(colorGenerator: IColorGenerator) {
    this.colorGenerator = colorGenerator;
  }

  // eslint-disable-next-line class-methods-use-this
  private getCanvas(): HTMLCanvasElement {
    const canvas = document.getElementById("thermalDistribution");
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
  private drawText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
    context.font = "64px bold sans-serif";
    context.strokeStyle = "#000000";
    context.strokeText(text, x + 4, y + 4);
    context.fillStyle = "#000000";
    context.fillText(text, x + 4, y + 4);
    context.strokeStyle = "#FFFFFF";
    context.strokeText(text, x, y);
    context.fillStyle = "#FFFFFF";
    context.fillText(text, x, y);
  }

  // eslint-disable-next-line class-methods-use-this
  private setColorPositionRange(min: number, max: number): (value: number) => number {
    return (value) => (value - min) / (max - min);
  }

  public draw(
    frameNo: number,
    frame: ThermalDistributionFrame,
    numRows: number,
    minCelcius: number,
    maxCelcius: number
  ): void {
    const { context, canvasWidth, canvasHeight } = this.getCanvasInfo();

    const margin = 0.1;
    const cellsX = canvasWidth * margin;
    const cellsY = canvasHeight * margin;
    const cellWidth = (canvasWidth - 2 * canvasWidth * margin) / numRows;
    const cellHeight = (canvasHeight - 2 * canvasHeight * margin) / numRows;

    const calcColorPosition = this.setColorPositionRange(minCelcius, maxCelcius);
    context.fillStyle = this.colorGenerator.getColor(calcColorPosition(frame.ambientCelcius));
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    this.drawText(
      context,
      `#${frameNo}, 室温${frame.ambientCelcius.toFixed(1)}°C, ${frame.date.toLocaleString()}`,
      10,
      80
    );
    for (let y = 0; y < numRows; y += 1) {
      for (let x = 0; x < numRows; x += 1) {
        const cellCelcius = frame.cells[x + y * numRows];
        context.fillStyle = this.colorGenerator.getColor(calcColorPosition(cellCelcius));
        context.fillRect(x * cellWidth + cellsX, y * cellHeight + cellsY, cellWidth, cellHeight);
        this.drawText(
          context,
          `${cellCelcius.toFixed(1)}°C`,
          x * cellWidth + cellsX + cellWidth / 4,
          y * cellHeight + cellsY + cellHeight / 2
        );
      }
    }
    this.drawColorBar(context, minCelcius, maxCelcius, canvasWidth, canvasHeight, cellsX, cellHeight);
  }

  private drawColorBar(
    context: CanvasRenderingContext2D,
    minCelcius: number,
    maxCelcius: number,
    canvasWidth: number,
    canvasHeight: number,
    cellsX: number,
    cellHeight: number
  ): void {
    const numColorbarCells = 4;

    const gradient = context.createLinearGradient(cellsX, 0, canvasWidth, cellHeight / 3);
    for (let stop = 0; stop <= numColorbarCells; stop += 1) {
      const offset = stop / numColorbarCells;
      gradient.addColorStop(offset, this.colorGenerator.getColor(offset));
    }
    context.fillStyle = gradient;
    context.fillRect(cellsX, canvasHeight - cellHeight * 0.4, canvasWidth - cellsX * 2, cellHeight / 3);

    this.drawText(context, minCelcius.toFixed(1), 30, canvasHeight - cellHeight / 6);
    this.drawText(context, maxCelcius.toFixed(1), canvasWidth - (5 * cellsX) / 6, canvasHeight - cellHeight / 6);
  }
}

export default ThermalDistributionView;
