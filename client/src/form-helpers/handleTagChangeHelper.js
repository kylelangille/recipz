const handleTagChangeHelper = (tag, setFormData) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    tags: prevFormData.tags.includes(tag)
      ? prevFormData.tags.filter((t) => t !== tag)
      : [...prevFormData.tags, tag],
  }));
};

module.exports = { handleTagChangeHelper };
