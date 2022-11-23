import Category from'../../src/classes/Category';
import OpenTDBError from '../../src/classes/OpenTDBError';
import { CategoryData } from '../../src/typings/interface';

function testRandomInputs(func:(args:any) => any, expected:any, inputs:unknown[]) {
  inputs.forEach(elm => {
    expect(func(elm)).toBe(expected)
  });
}

test('Verify length off Category.allNames to be 24', () => {
  expect(Category.allNames.length).toBe(24);
});

test('Verify every item in Category.allNames is a string', () => {
  expect(Category.allNames.every(val => isNaN(+val))).toBe(true);
});

test('Check outputs of Category.getCategory', async() => {
  const data = await Category.getCategory(9);
  expect(data).toMatchObject<CategoryData>({
    ...data
  });

  const data1 = await Category.getCategory(32);
  expect(data1).toMatchObject<CategoryData>({
    ...data1
  });

  await expect(Category.getCategory(8)).rejects.toBeInstanceOf(TypeError);

  // @ts-ignore
  await expect(Category.getCategory('foobar')).rejects.toBeInstanceOf(TypeError);

  // @ts-ignore
  await expect(Category.getCategory(null)).rejects.toBeInstanceOf(TypeError);

  // @ts-ignore
  await expect(Category.getCategory(undefined)).rejects.toBeInstanceOf(TypeError);

  // @ts-ignore
  await expect(Category.getCategory(true)).rejects.toBeInstanceOf(TypeError);
});

test('Check outputs of Category.idByName()', () => {
  expect(Category.idByName('General Knowledge'))
    .toBe(9);
  expect(Category.idByName('Entertainment: Cartoon & Animations'))
    .toBe(32);

  testRandomInputs(Category.idByName, null, ['foobar', 9, true, [], {}, Category.idByName, new Category(), null, undefined]);
});

test('Check outputs of Category.nameById()', () => {
  expect(Category.nameById(9))
    .toBe('General Knowledge');
  expect(Category.nameById(32))
    .toBe('Entertainment: Cartoon & Animations');
  
    testRandomInputs(Category.nameById, null, [8, 33, true, [], {}, Category.nameById, new Category(), null, undefined])
});

test('Check outputs of Category.decodeEncodedCategoryName()', () => {
  expect(Category.decodeEncodedCategoryName('General Knowledge'))
    .toBe('General Knowledge');
  expect(Category.decodeEncodedCategoryName('Entertainment: Cartoon & Animations'))
    .toBe('Entertainment: Cartoon & Animations');

  expect(Category.decodeEncodedCategoryName('Entertainment%3A%20Cartoon%20%26%20Animations'))
    .toBe('Entertainment: Cartoon & Animations');
  expect(Category.decodeEncodedCategoryName('General%20Knowledge'))
    .toBe('General Knowledge');

  expect(Category.decodeEncodedCategoryName('General+Knowledge'))
    .toBe('General Knowledge');
  expect(Category.decodeEncodedCategoryName('Entertainment%3A+Cartoon+%26+Animations'))
    .toBe('Entertainment: Cartoon & Animations');

  expect(Category.decodeEncodedCategoryName('R2VuZXJhbCBLbm93bGVkZ2U='))
    .toBe('General Knowledge');
  expect(Category.decodeEncodedCategoryName('RW50ZXJ0YWlubWVudDogQ2FydG9vbiAmIEFuaW1hdGlvbnM='))
    .toBe('Entertainment: Cartoon & Animations');

  testRandomInputs(Category.decodeEncodedCategoryName, null, ['foobar'])
});