import { useState } from "react";
import axios from "axios";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");


  const handleImageUpload = async (e) => {
    const data = new FormData();
    data.append("file", fileInputState);
    data.append("upload_preset", "pingImgs");
    data.append("cloud_name", "goodlvn");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/goodlvn/image/upload",
      data
    );

    return res.data.url
  };

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
      const file = event.target.files[0];
      console.log(event, file);
      setFileInputState(file);
      previewFile(file);
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let img = null;
    if(fileInputState) {
     img = await handleImageUpload(event)
    }
    callback(img);
  };

  return { handleChange, handleSubmit, values, setFileInputState, setPreviewSource, previewSource};
};
