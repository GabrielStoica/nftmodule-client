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
  Select,
  Spinner,
} from "@chakra-ui/react";
import { BlockchainContext } from "@providers";
import { chains } from "@utils";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MintAsset = (props) => {
  const { open, onClose, onCancel, id, title, description, image, onMintAsset } = props;
  const walletState = useSelector((state) => state.walletReducer);
  const { changeChain, mintStatus } = useContext(BlockchainContext);

  const [form, setForm] = useState({
    chain: "",
    isValid: true,
  });

  const onChangeChain = async (e) => {
    try {
      const chain_abbreviation = e.target.value;

      if (walletState?.chain_abbreviation !== chain_abbreviation)
        await changeChain(chains[chain_abbreviation].chain_id);

      setForm({ ...form, chain: chain_abbreviation });
    } catch (error) {
      console.log(error);
    }
  };

  const onMintAssetInternal = async () => {
    try {
      const object = {
        title: title,
        description: description,
        image: image,
      };
      await onMintAsset(id, object);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ((walletState && walletState?.loading) || walletState?.chain_abbreviation !== form.chain)
      setForm({ ...form, isValid: false });
    else setForm({ ...form, isValid: true });
  }, [walletState]);

  useEffect(() => {
    if (form.chain === walletState?.chain_abbreviation && !walletState?.loading)
      setForm({ ...form, isValid: true });
  }, [form]);

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Mint {title}</ModalHeader>

        <ModalCloseButton />
        <ModalBody pb={6}>
          <Alert status="warning">
            <AlertIcon />
            You have to select a network where your asset will be minted on. Asset can't be edited
            after minting.
          </Alert>

          <FormControl mt={4}>
            <FormLabel>Network</FormLabel>
            <Select onChange={onChangeChain} disabled={mintStatus.isLoading}>
              {Object.keys(chains).map((chain, index) => {
                return (
                  <option value={chains[chain].abbreviation} key={index}>
                    {chains[chain].chain_name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={onMintAssetInternal}
            disabled={!form?.isValid || mintStatus.isLoading}
          >
            {mintStatus.message !== "" ? (
              <>
                <Spinner mr={2} />
                {mintStatus.message}
              </>
            ) : (
              "Mint"
            )}
          </Button>
          <Button onClick={onCancel} disabled={mintStatus.isLoading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintAsset;
