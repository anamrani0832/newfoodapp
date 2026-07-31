import React from "react";
import Item from "./Item";

function ItemList({ food, isLoading }) {
  if (isLoading) {
    return <p>Loading ingredients...</p>;
  }

  return (
    <div>
      {food.extendedIngredients?.map((item) => (
        <Item item={item} />
      ))}
    </div>
  );
}

export default ItemList;
