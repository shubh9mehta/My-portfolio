import type { SimulationData } from "./types";

export const simulationData: SimulationData = {
  messy: [
    { category: "Q1", expected: 450, actual: 380, mismatch: 70 },
    { category: "Q2", expected: 520, actual: 445, mismatch: 75 },
    { category: "Q3", expected: 480, actual: 390, mismatch: 90 },
    { category: "Q4", expected: 550, actual: 470, mismatch: 80 },
  ],
  clean: [
    { category: "Q1", expected: 450, actual: 448, mismatch: 2 },
    { category: "Q2", expected: 520, actual: 515, mismatch: 5 },
    { category: "Q3", expected: 480, actual: 477, mismatch: 3 },
    { category: "Q4", expected: 550, actual: 546, mismatch: 4 },
  ],
};
