import { styled } from "styled-components";
import { useParams, Link } from "react-router-dom";
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
        console.log(data.data);
        setRecipeData(data.data);
        setLoading(false);
      });
  }, []);

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
              <Title>{recipeName}</Title>
              <p>
                Created by:{" "}
                <StyledLink to={`/users/${recipeData.userId}`}>
                  {recipeData.createdBy}
                </StyledLink>
              </p>
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
  margin: 7rem auto 0 auto;
  max-width: 50rem;
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const StyledLink = styled(Link)`
  color: var(--heading);
  text-decoration: none;
`;

const MealImg = styled.img`
  max-width: 10rem;
  max-height: 10rem;
  margin-right: 1rem;
`;

const DetailsContainer = styled.div`
  margin-left: 11rem;
`;

const IngredientContainer = styled.div`
  margin-bottom: 1rem;
`;

const StepsContainer = styled.div``;

export default RecipePage;
