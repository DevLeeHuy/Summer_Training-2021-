import Browser from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import UserContextProvider from "./components/contexts/UserContext";
import CartContextProvider from "./components/contexts/CartContext";
import ProductListContextProvider from "./components/contexts/ProductListContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <CartContextProvider>
            <ProductListContextProvider>
              <Navbar />
              <Browser />
              <Footer />
            </ProductListContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
