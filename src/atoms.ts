import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDarkMode",
  default: true,
});

interface IToken {
  role: string;
  team: string;
  id: number;
}

interface IBoardsTokens {
  [key: string]: IToken;
}

export const BoardsTokensState = atom<IBoardsTokens>({
  key: "tokens",
  default: {
    oneOne: { role: "將", team: "red", id: 6 },
    oneTwo: { role: "王", team: "red", id: 7 },
    oneThree: { role: "相", team: "red", id: 8 },
    twoOne: { role: "", team: "", id: 9 },
    twoTwo: { role: "子", team: "red", id: 10 },
    towThree: { role: "", team: "", id: 11 },
    threeOne: { role: "", team: "", id: 12 },
    threeTwo: { role: "子", team: "green", id: 13 },
    threeThree: { role: "", team: "", id: 14 },
    fourOne: { role: "相", team: "green", id: 15 },
    fourTwo: { role: "王", team: "green", id: 16 },
    fourThree: { role: "將", team: "green", id: 17 },
  },
});

interface IDa {
  [key: string]: IToken[];
}

export const DaState = atom<IDa>({
  key: "deadzoneTokens",
  default: {
    rda: [{ role: "", team: "red", id: 1 }],
    gda: [{ role: "", team: "green", id: 2 }],
  },
});

export const isGreenturn = atom({
  key: "isGreenturn",
  default: true,
});

export const errorMessage = atom({
  key: "errorMessage",
  default: "",
});
