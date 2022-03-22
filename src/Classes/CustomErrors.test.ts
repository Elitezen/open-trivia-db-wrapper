import { OpenTDBResponseCode } from "../Typings/types";
import { EasyTriviaError, OpenTDBResponse } from "./CustomErrors";

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

test("Ensure instance creations of OpenTDBResponse throw errors when given argument is not a number between 0-4", () => {
  expect(() => {
    new OpenTDBResponse(-1 as OpenTDBResponseCode);
  }).toThrow(Error);

  expect(() => {
    new OpenTDBResponse(5 as OpenTDBResponseCode);
  }).toThrow(Error);

  expect(new OpenTDBResponse(1)).toBeInstanceOf(Error);
});
