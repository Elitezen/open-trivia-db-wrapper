# 2.1.0
- Fixed a major issue in which library was untyped for VanillaJS.
- `QuestionOptions#token` -> `QuestionOptions#session`
- `QuestionOptions#session` now accepts an instance of Session
- Exported Types for TypeScript
- Adjusted README

# 2.0.0
- The entire library has been re-written in TypeScript, will still work with VanillaJS.
- Complete overhaul and refactor of functions and procedures.
- Constants have been changed to enums.
- Removed "Trivia" from all typing's names to make type/interface names less verbose.
- Some interfaces have been upgraded to generic interfaces.
- Categories -> Category
- Now a new class which can hold data and methods relating to a specific category. Click Here to see everything new.
- TriviaSession -> Session
- EasyTriviaResponseError -> OpenTDBResponse
- Private functions have been moved into Validator and EasyTriviaUtil classes
- EasyTriviaUtil now holds all utility functions for the library. Documentation is pending
- Base64Decoder has been moved into EasyTriviaUtil
- Validator now holds all checkX functions for validating given parameters. Documentation is pending
- /typings has been broken down: JSDOC comments are now along side their source. Types, Interfaces and Enums now have their own files.
- All functions have their own Jest test suits.
- Updated README to reflect this new information.