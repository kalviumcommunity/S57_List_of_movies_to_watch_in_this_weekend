import { Route, Routes } from "react-router-dom";
import Firstpage from "./components/Firstpage";
import MovieBuff from "./components/MovieBuff";
import CreateMovie from "./components/createMovie";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Firstpage />}></Route>
        <Route path="/movies" element={<MovieBuff />}></Route>
        <Route path="/create" element={<CreateMovie />}></Route>
      </Routes>
    </>
  );
}
export default App;
