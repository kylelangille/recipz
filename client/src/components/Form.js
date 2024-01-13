import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";
import { useState } from "react";
import Button from "./UI/Button";
import AddButton from "./UI/AddButton";
import RemoveButton from "./UI/RemoveButton";
import Input from "./UI/Input";

const Form = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    recipeName: "",
    mealImg: null,
    ingredients: [],
    steps: [],
  });

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImgChange = (ev) => {
    const { id, files } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files[0],
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

  const handleStepChange = (index, value) => {
    setFormData((prevData) => {
      const newSteps = [...prevData.steps];
      newSteps[index] = value;
      return {
        ...prevData,
        steps: newSteps,
      };
    });
  };

  const handleAddStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      steps: [...prevData.steps, ""],
    }));
  };

  const handleRemoveStep = (index) => {
    setFormData((prevData) => {
      const newSteps = [...prevData.steps];
      newSteps.splice(index, 1);
      return {
        ...prevData,
        steps: newSteps,
      };
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const userId = user.sub.replace("google-oauth2|", "");

    const newRecipe = { formData, userId };

    try {
      const response = await fetch("/add-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }
    } catch (err) {
      console.error("Error: ", err);
    }
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
            accept="image/*"
            onChange={handleImgChange}
          />
        </label>

        {formData.ingredients.map((ingredient, index) => (
          <InputWrapper key={index}>
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
          </InputWrapper>
        ))}

        <AddButton type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </AddButton>

        {formData.steps.map((step, index) => (
          <InputWrapper key={index}>
            <Input
              label={`Step ${index + 1}`}
              type="text"
              value={step}
              onChange={(ev) => handleStepChange(index, ev.target.value)}
            />
            <RemoveButton type="button" onClick={() => handleRemoveStep(index)}>
              &times;
            </RemoveButton>
          </InputWrapper>
        ))}

        <AddButton type="button" onClick={handleAddStep}>
          Add Step
        </AddButton>

        <Button type="submit">Add Recipe</Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem auto 0 auto;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

export default Form;
