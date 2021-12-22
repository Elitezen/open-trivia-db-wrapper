const { Categories } = require('../src/classes/Categories');

test("Categories#categoryByName() Resolves a category name into it's respective id", () => {
  expect(Categories.categoryByName('GENERAL_KNOWLEDGE')).toBe(9);
  expect(Categories.categoryByName('ENTERTAINMENT_CARTOON_AND_ANIMATIONS')).toBe(32);
  expect(Categories.categoryByName('test')).toBe(null);
});

test("Categories#categoryById() Resolves a category id into it's respective name", () => {
  expect(Categories.categoryByName(9)).toBe('GENERAL_KNOWLEDGE');
  expect(Categories.categoryByName(32)).toBe('ENTERTAINMENT_CARTOON_AND_ANIMATIONS');
  expect(Categories.categoryByName(0)).toBe(null);
});