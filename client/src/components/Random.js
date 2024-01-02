import { useState } from "react";
import { styled } from "styled-components";
import RecipeCard from "./UI/RecipeCard";

const Random = () => {
  const [mealList, setMealList] = useState([]);

  const getMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => setMealList(data["meals"]))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: "10rem" }}>
      <button onClick={getMeal}>button</button>
      {mealList.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
};

export default Random;
