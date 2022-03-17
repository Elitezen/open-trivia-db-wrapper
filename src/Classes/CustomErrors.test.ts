import { EasyTriviaError, OpenTDBError } from "./CustomErrors";

test("Ensure instance creations of EasyTriviaError throw errors when either arguments are not strings", () => {
  expect(() => {
    new EasyTriviaError({} as string, {} as string);
  }).toThrow(Error);

  expect(() => {
    new EasyTriviaError(1 as unknown as string, 1 as unknown as string);
  }).toThrow(Error);

  expect(() => {
    new EasyTriviaError(true as unknown as string, true as unknown as string);
  }).toThrow(Error);

  expect(() => {
    new EasyTriviaError("", "");
  }).toThrow(Error);

  expect(new EasyTriviaError("...", "...")).toBeInstanceOf(Error);
});

test("Ensure instance creations of OpenTDBError throw errors when given argument is not a number between 0-4", () => {
  expect(() => {
    new OpenTDBError(-1);
  }).toThrow(Error);

  expect(() => {
    new OpenTDBError(5);
  }).toThrow(Error);

  expect(new OpenTDBError(1)).toBeInstanceOf(Error);
});
