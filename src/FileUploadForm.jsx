import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import menu from "./assets/file.png";
import { useNavigate } from "react-router-dom";
import "./App.css";

const FileUploadForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      dishName: "",
      ingredients: "",
      preparation: "",
      type: "",
      image: "",
      instruction: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.dishName) {
        errors.dishName = "Required";
      }
      if (!values.ingredients) {
        errors.ingredients = "Required";
      }
      if (!values.preparation) {
        errors.preparation = "Required";
      }
      if (!values.type) {
        errors.type = "Required";
      }
      if (!values.instruction) {
        errors.instruction = "Required";
      }
      return errors;
    },
    onSubmit: async (data, formikbag) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        await axios.post("http://localhost:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await axios.post("http://localhost:5000/create", {
          ...data,
          image: file ? file.name : "",
        });
        console.log(data);
        alert("Recipe Created");
        formikbag.resetForm();
        setFile(null);
        fetchUploadedFiles();
        navigate("/home");
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  console.log(uploadedFiles);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center mb-3">
              <h3 className="c1">Cook-Book</h3>
            </div>
          </div>
          {/* Left Column for Image */}
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <img
              src={menu}
              alt="Cook-Book"
              className="img-fluid"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
          {/* Right Column for Form */}
          <div className="col-lg-6 mt-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-12 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dish Name"
                    name="dishName"
                    value={formik.values.dishName}
                    onChange={formik.handleChange}
                  />
                  <span style={{ color: "red" }}>{formik.errors.dishName}</span>
                </div>
                <div className="col-12 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingredients"
                    name="ingredients"
                    value={formik.values.ingredients}
                    onChange={formik.handleChange}
                  />
                  <span style={{ color: "red" }}>
                    {formik.errors.ingredients}
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Preparation to be done before Cooking"
                    name="preparation"
                    value={formik.values.preparation}
                    onChange={formik.handleChange}
                  />
                  <span style={{ color: "red" }}>
                    {formik.errors.preparation}
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <div>
                    <label className="" style={{ marginRight: "20px" }}>
                      <input
                        type="radio"
                        name="type"
                        value="veg"
                        checked={formik.values.type === "veg"}
                        onChange={formik.handleChange}
                      />
                      Veg
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="nonVeg"
                        checked={formik.values.type === "nonVeg"}
                        onChange={formik.handleChange}
                      />
                      Non-Veg
                    </label>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <textarea
                    className="form-control"
                    placeholder="Instruction step-by-step"
                    style={{
                      height: "150px",
                    }}
                    name="instruction"
                    value={formik.values.instruction}
                    onChange={formik.handleChange}
                  />
                  <span style={{ color: "red" }}>
                    {formik.errors.instruction}
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    name="image"
                    onChange={handleFileChange}
                  />
                </div>
                <span style={{ color: "red" }}>{formik.errors.image}</span>
                <div className="col-12 mt-4" style={{
                  paddingBottom:"80px"
                }}>
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        {/* <h2>Uploaded Files</h2> */}
        {/* <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <img src={file.url} alt="" style={{ height: "200px" }} />
              </a>
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
};

export default FileUploadForm;
