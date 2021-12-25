import { ThermalDistribution } from "../models/thermalDistribution";
import { IThermalDistributionView } from "../views/thermalDistribution/interface";
import { IThermalTimeFlowView } from "../views/thermalTimeFlow/interface";
import { IPresenter } from "./interface";

class Presenter implements IPresenter {
  private thermalDistributionView: IThermalDistributionView;
  private thermalTimeFlowView: IThermalTimeFlowView;

  public constructor(thermalDistributionView: IThermalDistributionView, thermalTimeFlowView: IThermalTimeFlowView) {
    this.thermalDistributionView = thermalDistributionView;
    this.thermalTimeFlowView = thermalTimeFlowView;
  }

  public notifyDataChange(
    frameNo: number,
    numRows: number,
    thermalDistribution: ThermalDistribution,
    minCelcius: number,
    maxCelcius: number
  ): void {
    const frame = thermalDistribution.frames[frameNo];
    this.thermalDistributionView.draw(frameNo, frame, numRows, minCelcius, maxCelcius);
    this.thermalTimeFlowView.drawTimeFlow(thermalDistribution, numRows, minCelcius, maxCelcius);
    this.thermalTimeFlowView.drawCurrentFrame(frameNo, numRows, thermalDistribution.frames.length);
  }
}

export default Presenter;
