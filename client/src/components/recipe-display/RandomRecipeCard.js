import { styled } from "styled-components";
import { FaRegHeart } from "react-icons/fa6";

const RandomRecipeCard = ({ meal }) => {
  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push(
          <li key={i}>
            {measure} {ingredient}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <Wrapper>
      <Title>{meal.strMeal}</Title>
      <MealImg src={meal.strMealThumb} alt={meal.strMeal} />
      <br />
      <Heading>Ingredients:</Heading>
      <ol>{renderIngredients()}</ol>
      <br />
      <Heading>Instructions:</Heading>
      <Instructions>{meal.strInstructions}</Instructions>
      <br />
      <SaveContainer>
        <Icon>
          <FaRegHeart />
        </Icon>
        <p>Save this recipe</p>
      </SaveContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid var(--stroke);
  border-radius: 12px;
  width: 27rem;
  margin: 1rem 0;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  padding: 0 10px 10px 10px;
`;

const MealImg = styled.img`
  max-width: 15rem;
  max-height: 15rem;
  margin: 0 auto 1rem auto;
  border-radius: 12px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
`;

const Heading = styled.p`
  font-size: 1.2rem;
  text-decoration: underline;
`;

const Instructions = styled.p`
  white-space: pre-line;
`;

const SaveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: 0.3s all ease-in-out;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #999;
    color: #000;
  }
`;

const Icon = styled.div`
  color: var(--button);
  font-size: 1.6rem;
`;

export default RandomRecipeCard;
