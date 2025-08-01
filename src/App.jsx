import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PoliceDashboard from "./pages/PoliceDashboard";
import PublicPortal from "./pages/PublicPortal";
import RecordDetails from "./pages/RecordDetails";
import AddEditRecord from "./pages/AddEditRecord";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/police" element={<PoliceDashboard />} />
        <Route path="/public" element={<PublicPortal />} />
        <Route path="/record/:id" element={<RecordDetails />} />
        <Route path="/add" element={<AddEditRecord />} />
      </Routes>
    </Router>
  );
}

export default App;