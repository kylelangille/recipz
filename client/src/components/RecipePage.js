import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import TagDisplay from "./UI/TagDisplay";
import LoadingCircle from "./UI/LoadingCircle";
import noImage from "../assets/no-image.png";

const RecipePage = () => {
  const { recipeId } = useParams();
  const { user: userFromContext } = useContext(UserContext);
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/all-recipes/${recipeId}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipeData(data.data);
        setLoading(false);
      });
  }, [recipeId]);

  const {
    formData: {
      recipeName = "",
      mealImg = "",
      tags = [],
      ingredients = [],
      steps = [],
    } = {},
  } = recipeData;

  const imageSrc = mealImg ? mealImg : noImage;

  return (
    <Wrapper>
      {loading ? (
        <LoadingCircle />
      ) : (
        <>
          <HeadContainer>
            <MealImg src={imageSrc} />
            <SubContainer>
              <h3>{recipeName}</h3>
              <p>Created by:</p>
              <TagDisplay tags={tags} />
            </SubContainer>
          </HeadContainer>
          <DetailsContainer>
            <IngredientContainer>
              <h4>Ingredients:</h4>
              <ol>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span>{ingredient.measure}</span> {ingredient.ingredient}
                  </li>
                ))}
              </ol>
            </IngredientContainer>
            <StepsContainer>
              <h4>Instructions:</h4>
              <ol>
                {steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </StepsContainer>
          </DetailsContainer>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem auto 0 auto;
  max-width: 50rem;
`;

const HeadContainer = styled.div`
  display: flex;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MealImg = styled.img`
  max-width: 10rem;
  max-height: 10rem;
`;

const DetailsContainer = styled.div`
  margin-left: 2rem;
`;

const IngredientContainer = styled.div``;

const StepsContainer = styled.div``;

export default RecipePage;
