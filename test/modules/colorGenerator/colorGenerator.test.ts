import ColorGenerator from "../../../src/modules/colorGenerator";

describe("code.ts filter test", () => {
  test("Heat gradation test", () => {
    const heatColorGenerator = new ColorGenerator("Heat");
    const color000000 = heatColorGenerator.getColor(0.0);
    const color000080 = heatColorGenerator.getColor(0.125);
    const color0000FF = heatColorGenerator.getColor(0.25);
    const color800080 = heatColorGenerator.getColor(0.375);
    const colorFF0000 = heatColorGenerator.getColor(0.5);
    const colorFF8000 = heatColorGenerator.getColor(0.625);
    const colorFFFF00 = heatColorGenerator.getColor(0.75);
    const colorFFFF80 = heatColorGenerator.getColor(0.875);
    const colorFFFFFF = heatColorGenerator.getColor(1.0);
    expect([
      color000000,
      color000080,
      color0000FF,
      color800080,
      colorFF0000,
      colorFF8000,
      colorFFFF00,
      colorFFFF80,
      colorFFFFFF,
    ]).toStrictEqual([
      "#000000",
      "#000080",
      "#0000ff",
      "#800080",
      "#ff0000",
      "#ff8000",
      "#ffff00",
      "#ffff80",
      "#ffffff",
    ]);
  });
});
