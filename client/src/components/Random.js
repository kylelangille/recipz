import { useState } from "react";
import { styled } from "styled-components";
import RecipeCard from "./UI/RecipeCard";
import Button from "./UI/Button";

const Random = () => {
  const [mealList, setMealList] = useState([]);

  const getMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => setMealList(data["meals"]))
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <Button onClick={getMeal}>Generate Recipe</Button>
      {mealList.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 7rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Random;
