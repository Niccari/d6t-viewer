import { ThermalDistribution } from "../../models/thermalDistribution";

export interface IThermalTimeFlowView {
  drawTimeFlow(distribution: ThermalDistribution, numRows: number, minCelcius: number, maxCelcius: number): void;
  drawCurrentFrame(frameNo: number, numRows: number, frameLength: number): void;
}
