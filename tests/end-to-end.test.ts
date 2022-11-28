import Category from "../src/classes/Category";
import { CategoryData, Question } from "../src/typings/interfaces";
import getQuestions from "../src/functions/getQuestions";
import { QuestionDifficulties, QuestionEncodings } from "../src/typings/enums";

test('Tests Category.getCategory() with other members', async() => {
  const exampleCategoryData:CategoryData = {
    id: expect.any(Number),
    name: expect.any(String),
    questionCount: { 
      total: expect.any(Number), 
      easy: expect.any(Number), 
      medium: expect.any(Number), 
      hard: expect.any(Number) 
    }
  }
  const categoryName = Category.random('name');
  if (categoryName === null) throw '.decodeEncodedCategoryName() returned null with TXl0aG9sb2d5';
  const categoryData = await Category.getCategory(categoryName);

  expect(categoryData).toMatchObject<CategoryData>(exampleCategoryData)
});

test('Tests getQuestions() with other functions', async() => {
  const category = Category.random('id');
  console.log(category)

  const questions = await getQuestions({
    amount: 1,
    category,
    difficulty: QuestionDifficulties.Easy,
    type: 'multiple',
    encode: QuestionEncodings.None
  });

  const exampleQuestion:Question = {
    value: expect.any(String),
    category: {
      id: expect.any(Number),
      name: expect.any(String),
      getData: expect.any(Function)
    },
    type: 'multiple',
    difficulty: 'easy',
    correctAnswer: expect.any(String),
    incorrectAnswers: expect.anything(),
    allAnswers: expect.any(Array),
    checkAnswer: expect.any(Function)
  };

  expect(questions[0]).toMatchObject<Question>(exampleQuestion);
});