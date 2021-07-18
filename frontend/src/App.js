import MainRouter from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";

import UserContextProvider from "./components/contexts/UserContext";
import CartContextProvider from "./components/contexts/CartContext";
import ProductListContextProvider from "./components/contexts/ProductListContext";
import CategoryContextProvider from "./components/contexts/CategoryContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <ProductListContextProvider>
            <CartContextProvider>
              <CategoryContextProvider>
                <MainRouter />
              </CategoryContextProvider>
            </CartContextProvider>
          </ProductListContextProvider>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
