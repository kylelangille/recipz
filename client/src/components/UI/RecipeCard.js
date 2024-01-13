import { styled } from "styled-components";

const RecipeCard = ({ meal }) => {
  return (
    <Wrapper>
      <Title>{meal.strMeal}</Title>
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
  margin-top: 1rem;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  text-align: center;
`;

const MealImg = styled.img`
  max-width: 15rem;
  max-height: 15rem;
  margin: 0 auto 1rem auto;
  border-radius: 12px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
`;

export default RecipeCard;
