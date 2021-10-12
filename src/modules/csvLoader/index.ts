import { IFileLoader } from "../file/interface";
import { ICsvLoader } from "./interface";

export class CsvLoader implements ICsvLoader {
  private fileLoader: IFileLoader;

  constructor(fileLoader: IFileLoader) {
    this.fileLoader = fileLoader;
  }

  async load(file: File): Promise<string[][]> {
    const data = await this.fileLoader.loadAsync(file, "text/csv");
    if (typeof data === "string") {
      try {
        return this.parse(data);
      } catch {
        return Promise.reject("Cannot parse the file");
      }
    } else {
      return Promise.reject("Unsupported return type");
    }
  }

  private parse(buffer: string): string[][] {
    return buffer.split("\n").map((row) => row.split(","));
  }
}
