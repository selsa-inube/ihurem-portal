import { BrowserRouter as Router } from "react-router-dom";
import { AppPage } from "@components/layout/AppPage";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <AppPage />
      </Router>
    </AppProvider>
  );
}

export default App;
