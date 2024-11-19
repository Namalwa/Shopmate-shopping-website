import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Kids from "./pages/Kids";
import Accessories from "./pages/Accessories";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/accessories" element={<Accessories/>}/>

        <Route path="/kids/games" element={<div>Games Section</div>} />
        <Route path="/kids/stories" element={<div>Stories Section</div>} />
        <Route path="/kids/learning" element={<div>Learning Section</div>} />
        <Route
          path="/kids/activities"
          element={<div>Activities Section</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
