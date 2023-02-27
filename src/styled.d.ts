import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    btLikeBgColor: string;
    btLikeTextColor: string;
    toggleBoxColor: string;
    toggleCircleColor: string;
    greenTeam: string;
    redTeam: string;
  }
}
