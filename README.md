![OpenTriviaDB](https://i.imgur.com/QBhF5aY.png)

**open-trivia-db** is a small, simple and fast wrapper for [Open Trivia Database](https://opentdb.com/) - A Free to use, user-contributed trivia question database. Built with TypeScript, works with VanillaJS.

Documentation: https://github.com/Elitezen/open-trivia-db-wrapper/wiki/Documentation

Live Demo: https://replit.com/@Elitezenv/open-trivia-db-DEMO?v=1

Support me: https://www.paypal.com/paypalme/alejandromuratalla

## Updates
### 1.0.2
- Switched from https module to Node Fetch API (now requires Node 18)

# Installation
Ensure you are using Node version 14 or higher and that your enviroment contains the `https` module.
```sh-session
npm i open-trivia-db // Requires NodeJS 18 or higher

npm i open-trivia-db@1.0.1 // Below NodeJS 18
```

# Example Usage
The following examples make use of the [Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) syntax. Ensure you are inside an async function, otherwise use promise callbacks.

## Fetching Questions
You can provide `QuestionOptions` to describe the type of questions you want to recieve.
```js
import { Category, getQuestions } from 'open-trivia-db';

const questions = await getQuestions({
  amount: 50, // 1 - 50
  difficulty: 'easy', // or 'medium' or 'hard'
  type: 'multiple', // or 'boolean (true/false)
  category: Category.allNames.SCIENCE_COMPUTERS
});
```
### Output
<details>
  <summary>Click to view</summary>

  ```js
[
	{
   	value: 'What is the code name for the mobile operating system Android 7.0?',
		category: 'Science: Computers',
		type: 'multiple',
		difficulty: 'easy',
		correctAnswer: 'Nougat',
		incorrectAnswers: [ 'Ice Cream Sandwich', 'Jelly Bean', 'Marshmallow' ],
		allAnswers: [ 'Nougat', 'Jelly Bean', 'Marshmallow', 'Ice Cream Sandwich' ],
		checkAnswer: [Function: checkAnswer]
	}

   ...
]
```

</details>
<hr>

## Working With Categories

### Creating Categories with Resolvables

You can generate a category class by providing a CategoryResolvable which includes a category's name or id. An instance of Category will allow you to fetch category data and questions relating to the provided resolvable.
```js
let myCategory = new Category(9);

myCategory = new Category('GENERAL_KNOWLEDGE');

myCategory = new Category(Category.allNames.GENERAL_KNOWLEDGE);
```

<hr>

### Fetching a Category's API Data

```js
const data = await myCategory.getData();
```

### Output
<details>
  <summary>Click to view</summary>

  ```js
	{
		id: 9,
		name: 'General Knowledge',
		questionCounts: { 
			total: 298, 
			forEasy: 116, 
			forMedium: 123, 
			forHard: 59 
		}
	}
  ```

</details>
<hr>

### Fetching Questions From a Category
```js
const questions = await myCategory.fetchQuestions({
	amount: 1,
	difficulty: 'hard'
});

// Same outputs as getQuestions()
```

You can always get information relating to a category by simply passing a resolvable into `getQuestions()` and `getCategoryData()`

```js
getQuestions({
	category: 9
});

getCategoryData('GENERAL_KNOWLEDGE');

// Same as myCategory.fetchQuestions() and .getData()
```

<hr>

## Using Sessions
A session ensures you do not get duplicate questions.

```js
import { Category, Session, getQuestions } from 'open-trivia-db';

const session = new Session();
await session.start();


const batch1 = await getQuestions({
  amount: 10,
  category: Category.random(),
  difficulty: 'hard',
  session
});

const batch2 = await getQuestions({
  amount: 10,
  category: Category.random(),
  difficulty: 'hard',
  session
});


const completeBatch = [...batch1, ...batch2]; // All unique!
session.end();
```

**Note:** In respect to the API, it is recommended you generate and save 1 session token for use when testing.

# Documentation
Documentation has been moved to a GitHub Wiki page:

https://github.com/Elitezen/open-trivia-db-wrapper/wiki/Documentation

# Support Me
Any tip is greatly appreciated 😀
https://www.paypal.com/paypalme/alejandromuratalla
