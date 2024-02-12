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

export const editFormValidator = Yup.object().shape({
  senderAddress: Yup.object().shape({
    street: Yup.string().required("Can't be empty"),
    city: Yup.string().required("Can't be empty"),
    country: Yup.string().required("Can't be empty"),
    postCode: Yup.string().required("Can't be empty"),
  }),

  clientAddress: Yup.object().shape({
    street: Yup.string().required("Can't be empty"),
    city: Yup.string().required("Can't be empty"),
    country: Yup.string().required("Can't be empty"),
    postCode: Yup.string().required("Can't be empty"),
  }),

  // items: Yup.array().of(
  //   Yup.object().shape({
  //     // initialItems: Yup.array().required(""),
  //     name: Yup.string().required("Can't be empty"),
  //     quantity: Yup.string().required("Can't be empty"),
  //     price: Yup.string().required("Can't be empty"),
  //     total: Yup.string().required("Can't be empty"),
  //   })
  // ),
  items: Yup.object().required("Can't be empty"),

  clientName: Yup.string().required("Can't be empty"),
  clientEmail: Yup.string().required("Can't be empty"),
  createdAt: Yup.string().required("Can't be empty"),
  paymentTerms: Yup.string().required("Can't be empty"),
  description: Yup.string().required("Can't be empty"),
});
