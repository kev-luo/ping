import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    //converts file into a string
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "imageUrl") {
      console.log("there is an image here");
      const file = event.target.files[0];
      console.log(file);
      setFileInputState(file);
      previewFile(file);
      console.log(previewSource);
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    if (!event) {
      callback();
    } else {
      event.preventDefault();
      callback();
    }

  };

  return { handleChange, handleSubmit, values };
};
