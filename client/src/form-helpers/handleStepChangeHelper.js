const handleStepChangeHelper = (index, value, setFormData) => {
  setFormData((prevData) => {
    const newSteps = [...prevData.steps];
    newSteps[index] = value;
    return {
      ...prevData,
      steps: newSteps,
    };
  });
};

module.exports = { handleStepChangeHelper };
