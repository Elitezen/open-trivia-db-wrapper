import { CategoryName, CategoryNameResolvable, CategoryNameVersion, CategoryResolvable, NumberResolvable } from "../Typings/types";
import { EasyTriviaError } from "./Errors";

export default class Category {
  public readonly id: number;
  public readonly strictName: CategoryName<"Strict">;
  public readonly prettyName: CategoryName<"Pretty">;
  public static readonly allNames = Object.keys(CategoryNamesStrict) as CategoryName<"Strict">[];

  constructor(arg:CategoryResolvable) {
    if (Category.isIdResolvable(arg as NumberResolvable)) {
      this.id = Number(arg);
    } else if (Category.isNameResolvable(arg as CategoryNameResolvable)) {
      this.id = Category.nameToId(arg as CategoryNameResolvable)!;
    } else {
      throw new EasyTriviaError('Given argument could not be resolved into a category', EasyTriviaError.errors.headers.INVALID_CONSTRUCTOR_ARG);
    }

    this.strictName = Category.idToStrictName(this.id)!;
    this.prettyName = Category.idToPrettyName(this.id)!;
  }

  public static idToStrictName(arg:NumberResolvable):CategoryName<"Strict"> | null {
    if (!this.isIdResolvable(arg)) return null;
    return this.allNames[Number(arg)] as CategoryName<"Strict">;
  }

  public static idToPrettyName(arg:NumberResolvable):CategoryName<"Pretty"> | null {
    if (!this.isIdResolvable(arg)) return null;
    const strictName = this.allNames[Number(arg)] as CategoryName<"Strict">;
    return this.strictToPrettyName(strictName);
  }

  public static nameToId(arg:CategoryName<"Pretty" | "Strict">):number | null {
    return (CategoryNamesStrict[arg as CategoryName<"Strict">] 
    || CategoryNamesPretty[arg as CategoryName<"Pretty">]) 
    || null;
  }

  public static isIdResolvable(arg:NumberResolvable):boolean {
    return !isNaN(+arg) && (9 <= arg && arg <= 32);
  }

  public static isNameResolvable(arg:string):boolean {
    return this.allNames.includes(arg as CategoryName<"Strict">) ||
    this.allNames.includes(this.prettyToStrictName(arg as CategoryName<"Pretty">)!);
  }

  public static prettyToStrictName(arg:CategoryName<"Pretty">):CategoryName<"Strict"> | null {
    return this.idToStrictName(CategoryNamesPretty[arg]);
  }

  public static strictToPrettyName(arg:CategoryName<"Strict">):CategoryName<"Pretty"> | null {
    const id = CategoryNamesStrict[arg] as number;
    const entries = Array.from(Object.entries(CategoryNamesPretty)) as [CategoryName<"Pretty">, number][];
    const entry = entries.find(e => e[1] == id);

    return entry ? entry[0] : null;
  }
}

console.log('Hit')