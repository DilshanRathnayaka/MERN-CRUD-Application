import { Routes,Route } from "react-router-dom";
import Edit from "./Components/Edit";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";


function App() {
  return (
    <div className="App">
      <NavBar/>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/update/:id" element={<Edit/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
