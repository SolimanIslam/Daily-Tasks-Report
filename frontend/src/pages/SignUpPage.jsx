// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from 'axios';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import validator from 'validator'; // Import validator package



// export function SignUpPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: ""
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

//   const handleSelectChange = (value) => {
//     setFormData(prevState => ({
//       ...prevState,
//       role: value
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name || formData.name.length < 6) {
//       newErrors.name = "Name must be at least 6 characters long";
//     }
//     if (!formData.email || !validator.isEmail(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
//       newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
//     }
//     if (!formData.role) {
//       newErrors.role = "Role is required";
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
//       const response = await axios.post('http://localhost:5000/api/employee/register', formData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       navigate('/');
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         role: ""
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
//           <CardTitle className="text-xxl mb-5">Sign Up</CardTitle>
//           <CardDescription>Enter your information to create an account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="name">Employee Name</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Islam Soliman"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.name && <p className="text-red-600">{errors.name}</p>}
//             </div>

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

//             <div className="grid gap-2">
//               <Label htmlFor="role">Role</Label>
//               <Select required onValueChange={handleSelectChange}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Role</SelectLabel>
//                     <SelectItem value="regEmployee">Regular Employee</SelectItem>
//                     <SelectItem value="supervisor">Supervisor</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               {errors.role && <p className="text-red-600">{errors.role}</p>}
//             </div>

//             {errors.api && <p className="text-red-600">{errors.api}</p>}

//             <Button type="submit" className="w-full ">
//               Create an account
//             </Button>
//           </form>

//           <div className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <Link to="/" className="underline  font-semibold">
//               Login
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import validator from 'validator'; // Import validator package
// import { signUpUser } from "@/store/slices/authSlice";

// export function SignUpPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: ""
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // Add dispatch hook

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   const handleSelectChange = (value) => {
//     setFormData(prevState => ({
//       ...prevState,
//       role: value
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name || formData.name.length < 6) {
//       newErrors.name = "Name must be at least 6 characters long";
//     }
//     if (!formData.email || !validator.isEmail(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
//       newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
//     }
//     if (!formData.role) {
//       newErrors.role = "Role is required";
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
//       await dispatch(signUpUser(formData)).unwrap();
//       navigate('/');
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         role: ""
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
//           <CardTitle className="text-xxl mb-5">Sign Up</CardTitle>
//           <CardDescription>Enter your information to create an account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="name">Employee Name</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Islam Soliman"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               {errors.name && <p className="text-red-600">{errors.name}</p>}
//             </div>

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

//             <div className="grid gap-2">
//               <Label htmlFor="role">Role</Label>
//               <Select required onValueChange={handleSelectChange}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Role</SelectLabel>
//                     <SelectItem value="regEmployee">Regular Employee</SelectItem>
//                     <SelectItem value="supervisor">Supervisor</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               {errors.role && <p className="text-red-600">{errors.role}</p>}
//             </div>

//             {errors.api && <p className="text-red-600">{errors.api}</p>}

//             <Button type="submit" className="w-full ">
//               Create an account
//             </Button>
//           </form>

//           <div className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <Link to="/" className="underline  font-semibold">
//               Login
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default SignUpPage;



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import validator from 'validator'; // Import validator package
import { signUpUser } from "@/store/slices/authSlice";

export function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      role: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 6) {
      newErrors.name = "Name must be at least 6 characters long";
    }
    if (!formData.email || !validator.isEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
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
      await dispatch(signUpUser(formData)).unwrap();
      navigate('/');
      setFormData({
        name: "",
        email: "",
        password: "",
        role: ""
      });
    } catch (error) {
      const errorMessage = error || 'Server error';
      setErrors({ api: errorMessage });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-2 w-full max-w-lg md:max-w-xl lg:w-1/2">
        <CardHeader>
          <CardTitle className="text-xxl mb-5">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Employee Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Islam Soliman"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-red-600">{errors.name}</p>}
            </div>

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

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select required onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="regEmployee">Regular Employee</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-600">{errors.role}</p>}
            </div>

            {errors.api && <p className="text-red-600">{errors.api}</p>}

            <Button type="submit" className="w-full ">
              Create an account
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/" className="underline  font-semibold">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;

