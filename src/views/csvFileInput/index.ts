import { ICsvFileInput } from "./interface";

class CsvFileInput implements ICsvFileInput {
  public addFileHandler(handler: (_: File) => void) {
    this.addFileEvent("inputCsv", (file) => {
      handler(file);
    });
  }

  // eslint-disable-next-line class-methods-use-this
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

export default CsvFileInput;
