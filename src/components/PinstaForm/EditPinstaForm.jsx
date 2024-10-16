import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthedUserContext } from "../../App";

import * as pinstaService from "../../services/pinstaService";

function EditPinstaForm() {
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    photos: "",
  });
  const navigate = useNavigate();
  const { pinstaId } = useParams();
  const loggedInUser = useContext(AuthedUserContext);

  useEffect(() => {
    async function fetchFormData() {
      const res = await pinstaService.showPinsta(pinstaId);
      // console.log(res);

      setFormData(res);
    }

    fetchFormData();
  }, [pinstaId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await pinstaService.editPinsta(formData, pinstaId);

    navigate(`/profiles/${loggedInUser._id}`);
  }

  return (
    <>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
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
          type="text"
          id="caption"
          name="caption"
          value={formData?.caption}
          onChange={handleChange}
        />

        <label htmlFor="photos">Image</label>
        <input
          required
          type="text"
          id="photos"
          name="photos"
          value={formData?.photos}
          onChange={handleChange}
        />

        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default EditPinstaForm;
