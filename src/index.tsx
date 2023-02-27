import ReactDOM from "react-dom/client";
import App from "./App";
import { Helmet } from "react-helmet";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <Helmet>
      <title>Twelve-Janggi</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap"
      />
    </Helmet>
    <App />
  </RecoilRoot>
);
