import React, { useState, useEffect } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "be5a38988ea84ae1a079929f9b77507a";

  useEffect(() => {
    async function fetchFood() {
      setIsLoading(true);
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }

    if (foodId) fetchFood();
  }, [foodId]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img
          className={styles.recipeImage}
          src={food.image}
          alt={food.title || ""}
        />

        <div className={styles.recipeDetails}>
          <span>
            <strong>⌚ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-Vegetarian"}
            </strong>
          </span>
          {food.vegan && (
            <span>
              <strong>🌱 Vegan</strong>
            </span>
          )}
        </div>

        <div>
          <span>
            <strong>
              ${(food.pricePerServing / 100).toFixed(2)} Per Serving
            </strong>
          </span>
        </div>

        <h2>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading} />

        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          {isLoading ? (
            <p>Loading...</p>
          ) : food.analyzedInstructions?.[0]?.steps ? (
            <ol>
              {food.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            <p>No instructions available for this recipe.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
