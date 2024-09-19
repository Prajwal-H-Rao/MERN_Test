// src/ImageUpload.js
import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      data: data,
      image: image,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data);
    } catch (error) {
      alert("Error uploading file: " + error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Employee name:
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />
      </label>

      <label>
        Employee email:
        <input
          type="text"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
      </label>

      <label>
        Employee mobile:
        <input
          type="text"
          value={data.mobile}
          onChange={(e) => setData({ ...data, mobile: e.target.value })}
          required
        />
      </label>

      <label>
        Employee designation:
        <select
          type="text"
          value={data.designation}
          onChange={(e) => setData({ ...data, designation: e.target.value })}
          required
        >
          <option disabled>select an option</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </label>

      <label>
        Employee Gender:
        <input
          type="radio"
          value="M"
          onChange={(e) => setData({ ...data, gender: e.target.value })}
          checked={data.gender === "M"}
        />
        Male
        <input
          type="radio"
          value="F"
          onChange={(e) => setData({ ...data, gender: e.target.value })}
          checked={data.gender === "F"}
        />
        Female
      </label>

      <label>
        Employee Course:
        <input
          type="checkbox"
          value="MCA"
          checked={data.course === "MCA"}
          onChange={(e) => setData({ ...data, course: e.target.value })}
        />{" "}
        MCA
        <input
          type="checkbox"
          value="BCA"
          checked={data.course === "BCA"}
          onChange={(e) => setData({ ...data, course: e.target.value })}
        />{" "}
        BCA
        <input
          type="checkbox"
          value="BSC"
          checked={data.course === "BSC"}
          onChange={(e) => setData({ ...data, course: e.target.value })}
        />{" "}
        BSC
      </label>

      <label>
        Image:
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
        />
      </label>

      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;
