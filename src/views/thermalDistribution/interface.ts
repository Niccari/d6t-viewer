import { ThermalDistributionFrame } from "../../models/thermalDistribution";

export interface IThermalDistributionView {
  draw(frameNo: number, frame: ThermalDistributionFrame, numRows: number, minCelcius: number, maxCelcius: number): void;
}
