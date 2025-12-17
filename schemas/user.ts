import * as Yup from "yup";

export const Inquiry = Yup.object().shape({
  name: Yup.string().trim().required("Full Name is required"),
  email: Yup.string().trim()
    .email("Invalid Email")
    .required("Email Address is required"),
  phone: Yup.string().trim().required("Phone Number is required"),
  message: Yup.string().trim().required("Message is required"),
});
