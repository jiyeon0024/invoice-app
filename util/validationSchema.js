import * as Yup from "yup";

export const loginValidator = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valide email")
    .max(255)
    .required("Email is required"),
  password: Yup.string()

    .required("Password is required")
    .min(8, "Password too short")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
});
