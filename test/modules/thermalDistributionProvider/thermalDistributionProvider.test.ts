import ThermalDistributionProvider from "../../../src/modules/thermalDistributionProvider";

const csvExample: string[][] = [
  [
    "No",
    "Date",
    "Room",
    "P[0]",
    "P[1]",
    "P[2]",
    "P[3]",
    "P[4]",
    "P[5]",
    "P[6]",
    "P[7]",
    "P[8]",
    "P[9]",
    "P[10]",
    "P[11]",
    "P[12]",
    "P[13]",
    "P[14]",
    "P[15]",
  ],
  [
    "0",
    "2016-12-12-14-19-36-83",
    "1.68",
    "16.2",
    "16.1",
    "16.1",
    "16.2",
    "16.7",
    "16.4",
    "16.2",
    "16.0",
    "17.0",
    "16.4",
    "16.2",
    "16.1",
    "16.7",
    "16.5",
    "16.2",
    "16.0",
  ],
  [
    "1",
    "2016-12-12-14-19-36-332",
    "1.6899999",
    "16.2",
    "15.9",
    "16.0",
    "15.9",
    "16.9",
    "16.4",
    "16.1",
    "15.9",
    "17.1",
    "16.3",
    "16.2",
    "15.9",
    "16.7",
    "16.5",
    "16.1",
    "15.8",
  ],
];

describe("code.ts filter test", () => {
  test("Heat gradation test", async () => {
    const thermalDistributionProvider = new ThermalDistributionProvider();
    await thermalDistributionProvider.load(csvExample);

    expect(thermalDistributionProvider.getNumRows()).toBe(4);
    expect(thermalDistributionProvider.getAmbientCelciusAll()).toStrictEqual([16.8, 16.899999]);
    expect(thermalDistributionProvider.getByFrame(0).date).toStrictEqual(new Date(2016, 12 - 1, 12, 14, 19, 36));
    expect(thermalDistributionProvider.getByFrame(1).date).toStrictEqual(new Date(2016, 12 - 1, 12, 14, 19, 36));
    expect(thermalDistributionProvider.getByFrame(0).cells[0]).toBe(16.2);
    expect(thermalDistributionProvider.getByFrame(1).cells[15]).toBe(15.8);
  });
});
