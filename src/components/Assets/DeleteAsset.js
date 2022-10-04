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
import React from "react";

const DeleteAsset = (props) => {
  const { open, onClose, onCancel, onDeleteAsset, id, title } = props;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {title}</ModalHeader>

        <ModalCloseButton />
        <ModalBody pb={6}>
          <Alert status="error">
            <AlertIcon />
            Are you sure you want to delete the following asset?
          </Alert>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => onDeleteAsset(id)}>
            Delete
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAsset;
