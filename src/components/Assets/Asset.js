import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import { chains, convertHexToAbbreviation, shortAddress } from "@utils";
import { DeleteAsset, EditAsset, MintAsset } from "@components";
import { DeleteIcon, LinkIcon, SettingsIcon } from "@chakra-ui/icons";

export const BlogAuthor = (props) => {
  return (
    <>
      <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
        <Image
          borderRadius="full"
          boxSize="40px"
          src="https://avatars.dicebear.com/api/male/gabriel.svg"
          alt={`Avatar of ${props.name}`}
        />
        <Text fontWeight="medium">{props.name}</Text>
      </HStack>
      <Text mt={4}>{props.date.toLocaleDateString()}</Text>
    </>
  );
};
const Asset = (props) => {
  const { id, image, description, title, public_address, timestamp, minted, nft } = props;
  const { onDeleteAsset, onEditAsset, onUploadFile, onMintAsset } = props;

  const [deleteAssetModalOpen, setDeleteAssetModalOpen] = useState(false);
  const [editAssetModalOpen, setEditAssetModalOpen] = useState(false);
  const [mintAssetModalOpen, setMintAssetModalOpen] = useState(false);

  return (
    <>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        rounded={"lg"}
        p={8}
      >
        <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                borderRadius="lg"
                src={
                  image ||
                  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(orange.600 1px, transparent 1px)",
                "radial(orange.300 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Stack direction="row" justifyContent="space-between">
            <HStack spacing={2} marginTop={props.marginTop}>
              <Tag size={"md"} variant="solid" colorScheme="orange">
                {minted ? "Minted" : "Not minted"}
              </Tag>
              {minted && (
                <Tag size={"md"} variant="solid" colorScheme="orange">
                  <Image
                    width={"16px"}
                    height={"16px"}
                    src={chains[convertHexToAbbreviation(nft.chain_id)].icon}
                    alt=""
                    mr={2}
                  />
                  {nft.chain_name}
                </Tag>
              )}
            </HStack>
            <Stack direction="row">
              {!minted && (
                <Button size="sm" onClick={() => setMintAssetModalOpen(true)}>
                  <LinkIcon mr={2} />
                  Mint
                </Button>
              )}
              <Button size="sm" onClick={() => setDeleteAssetModalOpen(true)}>
                <DeleteIcon mr={2} />
                Delete
              </Button>
              {!minted && (
                <Button size="sm" onClick={() => setEditAssetModalOpen(true)}>
                  <SettingsIcon mr={2} />
                  Edit
                </Button>
              )}
            </Stack>
          </Stack>

          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              {title}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            {description}
          </Text>
          <BlogAuthor
            name={public_address && shortAddress(public_address)}
            date={timestamp && new Date(timestamp)}
          />
        </Box>
      </Box>

      <DeleteAsset
        id={id}
        title={title}
        open={deleteAssetModalOpen}
        onClose={() => setDeleteAssetModalOpen(false)}
        onCancel={() => setDeleteAssetModalOpen(false)}
        onDeleteAsset={onDeleteAsset}
      />

      <EditAsset
        id={id}
        title={title}
        description={description}
        image={image}
        open={editAssetModalOpen}
        onClose={() => setEditAssetModalOpen(false)}
        onCancel={() => setEditAssetModalOpen(false)}
        onEditAsset={onEditAsset}
        onUploadFile={onUploadFile}
      />

      <MintAsset
        id={id}
        title={title}
        description={description}
        image={image}
        open={mintAssetModalOpen}
        onClose={() => setMintAssetModalOpen(false)}
        onCancel={() => setMintAssetModalOpen(false)}
        onMintAsset={onMintAsset}
      />
    </>
  );
};

export default Asset;
