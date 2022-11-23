import Constructor from "../classes/Constructor";
import OpenTDBError from "../classes/OpenTDBError";
import Util from "../classes/Util";
import {
  CategoryNames,
  QuestionDifficulties,
  QuestionEncodings,
  QuestionTypes,
  Routes,
} from "../typings/enums";
import type {
  ErrorResponse,
  QuestionOptions,
  RawQuestion,
  RawQuestionResponse,
} from "../typings/interface";

export default async function getQuestions(options?: Partial<QuestionOptions>) {
  let filledOptions: Partial<
    Pick<QuestionOptions, "amount" | "encode"> & { token?: string | null }
  > = {};
  const optionDefaults: Pick<QuestionOptions, "amount" | "encode"> = {
    amount: 10,
    encode: "none",
  };

  const session = options?.session;
  delete options?.session;
  filledOptions = Util.assignDefaults(optionDefaults, options);
  const noEncoding = options?.encode === undefined || options.encode === "none";

  if (noEncoding) filledOptions.encode = "base64";
  if (session) {
    if (typeof session === "string") {
      filledOptions.token = session;
    } else {
      session.assert();
      filledOptions.token = session.token;
    }
  }

  const url = Util.createQueriedLink(Routes.Questions, filledOptions);

  try {
    const request = await Util.fetch<RawQuestionResponse>(url, true);
    let rawQuestions = request.results;
    let parsedQuestions: RawQuestion[] = [];

    if (noEncoding && filledOptions.encode === "base64") {
      parsedQuestions = Util.base64Decoder.decode<RawQuestion[]>(rawQuestions);
    }

    const suppliedData = !noEncoding ? rawQuestions : parsedQuestions;

    return Constructor.questions([...suppliedData]);
  } catch (err) {
    throw new OpenTDBError(err as ErrorResponse);
  }
}

(async () => {
  const data = await getQuestions({
    amount: 1,
    category: CategoryNames["Entertainment: Cartoon & Animations"],
    difficulty: QuestionDifficulties.Easy,
    type: QuestionTypes.Multiple,
    encode: QuestionEncodings.None,
  });

  console.log(await data[0].category.getData());
})();
