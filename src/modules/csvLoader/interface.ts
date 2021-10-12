export interface ICsvLoader {
  load(file: File): Promise<string[][]>;
}
