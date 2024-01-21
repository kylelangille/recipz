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
  recipeId,
  userId,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleDenyDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);

      await fetch("/api/delete-recipe", {
        method: "DELETE",
        body: JSON.stringify({ _id: recipeId, userId }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      window.location.reload();
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
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
          <Controls>
            {!showConfirmDelete && (
              <button type="button" onClick={handleShowConfirmDelete}>
                Delete Recipe
              </button>
            )}
            {showConfirmDelete && (
              <div>
                <Confirm>Are you sure?</Confirm>
                <ConfirmControls>
                  <button onClick={handleConfirmDelete} disabled={loading}>
                    {loading ? "Deleting recipe..." : "Yes"}
                  </button>
                  <button onClick={handleDenyDelete} disabled={loading}>
                    No
                  </button>
                </ConfirmControls>
              </div>
            )}
          </Controls>
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

const DetailsControl = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailsButton = styled.button``;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem auto 0 auto;
`;

const Confirm = styled.span`
  margin-right: 1rem;
`;

const ConfirmControls = styled.div`
  gap: 10px;
  display: flex;
`;

export default RecipeCard;
