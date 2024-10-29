import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppPage } from "@components/layout/AppPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
