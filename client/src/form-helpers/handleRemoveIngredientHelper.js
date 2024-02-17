const handleRemoveIngredientHelper = (index, setFormData) => {
  setFormData((prevData) => {
    const newIngredients = [...prevData.ingredients];
    newIngredients.splice(index, 1);
    return {
      ...prevData,
      ingredients: newIngredients,
    };
  });
};

module.exports = { handleRemoveIngredientHelper };
