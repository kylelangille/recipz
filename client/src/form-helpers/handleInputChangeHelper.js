const handleInputChangeHelper = (ev, setFormData) => {
  const { id, value } = ev.target;
  setFormData((prevData) => ({
    ...prevData,
    [id]: value,
  }));
};

module.exports = { handleInputChangeHelper };
