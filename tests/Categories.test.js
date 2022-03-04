const { Categories } = require('../src/classes/Categories');

test("Categories#categoryByName() Resolves a category name into it's respective id", () => {
  expect(Categories.categoryByName('GENERAL_KNOWLEDGE')).toBe(9);
  expect(Categories.categoryByName('ENTERTAINMENT_CARTOON_AND_ANIMATIONS')).toBe(32);
  expect(Categories.categoryByName('test')).toBe(null);
});

test("Categories#categoryById() Resolves a category id into it's respective name", () => {
  expect(Categories.categoryById(9)).toBe('GENERAL_KNOWLEDGE');
  expect(Categories.categoryById(32)).toBe('ENTERTAINMENT_CARTOON_AND_ANIMATIONS');
  expect(Categories.categoryById(0)).toBe(null);
});

test("Categories#getCategoryData() Returns category data", () => {
  const res = expect(Categories.getCategoryData(9)).resolves;

  res.toBeInstanceOf(Object);
  ['id', 'name', 'questionCounts'].every(key => res.toHaveProperty(key));
});

test("", () => {
  expect(Categories.isCategoryResolvable(9)).toBe(true);
  expect(Categories.isCategoryResolvable('17')).toBe(true);
  expect(Categories.isCategoryResolvable('')).toBe(true);
  expect(Categories.isCategoryResolvable('test')).toBe(false);
});