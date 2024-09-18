// src/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [data,setData]=useState({
    name:"",
    email:"",
    mobile:"",
    designation:"",
    gender:"",
    course:""
  })
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('data', data);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data);
    } catch (error) {
      alert('Error uploading file: ' + error.response.data);
    }
    console.log(data,image)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Employee name:
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({...data,name:e.target.value})}
          required
        />
      </label>
      <br />
      <label>
        Employee email:
        <input type='text'
          value={data.email}
          onChange={(e) => setData({...data,email:e.target.value})}
          required
        />
      </label>
      <br />
      <label>
        Employee mobile:
        <input type='text'
          value={data.mobile}
          onChange={(e) => setData({...data,mobile:e.target.value})}
          required
        />
      </label>
      <br />
      <label>
        Employee designation:
        <input type='text'
          value={data.designation}
          onChange={(e) => setData({...data,designation:e.target.value})}
          required
        />
      </label>
      <br />
      <label>
        Employee Course:
        <input type='text'
          value={data.course}
          onChange={(e) => setData({...data,course:e.target.value})}
          required
        />
      </label>
      <br />
      <label>
        Employee Gender:
        <input type='text'
          value={data.gender}
          onChange={(e) => setData({...data,gender:e.target.value})}
          required
        />
      </label>
      <br />
      <label>
        Image:
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
        />
      </label>
      <br />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;
