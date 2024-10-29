import { BrowserRouter as Router } from "react-router-dom";
import { AppPage } from "@components/layout/AppPage";
import { AppProvider } from "./context/AppContext";
import { GlobalStyles } from "./styles/global";

function App() {
  return (
    <AppProvider>
      <Router>
        <GlobalStyles />
        <AppPage />
      </Router>
    </AppProvider>
  );
}

export default App;
