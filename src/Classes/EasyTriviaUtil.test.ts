import EasyTriviaUtil from "./EasyTriviaUtil";
const { base64Decoder, openTDBRequest, shuffleArray } = EasyTriviaUtil;

const testObj = {
  foo: "YmFy",
  fiz: ["YnV6", "YmF6"],
  val: null,
  childObj: {
    num: 10,
    bool: false,
    und: undefined,
  },
};

const resultObj = {
  foo: "bar",
  fiz: ["buz", "baz"],
  val: null,
  childObj: {
    num: 10,
    bool: false,
    und: undefined,
  },
};

test("Tests output of EasyTriviaUtil.base64Decoder functions", () => {
  expect(base64Decoder.atob("SGVsbG8gV29ybGQh")).toBe("Hello World!");
  expect(base64Decoder.decode(null)).toBe(null);
  expect(base64Decoder.decode(undefined)).toBe(undefined);
  expect(base64Decoder.decode(true)).toBe(true);
  expect(base64Decoder.decode("SGVsbG8gV29ybGQh")).toBe("Hello World!");
  expect(base64Decoder.decode(testObj)).toStrictEqual(resultObj);

  expect(base64Decoder.decodeString("IS0wLkBjQw==")).toBe("!-0.@cC");
  expect(
    base64Decoder.decodeStringArray(["Zm9v", "YmFy", "YmF6"])
  ).toStrictEqual(["foo", "bar", "baz"]);
  expect(base64Decoder.decodeObjectValues(testObj)).toStrictEqual(resultObj);
});

test("Tests output of EasyTriviaUtil.openTDBRequest()", () => {
  expect(openTDBRequest("")).rejects.toThrow();

  expect(openTDBRequest("...")).rejects.toThrow();

  // expect(openTDBRequest({} as unknown as string)).toThrow();

  // expect(openTDBRequest(1 as unknown as string)).rejects.toThrow();

  expect(openTDBRequest("")).rejects.toThrow();

  // expect(openTDBRequest('https://opentdb.com/api.php?amount=10').then(res => typeof res)).toBe({});
});

test("Tests output of EasyTriviaUtil.shuffleArray()", () => {
  expect(() => shuffleArray(0 as unknown as [])).toThrow(TypeError);
  expect(() => shuffleArray("" as unknown as [])).toThrow(TypeError);
  expect(() => shuffleArray("..." as unknown as [])).toThrow(TypeError);
  expect(() => shuffleArray(true as unknown as [])).toThrow(TypeError);
  expect(() => shuffleArray({} as unknown as [])).toThrow(TypeError);

  expect(shuffleArray(["foo", "bar", "baz"])).toBeInstanceOf(Array);
  expect(shuffleArray([0, 1, 2])).toBeInstanceOf(Array);
  expect(shuffleArray([{}, () => 1, false])).toBeInstanceOf(Array);
});
