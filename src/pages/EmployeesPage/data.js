import * as Yup from "yup";

export const salaryFields = [
  {
    name: "newSalary",
    type: "number",
    label: "Yangi maosh",
    placeholder: "Yangi maoshni kiriting...",
  },
];

export const salaryEmptyValues = {
  newSalary: 0,
};

export const salaryValidationSchema = Yup.object().shape({
  newSalary: Yup.number().required("Boshlang'ich maosh is required"),
});

export const fields = [
  {
    name: "name",
    type: "text",
    label: "Ismi",
    placeholder: "Ismini kiriting...",
  },
  {
    name: "surname",
    type: "text",
    label: "Familiya",
    placeholder: "Familiyani kiriting...",
  },
  {
    name: "jobDescription",
    type: "text",
    label: "Kasbi",
    placeholder: "Kasbini kiriting...",
  },
  {
    name: "currentSalary",
    type: "number",
    label: "Boshlang'ich maosh",
    placeholder: "Narxini kiriting...",
  },
];

export const emptyValues = {
  name: "",
  surname: "",
  currentSalary: 0,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  currentSalary: Yup.number().required("Boshlang'ich maosh is required"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Familiyasi", uid: "surname", sortable: true },
  { name: "Ismi", uid: "name", sortable: true },
  { name: "KASBI", uid: "jobDescription", sortable: true },
  { name: "MAOSH", uid: "currentSalary", sortable: true },
  { name: "MAOSH BERILISH VAQTI", uid: "salaryDate", sortable: true },

  { name: "SANASI", uid: "createdAt" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
