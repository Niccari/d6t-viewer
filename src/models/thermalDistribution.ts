export interface ThermalDistributionFrame {
  ambientCelcius: number;
  date: Date;
  cells: number[];
}

export interface ThermalDistribution {
  numRows: number;
  frames: ThermalDistributionFrame[];
}
