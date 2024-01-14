const handleAddStepHelper = (setFormData) => {
  setFormData((prevData) => ({
    ...prevData,
    steps: [...prevData.steps, ""],
  }));
};

module.exports = { handleAddStepHelper };
