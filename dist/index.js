"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("./src/classes/Category");
async function test() {
    try {
        await Category_1.default.getCategory(8);
    }
    catch (err) {
        throw err;
    }
}
test();
