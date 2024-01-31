import { styled } from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import TagDisplay from "./recipe-display/TagDisplay";
import LoadingCircle from "./UI/LoadingCircle";
import noImage from "../assets/no-image.png";
import Button from "./UI/Button";
import DeleteButton from "./UI/DeleteButton";
import EditRecipeForm from "./EditRecipeForm";

const RecipePage = () => {
  const { recipeId } = useParams();
  const { user: userFromContext, updateUserContext } = useContext(UserContext);
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingUnsave, setLoadingUnsave] = useState(false);
  const [editing, setEditing] = useState(false);

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

  const handleSaveRecipe = async () => {
    try {
      setLoadingSave(true);
      const response = await fetch(`/api/save-recipe/${recipeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userFromContext.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to save recipe");
      }

      const updatedUser = {
        ...userFromContext,
        savedRecipes: [...userFromContext.savedRecipes, recipeId],
      };
      updateUserContext(updatedUser);
    } catch (err) {
      console.error("Error save recipe: ", err);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleUnsaveRecipe = async () => {
    try {
      setLoadingUnsave(true);
      const response = await fetch(`/api/unsave-recipe/${recipeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userFromContext.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to unsave recipe");
      }

      const updatedUser = {
        ...userFromContext,
        savedRecipes: userFromContext.savedRecipes.filter(
          (id) => id !== recipeId
        ),
      };
      updateUserContext(updatedUser);
    } catch (err) {
      console.error("Error unsaving recipe: ", err);
    } finally {
      setLoadingUnsave(false);
    }
  };

  const handleEditRecipe = () => {
    setEditing(true);
  };

  const handleEditComplete = async () => {
    try {
      setEditing(false);

      await fetch(`/api/all-recipes/${recipeId}`)
        .then((res) => res.json())
        .then((data) => {
          setRecipeData(data.data);
          setUserId(data.data.userId);
        });
    } catch (err) {
      console.error("Error saving changes: ", err);
    }
  };

  const handleCancelUpdate = () => {
    setEditing(false);
  };

  const imageSrc = mealImg ? mealImg : noImage;

  return (
    <Wrapper>
      {loading || loadingSave || loadingUnsave ? (
        <LoadingCircle />
      ) : (
        <>
          {editing ? (
            <EditRecipeForm
              recipeId={recipeId}
              onEditComplete={handleEditComplete}
              onCancel={handleCancelUpdate}
              recipeData={recipeData}
            />
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
                {userFromContext.id !== userId && (
                  <SaveRecipeContainer>
                    {userFromContext.savedRecipes?.includes(recipeId) ? (
                      <SaveSubContainer onClick={handleUnsaveRecipe}>
                        <Icon>
                          <FaHeart />
                        </Icon>
                        <p>Unsave</p>
                      </SaveSubContainer>
                    ) : (
                      <SaveSubContainer onClick={handleSaveRecipe}>
                        <Icon>
                          <FaRegHeart />
                        </Icon>
                        <p>Save this recipe</p>
                      </SaveSubContainer>
                    )}
                  </SaveRecipeContainer>
                )}
              </HeadContainer>
              <DetailsContainer>
                <IngredientContainer>
                  <Heading>Ingredients:</Heading>
                  <ol>
                    {ingredients.map((ingredient, index) => (
                      <li key={index}>
                        <span>{ingredient.measure}</span> of{" "}
                        {ingredient.ingredient}
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
                    <Button type="button" onClick={handleEditRecipe}>
                      Edit Recipe
                    </Button>
                  )}
                  {!showConfirmDelete && (
                    <DeleteButton
                      type="button"
                      onClick={handleShowConfirmDelete}
                    >
                      Delete Recipe
                    </DeleteButton>
                  )}
                  {showConfirmDelete && (
                    <>
                      <Confirm>Are you sure?</Confirm>
                      <ConfirmControls>
                        <Button
                          onClick={handleConfirmDelete}
                          disabled={loadingDelete}
                        >
                          {loadingDelete ? "Deleting recipe..." : "Yes"}
                        </Button>
                        <Button
                          onClick={handleDenyDelete}
                          disabled={loadingDelete}
                        >
                          No
                        </Button>
                      </ConfirmControls>
                    </>
                  )}
                </ControlPanel>
              )}
            </>
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
  z-index: -10;
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
  border-radius: 12px;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.5);
`;

const Heading = styled.h4`
  font-weight: bold;
  font-size: 1.2rem;
`;

const SaveRecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  right: 20%;
`;

const SaveSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  padding: 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #999;
  }
`;

const Icon = styled.div`
  margin-bottom: 10px;
  color: var(--button);
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
  gap: 10px;
`;

const Confirm = styled.span`
  margin-right: 1rem;
`;

const ConfirmControls = styled.div`
  gap: 10px;
  display: flex;
`;

export default RecipePage;
