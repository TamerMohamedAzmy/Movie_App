// import React, { useState, type FormEvent } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Joi from "joi";

// interface UserData {
//   name: string;
//   email: string;
//   password: string;
//   repassword: string;
//   phone: string;
// }

// export default function Register() {
//   const [user, setUser] = useState<UserData>({
//     name: "",
//     email: "",
//     password: "",
//     repassword: "",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errorList, setErrorList] = useState<any[]>([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUser((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const validationSubmitForm = (user: UserData) => {
//     const schema = Joi.object({
//       name: Joi.string().min(3).max(12).required(),
//       email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
//       password: Joi.string().min(5).max(12).required(),
//       repassword: Joi.string().valid(Joi.ref("password")).required(),
//       phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
//     });
//     return schema.validate(user, { abortEarly: false });
//   };

//   async function sendDataToApi() {
//     try {
//       const { data } = await axios.post("https://fakestoreapi.com/users", {
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         phone: user.phone,
//       });

//       if (data) {
//         navigate("/login");
//       }
//     } catch (err: any) {
//       setError("حدث خطأ في إرسال البيانات");
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const submitForm = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     const valid = validationSubmitForm(user);

//     if (valid.error) {
//       setErrorList(valid.error.details);
//       setLoading(false);
//     } else {
//       await sendDataToApi();
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black p-4">
//       <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-8">
//         <h2 className="text-3xl text-red-600 font-bold mb-6 text-center">Register</h2>

//         {errorList.length > 0 &&
//           errorList.map((err, index) => (
//             <div key={index} className="bg-yellow-300 text-red-700 p-2 rounded mb-2">
//               {err.message}
//             </div>
//           ))}

//         {error && (
//           <div className="bg-yellow-200 text-red-700 p-2 rounded mb-2">{error}</div>
//         )}

//         <form className="grid grid-cols-1 gap-4" onSubmit={submitForm}>
//           <input
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             type="text"
//             placeholder="Name"
//             className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
//           />
//           <input
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="Email"
//             className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
//           />
//           <input
//             name="phone"
//             value={user.phone}
//             onChange={handleChange}
//             type="text"
//             placeholder="Phone"
//             className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
//           />
//           <input
//             name="password"
//             value={user.password}
//             onChange={handleChange}
//             type="password"
//             placeholder="Password"
//             className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
//           />
//           <input
//             name="repassword"
//             value={user.repassword}
//             onChange={handleChange}
//             type="password"
//             placeholder="Confirm Password"
//             className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-red-600 hover:bg-red-700 transition text-white font-bold py-3 rounded-lg mt-2"
//           >
//             {loading ? "Loading..." : "Register"}
//           </button>
//         </form>

//         <p className="text-gray-400 mt-4 text-center">
//           Already have an account?{" "}
//           <span
//             className="text-red-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

interface UserData {
  name: string;
  email: string;
  password: string;
  repassword: string;
  phone: string;
}

export default function Register() {

  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorList, setErrorList] = useState<any[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const validationSubmitForm = (user: UserData) => {

    const schema = Joi.object({
      name: Joi.string().min(3).max(12).required(),

      email: Joi.string().email({ tlds: { allow: ["com","net"] } }).required(),

      password: Joi.string().min(5).max(12).required(),

      repassword: Joi.string().valid(Joi.ref("password")).required(),

      phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),

    });

    return schema.validate(user,{abortEarly:false});

  };


  async function sendDataToApi(){

  try{

    const {data} = await axios.post(
      "https://fakestoreapi.com/users",
      {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
      }
    );

    if(data){

      // حفظ المستخدم
      localStorage.setItem("userData", JSON.stringify(user));

      navigate("/login");

    }

  }catch(err){

    setError("Error creating account");

  }finally{

    setLoading(false);

  }

}

  const submitForm = (e:FormEvent)=>{

    e.preventDefault();

    setLoading(true);
    setError("");
    setErrorList([]);

    const valid = validationSubmitForm(user);

    if(valid.error){

      setErrorList(valid.error.details);
      setLoading(false);

    }else{

      sendDataToApi();

    }

  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-black p-4">

      <div className="bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-8">

        <h2 className="text-3xl text-red-600 font-bold mb-6 text-center">
          Register
        </h2>


        {errorList.map((err,index)=>(
          <div key={index} className="bg-yellow-300 text-red-700 p-2 rounded mb-2">
            {err.message}
          </div>
        ))}

        {error && (
          <div className="bg-yellow-200 text-red-700 p-2 rounded mb-2">
            {error}
          </div>
        )}


        <form className="grid gap-4" onSubmit={submitForm}>

          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="p-3 rounded -lg bg-gray-800 text-white"
          />

          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-800 text-white"
          />

          <input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            type="text"
            placeholder="Phone"
            className="p-3 rounded-lg bg-gray-800 text-white"
          />

          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-800 text-white"
          />

          <input
            name="repassword"
            value={user.repassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            className="p-3 rounded-lg bg-gray-800 text-white"
          />

          <button
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 transition text-white font-bold py-3 rounded-lg"
          >
            {loading ? "Loading..." : "Register"}
          </button>

        </form>


        <p className="text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-red-600 cursor-pointer hover:underline"
            onClick={()=>navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}