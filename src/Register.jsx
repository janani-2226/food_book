import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
function Register() {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repassword: "",
    },
    onSubmit: async (values, formikbag) => {
      try {
        let response = await axios.post(
          "https://foodbook-backend-jfk6.onrender.com/register",
          values
        );
        console.log(values);
        alert("Registered Successfully");
        formikbag.resetForm();
      } catch (error) {
        console.log(error);
        alert("Error Occured");
      }
    },
  });
  return (
    <>
      <div class="container">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form class="user" onSubmit={formik.handleSubmit}>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          class="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="First Name"
                          name="firstname"
                          value={formik.values.firstname}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div class="col-sm-6">
                        <input
                          type="text"
                          class="form-control form-control-user"
                          id="exampleLastName"
                          placeholder="Last Name"
                          name="lastname"
                          value={formik.values.lastname}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Email Address"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div class="col-sm-6">
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleRepeatPassword"
                          placeholder="Repeat Password"
                          name="repassword"
                          value={formik.values.repassword}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <button class="btn btn-primary btn-user btn-block">
                      Register Account
                    </button>
                  </form>

                  <div class="text-center"></div>
                  <br />
                  <div class="text-center">
                    <Link class="small" to={"/"}>
                      Already have an account? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
