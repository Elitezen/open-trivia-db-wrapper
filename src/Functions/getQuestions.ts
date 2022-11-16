import Constructor from "../classes/Constructor";
import OpenTDBError from "../classes/OpenTDBError";
import Util from "../classes/Util";
import { CategoryNames, QuestionDifficulties, QuestionEncodings, QuestionTypes, Routes } from "../typings/enums";
import type { ErrorResponse, QuestionOptions, RawQuestion, RawQuestionResponse } from "../typings/interface";

export default async function getQuestions(options?:Partial<QuestionOptions>) {
  let filledOptions:Partial<Pick<QuestionOptions, 'amount' | 'encode'>> = {};
  const optionDefaults:Pick<QuestionOptions, 'amount' | 'encode'> = {
    amount: 10,
    encode: 'none'
  }

  filledOptions = Util.assignDefaults(optionDefaults, options);
  const noEncoding = options?.encode === undefined || options.encode === 'none'

  if (noEncoding) filledOptions.encode = 'base64';

  const url = Util.createQueriedLink(Routes.Questions, filledOptions);
  
  try {
    const request = await Util.fetch<RawQuestionResponse>(url, true);
    let rawQuestions = request.results;
    let parsedQuestions:RawQuestion[] = []

    if (noEncoding && filledOptions.encode === 'base64') {
      parsedQuestions = Util.base64Decoder.decode<RawQuestion[]>(rawQuestions);
    }

    return Constructor.questions([...parsedQuestions]);
  } catch (err) {
    throw new OpenTDBError(err as ErrorResponse);
  }
}

getQuestions({
  amount: 1,
  category: CategoryNames["General Knowledge"],
  difficulty: QuestionDifficulties.Easy,
  type: QuestionTypes.Multiple,
  encode: QuestionEncodings.None
}).then(console.log);

// add session, Category data fetching