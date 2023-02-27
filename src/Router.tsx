import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Play from "./Routes/Play";
import Rule from "./Routes/Rule";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="play" element={<Play />}></Route>
        <Route path="rule" element={<Rule />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
