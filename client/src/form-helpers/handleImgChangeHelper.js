const handleImgChangeHelper = async (ev, setFormData) => {
  const { id, files } = ev.target;
  const imageFile = files[0];

  if (imageFile) {
    try {
      const resizedBase64String = await resizeAndConvertImage(imageFile);
      setFormData((prevData) => ({
        ...prevData,
        [id]: resizedBase64String,
      }));
    } catch (error) {
      console.error("Error resizing and converting image:", error);
    }
  }
};

const resizeAndConvertImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const resizedBase64String = canvas.toDataURL(file.type);
        resolve(resizedBase64String.split(",")[1]);
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

module.exports = { handleImgChangeHelper };
