import {
  getMostFrequentNumber,
  getAverageNumber,
  formatToDayMonth,
} from "@/utils/utils";

describe("getMostFrequentNumber", () => {
  it("returns the most frequent number in the array", () => {
    expect(getMostFrequentNumber([1, 2, 2, 3, 3, 3])).toBe(3);
    expect(getMostFrequentNumber([4, 4, 5, 4, 6, 6])).toBe(4);
    expect(getMostFrequentNumber([7])).toBe(7);
  });

  it("returns the smaller number if tie in frequency", () => {
    expect(getMostFrequentNumber([2, 3, 2, 3])).toBe(2);
  });
});

describe("getAverageNumber", () => {
  it("calculates the correct average", () => {
    expect(getAverageNumber([1, 2, 3, 4, 5])).toBe(3);
    expect(getAverageNumber([10, 20, 30])).toBe(20);
    expect(getAverageNumber([0, 0, 0])).toBe(0);
  });

  it("handles a single-element array", () => {
    expect(getAverageNumber([7])).toBe(7);
  });
});

describe("formatToDayMonth", () => {
  it("formats a Date object as dd/mm", () => {
    const date = new Date("2024-04-01");
    expect(formatToDayMonth(date)).toBe("01/04");
  });

  it("formats a date string as dd/mm", () => {
    expect(formatToDayMonth("2024-12-31")).toBe("31/12");
  });

  it("formats a timestamp as dd/mm", () => {
    const timestamp = new Date("2025-01-15").getTime();
    expect(formatToDayMonth(timestamp)).toBe("15/01");
  });
});
