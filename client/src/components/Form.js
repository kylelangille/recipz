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

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h2>Add a new recipe:</h2>
        <Input
          label="Recipe name"
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

        <IngredientWrapper>
          <Input
            label="Second Ingredient"
            type="text"
            id="ingredient2"
            value={formData.ingredient2}
            onChange={handleInputChange}
          />
          <Input
            label="How much?"
            type="text"
            id="measure2"
            value={formData.measure2}
            onChange={handleInputChange}
          />
        </IngredientWrapper>

        <IngredientWrapper>
          <Input
            label="Third Ingredient"
            type="text"
            id="ingredient3"
            value={formData.ingredient3}
            onChange={handleInputChange}
          />
          <Input
            label="How much?"
            type="text"
            id="measure3"
            value={formData.measure3}
            onChange={handleInputChange}
          />
        </IngredientWrapper>

        <IngredientWrapper>
          <Input
            label="Fourth Ingredient"
            type="text"
            id="ingredient4"
            value={formData.ingredient4}
            onChange={handleInputChange}
          />
          <Input
            label="How much?"
            type="text"
            id="measure4"
            value={formData.measure4}
            onChange={handleInputChange}
          />
        </IngredientWrapper>

        <IngredientWrapper>
          <Input
            label="Fifth Ingredient"
            type="text"
            id="ingredient5"
            value={formData.ingredient5}
            onChange={handleInputChange}
          />
          <Input
            label="How much?"
            type="text"
            id="measure5"
            value={formData.measure5}
            onChange={handleInputChange}
          />
        </IngredientWrapper>

        <IngredientWrapper>
          <Input
            label="Sixth Ingredient"
            type="text"
            id="ingredient6"
            value={formData.ingredient6}
            onChange={handleInputChange}
          />
          <Input
            label="How much?"
            type="text"
            id="measure6"
            value={formData.measure6}
            onChange={handleInputChange}
          />
        </IngredientWrapper>

        <InstructionsWrapper>
          <label htmlFor="instructions">Add instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            placeholder="How do you make this?"
          ></textarea>
        </InstructionsWrapper>

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
  gap: 10px;
`;

const InstructionsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  textarea {
    width: 23rem;
    height: 10rem;
    border: 1px solid var(--stroke);
    resize: none;
  }
`;

export default Form;
