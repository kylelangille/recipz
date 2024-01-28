const handleImgChangeHelper = async (ev, setFormData) => {
  const { id, files } = ev.target;

  const formData = new FormData();
  formData.append("image", files[0]);

  try {
    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const { imageUrl } = await response.json();

    setFormData((prevData) => ({
      ...prevData,
      [id]: imageUrl,
    }));
  } catch (err) {
    console.error("Error uploading to S3: ", err);
  }
};

module.exports = { handleImgChangeHelper };
