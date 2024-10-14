import nonUniqueElements from "./nonUniqueElements";

test("returns non unique elements", () => {
  expect(nonUniqueElements([1, 2, 3, 1, 3])).toEqual([1, 3, 1, 3]);
  expect(nonUniqueElements([1, 2, 3, 4, 5])).toEqual([]);
  expect(nonUniqueElements([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
  expect(nonUniqueElements([10, 9, 10, 10, 9, 8])).toEqual([10, 9, 10, 10, 9]);
  expect(nonUniqueElements([])).toEqual([]);
  expect(nonUniqueElements(["a", "b", "a", "c", "b"])).toEqual([
    "a",
    "b",
    "a",
    "b",
  ]);
  expect(nonUniqueElements([1, -1, 1, -1, 0, 0])).toEqual([1, -1, 1, -1, 0, 0]);
});
