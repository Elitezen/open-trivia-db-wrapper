![OpenTriviaDB](https://i.imgur.com/QBhF5aY.png)

![version](https://img.shields.io/npm/v/open-trivia-db)
![downloads](https://img.shields.io/npm/dm/open-trivia-db)
![minisize](https://img.shields.io/bundlephobia/min/open-trivia-db)
![types](https://img.shields.io/npm/types/open-trivia-db)

`open-trivia-db` is a small and simple library for interacting with the [OpenTDB](https://opentdb.com/) API.

Live Demo: https://replit.com/@Elitezenv/open-trivia-db-DEMO?v=1

## Updates (2.0.0)
- The library received a massive rework through many quality of life changes. 

- 'Static' and 'Pretty' category names are no more, developers will no longer have to worry about converting through these formats. 

- All QuestionOption option types now have respective enums to work with.

- `Category` is now just a class with various static methods for working with categories.


## Example Code
```js
import { getQuestions, CategoryNames } from "open-trivia-db";

const questions = await getQuestions({
  amount: 10,
  category: CategoryNames.Animals,
  difficulty: QuestionDifficulties.Easy,
})
```

## Result
```js
[
  {
    value: 'How many teeth does an adult rabbit have?',
    category: { id: 27, name: 'Animals', getData: [Function: getData] },
    type: 'multiple',
    difficulty: 'easy',
    correctAnswer: '28',
    incorrectAnswers: [ '30', '26', '24' ],
    allAnswers: [ '24', '28', '30', '26' ],
    checkAnswer: [Function: checkAnswer]
  }
  ...
]
```

# Guide
## Getting Questions

Questions can be fetched via the `getQuestions()` function by supplying options such as `amount`, `category`, `difficulty`, `type`, `session` and `encode`.

`type`: The kind of questions, such as multiple choice (`"multiple"`) or true/false (`"boolean"`).

`session`: A session instance or session token. [Learn about sessions](#sessions)

`encode`: The encoding of the questions such as `base64`, `urlLegacy`, `url3968` or `none` which is the default.

You can apply options via their respective enums.

The result will be an array of questions.

```js
import { 
  CategoryNames, 
  QuestionDifficulties, 
  QuestionTypes, 
  QuestionEncodings 
} from "open-trivia-db";

getQuestions({
  amount: 50,
  category: CategoryNames["Entertainment: Japanese Anime & Manga"],
  difficulty: QuestionDifficulties.Hard,
  type: QuestionTypes.Multiple,
  encode: QuestionEncodings.None
})
```

## Getting Categories and Category Data
<hr>

A category resolvable can either be a category name or id. Category id's range from 9-32 inclusive, for there are 23 categories.

To jump between resolvables, use `Category.idByName()` and `Category.nameById()`.

```js
import { Category, CategoryNames } from "open-trivia-db";

Category.idByName('Art'); // 25
Category.nameById(25); // 'Art'
```

### Getting a Category's Data
Use `Category.getCategory()` to get a category's data such as name, id, and question counts.

```js
import { Category, CategoryNames } from "open-trivia-db"

Category.getCategory(CategoryNames.Geography)
  .then(console.log)
```

```js
{
  id: 22,
  name: 'Geography',
  questionCount: { 
    total: 275, 
    easy: 80, medium: 139, hard: 56 
  }
}
```

You can also complete a category's data through a question via `Question.category.getData()`

```js
const targetQuestion = questions[0] // from getQuestions()

targetQuestion.category.getData()
  .then(console.log)
```

## Sessions
A session ensures you are not supplied a question more than once throughout it's lifetime.

Initialize a session and supply the instance into `getQuestions()`. Make sure to await or resolve `Session.start()`.
```js
import { Session } from "open-trivia-db"

const mySession = new Session();
await mySession.start();

getQuestions({
  session: mySession
})
```

`getQuestions()` will return an error once your session has served every single question in OpenTDB. Don't worry, theres thousands of questions! You will likely never come accross a session's end. However, if you wish to reset your session, use `Session.reset()`.

```js
await mySession.reset();
```

<hr>