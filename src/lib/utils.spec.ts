import { msToText, rotateArray, shuffleArray } from './utils';

describe('msToText', () => {
  it.each([
    [100, '00:01'],
    [1000, '00:01'],
    [1000 * 60, '01:00'],
    [1000 * 145, '02:25'],
    [1000 * 145.4, '02:26'],
    [1000 * 145.6, '02:26'],
    [1000 * 620, '10:20'],
  ])('formats %d ms to %s', (ms: number, expected: string) => {
    expect(msToText(ms)).toBe(expected);
  });
});

describe('rotateArray', () => {
  it.each([
    [[1, 2, 3], [2, 3, 1]],
    [[false, true, false, false], [true, false, false, false]],
    [[], []],
    [[[]], [[]]],
  ])('%p rotates 1 step to %p', (input, expected) => {
    expect(rotateArray(input)).toStrictEqual(expected);
  });

  it.each([
    [[1, 2, 3, 4], 1, [2, 3, 4, 1]],
    [[1, 2, 3, 4], -1, [4, 1, 2, 3]],
    [[1, 2, 3, 4, 5], 2, [3, 4, 5, 1, 2]],
  ])('%p rotates %i steps to %p', (input, steps, expected) => {
    expect(rotateArray(input, steps)).toStrictEqual(expected);
  });
});

describe('shuffleArray', () => {
  it.each([
    [[]],
    [[1, 2, 3]],
    [['Hi', true, 5]],
    [[{}, undefined, undefined]],
  ])('keeps array in the same format', (array) => {
    const shuffled = shuffleArray(array);

    expect(shuffled).toHaveLength(array.length);
    expect(shuffled).toEqual(expect.arrayContaining(array));
  });
});
