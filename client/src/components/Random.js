import { useState } from "react";
import { styled } from "styled-components";
import RandomRecipeCard from "./recipe-display/RandomRecipeCard";
import Button from "./UI/Button";

const Random = () => {
  const [randomRecipe, setRandomRecipe] = useState([]);

  const getMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => setRandomRecipe(data["meals"]))
      .catch((err) => console.err(err));
  };

  const bigText = "1.2rem";

  return (
    <Wrapper>
      <Button onClick={getMeal} customText={bigText}>
        Generate Recipe
      </Button>
      {randomRecipe.map((meal) => (
        <RandomRecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 7rem auto 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1000px) {
    margin: 5rem auto 0 120px;
  }
`;

export default Random;
