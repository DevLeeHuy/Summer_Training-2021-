import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ProductList from "../models/ProductList";

export default function FavoriteListPage() {
  const { favoriteList } = useContext(UserContext);

  return (
    <div className="container mt-4">
      <ProductList productList={favoriteList} />
    </div>
  );
}
