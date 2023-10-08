import { PlusIcon } from "@heroicons/react/24/outline";
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
import { uniqueId } from "lodash";
import React from "react";

const CreateModal = ({
  btnText,
  fields,
  initialValues,
  validationSchema,
  handleSubmit,
  ctgs,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        color='primary'
        endContent={<PlusIcon className='w-[18px]' />}
      >
        {btnText}
      </Button>
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
              onSubmit={(e) => {
                e.preventDefault();

                if ("categoryId" in values) {
                  values["categoryId"] = +[...values["categoryId"]][0];
                }

                console.log(values);

                handleSubmit(values);
                onClose();
              }}
              className='flex flex-col gap-5 w-full font-madefor'
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>
                      {"Qo'shish"}
                    </ModalHeader>
                    <ModalBody>
                      {fields?.map((field, index) =>
                        field.type === "select" ? (
                          <Select
                            selectionMode='single'
                            // selectedKeys={values[field?.name]}
                            // name={field?.name}
                            // onSelectionChange={handleChange}
                            key={index}
                            label='Kategoriya tanlash'
                            className='w-full'
                            onChange={(e) => {
                              // console.log(e.target.value);
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
                        ) : (
                          <Input
                            label={field.label}
                            // labelPlacement='outside'
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
                        {"Qo'shish"}
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

export default CreateModal;
