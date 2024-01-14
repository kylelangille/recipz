const handleImgChangeHelper = (ev, setFormData) => {
  const { id, files } = ev.target;
  setFormData((prevData) => ({
    ...prevData,
    [id]: files[0],
  }));
};

module.exports = { handleImgChangeHelper };
