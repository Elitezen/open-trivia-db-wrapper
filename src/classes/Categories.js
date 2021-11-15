const { EasyTriviaError } = require('../classes/Errors');

class Categories {
  static all = [
    'GENERAL_KNOWLEDGE',
    'ENTERTAINMENT_BOOKS',
    'ENTERTAINMENT_FILM',
    'ENTERTAINMENT_MUSIC',
    'ENTERTAINMENT_MUSICALS_AND_THEATRES',
    'ENTERTAINMENT_TELEVISION',
    'ENTERTAINMENT_VIDEO_GAMES',
    'ENTERTAINMENT_BOARD_GAMES',
    'SCIENCE_AND_NATURE',
    'SCIENCE_COMPUTERS',
    'SCIENCE_MATHEMATICS',
    'MYTHOLOGY',
    'SPORTS',
    'GEOGRAPHY',
    'HISTORY',
    'POLITICS',
    'ART',
    'CELEBRITIES',
    'ANIMALS',
    'VEHICLES',
    'ENTERTAINMENT_COMICS',
    'SCIENCE_GADGETS',
    'ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA',
    'ENTERTAINMENT_CARTOON_AND_ANIMATIONS'
  ];

  static names = {
    'GENERAL_KNOWLEDGE': 9,
    'ENTERTAINMENT_BOOKS': 10,
    'ENTERTAINMENT_FILM': 11,
    'ENTERTAINMENT_MUSIC': 12,
    'ENTERTAINMENT_MUSICALS_AND_THEATRES': 13,
    'ENTERTAINMENT_TELEVISION': 14,
    'ENTERTAINMENT_VIDEO_GAMES': 15,
    'ENTERTAINMENT_BOARD_GAMES': 16,
    'SCIENCE_AND_NATURE': 17,
    'SCIENCE_COMPUTERS': 18,
    'SCIENCE_MATHEMATICS': 19,
    'MYTHOLOGY': 20,
    'SPORTS': 21,
    'GEOGRAPHY': 22,
    'HISTORY': 23,
    'POLITICS': 24,
    'ART': 25,
    'CELEBRITIES': 26,
    'ANIMALS': 27,
    'VEHICLES': 28,
    'ENTERTAINMENT_COMICS': 29,
    'SCIENCE_GADGETS': 30,
    'ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA': 31,
    'ENTERTAINMENT_CARTOON_AND_ANIMATIONS': 32
  };


  static ids = {
    9:  'GENERAL_KNOWLEDGE',
    10: 'ENTERTAINMENT_BOOKS',
    11: 'ENTERTAINMENT_FILM',
    12: 'ENTERTAINMENT_MUSIC',
    13: 'ENTERTAINMENT_MUSICALS_AND_THEATRES',
    14: 'ENTERTAINMENT_TELEVISION',
    15: 'ENTERTAINMENT_VIDEO_GAMES',
    16: 'ENTERTAINMENT_BOARD_GAMES',
    17: 'SCIENCE_AND_NATURE',
    18: 'SCIENCE_COMPUTERS',
    19: 'SCIENCE_MATHEMATICS',
    20: 'MYTHOLOGY',
    21: 'SPORTS',
    22: 'GEOGRAPHY',
    23: 'HISTORY',
    24: 'POLITICS',
    25: 'ART',
    26: 'CELEBRITIES',
    27: 'ANIMALS',
    28: 'VEHICLES',
    29: 'ENTERTAINMENT_COMICS',
    30: 'SCIENCE_GADGETS',
    31: 'ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA',
    32: 'ENTERTAINMENT_CARTOON_AND_ANIMATIONS'
  };

  static async getCategoryData(arg) {
    const { _request } = require('../functions/private');

    let data = {};
    const baseUrl = 'https://opentdb.com/api_count.php?category=';
    const _inRange = (num) => num >= 9 && num <= 32;

    if (arg === undefined) throw new EasyTriviaError('Argument for arg is required', 'missing_argument');
    else if (typeof arg == 'number') {
      if (!_inRange(arg)) throw new EasyTriviaError(`Given number (${arg}) is not a valid id (range 9 - 32)`, 'invalid_id');
      data = await _request(baseUrl + arg);
    } else if (typeof arg == 'string') {
      const argInt = parseInt(arg);
      const argStr = Categories.names[arg];

      if (argStr) data = await _request(baseUrl + argStr);
      else if (!isNaN(argInt) && _inRange(argInt)) data = await _request(baseUrl + argInt);
      else throw new EasyTriviaError(`Cannot resolve "${arg}" into a trivia category`, 'invalid_category_name');
    } else {
      throw new EasyTriviaError(`Given argument (${arg}) is not of type string or number`, 'invalid_argument');
    }

    const { 
      category_id:id,
      category_question_count: {
        total_question_count:total,
        total_easy_question_count:forEasy,
        total_medium_question_count:forMedium,
        total_hard_question_count:forHard
      } 
    } = data;

    const result = {
      id,
      name: Categories.ids[id],
      questionCounts: {
        total,
        forEasy,
        forMedium,
        forHard
      }
    };

    return result;
  }

  static isCategoryResolvable(arg) {
    if (typeof arg == 'number') {
      if (Categories.ids[arg]) return true;
      return false;
    } else if (typeof arg == 'string') {
      const idByName = Categories.names[arg.toUpperCase()];
      if (idByName) return true;
      else if (!isNaN(+arg)) {
        const idByNumber = parseInt(arg);
        if (Categories.ids[idByNumber]) return true;
      } 
    } 

    return false;
  }

  static random() {
    return this.names[
      this.all[(Math.random() * this.all.length) << 0]
    ];
  }
}

module.exports = {
  Categories
};