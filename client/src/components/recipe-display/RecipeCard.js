import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import TagDisplay from "./TagDisplay";

const RecipeCard = ({
  mealImg,
  recipeName,
  createdBy,
  ingredients,
  steps,
  noImage,
  tags,
  recipeId,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const imageSrc = mealImg ? mealImg : noImage;

  return (
    <Wrapper>
      <MainContainer>
        <Img src={imageSrc} alt={recipeName} />
        <div>
          <StyledLink to={`/all-recipes/${recipeId}`}>
            <h2>{recipeName}</h2>
          </StyledLink>
          <p>Added by: {createdBy}</p>
          <TagDisplay tags={tags} />
        </div>
      </MainContainer>
      <DetailsControl>
        <DetailsButton onClick={handleShowDetails}>
          {showDetails ? "Hide" : "Show"} details
        </DetailsButton>
      </DetailsControl>
      {showDetails && (
        <>
          <div>
            <p>Ingredients:</p>
            <ol>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span>{ingredient.measure}</span> {ingredient.ingredient}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p>Instructions:</p>
            <ol>
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #000;
  border-radius: 12px;
  margin: 1rem auto 0 auto;
  max-width: 50rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--heading);
`;

const Img = styled.img`
  border-radius: 12px;
  margin: 10px 0 10px 10px;
  max-width: 10rem;
  max-height: 10rem;
`;

const MainContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const DetailsControl = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailsButton = styled.button``;

export default RecipeCard;
