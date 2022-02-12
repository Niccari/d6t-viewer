import { IFileLoader } from "../file/interface";
import { ICsvLoader } from "./interface";

class CsvLoader implements ICsvLoader {
  private fileLoader: IFileLoader;

  public constructor(fileLoader: IFileLoader) {
    this.fileLoader = fileLoader;
  }

  public async load(file: File): Promise<string[][]> {
    const data = await this.fileLoader.loadAsync(file, "text/csv");
    if (typeof data === "string") {
      try {
        return this.parse(data);
      } catch {
        return Promise.reject(new Error("Cannot parse the file"));
      }
    } else {
      return Promise.reject(new Error("Unsupported return type"));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private parse(buffer: string): string[][] {
    return buffer
      .split("\n")
      .slice(0, -1)
      .map((row) => row.split(",").slice(0, -1));
  }
}

export default CsvLoader;
