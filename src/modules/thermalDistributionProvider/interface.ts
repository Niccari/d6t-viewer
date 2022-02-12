import { ThermalDistribution, ThermalDistributionFrame } from "../../models/thermalDistribution";

export interface IThermalDistributionProvider {
  load(csvValues: string[][]): Promise<void>;
  getByFrame(imageNo: number): ThermalDistributionFrame;
  getNumRows(): number;
  getAll(): ThermalDistribution;
  getAmbientCelciusAll(): number[];
}
