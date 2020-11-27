import { useState } from "react";
import axios from "axios";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "imageUrl") {
      const file = e.target.files[0];
      console.log(file);
      previewFile(file, name, value);
    } else {
      setValues({
        ...values,
        [name]: value
      })
    }
  }

  function previewFile(file, name, value) {
    const reader = new FileReader();
    //converts file into a string
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setValues({
        ...values,
        [name]: value,
        imageUrl: [reader.result, file]
      })
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let img = null;
    if(values.imageUrl) {
      img = await handleImageUpload();
    }
    callback(img);
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", values.imageUrl[1]);
    data.append("upload_preset", "pingImgs");
    data.append("cloud_name", "goodlvn");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/goodlvn/image/upload",
      data
    );
    return res.data.url;
  }

  return { handleChange, handleSubmit, values, setValues };
};
