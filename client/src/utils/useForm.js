import { useState } from "react";
import axios from "axios";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "imageUrl") {
      const file = e.target.files[0];
      setFileInputState(file);
      previewFile(file);
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  }

  function previewFile(file) {
    const reader = new FileReader();
    //converts file into a string
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let img = null;
    if (fileInputState) {
      img = await handleImageUpload(e);
    }
    callback(img);
    setFileInputState("");
    setPreviewSource("");
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", fileInputState);
    data.append("upload_preset", "pingImgs");
    data.append("cloud_name", "goodlvn");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/goodlvn/image/upload",
      data
    );
    return res.data.url;
  }

  return { handleChange, handleSubmit, values, previewSource };
};
