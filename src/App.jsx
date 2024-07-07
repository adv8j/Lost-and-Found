import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Lost from "./pages/Lost";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Found from "./pages/Found";
import LostList from "./pages/LostList";
import FoundList from "./pages/FoundList";
import ProtectedRoutes from "./ProtectedRoutes";
function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/lost" element={<Lost />}></Route>
          <Route path="/found" element={<Found />}></Route>
          <Route path="/lostlist" element={<LostList />}></Route>
          <Route path="/foundlist" element={<FoundList />}></Route>
        </Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
