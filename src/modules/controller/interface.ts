export interface IController {
  startVisualization(file: File): Promise<void>;
}
