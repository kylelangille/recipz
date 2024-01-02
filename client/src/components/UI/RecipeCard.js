import { styled } from "styled-components";

const RecipeCard = ({ meal }) => {
  return (
    <Wrapper>
      <h2>{meal.strMeal}</h2>
      <MealImg src={meal.strMealThumb} alt={meal.strMeal} />
      <p>Ingredients:</p>
      <ol>
        <li>
          {meal.strMeasure1} {meal.strIngredient1}
        </li>
        <li>
          {meal.strMeasure2} {meal.strIngredient2}
        </li>
        <li>
          {meal.strMeasure3} {meal.strIngredient3}
        </li>
        <li>
          {meal.strMeasure4} {meal.strIngredient4}
        </li>
        <li>
          {meal.strMeasure5} {meal.strIngredient5}
        </li>
        <li>
          {meal.strMeasure6} {meal.strIngredient6}
        </li>
      </ol>

      <p>{meal.strInstructions}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid var(--stroke);
  border-radius: 12px;
  width: 20rem;
`;

const MealImg = styled.img``;

export default RecipeCard;
