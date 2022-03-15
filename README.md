# Easy Trivia 2.0.0

What will change:
- Entire re-write of the library in TypeScript.
- Entire refactor of classes, functions, typings and constants
- Categories() will become Category() which will be able to hold data about an individual category rather than being a class containing category related utility functions. This new class will still hold static members resembling the 1.0.0 functions and will even expand on them.

Basic Example:
```js
- const data = await Categories.getCategoryData(arg);

+ const myCategory = new Category('GENERAL_KNOWLEDGE');
+ const data = await myCategory.getData();

// myCategory.name
// myCategory.id
// myCategory.someFunction();
```
- Constants will be converted to [Enums](https://www.typescriptlang.org/docs/handbook/enums.html).
- Removed "Trivia" from all typing's names to make type/interface names less verbose.
- Some types/interfaces which were related to others will be converted to [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content).
- More Changes will be thought of and written here in the coming days.
- Discord Trivia will not launch prior to 2.0.0, This Easy Trivia Version will power Discord Trivia.