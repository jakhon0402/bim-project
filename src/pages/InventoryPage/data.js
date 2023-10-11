import * as Yup from "yup";

export const fields = [
  {
    name: "imageFile",
    type: "file",
    label: "Fayl",
    placeholder: "Faylni kiriting...",
  },
  {
    name: "name",
    type: "text",
    label: "Nomi",
    placeholder: "Kirim nomini kiriting...",
  },
  {
    name: "description",
    type: "text",
    label: "Izoh",
    placeholder: "Izoh kiriting...",
  },
  {
    name: "price",
    type: "text",
    label: "Narxi",
    placeholder: "Narxini kiriting...",
  },
  {
    name: "count",
    type: "number",
    label: "Soni",
    placeholder: "Sonini kiriting...",
  },
];

export const emptyValues = {
  name: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.string().required("Price is required"),
  count: Yup.string().required("Count is required"),
});

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMI", uid: "name", sortable: true },
  { name: "NARXI", uid: "price", sortable: true },
  { name: "SONI", uid: "count", sortable: true },
  { name: "IZOH", uid: "description", sortable: true },

  { name: "SANASI", uid: "createdAt" },
  { name: "RASM", uid: "attachment.id" },
  // { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
