import { Route, Routes } from "react-router-dom";
import Firstpage from "./components/Firstpage";
import MovieBuff from "./components/MovieBuff";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Firstpage />}></Route>
        <Route path="/movies" element={<MovieBuff />}></Route>
      </Routes>
    </>
  );
}
export default App;
