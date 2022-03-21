import { CategoryResolvable } from "../Typings/types";
import getCategoryData from "./getCategoryData";

test("Tests outputs of getCategoryData()", () => {
  expect(getCategoryData("")).rejects.toThrow(Error);
  expect(getCategoryData(8)).rejects.toThrow(Error);
  expect(getCategoryData(33)).rejects.toThrow(Error);
  expect(
    getCategoryData(true as unknown as CategoryResolvable)
  ).rejects.toThrow(Error);
  expect(getCategoryData({} as unknown as CategoryResolvable)).rejects.toThrow(
    Error
  );

  // expect(getCategoryData(15).then(res => typeof res)).toBe('object');
});
