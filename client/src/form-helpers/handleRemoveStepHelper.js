const handleRemoveStepHelper = (index, setFormData) => {
  setFormData((prevData) => {
    const newSteps = [...prevData.steps];
    newSteps.splice(index, 1);
    return {
      ...prevData,
      steps: newSteps,
    };
  });
};

module.exports = { handleRemoveStepHelper };
