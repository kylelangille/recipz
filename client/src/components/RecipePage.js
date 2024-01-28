import { styled } from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import TagDisplay from "./recipe-display/TagDisplay";
import LoadingCircle from "./UI/LoadingCircle";
import noImage from "../assets/no-image.png";
import Button from "./UI/Button";

const RecipePage = () => {
  const { recipeId } = useParams();
  const { user: userFromContext } = useContext(UserContext);
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/all-recipes/${recipeId}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipeData(data.data);
        setUserId(data.data.userId);
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

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleDenyDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoadingDelete(true);

      await fetch("/api/delete-recipe", {
        method: "DELETE",
        body: JSON.stringify({
          _id: recipeId,
          userId,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      navigate("/my-recipes");
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoadingDelete(false);
    }
  };

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
              <Heading>Ingredients:</Heading>
              <ol>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span>{ingredient.measure}</span> of {ingredient.ingredient}
                  </li>
                ))}
              </ol>
            </IngredientContainer>
            <StepsContainer>
              <Heading>Instructions:</Heading>
              <ol>
                {steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </StepsContainer>
          </DetailsContainer>
          {userId === userFromContext.id && (
            <ControlPanel>
              {!showConfirmDelete && (
                <DeleteButton type="button" onClick={handleShowConfirmDelete}>
                  Delete Recipe
                </DeleteButton>
              )}
              {showConfirmDelete && (
                <div>
                  <Confirm>Are you sure?</Confirm>
                  <ConfirmControls>
                    <Button
                      onClick={handleConfirmDelete}
                      disabled={loadingDelete}
                    >
                      {loadingDelete ? "Deleting recipe..." : "Yes"}
                    </Button>
                    <Button onClick={handleDenyDelete} disabled={loadingDelete}>
                      No
                    </Button>
                  </ConfirmControls>
                </div>
              )}
            </ControlPanel>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 7rem auto 0 300px;
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

const Heading = styled.h4`
  font-weight: bold;
  font-size: 1.2rem;
`;

const DetailsContainer = styled.div`
  margin-left: 11rem;
`;

const IngredientContainer = styled.div`
  margin-bottom: 1rem;
`;

const StepsContainer = styled.div``;

const ControlPanel = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const Confirm = styled.span`
  margin-right: 1rem;
`;

const ConfirmControls = styled.div`
  gap: 10px;
  display: flex;
`;

const DeleteButton = styled.button`
  border: 1px solid #000;
  border-radius: 12px;
  background-color: red;
  font-weight: bold;
  padding: 5px 10px;
`;

export default RecipePage;
