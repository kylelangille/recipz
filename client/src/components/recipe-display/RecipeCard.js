import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import TagDisplay from "./TagDisplay";
import Button from "../UI/Button";

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
        <Button onClick={handleShowDetails}>
          {showDetails ? "Hide" : "Show"} details
        </Button>
      </DetailsControl>
      {showDetails && (
        <>
          <DetailsContainer>
            <p>Ingredients:</p>
            <ol>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span>{ingredient.measure}</span> {ingredient.ingredient}
                </li>
              ))}
            </ol>
          </DetailsContainer>
          <DetailsContainer>
            <p>Instructions:</p>
            <ol>
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </DetailsContainer>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid var(--stroke);
  border-radius: 12px;
  margin: 1rem auto 0 auto;
  max-width: 50rem;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.5);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--main);
`;

const Img = styled.img`
  border-radius: 12px;
  margin: 10px 0 10px 10px;
  max-width: 10rem;
  max-height: 10rem;

  @media (max-width: 1000px) {
    max-width: 7rem;
    max-height: 7rem;
  }
`;

const MainContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  h2 {
    @media (max-width: 1000px) {
      font-size: 17px;
    }
  }
  p {
    @media (max-width: 1000px) {
      font-size: 12px;
    }
  }
`;

const DetailsControl = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailsContainer = styled.div`
  margin: 1rem 1rem;

  p {
    font-size: 1.2rem;
    text-decoration: underline;

    @media (max-width: 1000px) {
      font-size: 12px;
    }
  }

  li {
    @media (max-width: 1000px) {
      font-size: 12px;
    }
  }
`;

export default RecipeCard;
