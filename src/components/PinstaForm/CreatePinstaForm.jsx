import { useRef, useState } from "react";
import * as pinstaService from "../../services/pinstaService";
import { useNavigate } from "react-router-dom";
import styles from "./PinstaForm.module.css";

const initialValue = {
  title: "",
  caption: "",
  photos: "",
};

function CreatePinstaForm({ user }) {
  const [formData, setFormData] = useState(initialValue);
  const navigate = useNavigate();
  const [previewSrc, setPreviewSrc] = useState();
  const fileInputRef = useRef();
  //   const userId = user._id;

  async function handleAddPinsta(pinstaFormData) {
    await pinstaService.createPinsta(pinstaFormData);
    navigate(`/profiles/${user._id}`);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleAddPinsta(formData);
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

  function handleFileChange(e) {
    convertToBase64(e.target.files[0]);

    setFormData((prev) => ({ ...prev, photos: e.target.files[0] }));
  }

  function handlePreviewClick() {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  }

  const preview = previewSrc ? (
    <>
      <img src={previewSrc} />
      <div className={styles.toolIcon}>✏️</div>
    </>
  ) : (
    <div className={styles.plusIcon}>➕</div>
  );

  return (
    <div className={styles.formPage}>
      <form onSubmit={handleSubmit} className={styles.eachForm}>
        <h1>Create Pinsta</h1>
        <label htmlFor="title">Title</label>
        <input
          required
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="caption">Caption</label>
        <textarea
          required
          type="text"
          id="caption"
          name="caption"
          value={formData.caption}
          onChange={handleChange}
        />

        <label htmlFor="photos">Image</label>
        <input
          ref={fileInputRef}
          required
          type="file"
          id="photos"
          name="photos"
          hidden
          // value={formData.photos}
          onChange={handleFileChange}
        />

        <div onClick={handlePreviewClick} className={styles.imagePreview}>
          {preview}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePinstaForm;
