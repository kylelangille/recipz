import { styled } from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import RecipeCard from "./recipe-display/RecipeCard";
import LoadingCircle from "./UI/LoadingCircle";
import noImageFound from "../assets/no-image.png";

const Feed = () => {
  const { user: userFromContext } = useContext(UserContext);
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    fetch(`/api/feed/${userFromContext.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedData(data.data);
      });
  }, []);

  return (
    <Wrapper>
      {feedData.length <= 0 ? (
        <LoadingCircle />
      ) : (
        <>
          {feedData.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              mealImg={recipe.formData.mealImg}
              recipeName={recipe.formData.recipeName}
              createdBy={recipe.createdBy}
              ingredients={recipe.formData.ingredients}
              steps={recipe.formData.steps}
              noImage={noImageFound}
              tags={recipe.formData.tags}
              recipeId={recipe._id}
            />
          ))}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem auto 0 300px;

  @media (max-width: 1000px) {
    margin: 5rem auto 0 120px;
  }
`;

export default Feed;
