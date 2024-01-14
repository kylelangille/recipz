const handleAddIngredientHelper = (setFormData) => {
  setFormData((prevData) => ({
    ...prevData,
    ingredients: [...prevData.ingredients, { ingredient: "", measure: "" }],
  }));
};

module.exports = { handleAddIngredientHelper };
