import React, { useEffect, useState } from "react";
import categoryApi from "../../api/categoryApi";

export const CategoryContext = React.createContext();

export default function CategoryContextProvider(props) {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const categories = await categoryApi.getAll();
        setCategoryList(categories);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const CategoryData = { categoryList };
  return (
    <CategoryContext.Provider value={CategoryData}>
      {props.children}
    </CategoryContext.Provider>
  );
}
