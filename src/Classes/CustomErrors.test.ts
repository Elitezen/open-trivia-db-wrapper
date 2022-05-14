import { OpenTDBResponseCode } from "../Typings/types";
import { OpenTDBError, OpenTDBResponse } from "./CustomErrors";

test("Ensure instance creations of OpenTDBError throw errors when either arguments are not strings", () => {
  expect(() => {
    new OpenTDBError({} as string, {} as string);
  }).toThrow(Error);

  expect(() => {
    new OpenTDBError(1 as unknown as string, 1 as unknown as string);
  }).toThrow(Error);

  expect(() => {
    new OpenTDBError(true as unknown as string, true as unknown as string);
  }).toThrow(Error);

  expect(() => {
    new OpenTDBError("", "");
  }).toThrow(Error);

  expect(new OpenTDBError("...", "...")).toBeInstanceOf(Error);
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
