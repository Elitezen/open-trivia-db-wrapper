const { Base64Decoder } = require('../src/classes/Base64Decoder');

const testObj = {
  foo: 'YmFy',
  fiz: ['YnV6', 'YmF6'],
  val: null,
  childObj: {
    num: 10,
    bool: false,
    und: undefined
  }
};

const resObj = {
  foo: 'bar',
  fiz: ['buz', 'baz'],
  val: null,
  childObj:  {
    num: 10,
    bool: false,
    und: undefined
  }
};

test("Base64Decoder#atob() Converts 'SGVsbG8gV29ybGQh' to 'Hello World!'", () => {
  expect(Base64Decoder.atob('SGVsbG8gV29ybGQh')).toBe('Hello World!');
});

test('Base64Decoder#decode() Converts object values, strings, string array elements from Base64 to ASCII unless null, undefined, boolean or a number', () => {
  const testObj = {
    foo: 'YmFy',
    fiz: ['YnV6', 'YmF6'],
    val: null,
    childObj: {
      num: 10,
      bool: false,
      und: undefined
    }
  };

  const resObj = {
    foo: 'bar',
    fiz: ['buz', 'baz'],
    val: null,
    childObj:  {
      num: 10,
      bool: false,
      und: undefined
    }
  };
  
  expect(Base64Decoder.decode(null)).toBe(null);
  expect(Base64Decoder.decode(undefined)).toBe(undefined);
  expect(Base64Decoder.decode(true)).toBe(true);
  expect(Base64Decoder.decode('SGVsbG8gV29ybGQh')).toBe('Hello World!');
  expect(Base64Decoder.decode(testObj)).toStrictEqual(resObj);
});

test("Base64Decoder#decodeString() Decodes 'IS0wLkBjQw==' to '!-0.@cC'", () => {
  expect(Base64Decoder.decodeString('IS0wLkBjQw==')).toBe('!-0.@cC');
});

test("Base64Decoder#decodeStringArray() Decodes '['Zm9v', 'YmFy', 'YmF6']' to '['foo', 'bar', 'baz']'", () => {
  expect(Base64Decoder.decodeStringArray(['Zm9v', 'YmFy', 'YmF6'])).toStrictEqual(['foo', 'bar', 'baz']);
});

test("Base64Decoder#decodeObjectValues() Decodes a given object's value from Base64", () => {
  expect(Base64Decoder.decodeObjectValues(testObj)).toStrictEqual(resObj);
});