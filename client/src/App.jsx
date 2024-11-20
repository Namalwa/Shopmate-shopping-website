import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Kids from "./pages/Kids";
import Accessories from "./pages/Accessories";
import Beauty from "./pages/Beauty";
import Men from "./pages/Men";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/accessories" element={<Accessories/>}/>
        <Route path="/beauty" element={<Beauty/>}/>
        <Route path="/men" element={<Men/>}/>
      </Routes>
    </Router>
  );
}

export default App;
