import React from "react";
import "./App.css";
import { useFormik } from "formik";
import menu from "./assets/file.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
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
      if (!values.image) {
        errors.image = "Required";
      }
      if (!values.instruction) {
        errors.instruction = "Required";
      }
      return errors;
    },
    onSubmit: async (data, formikbag) => {
      try {
        await axios.post("https://foodbook-backend-jfk6.onrender.com/create", data);
        console.log(data);
        alert("Recipe Created");
        formikbag.resetForm();
        navigate("/");
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    },
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="row">
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
          <div className="col-lg-6">
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
                  {/* <span style={{ color: "red" }}></span> */}
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
                    value={formik.values.image}
                    onChange={formik.handleChange}
                  />
                </div>
                <span style={{ color: "red" }}>{formik.errors.image}</span>
                <div className="col-12 mt-4">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
