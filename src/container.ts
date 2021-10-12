import ColorGenerator from "./modules/colorGenerator";
import { ColorPattern } from "./modules/colorGenerator/interface";
import { Controller } from "./modules/controller";
import { IController } from "./modules/controller/interface";
import { CsvLoader } from "./modules/csvLoader";
import { FileLoader } from "./modules/file";
import { ThermalDistributionProvider } from "./modules/thermalDistributionProvider";
import { Presenter } from "./presenters";
import { CsvFileInput } from "./views/csvFileInput";
import ThermalDistributionView from "./views/thermalDistribution";
import ThermalTimeFlowView from "./views/thermalTimeFlow";

class Container {
  controller: IController;

  constructor() {
    // modules
    const fileLoader = new FileLoader();
    const csvLoader = new CsvLoader(fileLoader);
    const thermalDistributionProvider = new ThermalDistributionProvider(csvLoader);
    const colorGenerator = new ColorGenerator(ColorPattern.Heat);

    // views
    new CsvFileInput();
    const thermalDistributionView = new ThermalDistributionView(colorGenerator);
    const thermalTimeFlowView = new ThermalTimeFlowView(colorGenerator);
    const presenter = new Presenter(thermalDistributionView, thermalTimeFlowView);

    this.controller = new Controller(thermalDistributionProvider, presenter);
  }
}

export default new Container();
