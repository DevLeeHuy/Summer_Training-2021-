import Browser from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import UserContextProvider from "./components/contexts/UserContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <Navbar />
          <Browser />
          <Footer />
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
