import { IPresenter } from "../../presenters/interface";
import { ICsvLoader } from "../csvLoader/interface";
import { IThermalDistributionProvider } from "../thermalDistributionProvider/interface";
import { IController } from "./interface";

class Controller implements IController {
  private intervalId: NodeJS.Timer | undefined = undefined;
  private csvLoader: ICsvLoader;
  private thermalDistributionProvider: IThermalDistributionProvider;
  private presenter: IPresenter;

  public constructor(
    thermalDistributionProvider: IThermalDistributionProvider,
    presenter: IPresenter,
    csvLoader: ICsvLoader
  ) {
    this.thermalDistributionProvider = thermalDistributionProvider;
    this.presenter = presenter;
    this.csvLoader = csvLoader;
  }

  public async startVisualization(file: File): Promise<void> {
    // FIXME: ファイルロードとパースを分ける
    const csvValues = await this.csvLoader.load(file);
    await this.thermalDistributionProvider.load(csvValues);

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    let frameNo = 0;
    const thermalDistribution = this.thermalDistributionProvider.getAll();
    const minCelcius = Math.min(...thermalDistribution.frames.flatMap((v) => v.cells));
    const maxCelcius = Math.max(...thermalDistribution.frames.flatMap((v) => v.cells));
    this.intervalId = setInterval(() => {
      const numRows = this.thermalDistributionProvider.getNumRows();

      this.presenter.notifyDataChange(frameNo, numRows, thermalDistribution, minCelcius, maxCelcius);

      frameNo += 1;
      if (frameNo >= thermalDistribution.frames.length) {
        frameNo = 0;
      }
    }, 250);
  }
}

export default Controller;
