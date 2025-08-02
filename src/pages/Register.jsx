import axios from "axios";
import React, { use, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(9, "Must be at least 9")
    .max(30, "Must be lesss than 30"),
  email: z
    .string()
    .email("This field must be valid email")
    .min(5, "This field must be at least 5"),
  password: z.string().min(5).max(10),
  phone: z.string().min(9),
  address: z.string(),
});
function Register() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerSchema),
  });

  let [errors, seterror] = useState(null);
  let navigate = useNavigate();

  let userContext = useContext(AuthContext);

  const registerSubmit = async (data) => {
    try {
      let res = await axios.post("http://127.0.0.1:8000/api/users", data);
      // console.log("@@@", res.status);
      if (res.status === 201) {
        // console.log("201");
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

  // console.log("there", !!formData.email);
  // console.log(navigate("/"));
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-md max-w-lg p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Acount
        </h2>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(registerSubmit)}
        >
          <div className="mb-4">
            <label className="block text-gray-700">FullName</label>
            <input
              type="text"
              name="name"
              {...register("name")}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {(errors?.["name"] || formState.errors.name) && (
              <p className="text-red-500">
                {errors?.["name"] ?? formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              {...register("email")}
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

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              {...register("phone")}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {(errors?.["phone"] || formState.errors.phone) && (
              <p className="text-red-500">
                {errors?.["phone"] ?? formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              {...register("address")}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            {(errors?.["address"] || formState.errors.address) && (
              <p className="text-red-500">
                {errors?.["address"] ?? formState.errors.address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
