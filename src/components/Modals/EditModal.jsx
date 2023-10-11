import { PencilIcon } from "@heroicons/react/24/outline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Formik } from "formik";
import React from "react";
import Api from "../../config/Api";

const handleUpload = async (file) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await Api.post("/fayl/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending FormData
        },
      });

      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
};

const EditModal = ({
  fields,
  initialValues,
  validationSchema,
  handleSubmit,
  ctgs,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className='text-lg text-default-400 cursor-pointer active:opacity-50'
      >
        <PencilIcon className='w-[18px]' />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <Formik
          enableReinitialize
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            setFieldValue,
          }) => (
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if ("categoryId" in values) {
                  values["categoryId"] = +[...values["categoryId"]][0];
                }
                values["fileEntityId"] = initialValues?.fileEntityId;
                if ("imageFile" in values) {
                  let attachmentId = await handleUpload(values["imageFile"]);
                  console.log(attachmentId);
                  if (attachmentId) {
                    values["fileEntityId"] = attachmentId?.id;
                  } else {
                    return;
                  }
                }
                console.log(initialValues);
                handleSubmit(values);
                onClose();
              }}
              className='flex flex-col gap-5 w-full font-madefor'
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      {"Tahrirlash"}
                    </ModalHeader>
                    <ModalBody>
                      {fields?.map((field, index) =>
                        field.type === "select" ? (
                          <Select
                            selectionMode='single'
                            defaultSelectedKeys={[values[field?.name]]}
                            // name={field?.name}
                            // onSelectionChange={handleChange}
                            key={index}
                            label='Kategoriya tanlash'
                            className='w-full'
                            onChange={(e) => {
                              console.log(e.target.value);
                              setFieldValue(
                                field?.name,
                                new Set([e.target.value])
                              );
                            }}
                          >
                            {ctgs &&
                              ctgs.map((ctg) => (
                                <SelectItem key={ctg?.id} value={ctg?.id}>
                                  {ctg?.name}
                                </SelectItem>
                              ))}
                          </Select>
                        ) : field.type == "file" ? (
                          <div className='flex flex-col items-center'>
                            {values[field.name] && (
                              <img
                                src={URL.createObjectURL(values[field.name])}
                                alt='Selected File'
                                className='w-full h-[200px] object-contain'
                              />
                            )}
                            <Input
                              type='file'
                              onChange={(e) => {
                                setFieldValue(field?.name, e.target.files[0]);
                              }}
                              accept='image/*' // Optional: Specify the accepted file types (e.g., images)
                            />
                            {/* {values[field.name] && (
                              <p>Selected File: {values[field.name].name}</p>
                            )} */}
                          </div>
                        ) : (
                          <Input
                            label={field.label}
                            placeholder={field.placeholder}
                            name={field.name}
                            value={values[field.name]}
                            key={index}
                            type={field.type}
                            onChange={handleChange}
                          />
                        )
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button color='danger' variant='flat' onPress={onClose}>
                        {"Bekor qilish"}
                      </Button>
                      <Button type='submit' color='primary'>
                        {"Tahrirlash"}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditModal;
