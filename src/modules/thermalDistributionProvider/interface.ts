import { ThermalDistribution, ThermalDistributionFrame } from "../../models/thermalDistribution";

export interface IThermalDistributionProvider {
  load(file: File): Promise<void>;
  getByFrame(imageNo: number): ThermalDistributionFrame;
  getNumRows(): number;
  getAll(): ThermalDistribution;
  getAmbientCelciusAll(): number[];
}
