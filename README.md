# Easy Trivia
![OpenTriviaDB](https://i.imgur.com/QBhF5aY.png)

Easy Trivia is a small, simple and fast wrapper for [Open Trivia Database](https://opentdb.com/) - A Free to use, user-contributed trivia question database - with type definitions. Works with CommonJS, ESModules and TypeScript.

Website And Documentation: https://easytrivia.js.org/ 

Guide by [Turtlepaw](https://github.com/Turtlepaw): https://easytrivia-guide.js.org/

# Installation
Ensure you are using Node version 14 or higher and that your enviroment contains the `https` module.
```sh-session
npm i easy-trivia
```

# 1.2.0
- ⭐ Official website with documentation is now up! 🥳🎉 https://easytrivia.js.org/ 
- ⭐ `Categories#random()` -> `Categories.random(arg?: CategoryResolvableType = 'ID'): CategoryName | number`

  You can now state what kind of resolvable you want to be randomly returned, `'NAME'` or `'ID'`
- 🛠️ This module now works with NodeJS 14.0 and higher
- 🐞 Fixed typo in the typings for `Categories.allNames`
- 🐞 Fixed the issue of trivia sessions not properly resetting
- 🚨 Attention Discord.JS users! [discord-trivia](https://github.com/Elitezen/discord-trivia) is nearing testing phase
- Join the Discord server for updates on Easy Trivia and upcoming Discord Trivia [Here!](https://discord.com/invite/wtwM4HhbAr)

# Usage
The following examples make use of the [Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) syntax. Ensure you are inside an async function, otherwise use promise callbacks.

## Fetching Questions Example
```js
import { getQuestions } from 'easy-trivia';

const questions = await getQuestions({
  amount: 50,
  difficulty: 'easy',
  type: 'multiple',
  category: 'history'
});

console.log(questions);
```
### Result
<details>
  <summary>Click to expand!</summary>

  ```js
[
   {
      value: 'In any programming language, what is the most common way to iterate through an array?',
      category: 'Science: Computers',
      difficulty: 'easy',
      type: 'multiple',
      correctAnswer: "'For' loops",
      incorrectAnswers: [ "'If' Statements", "'Do-while' loops", "'While' loops" ],
      allAnswers: [
         "'For' loops",
         "'If' Statements",
         "'Do-while' loops",
         "'While' loops"
      ],
      checkAnswer: [Function: checkAnswer]
   }
   ...
]
```

</details>


## Fetching Questions From a Random Category
```js
import { Categories, getQuestions } from 'easy-trivia';

const questions = await getQuestions({
  amount: 1,
  difficulty: 'easy',
  category: Categories.random()
});

console.log(questions[0]);
```
### Result
<details>
  <summary>Click to expand!</summary>

  ### Result
```js
{
  value: 'The Canadian $1 coin is colloquially known as a what?',
  category: 'General Knowledge',
  difficulty: 'easy',
  type: 'multiple',
  correctAnswer: 'Loonie',
  incorrectAnswers: [ 'Boolie', 'Foolie', 'Moodie' ],
  allAnswers: [ 'Boolie', 'Loonie', 'Foolie', 'Moodie' ],
  checkAnswer: [Function: checkAnswer]
}
```

</details>

## Using Session Tokens to Prevent Duplicate Questions Throughout Multiple Calls
In respect to the API, it is recommended you generate and save 1 session token for use when testing.

```js
import { Categories, TriviaSession, getQuestions } from 'easy-trivia';

const session = new TriviaSession();
const sessionToken = await session.start();

const batch1 = await getQuestions({
  amount: 10,
  category: Categories.categoryByName('SCIENCE_COMPUTERS'),
  difficulty: 'hard',
  token: sessionToken
});

const batch2 = await getQuestions({
  amount: 10,
  category: Categories.categoryByName('SCIENCE_COMPUTERS'),
  difficulty: 'hard',
  token: sessionToken
});

session.end();
```

## Getting Data About a Trivia Category
```js
import { Categories } from 'easy-trivia';

const categoryData = await Categories.getCategoryDat('GENERAL_KNOWLEDGE');

console.log(categoryData);
```

### Result
<details>
  <summary>Click to expand!</summary>
  
  ```js
  {
    id: 9,
    name: 'GENERAL_KNOWLEDGE',
    questionCounts: { 
      total: 298, 
      forEasy: 116, 
      forMedium: 123, 
      forHard: 59 
    }
  }
  ```
</details>

# Choose From 23 Categories
## Easy Trivia Provides Typings and Constants For OpenTDB's 23 Categories
```js
import { Categories } from 'easy-trivia';

console.log(Categories.allNames);

console.log(Categories.categoryByName('GENERAL_KNOWLEDGE'));
// 9 - The category's API id.

console.log(Categories.categoryById(9));
// 'GENERAL_KNOWLEDGE'
```

### Result
<details>
  <summary>Click to expand!</summary>
  
  ```js
  [
    'GENERAL_KNOWLEDGE',
    'ENTERTAINMENT_BOOKS',
    'ENTERTAINMENT_FILM',
    'ENTERTAINMENT_MUSIC',
    'ENTERTAINMENT_MUSICALS_AND_THEATRES',
    'ENTERTAINMENT_TELEVISION',
    'ENTERTAINMENT_VIDEO_GAMES',
    ...
  ]
  ```
</details>

# Full Categories List
<details>
  <summary>Click to expand!</summary>

  1. `GENERAL_KNOWLEDGE`
2. `ENTERTAINMENT_BOOKS`
3. `ENTERTAINMENT_FILM`
4. `ENTERTAINMENT_MUSIC`
5. `ENTERTAINMENT_MUSICALS_AND_THEATRES`
6. `ENTERTAINMENT_TELEVISION`
7. `ENTERTAINMENT_VIDEO_GAMES`
8. `ENTERTAINMENT_BOARD_GAMES`
9. `SCIENCE_AND_NATURE`
10. `SCIENCE_COMPUTERS`
11. `SCIENCE_MATHEMATICS`
12. `MYTHOLOGY`
13. `SPORTS`
14. `GEOGRAPHY`
15. `HISTORY`
16. `POLITICS`
17. `ART`
18. `CELEBRITIES`
19. `ANIMALS`
20. `VEHICLES`
21. `ENTERTAINMENT_COMICS`
22. `SCIENCE_GADGETS`
23. `ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA`
24. `ENTERTAINMENT_CARTOON_AND_ANIMATIONS`

</details>

# Utilize 4 Different Encodings
```js
import { Encodings } from 'easy-trivia';

console.log(Encodings);
```
### Result
<details>
  <summary>Click to expand!</summary>

  ```js
  {
    NONE: 'none',
    BASE64: 'base64',
    URL3986: 'url3986',
    URL_LEGACY: 'urlLegacy'
  }
  ```
</details>

# Documentation
Documentation is available at [https://easytrivia.js.org/](Here), this is still a work in progress. 
