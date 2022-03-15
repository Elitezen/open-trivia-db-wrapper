import { CategoryName, CategoryResolvable, NumberResolvable } from "../Typings/types";
export default class Category {
    readonly id: number;
    readonly strictName: CategoryName<"Strict">;
    readonly prettyName: CategoryName<"Pretty">;
    static readonly allNames: ("GENERAL_KNOWLEDGE" | "ENTERTAINMENT_BOOKS" | "ENTERTAINMENT_FILM" | "ENTERTAINMENT_MUSIC" | "ENTERTAINMENT_MUSICALS_AND_THEATRES" | "ENTERTAINMENT_TELEVISION" | "ENTERTAINMENT_VIDEO_GAMES" | "ENTERTAINMENT_BOARD_GAMES" | "SCIENCE_AND_NATURE" | "SCIENCE_COMPUTERS" | "SCIENCE_MATHEMATICS" | "MYTHOLOGY" | "SPORTS" | "GEOGRAPHY" | "HISTORY" | "POLITICS" | "ART" | "CELEBRITIES" | "ANIMALS" | "VEHICLES" | "ENTERTAINMENT_COMICS" | "SCIENCE_GADGETS" | "ENTERTAINMENT_JAPANESE_ANIME_AND_MANGA" | "ENTERTAINMENT_CARTOON_AND_ANIMATIONS")[];
    constructor(arg: CategoryResolvable);
    static idToStrictName(arg: NumberResolvable): CategoryName<"Strict"> | null;
    static idToPrettyName(arg: NumberResolvable): CategoryName<"Pretty"> | null;
    static nameToId(arg: CategoryName<"Pretty" | "Strict">): number | null;
    static isIdResolvable(arg: NumberResolvable): boolean;
    static isNameResolvable(arg: string): boolean;
    static prettyToStrictName(arg: CategoryName<"Pretty">): CategoryName<"Strict"> | null;
    static strictToPrettyName(arg: CategoryName<"Strict">): CategoryName<"Pretty"> | null;
}
