import Category from "./src/classes/Category";

async function test() {
  try {
    await Category.getCategory(8)
  } catch (err) {
    throw err;
  }
}

test();