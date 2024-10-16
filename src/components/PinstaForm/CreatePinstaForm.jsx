import { useState } from "react";
import * as pinstaService from "../../services/pinstaService";
import { useNavigate } from "react-router-dom";

const initialValue = {
  title: "",
  caption: "",
  photos: "",
};

function CreatePinstaForm({ user }) {
  const [formData, setFormData] = useState(initialValue);
  const navigate = useNavigate();
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

  function handleFileChange(e) {
    setFormData((prev) => ({ ...prev, photos: e.target.files[0] }));
  }

  return (
    <>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
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
          type="text"
          id="caption"
          name="caption"
          value={formData.caption}
          onChange={handleChange}
        />

        <label htmlFor="photos">Image</label>
        <input
          required
          type="file"
          id="photos"
          name="photos"
          // value={formData.photos}
          onChange={handleFileChange}
        />

        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreatePinstaForm;
