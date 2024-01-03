import { styled } from "styled-components";
import { useState } from "react";
import Button from "./UI/Button";
import AddButton from "./UI/AddButton";
import RemoveButton from "./UI/RemoveButton";
import Input from "./UI/Input";

const Form = () => {
  const [formData, setFormData] = useState({
    recipeName: "",
    mealImg: null,
    ingredients: [],
    instructions: "",
  });

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImgChange = (ev) => {
    const { id, imgFile } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: imgFile[0],
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setFormData((prevData) => {
      const newIngredients = [...prevData.ingredients];
      newIngredients[index][field] = value;
      return {
        ...prevData,
        ingredients: newIngredients,
      };
    });
  };

  const handleAddIngredient = () => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { ingredient: "", measure: "" }],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prevData) => {
      const newIngredients = [...prevData.ingredients];
      newIngredients.splice(index, 1);
      return {
        ...prevData,
        ingredients: newIngredients,
      };
    });
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
          id="recipeName"
          value={formData.recipeName}
          onChange={handleInputChange}
        />

        <label htmlFor="mealImg">
          Select an image:
          <input
            id="mealImg"
            type="file"
            name="mealImg"
            accep="image/*"
            onChange={handleImgChange}
          />
        </label>

        {formData.ingredients.map((ingredient, index) => (
          <IngredientWrapper key={index}>
            <Input
              label={`Ingredient ${index + 1}`}
              type="text"
              value={ingredient.ingredient}
              onChange={(ev) =>
                handleIngredientChange(index, "ingredient", ev.target.value)
              }
            />

            <Input
              label="How much?"
              type="text"
              value={ingredient.measure}
              onChange={(ev) =>
                handleIngredientChange(index, "measure", ev.target.value)
              }
            />
            <RemoveButton
              type="button"
              onClick={() => handleRemoveIngredient(index)}
            >
              &times;
            </RemoveButton>
          </IngredientWrapper>
        ))}

        <AddButton type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </AddButton>

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
