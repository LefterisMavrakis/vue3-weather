export const getMostFrequentNumber = (numbers: number[]): number => {
  const counts: Record<number, number> = {};

  for (const num of numbers) {
    counts[num] = (counts[num] || 0) + 1;
  }

  return parseInt(
    Object.keys(counts).reduce((a, b) => (counts[+a] >= counts[+b] ? a : b))
  );
};

export const getAverageNumber = (numbers: number[]): number => {
  return (
    numbers.reduce((acc, num) => {
      return acc + num;
    }, 0) / numbers.length
  );
};

export const formatToDayMonth = (time: string | number | Date): string => {
  const date = new Date(time);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
};
