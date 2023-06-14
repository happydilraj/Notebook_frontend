import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Component/Navbar";
import { Home } from "./Component/Home";
import NoteState from "./Context/NoteState";
import { Alert } from "./Component/Alert";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import AlertState from "./Context/AlertState";

function App() {
  return (
    <NoteState>
      <AlertState>
      <Router>
        <Navbar/>
        <Alert/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
      </AlertState>
    </NoteState>
  );
}

export default App;
