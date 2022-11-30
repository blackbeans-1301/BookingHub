import * as React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { loginAPI, getInformation, registerAPI, resetPassword } from "../../apis/userApi";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import ToastMessage from "../Items/ToastMessage";

const validationSchema = yup.object({
  password: yup.string().required("Enter your password"),
  newPassword: yup.string().required("Enter your new password")
});

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  // console.log('token', token)
  const handleChangePassword = (values) => {
    const getToken = async (postData) => {
      const response = await resetPassword(postData, token);
      console.log("response", response);
      console.log("type", typeof response);
      const type = typeof response;
      if (type == "object") {
        console.log('message', Object.values(response)[0]);
        toast.success(Object.values(response)[0]);
      } else {
        console.log("update password failed");
        toast.error(response);
      }

      setIsLoading(false);
    };

    const data = {
      password: values.password,
      newPassword: values.newPassword,
    };
    setIsLoading(true);
    getToken(data);
  };

  const changePasswordFormik = useFormik({
    initialValues: {
        password: "",
        newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("value" + values);
      handleChangePassword(values);
    },
  });

  return (
    <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
      <h1 className="font-bold text-2xl mb-3">Setting Account</h1>

      <ToastMessage />
      <div className="bg-white shadow-xl shadow-blue-100 rounded-2xl m-4 p-4">
        <h2 className="font-bold text-2xl mb-3 ml-4">Change password</h2>
        <form className="flex flex-col m-4 mb-4" onSubmit={changePasswordFormik.handleSubmit}>
          <FormControl className="my-4">
            <Typography variant="subtitle1">Password</Typography>
            <TextField
              sx={{
                height: "85px",
              }}
              type="password"
              placeholder="Enter your password..."
              name="password"
              value={changePasswordFormik.values.password}
              error={
                changePasswordFormik.touched.password && Boolean(changePasswordFormik.errors.password)
              }
              onChange={changePasswordFormik.handleChange}
              helperText={changePasswordFormik.touched.password && changePasswordFormik.errors.password}
            />
          </FormControl>

          <FormControl className="my-4">
            <Typography variant="subtitle1">New password</Typography>
            <TextField
              sx={{
                height: "85px",
              }}
              type="password"
              placeholder="Enter your new password..."
              name="newPassword"
              value={changePasswordFormik.values.newPassword}
              error={
                changePasswordFormik.touched.newPassword &&
                Boolean(changePasswordFormik.errors.newPassword)
              }
              onChange={changePasswordFormik.handleChange}
              helperText={
                changePasswordFormik.touched.newPassword && changePasswordFormik.errors.newPassword
              }
            />
          </FormControl>

          <FormControl className="my-4">
            <Typography variant="subtitle1">Confirm new password</Typography>
            <TextField
              sx={{
                height: "85px",
              }}
              type="password"
              placeholder="Enter your new password..."
              name="newPassword"
              value={changePasswordFormik.values.newPassword}
              error={
                changePasswordFormik.touched.newPassword &&
                Boolean(changePasswordFormik.errors.newPassword)
              }
              onChange={changePasswordFormik.handleChange}
              helperText={
                changePasswordFormik.touched.newPassword && changePasswordFormik.errors.newPassword
              }
            />
          </FormControl>

          <LoadingButton
            type="submit"
            loading={isLoading}
            variant="contained"
            className="bg-sky-300 text-xl font-bold rounded-full mt-4 hover:bg-sky-500 hover:text-white py-2 mt-4 mb-4"
          >
            Update password
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
