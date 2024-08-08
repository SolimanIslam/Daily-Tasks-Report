// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from 'axios';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import validator from 'validator'; // Import validator package
// import { useSelector } from "react-redux";

// export function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   const token = useSelector((state) => state.auth.token);
//   if (token) {
//     navigate('/')
//   }


  
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email || !validator.isEmail(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
//       newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/employee/login', formData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       navigate('/');
//       setFormData({
//         email: "",
//         password: ""
//       });
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Server error';
//       setErrors({ api: errorMessage });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card className="mx-2 w-full max-w-lg md:max-w-xl lg:w-1/2">
//         <CardHeader>
//           <CardTitle className="text-xxl mb-5">Login</CardTitle>
//           <CardDescription>Enter your credentials to log in</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.email && <p className="text-red-600">{errors.email}</p>}
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.password && <p className="text-red-600">{errors.password}</p>}
//             </div>

//             {errors.api && <p className="text-red-600">{errors.api}</p>}

//             <Button type="submit" className="w-full ">
//               Login
//             </Button>
//           </form>

//           <div className="mt-4 text-center text-sm">
//             Don't have an account?{" "}
//             <Link to="/signup" className="underline  font-semibold">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useThunk } from '@/hooks/use-thunk';
// import { loginUser } from '@/store/slices/authSlice';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import validator from 'validator'; // Import validator package

// export function LoginPage() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const [runLogin, isLoading, error] = useThunk(loginUser);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [id]: value }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email || !validator.isEmail(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
//       newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
//     }
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     runLogin(formData)
//       .then(() => navigate('/'))
//       .catch(() => {});
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card className="mx-2 w-full max-w-lg md:max-w-xl lg:w-1/2">
//         <CardHeader>
//           <CardTitle className="text-xxl mb-5">Login</CardTitle>
//           <CardDescription>Enter your credentials to log in</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.email && <p className="text-red-600">{errors.email}</p>}
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.password && <p className="text-red-600">{errors.password}</p>}
//             </div>

//             {error && <p className="text-red-600">{error.message}</p>}

//             <Button type="submit" className="w-full " disabled={isLoading}>
//               {isLoading ? 'Logging in...' : 'Login'}
//             </Button>
//           </form>

//           <div className="mt-4 text-center text-sm">
//             Don't have an account?{" "}
//             <Link to="/signup" className="underline  font-semibold">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import validator from 'validator'; // Import validator package
// import { loginUser } from "@/store/slices/authSlice";

// export function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token, navigate]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email || !validator.isEmail(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
//       newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       await dispatch(loginUser(formData)).unwrap();
//       setFormData({
//         email: "",
//         password: ""
//       });
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Server error';
//       setErrors({ api: errorMessage });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card className="mx-2 w-full max-w-lg md:max-w-xl lg:w-1/2">
//         <CardHeader>
//           <CardTitle className="text-xxl mb-5">Login</CardTitle>
//           <CardDescription>Enter your credentials to log in</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.email && <p className="text-red-600">{errors.email}</p>}
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.password && <p className="text-red-600">{errors.password}</p>}
//             </div>

//             {errors.api && <p className="text-red-600">{errors.api}</p>}

//             <Button type="submit" className="w-full ">
//               Login
//             </Button>
//           </form>

//           <div className="mt-4 text-center text-sm">
//             Don't have an account?{" "}
//             <Link to="/signup" className="underline  font-semibold">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default LoginPage;




// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import validator from 'validator'; // Import validator package
// import { loginUser } from "@/store/slices/authSlice";

// export function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token, navigate]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email || !validator.isEmail(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
//       newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
//     }
//     return newErrors;
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validate();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   try {
  //     await dispatch(loginUser(formData)).unwrap();
  //     setFormData({
  //       email: "",
  //       password: ""
  //     });
  //     navigate('/');
  //   } catch (error) {
  //     const errorMessage = error.message || 'Server error';
  //     setErrors({ api: errorMessage });
  //   }
  // };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card className="mx-2 w-full max-w-lg md:max-w-xl lg:w-1/2">
//         <CardHeader>
//           <CardTitle className="text-xxl mb-5">Login</CardTitle>
//           <CardDescription>Enter your credentials to log in</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.email && <p className="text-red-600">{errors.email}</p>}
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.password && <p className="text-red-600">{errors.password}</p>}
//             </div>

//             {errors.api && <p className="text-red-600">{errors.api}</p>}

//             <Button type="submit" className="w-full ">
//               Login
//             </Button>
//           </form>

//           <div className="mt-4 text-center text-sm">
//             Don't have an account?{" "}
//             <Link to="/signup" className="underline  font-semibold">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default LoginPage;


// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import validator from 'validator'; // Import validator package
// import { loginUser } from "@/store/slices/authSlice";

// export function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token, navigate]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email || !validator.isEmail(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
//       newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
//     }
//     return newErrors;
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const validationErrors = validate();
//   //   if (Object.keys(validationErrors).length > 0) {
//   //     setErrors(validationErrors);
//   //     return;
//   //   }

//   //   try {
//   //     await dispatch(loginUser(formData)).unwrap();
//   //     setFormData({
//   //       email: "",
//   //       password: ""
//   //     });
//   //     navigate('/');
//   //   } catch (error) {
//   //     const errorMessage = error.response?.data?.message || error.message || 'Server error';
//   //     setErrors({ api: errorMessage });
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
  
//     try {
//       await dispatch(loginUser(formData)).unwrap();
//       setFormData({
//         email: "",
//         password: ""
//       });
//       navigate('/');
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || error.message || 'Server error';
//       setErrors({ api: errorMessage });
//     }
//   };
  

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Card className="mx-2 w-full max-w-lg md:max-w-xl lg:w-1/2">
//         <CardHeader>
//           <CardTitle className="text-xxl mb-5">Login</CardTitle>
//           <CardDescription>Enter your credentials to log in</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.email && <p className="text-red-600">{errors.email}</p>}
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.password && <p className="text-red-600">{errors.password}</p>}
//             </div>

//             {errors.api && <p className="text-red-600">{errors.api}</p>}

//             <Button type="submit" className="w-full ">
//               Login
//             </Button>
//           </form>

//           <div className="mt-4 text-center text-sm">
//             Don't have an account?{" "}
//             <Link to="/signup" className="underline  font-semibold">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default LoginPage;





import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import validator from 'validator'; // Import validator package
import { loginUser } from "@/store/slices/authSlice";

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.email || !validator.isEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(loginUser(formData)).unwrap();
      setFormData({
        email: "",
        password: ""
      });
      navigate('/');
    } catch (error) {
      const errorMessage = error || 'Server error';
      setErrors({ api: errorMessage });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-2 w-full max-w-lg md:max-w-xl lg:w-1/2">
        <CardHeader>
          <CardTitle className="text-xxl mb-5">Login</CardTitle>
          <CardDescription>Enter your credentials to log in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-red-600">{errors.password}</p>}
            </div>

            {errors.api && <p className="text-red-600">{errors.api}</p>}

            <Button type="submit" className="w-full ">
              Login
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline  font-semibold">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
