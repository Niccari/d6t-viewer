import { ThermalDistribution } from "../models/thermalDistribution";

export interface IPresenter {
  notifyDataChange: (
    frameNo: number,
    numRows: number,
    thermalDistribution: ThermalDistribution,
    minCelcius: number,
    maxCelcius: number
  ) => void;
}
