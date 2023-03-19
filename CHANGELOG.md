# Changelog

# 2.1.4
- Reverted to `node-fetch` for Node versions < 18

# 2.1.1 - 2.1.3
- Inconsistency fixes and other minor bug fixes

# 2.1.0
- Boolean questions now return their incorrect answer as a BooleanString and not a string[]

- Question type now takes a generic of type QuestionTypes | unknown. Default is unknown

- Created typings for correct and incorrect values.

- Included URL for Session.reset() as it was missing.

# 2.0.0 
- The library received a massive rework through many quality of life changes. 

- 'Static' and 'Pretty' category names are no more, developers will no longer have to worry about converting through these formats. 

- All QuestionOption option types now have respective enums to work with.

- `Category` is now just a class with various static methods for working with categories.

## 1.0.2
- Switched from https module to Node Fetch API