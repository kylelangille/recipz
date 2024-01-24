import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingCircle from "./UI/LoadingCircle";
import RecipeCard from "./recipe-display/RecipeCard";
import noImageFound from "../assets/no-image.png";

const MyRecipes = () => {
  const { userId } = useParams();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch(`/api/all-recipes-by/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setRecipes(data.data);
      });
  }, [userId]);

  return (
    <Wrapper>
      {recipes.length <= 0 ? (
        <LoadingCircle />
      ) : (
        <>
          {recipes.map((recipe) => (
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
              userId={userId}
            />
          ))}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem auto 0 auto;
`;

export default MyRecipes;
