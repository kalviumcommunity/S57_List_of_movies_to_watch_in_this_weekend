import { Route, Routes } from "react-router-dom";
import Firstpage from "./components/Firstpage";
import MovieBuff from "./components/MovieBuff";
import CreateMovie from "./components/createMovie";
import "./App.css";
import EditMovie from "./components/editMovie";
import Signup from "./components/signup";
import Signin from "./components/signin";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Firstpage />}></Route>
        <Route path="/movies" element={<MovieBuff />}></Route>
        <Route path="/create" element={<CreateMovie />}></Route>
        <Route path="/editMovie/:id" element={<EditMovie />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </>
  );
}
export default App;
