import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { UserContext } from "../../context/UserContext";
import LoadingCircle from "../UI/LoadingCircle";
import { v4 as uuidv4 } from "uuid";

const RandomRecipeCard = ({ meal }) => {
  const [loading, setLoading] = useState(false);
  const { user: userFromContext } = useContext(UserContext);
  const navigate = useNavigate();

  const renderIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push(
          <li key={i}>
            {measure} {ingredient}
          </li>
        );
      }
    }
    return ingredients;
  };

  const transformIngredientData = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const transformRecipeData = (meal) => {
    const { strMeal, strMealThumb, strInstructions } = meal;

    const uniqueId = uuidv4();

    const transformedData = {
      formData: {
        recipeName: strMeal,
        mealImg: strMealThumb,
        ingredients: transformIngredientData(meal),
        steps: strInstructions
          ? strInstructions.split("\n").filter((step) => step.trim() !== "")
          : [],
        tags: [],
      },
      userId: userFromContext.id,
      date: new Date().toLocaleString(),
      createdBy: "TheMealDB.com",
      _id: uniqueId,
    };

    return transformedData;
  };

  const saveRecipe = async (meal) => {
    const transformedData = transformRecipeData(meal);

    try {
      setLoading(true);
      const response = await fetch(`/api/save-random-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: transformedData }),
      });

      if (!response.ok) {
        throw new Error("failed to save random recipe");
      }
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false);
      navigate(`/my-recipes/${userFromContext.id}`);
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <LoadingCircle />
      ) : (
        <>
          <Title>{meal.strMeal}</Title>
          <MealImg src={meal.strMealThumb} alt={meal.strMeal} />
          <br />
          <Heading>Ingredients:</Heading>
          <Ingredients>{renderIngredients(meal)}</Ingredients>
          <br />
          <Heading>Instructions:</Heading>
          <Instructions>{meal.strInstructions}</Instructions>
          <br />
          <SaveContainer onClick={() => saveRecipe(meal)}>
            <Icon>
              <FaRegHeart />
            </Icon>
            <p>Save this recipe</p>
          </SaveContainer>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid var(--stroke);
  border-radius: 12px;
  width: 27rem;
  margin: 1rem 0;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;

  @media (max-width: 1000px) {
    margin: 1rem auto 0 120px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  padding: 0 10px 10px 10px;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const MealImg = styled.img`
  max-width: 15rem;
  max-height: 15rem;
  margin: 0 auto 1rem auto;
  border-radius: 12px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 600px) {
    max-width: 10rem;
    max-height: 10rem;
  }
`;

const Heading = styled.p`
  font-size: 1.2rem;
  text-decoration: underline;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Ingredients = styled.ol`
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Instructions = styled.p`
  white-space: pre-line;

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const SaveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: 0.3s all ease-in-out;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #999;
    color: var(--stroke);
  }
`;

const Icon = styled.div`
  color: var(--button);
  font-size: 1.6rem;
`;

export default RandomRecipeCard;
