import React, { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {

  const [user, setUser] = useState<LoginData>({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorList, setErrorList] = useState<any[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // لو المستخدم مسجل قبل كده
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const validationLogin = (data: LoginData) => {

    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: ["com","net"] } }).required(),
      password: Joi.string().min(5).max(12).required()
    });

    return schema.validate(data, { abortEarly: false });
  };


  async function sendLoginToApi(){

  try{

    const savedUser = localStorage.getItem("userData");

    if(!savedUser){
      setError("User not found, please register first");
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if(
      parsedUser.email === user.email &&
      parsedUser.password === user.password
    ){

      localStorage.setItem("token","fake-login-token");

      navigate("/");

    }else{

      setError("Email or Password incorrect");

    }

  }catch(err){

    setError("Login failed");

  }finally{

    setLoading(false);

  }

}

  const submitForm = async (e: FormEvent) => {

    e.preventDefault();

    setLoading(true);

    const valid = validationLogin(user);

    if(valid.error){

      setErrorList(valid.error.details);
      setLoading(false);

    }else{

      await sendLoginToApi();

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-black p-4">

      <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-8">

        <h2 className="text-3xl text-red-600 font-bold mb-6 text-center">
          Login
        </h2>


        {errorList.length > 0 &&
          errorList.map((err, index) => (
            <div key={index} className="bg-yellow-300 text-red-700 p-2 rounded mb-2">
              {err.message}
            </div>
          ))}

        {error && (
          <div className="bg-yellow-200 text-red-700 p-2 rounded mb-2">
            {error}
          </div>
        )}


        <form className="grid grid-cols-1 gap-4" onSubmit={submitForm}>

          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 transition text-white font-bold py-3 rounded-lg"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>


        <p className="text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <span
            className="text-red-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}