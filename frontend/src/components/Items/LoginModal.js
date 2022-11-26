// import * as yup from "yup";
// import React, { Fragment } from "react";
// import { useState, useEffect } from "react";
// import CancelIcon from "@material-ui/icons/Cancel";
// import axios, { Axios } from "axios";
// import { useFormik } from "formik";
// import FormControl from '@material-ui/core/FormControl'
// import Typography from '@material-ui/core/Typography'
// import TextField from '@material-ui/core/TextField'


// // import jwt_decode from "jwt-decode";

// const validationSchema = yup.object({
//   user: yup.string().required("Enter your username"),
//   password: yup.string().required("Enter your password")
// })

// export default function LoginModal({ isVisible, isClose }) {

//   // const [usernameLogin, setUsernameLogin] = useState("");
//   // const [passwordLogin, setPasswordLogin] = useState("");
//   // const [credential, setCredential] = useState({
//   //   username: '',
//   //   password: ''
//   // });

//   // const [isLoading, setIsLoading] = useState(false);
//   // const setToken = useSetRecoilState(tokenState);
//   // const setUsers = useSetRecoilState(userState);


// //   const [loginStatus, setLoginStatus] = useState("");
// //   const [active, setActive] = useState("signin");

// //   const submitFunc = (event) => {
// //     if (event) {
// //         event.preventDefault();
// //     }

// //     fetch('/login', {
// //         method: 'POST',
// //         body: JSON.stringify(credential)
// //     })
// //         .then(r => r.json())
// //         .then(token => login(token))
// // };

// //   useEffect(() => {
// //     axios({
// //       method: 'get',
// //       url: 'http://localhost:8080/login',
// //     }).then((response) => {
// //       console.log("response", response);
// //       if (response.data.loggedIn == true) {
// //         setLoginStatus(response.data.user[0].username);
// //       }
// //     });
// //   }, []);

// //   const [fullname, setFullname] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const [user, setUser] = useState({});

// //   if (!isVisible) return null;

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // handleLogin(values);
//     },
//   });

//   // function submit sign in btn
//   // const login = () => {
//   //   console.log("login");
//   //   axios({
//   //     method: "post",
//   //     url: "http://localhost:8080/login",
//   //     data: {
//   //       username: usernameLogin,
//   //       password: passwordLogin,
//   //     },
//   //   }).then((res) => {
//   //     if (res.data.message) {
//   //       setLoginStatus(res.data.message);
//   //     } else {
//   //       setLoginStatus(res.data[0].username);
//   //     }
//   //     console.log("res", res);
//   //   });
//   // };

//   // function submit sign up btn
//   // const signUpFunc = () => {
//   //   console.log("register");

//   //   axios({
//   //     method: "post",
//   //     url: "http://localhost:8080/register",
//   //     data: {
//   //       fullname: fullname,
//   //       username: username,
//   //       email: email,
//   //       password: password,
//   //     },
//   //   }).then((res) => console.log("res", res));
//   // };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20">
//       <div className="w-[600px] flex flex-col z-20">
//         {/* sign in modal */}
//         {active === "signin" && (
//           <form className="bg-white p-2 rounded flex flex-col m-2" onSubmit={this.handleSignIn}>
//             <div className="flex justify-between m-2">
//               <h2 className="font-bold text-xl text-colorText">Sign in</h2>
//               <button
//                 className="text-light-close text-xl place-self-end hover:text-close-color"
//                 onClick={() => isClose()}
//               >
//                 <CancelIcon />
//               </button>
//             </div>

//             <div>
//               <div className="p-2 mb-4">
//                 <label className="text-colorText">Username</label>
//                 <input
//                   className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
//                   type="username"
//                   name="username"
//                   onChange={(e) => {
//                     setUsernameLogin(e.target.value);
//                   }}
//                 />
//                 <p className="text-red-500 hidden">Wrong username</p>
//               </div>

//               <div className="p-2 mb-4">
//                 <label className="text-colorText">Password</label>
//                 <input
//                   className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
//                   type="password"
//                   name="password"
//                   onChange={(e) => {
//                     setPasswordLogin(e.target.value);
//                   }}
//                 />
//                 <p className="text-red-500 hidden">Wrong password</p>
//               </div>

//               <div className="p-2 mb-4 flex justify-between">
//                 <div>
//                   <input className="mr-2" type="checkbox" id="remember" />
//                   <label className="text-colorText" for="remember">
//                     Remember me
//                   </label>
//                 </div>

//                 <span
//                   className="font-bold text-light-primary hover:text-primary"
//                   onClick={() => setActive("forgot")}
//                 >
//                   Forgot password ?
//                 </span>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
//               onClick={login}
//             >
//               Login
//             </button>

//             <div className="mb-4 flex justify-center">
//               <span>You don't have account ? </span>
//               <span
//                 className="font-bold text-light-primary hover:text-primary"
//                 onClick={() => setActive("signup")}
//               >
//                 {" "}
//                 Sign up
//               </span>
//             </div>

//             {/* <div className="" id="google"></div>

//             <h1>{loginStatus}</h1>
//             <button onClick={(e) => handleSignOut(e)}>Sign out</button>
//                 {user && 
//                 <div>
//                     <img src={user.picture} />
//                     <h3>{user.name}</h3>
//                 </div>
//                 } */}

//           </form>
//         )}

//         {/* show sign up modal */}
//         {active === "signup" && (
//           <div className="bg-white p-2 rounded flex flex-col m-2">
//             <div className="flex justify-between m-2">
//               <h2 className="font-bold text-xl text-colorText">Sign up</h2>
//               <button
//                 className="text-light-close text-xl place-self-end hover:text-close-color"
//                 onClick={() => isClose()}
//               >
//                 <CancelIcon />
//               </button>
//             </div>

//             <div>
//               <div className="p-2 mb-4">
//                 <label className="text-colorText">Username</label>
//                 <input
//                   className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
//                   type="text"
//                   name="username"
//                   onChange={(e) => {
//                     setUsername(e.target.value);
//                   }}
//                 />
//               </div>

//               <div className="p-2 mb-4">
//                 <label className="text-colorText">Fullname</label>
//                 <input
//                   className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
//                   type="text"
//                   name="fullname"
//                   onChange={(e) => {
//                     setFullname(e.target.value);
//                   }}
//                 />
//               </div>

//               <div className="p-2 mb-4">
//                 <label className="text-colorText">Email</label>
//                 <input
//                   className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
//                   type="email"
//                   name="email"
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                   }}
//                 />
//               </div>

//               <div className="p-2 mb-4">
//                 <label className="text-colorText">Password</label>
//                 <input
//                   className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
//                   type="password"
//                   name="password"
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                   }}
//                 />
//               </div>

//               <div className="p-2 mb-4">
//                 <label className="text-colorText">Confirm password</label>
//                 <input
//                   className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
//                   type="password"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
//               onClick={signUpFunc}
//             >
//               Sign up
//             </button>

//             <div className="mb-4 flex justify-center">
//               <span>You had an account ? </span>
//               <span
//                 className="font-bold text-light-primary hover:text-primary"
//                 onClick={() => setActive("signin")}
//               >
//                 {" "}
//                 Sign in
//               </span>
//             </div>
//           </div>
//         )}

//         {/* show forgot password modal */}
//         {active === "forgot" && (
//           <div className="bg-white p-2 rounded flex flex-col m-2">
//             <div className="flex justify-between m-2">
//               <h2 className="font-bold text-xl text-colorText">
//                 Forgot password
//               </h2>
//               <button
//                 className="text-light-close text-xl place-self-end hover:text-close-color"
//                 onClick={() => isClose()}
//               >
//                 <CancelIcon />
//               </button>
//             </div>

//             <div>
//               <div className="p-2 mb-4">
//                 <label className="text-colorText">Email</label>
//                 <input
//                   className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
//                   type="email"
//                 />
//               </div>
//             </div>
//             <div className="p-2 mb-4">
//               Go to
//               <span
//                 className="font-bold text-light-primary hover:text-primary"
//                 onClick={() => setActive("signin")}
//               >
//                 Sign in
//               </span>
//             </div>
//             <button
//               type="submit"
//               className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
//             >
//               Send
//             </button>
//           </div>
//         )}
//       </div>
//     </div>

//     // <div className="login">
//     //   <div className="login_item login_item_1">
//     //     <div className="login_bg"></div>
//     //   </div>
//     //   <div className="login_item login_item_2">
//     //     <div className="login_formBox">
//     //       {/* <CommonAlert /> */}

//     //       <div className="login_formBox_title">
//     //         <Typography variant="h4">Đăng nhập</Typography>
//     //         <Typography variant="subtitle2">
//     //           Chào mừng trở lại, hãy nhập thông tin tài khoản của bạn.
//     //         </Typography>
//     //       </div>
//     //       <form className="login_formBox_form" onSubmit={formik.handleSubmit}>
//     //         <FormControl className="login_formBox_form_control">
//     //           <Typography variant="subtitle1">Email</Typography>
//     //           <TextField
//     //             sx={{
//     //               height: "85px",
//     //             }}
//     //             placeholder="Username"
//     //             name="email"
//     //             value={formik.values.email}
//     //             error={formik.touched.email && Boolean(formik.errors.email)}
//     //             onChange={formik.handleChange}
//     //             helperText={formik.touched.email && formik.errors.email}
//     //           />
//     //         </FormControl>
//     //         <FormControl className="login_formBox_form_control">
//     //           <Typography variant="subtitle1">Mật khẩu</Typography>
//     //           <TextField
//     //             sx={{
//     //               height: "85px",
//     //             }}
//     //             type="password"
//     //             placeholder="Password"
//     //             name="password"
//     //             value={formik.values.password}
//     //             error={
//     //               formik.touched.password && Boolean(formik.errors.password)
//     //             }
//     //             onChange={formik.handleChange}
//     //             helperText={formik.touched.password && formik.errors.password}
//     //           />
//     //         </FormControl>
//     //         <button
//     //           // loading={isLoading}
//     //           variant="contained"
//     //           className="login_formBox_form_btn"
//     //           type="submit"
//     //         >
//     //           Đăng nhập
//     //         </button>
//     //       </form>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }
