import { styled } from "styled-components";
import { useState } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";

const Form = () => {
  const [formData, setFormData] = useState({
    recipeName: "",
    measure1: null,
    ingredient1: "",
    measure2: null,
    ingredient2: "",
    measure3: null,
    ingredient3: "",
    measure4: null,
    ingredient4: "",
    measure5: null,
    ingredient5: "",
    measure6: null,
    ingredient6: "",
    instructions: "",
  });

  const handleInputChange = () => {};

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h2>Add a new recipe:</h2>
        <Input
          label="Recipe Name"
          type="text"
          id="name"
          value={formData.recipeName}
          onChange={handleInputChange}
        />

        <label htmlFor="mealImg">
          Select an image:
          <input id="mealImg" type="file" name="mealImg" accep="image/*" />
        </label>

        <IngredientWrapper>
          <Input
            label="First Ingredient"
            type="text"
            id="ingredient1"
            value={formData.ingredient1}
            onChange={handleInputChange}
          />
          <Input
            label="How much?"
            type="text"
            id="measure1"
            value={formData.measure1}
            onChange={handleInputChange}
          />
        </IngredientWrapper>
        <Button type="submit">Add Recipe</Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 7rem;
`;

const IngredientWrapper = styled.div`
  display: flex;
`;

export default Form;
