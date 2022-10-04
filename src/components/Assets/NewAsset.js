import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { newAsset, newAssetValidation } from "@utils";
import React, { useEffect, useRef, useState } from "react";

const NewAsset = (props) => {
  const { open, onClose, onCancel, onNewAsset, onUploadFile } = props;

  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
    errors: {},
    isValid: true,
  });

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onNewAssetInternal = async () => {
    const errors = newAssetValidation(form);
    const isValid = !errors.title || !errors.description;
    setForm({ ...form, errors: errors, isValid: isValid });

    if (isValid) {
      await onNewAsset(form);
      onClose();
    }
  };

  const onChangeFile = async (e) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) {
        console.log("error");
        return;
      }
      const file = files[0];

      const response = await onUploadFile(file);
      if (response) setForm({ ...form, image: response });
    } catch (error) {
      console.log(error);
    }
  };

  const onFocusInput = (e) => {
    const key = e.target.name;
    setForm({ ...form, errors: { ...form.errors, [key]: false } });
  };

  useEffect(() => {
    if (form.errors === {} || (!form.errors.title && !form.errors.description)) {
      setForm({ ...form, isValid: true });
    }
  }, [form.errors]);

  return (
    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new asset</ModalHeader>

        <ModalCloseButton />
        <ModalBody pb={6}>
          <Alert status="warning">
            <AlertIcon />
            When uploading, image file will be automatically stored on IPFS, using an Infura
            endpoint
          </Alert>

          <FormControl mt={4}>
            <FormLabel>Image</FormLabel>
            <Input type="file" ref={initialRef} placeholder="Title" onChange={onChangeFile} />
          </FormControl>

          <FormControl mt={4} isInvalid={form.errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              id="title"
              name="title"
              ref={initialRef}
              placeholder="Title"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              onFocus={onFocusInput}
              required
            />
            {form.errors?.title && <FormErrorMessage>Invalid asset title</FormErrorMessage>}
          </FormControl>

          <FormControl mt={4} isInvalid={form.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              onFocus={onFocusInput}
              required
            />
            {form.errors?.description && (
              <FormErrorMessage>Invalid asset description</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onNewAssetInternal} disabled={!form.isValid}>
            Create
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewAsset;
