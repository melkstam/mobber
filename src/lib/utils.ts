export const msToText = (ms: number): string => {
  const totalSeconds = Math.ceil(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');

  return `${minutesString}:${secondsString}`;
};

export const rotateArray = <T>(array: T[], n = 1): T[] => (
  array.slice(n, array.length).concat(array.slice(0, n))
);
