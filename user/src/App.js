import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import UpdateContact from "./components/UpdateContact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/update/:id" element={<UpdateContact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
