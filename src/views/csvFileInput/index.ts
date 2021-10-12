import { controller } from "../../";
import { ICsvFileInput } from "./interface";

export class CsvFileInput implements ICsvFileInput {
  constructor() {
    this.addFileEvent("inputCsv", (file) => {
      controller.startVisualization(file);
    });
  }

  private addFileEvent(id: string, onFileRetrieved: (file: File) => void) {
    const tag = document.getElementById(id);
    if (!tag) {
      return;
    }

    const retrieveFile = (e: Event): void => {
      const files = (e.target as HTMLInputElement | null)?.files;
      if (!files) {
        return;
      }
      onFileRetrieved(files[0]);
    };
    tag.addEventListener("change", retrieveFile);
    tag.addEventListener("dragstart", retrieveFile);
  }
}
