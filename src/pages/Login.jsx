import axios from "axios";
import React, { use, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("This field must be valid email")
    .min(20, "This field must be at least 20")
    .max(25, "This field must be less than 25"),
  password: z.string().min(5).max(10),
});
function Login() {
  let [errors, seterror] = useState(null);
  let navigate = useNavigate();

  let userContext = useContext(AuthContext);

  const { register, watch, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const formSubmit = async (data) => {
    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", data);

      if (res.data.message === "Password doesn't correct") {
        seterror({
          password: res.data.message,
        });
        return;
      }
      if (res.data.message === "login success") {
        let token = res.data.token;
        localStorage.setItem("token", token);
        // console.log("before");
        userContext.getUser(token);
        // console.log("after get usr");
        // console.log("##", "hello");
        navigate("/");
      }
    } catch (e) {
      if (e.status === 422) {
        seterror(e.response.data.errors);
      }
    }
    // console.log(data);
  };
  // console.log(formState);

  // console.log("there", !!formData.email);
  // console.log(navigate("/"));
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-lg  max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Acount
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(formSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email Adress</label>
            <input
              id="email"
              type="type"
              name="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {(errors?.["email"] || formState.errors.email) && (
              <p className="text-red-500">
                {errors?.["email"] ?? formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              {...register("password")}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {(errors?.["password"] || formState.errors.password) && (
              <p className="text-red-500">
                {errors?.["password"] ?? formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
