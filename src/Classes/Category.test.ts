import {
  CategoryName,
  CategoryNameResolvable,
  CategoryResolvable,
  NumberResolvable,
} from "../Typings/types";
import Category from "./Category";

const dummyFunction = () => {
  return void 0;
};

test("Ensure instance creations of Category throw errors when the argument is not a CategoryResolvable", () => {
  function createInstance(arg: unknown) {
    return new Category(arg as CategoryResolvable);
  }

  expect(() => createInstance(8)).toThrow(Error);
  expect(() => createInstance(33)).toThrow(Error);
  expect(() => createInstance("text")).toThrow(Error);
  expect(() => createInstance(true)).toThrow(Error);
  expect(() => createInstance({})).toThrow(Error);
});

test("Test outputs of Category.idToStrictName()", () => {
  expect(Category.idToStrictName(8)).toBe(null);
  expect(Category.idToStrictName(33)).toBe(null);
  expect(Category.idToStrictName("text" as NumberResolvable)).toBe(null);
  expect(Category.idToStrictName(true as unknown as NumberResolvable)).toBe(
    null
  );

  expect(Category.idToStrictName(9)).toBe("GENERAL_KNOWLEDGE");
  expect(Category.idToStrictName(18)).toBe("SCIENCE_COMPUTERS");
  expect(Category.idToStrictName("18")).toBe("SCIENCE_COMPUTERS");
  expect(Category.idToStrictName(32)).toBe(
    "ENTERTAINMENT_CARTOON_AND_ANIMATIONS"
  );
});

test("Test outputs of Category.idToPrettyName()", () => {
  expect(Category.idToPrettyName(8)).toBe(null);
  expect(Category.idToPrettyName(33)).toBe(null);
  expect(Category.idToPrettyName("text" as NumberResolvable)).toBe(null);
  expect(Category.idToPrettyName(true as unknown as NumberResolvable)).toBe(
    null
  );

  expect(Category.idToPrettyName(9)).toBe("General Knowledge");
  expect(Category.idToPrettyName(18)).toBe("Science: Computers");
  expect(Category.idToPrettyName("18")).toBe("Science: Computers");
  expect(Category.idToPrettyName(32)).toBe(
    "Entertainment: Cartoon and Animations"
  );
});

test("Test outputs of Category.nameToId()", () => {
  expect(Category.nameToId("8")).toBe(null);
  expect(Category.nameToId("33")).toBe(null);
  expect(Category.nameToId(15 as unknown as CategoryNameResolvable)).toBe(null);
  expect(Category.nameToId("text")).toBe(null);
  expect(Category.nameToId(true as unknown as CategoryNameResolvable)).toBe(
    null
  );

  expect(Category.nameToId("General Knowledge")).toBe(9);
  expect(Category.nameToId("GENERAL_KNOWLEDGE")).toBe(9);
  expect(Category.nameToId("Science: Computers")).toBe(18);
  expect(Category.nameToId("SCIENCE_COMPUTERS")).toBe(18);
  expect(Category.nameToId("Entertainment: Cartoon and Animations")).toBe(32);
  expect(Category.nameToId("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")).toBe(32);
});

test("Test outputs of Category.isIdResolvable()", () => {
  expect(Category.isIdResolvable("8")).toBe(false);
  expect(Category.isIdResolvable(8)).toBe(false);
  expect(Category.isIdResolvable("33")).toBe(false);
  expect(Category.isIdResolvable(33)).toBe(false);
  expect(Category.isIdResolvable("15")).toBe(true);
  expect(Category.isIdResolvable(15)).toBe(true);
  expect(Category.isIdResolvable("text" as NumberResolvable)).toBe(false);
  expect(Category.isIdResolvable(true as unknown as NumberResolvable)).toBe(
    false
  );

  expect(Category.isIdResolvable("General Knowledge" as NumberResolvable)).toBe(
    false
  );
  expect(Category.isIdResolvable("GENERAL_KNOWLEDGE" as NumberResolvable)).toBe(
    false
  );
});

test("Test outputs of Category.isNameResolvable()", () => {
  expect(Category.isNameResolvable("8")).toBe(false);
  expect(
    Category.isNameResolvable(8 as unknown as CategoryNameResolvable)
  ).toBe(false);
  expect(Category.isNameResolvable("33")).toBe(false);
  expect(
    Category.isNameResolvable(33 as unknown as CategoryNameResolvable)
  ).toBe(false);
  expect(Category.isNameResolvable("15")).toBe(false);
  expect(
    Category.isNameResolvable(15 as unknown as CategoryNameResolvable)
  ).toBe(false);
  expect(Category.isNameResolvable("text")).toBe(false);
  expect(Category.isNameResolvable(true as unknown as string)).toBe(false);

  expect(Category.isNameResolvable("General Knowledge")).toBe(true);
  expect(Category.isNameResolvable("GENERAL_KNOWLEDGE")).toBe(true);
  expect(
    Category.isNameResolvable("Entertainment: Cartoon and Animations")
  ).toBe(true);
  expect(
    Category.isNameResolvable("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")
  ).toBe(true);
});

test("Test outputs of Category.prettyToStrictName()", () => {
  expect(Category.prettyToStrictName("8" as CategoryName<"Pretty">)).toBe(null);
  expect(
    Category.prettyToStrictName(8 as unknown as CategoryName<"Pretty">)
  ).toBe(null);
  expect(Category.prettyToStrictName("33" as CategoryName<"Pretty">)).toBe(
    null
  );
  expect(
    Category.prettyToStrictName(33 as unknown as CategoryName<"Pretty">)
  ).toBe(null);
  expect(Category.prettyToStrictName("15" as CategoryName<"Pretty">)).toBe(
    null
  );
  expect(
    Category.prettyToStrictName(15 as unknown as CategoryName<"Pretty">)
  ).toBe(null);
  expect(Category.prettyToStrictName("text" as CategoryName<"Pretty">)).toBe(
    null
  );
  expect(
    Category.prettyToStrictName(true as unknown as CategoryName<"Pretty">)
  ).toBe(null);

  expect(Category.prettyToStrictName("General Knowledge")).toBe(
    "GENERAL_KNOWLEDGE"
  );
  expect(
    Category.prettyToStrictName("GENERAL_KNOWLEDGE" as CategoryName<"Pretty">)
  ).toBe(null);
  expect(
    Category.prettyToStrictName("Entertainment: Cartoon and Animations")
  ).toBe("ENTERTAINMENT_CARTOON_AND_ANIMATIONS");
  expect(
    Category.prettyToStrictName(
      "ENTERTAINMENT_CARTOON_AND_ANIMATIONS" as CategoryName<"Pretty">
    )
  ).toBe(null);
});

test("Test outputs of Category.strictToPrettyName()", () => {
  expect(Category.strictToPrettyName("8" as CategoryName<"Strict">)).toBe(null);
  expect(
    Category.strictToPrettyName(8 as unknown as CategoryName<"Strict">)
  ).toBe(null);
  expect(Category.strictToPrettyName("33" as CategoryName<"Strict">)).toBe(
    null
  );
  expect(
    Category.strictToPrettyName(33 as unknown as CategoryName<"Strict">)
  ).toBe(null);
  expect(Category.strictToPrettyName("15" as CategoryName<"Strict">)).toBe(
    null
  );
  expect(
    Category.strictToPrettyName(15 as unknown as CategoryName<"Strict">)
  ).toBe(null);
  expect(Category.strictToPrettyName("text" as CategoryName<"Strict">)).toBe(
    null
  );
  expect(
    Category.strictToPrettyName(true as unknown as CategoryName<"Strict">)
  ).toBe(null);

  expect(
    Category.strictToPrettyName("General Knowledge" as CategoryName<"Strict">)
  ).toBe(null);
  expect(Category.strictToPrettyName("GENERAL_KNOWLEDGE")).toBe(
    "General Knowledge"
  );
  expect(
    Category.strictToPrettyName(
      "Entertainment: Cartoon and Animations" as CategoryName<"Strict">
    )
  ).toBe(null);
  expect(
    Category.strictToPrettyName("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")
  ).toBe("Entertainment: Cartoon and Animations");
});
