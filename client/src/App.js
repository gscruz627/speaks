import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

function App() {

  return (
    <div className="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> } />
        </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App;
