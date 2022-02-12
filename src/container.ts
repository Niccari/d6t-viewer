import ColorGenerator from "./modules/colorGenerator";
import { ColorPattern } from "./modules/colorGenerator/interface";
import Controller from "./modules/controller";
import { IController } from "./modules/controller/interface";
import CsvLoader from "./modules/csvLoader";
import FileLoader from "./modules/file";
import ThermalDistributionProvider from "./modules/thermalDistributionProvider";
import Presenter from "./presenters";
import CsvFileInput from "./views/csvFileInput";
import ThermalDistributionView from "./views/thermalDistribution";
import ThermalTimeFlowView from "./views/thermalTimeFlow";

class Container {
  public controller: IController;

  public constructor() {
    // modules
    const fileLoader = new FileLoader();
    const csvLoader = new CsvLoader(fileLoader);
    const thermalDistributionProvider = new ThermalDistributionProvider();
    const colorGenerator = new ColorGenerator(ColorPattern.Heat);

    // views
    new CsvFileInput().addFileHandler((file) => {
      this.controller.startVisualization(file);
    });
    const thermalDistributionView = new ThermalDistributionView(colorGenerator);
    const thermalTimeFlowView = new ThermalTimeFlowView(colorGenerator);
    const presenter = new Presenter(thermalDistributionView, thermalTimeFlowView);

    this.controller = new Controller(thermalDistributionProvider, presenter, csvLoader);
  }
}

export default Container;
