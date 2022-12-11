import { ICommand } from "./ICommand";
import { Translate } from "./commands/Translate";
import { TranslateLanguages } from "./commands/TranslateLanguages";

export const Commands: ICommand[] = [Translate, TranslateLanguages];