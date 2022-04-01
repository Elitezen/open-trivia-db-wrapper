import { QuestionOptions } from "../Typings/interfaces";
import {
  QuestionDifficulty,
  QuestionEncoding,
  QuestionType,
} from "../Typings/types";
import Validator from "./Validator";

function createInstance(options: QuestionOptions) {
  return new Validator(options);
}

test("tests output of Validator.checkAmount()", () => {
  let validator = createInstance({ amount: {} as number });

  expect(() => {
    validator.checkAmount();
  }).toThrow(TypeError);

  validator = createInstance({ amount: true as unknown as number });

  expect(() => {
    validator.checkAmount();
  }).toThrow(TypeError);

  validator = createInstance({ amount: "" as unknown as number });

  expect(() => {
    validator.checkAmount();
  }).toThrow(TypeError);

  validator = createInstance({ amount: 0 });

  expect(() => {
    validator.checkAmount();
  }).toThrow(TypeError);

  validator = createInstance({ amount: 51 });

  expect(() => {
    validator.checkAmount();
  }).toThrow(TypeError);

  validator = createInstance({ amount: 25 });

  expect(validator.checkAmount()).toEqual(25);

  validator = createInstance({ amount: "25" });

  expect(validator.checkAmount()).toEqual(25);

  validator = createInstance({ amount: undefined as unknown as number });

  expect(validator.checkAmount()).toEqual(null);

  validator = createInstance({ amount: null as unknown as number });

  expect(validator.checkAmount()).toEqual(null);
});

test("tests output of Validator.checkCategory()", () => {
  let validator = createInstance({ category: {} as unknown as string });

  expect(() => {
    validator.checkCategory();
  }).toThrow(TypeError);

  validator = createInstance({ category: true as unknown as string });

  expect(() => {
    validator.checkCategory();
  }).toThrow(TypeError);

  validator = createInstance({ category: "..." });

  expect(() => {
    validator.checkCategory();
  }).toThrow(TypeError);

  validator = createInstance({ category: 8 });

  expect(() => {
    validator.checkCategory();
  }).toThrow(TypeError);

  validator = createInstance({ category: 33 });

  expect(() => {
    validator.checkCategory();
  }).toThrow(TypeError);

  validator = createInstance({ category: 25 });

  expect(validator.checkCategory()).toEqual(25);

  validator = createInstance({ category: "25" });

  expect(validator.checkCategory()).toEqual(25);

  validator = createInstance({ category: "GENERAL_KNOWLEDGE" });

  expect(validator.checkCategory()).toEqual(9);

  validator = createInstance({
    category: "ENTERTAINMENT_CARTOON_AND_ANIMATIONS",
  });

  expect(validator.checkCategory()).toEqual(32);

  validator = createInstance({ category: "General Knowledge" });

  expect(validator.checkCategory()).toEqual(9);

  validator = createInstance({
    category: "Entertainment: Cartoon and Animations",
  });

  expect(validator.checkCategory()).toEqual(32);

  validator = createInstance({ category: undefined as unknown as number });

  expect(validator.checkCategory()).toEqual(null);

  validator = createInstance({ category: null as unknown as number });

  expect(validator.checkCategory()).toEqual(null);
});

test("tests output of Validator.checkDifficulty()", () => {
  let validator = createInstance({
    difficulty: {} as unknown as QuestionDifficulty,
  });

  expect(() => {
    validator.checkDifficulty();
  }).toThrow(TypeError);

  validator = createInstance({
    difficulty: true as unknown as QuestionDifficulty,
  });

  expect(() => {
    validator.checkDifficulty();
  }).toThrow(TypeError);

  validator = createInstance({ difficulty: "..." as QuestionDifficulty });

  expect(() => {
    validator.checkDifficulty();
  }).toThrow(TypeError);

  validator = createInstance({
    difficulty: 1 as unknown as QuestionDifficulty,
  });

  expect(() => {
    validator.checkDifficulty();
  }).toThrow(TypeError);

  validator = createInstance({
    difficulty: "1" as unknown as QuestionDifficulty,
  });

  expect(() => {
    validator.checkDifficulty();
  }).toThrow(TypeError);

  validator = createInstance({ difficulty: "easy" });

  expect(validator.checkDifficulty()).toEqual("easy");

  validator = createInstance({ difficulty: undefined });

  expect(validator.checkDifficulty()).toEqual(null);

  validator = createInstance({ difficulty: null });

  expect(validator.checkDifficulty()).toEqual(null);
});

test("tests output of Validator.checkEncoding()", () => {
  let validator = createInstance({
    encode: {} as unknown as QuestionEncoding,
  });

  expect(() => {
    validator.checkEncode();
  }).toThrow(TypeError);

  validator = createInstance({
    encode: true as unknown as QuestionEncoding,
  });

  expect(() => {
    validator.checkEncode();
  }).toThrow(TypeError);

  validator = createInstance({ encode: "..." as QuestionEncoding });

  expect(() => {
    validator.checkEncode();
  }).toThrow(TypeError);

  validator = createInstance({
    encode: 1 as unknown as QuestionEncoding,
  });

  expect(() => {
    validator.checkEncode();
  }).toThrow(TypeError);

  validator = createInstance({
    encode: "1" as unknown as QuestionEncoding,
  });

  expect(() => {
    validator.checkEncode();
  }).toThrow(TypeError);

  validator = createInstance({ encode: "base64" });

  expect(validator.checkEncode()).toEqual("base64");

  validator = createInstance({ encode: undefined });

  expect(validator.checkEncode()).toEqual(null);

  validator = createInstance({ encode: null });

  expect(validator.checkEncode()).toEqual(null);
});

test("tests output of Validator.checkToken()", () => {
  let validator = createInstance({
    session: {} as unknown as string,
  });

  expect(() => {
    validator.checkToken();
  }).toThrow(TypeError);

  validator = createInstance({
    session: true as unknown as string,
  });

  expect(() => {
    validator.checkToken();
  }).toThrow(TypeError);

  validator = createInstance({ session: "" });

  expect(() => {
    validator.checkToken();
  }).toThrow(TypeError);

  validator = createInstance({
    session: 1 as unknown as string,
  });

  expect(() => {
    validator.checkToken();
  }).toThrow(TypeError);

  validator = createInstance({ session: "..." });

  expect(validator.checkToken()).toEqual("...");

  validator = createInstance({ session: undefined });

  expect(validator.checkToken()).toEqual(null);

  validator = createInstance({ session: null });

  expect(validator.checkToken()).toEqual(null);
});

test("tests output of Validator.checkType()", () => {
  let validator = createInstance({
    type: {} as unknown as QuestionType,
  });

  expect(() => {
    validator.checkType();
  }).toThrow(TypeError);

  validator = createInstance({
    type: true as unknown as QuestionType,
  });

  expect(() => {
    validator.checkType();
  }).toThrow(TypeError);

  validator = createInstance({ type: "..." as QuestionType });

  expect(() => {
    validator.checkType();
  }).toThrow(TypeError);

  validator = createInstance({
    type: 1 as unknown as QuestionType,
  });

  expect(() => {
    validator.checkType();
  }).toThrow(TypeError);

  validator = createInstance({ type: "boolean" });

  expect(validator.checkType()).toEqual("boolean");

  validator = createInstance({ type: undefined });

  expect(validator.checkType()).toEqual(null);

  validator = createInstance({ type: null });

  expect(validator.checkType()).toEqual(null);
});
