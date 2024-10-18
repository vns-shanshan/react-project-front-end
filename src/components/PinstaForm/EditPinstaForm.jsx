import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthedUserContext } from "../../App";
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

import * as pinstaService from "../../services/pinstaService";

import styles from "./PinstaForm.module.css";

function EditPinstaForm() {
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    photos: "",
  });
  const navigate = useNavigate();
  const { pinstaId } = useParams();
  const loggedInUser = useContext(AuthedUserContext);
  const [previewSrc, setPreviewSrc] = useState();
  const fileInputRef = useRef();

  useEffect(() => {
    async function fetchFormData() {
      const res = await pinstaService.showPinsta(pinstaId);
      // console.log(res);

      setFormData(res);
      setPreviewSrc(`${BACKEND_URL}${res.photos}`);
    }

    fetchFormData();
  }, [pinstaId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    convertToBase64(e.target.files[0]);
    setFormData((prev) => ({ ...prev, photos: e.target.files[0] }));
  }

  function convertToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Read file as data URL (Base64)
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await pinstaService.editPinsta(formData, pinstaId);

    navigate(`/profiles/${loggedInUser._id}`);
  }

  const preview = previewSrc ? (
    <>
      <img src={previewSrc} />
      <div className={styles.toolIcon}>✏️</div>
    </>
  ) : (
    "loading..."
  );

  function handlePreviewClick() {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className={styles.formPage}>
      <form onSubmit={handleSubmit} className={styles.eachForm} noValidate>
        <h1>Edit Pinsta</h1>
        <label htmlFor="title">Title</label>
        <input
          required
          type="text"
          id="title"
          name="title"
          value={formData?.title}
          onChange={handleChange}
        />

        <label htmlFor="caption">Caption</label>
        <textarea
          required
          type="text"
          id="caption"
          name="caption"
          value={formData?.caption}
          onChange={handleChange}
        />

        <label htmlFor="photos">Image</label>
        <input
          required
          ref={fileInputRef}
          type="file"
          id="photos"
          name="photos"
          hidden
          onChange={handleFileChange}
        />

        <div onClick={handlePreviewClick} className={styles.imagePreview}>
          {preview}
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPinstaForm;
