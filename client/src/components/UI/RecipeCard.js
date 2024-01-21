import { styled } from "styled-components";
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
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const decodeBase64Image = (base64String) => {
    const decodedImage = atob(base64String);
    const buffer = new ArrayBuffer(decodedImage.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < decodedImage.length; i++) {
      view[i] = decodedImage.charCodeAt(i);
    }
    const blob = new Blob([view], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  const imageSrc = mealImg ? decodeBase64Image(mealImg) : noImage;

  return (
    <Wrapper>
      <MainContainer>
        <Img src={imageSrc} alt={recipeName} />
        <div>
          <h2>{recipeName}</h2>
          <p>Added by: {createdBy}</p>
          <TagDisplay tags={tags} />
        </div>
      </MainContainer>
      <Control>
        <DetailsButton onClick={handleShowDetails}>
          {showDetails ? "Hide" : "Show"} details
        </DetailsButton>
      </Control>
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

const Control = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailsButton = styled.button``;

export default RecipeCard;
