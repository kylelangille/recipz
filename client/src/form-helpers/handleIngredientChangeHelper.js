const handleIngredientChangeHelper = (index, field, value, setFormData) => {
  setFormData((prevData) => {
    const newIngredients = [...prevData.ingredients];
    newIngredients[index][field] = value;
    return {
      ...prevData,
      ingredients: newIngredients,
    };
  });
};

module.exports = { handleIngredientChangeHelper };
