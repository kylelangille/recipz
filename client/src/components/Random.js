import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";
import RandomRecipeCard from "./UI/RandomRecipeCard";
import Button from "./UI/Button";

const Random = () => {
  const { isAuthenticated } = useAuth0();
  const [mealList, setMealList] = useState([]);

  const getMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => setMealList(data["meals"]))
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      {isAuthenticated ? (
        <>
          <Button onClick={getMeal}>Generate Recipe</Button>
          {mealList.map((meal) => (
            <RandomRecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </>
      ) : (
        <p>You must be logged in to see this content</p>
      )}
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
