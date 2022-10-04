import {
  Text,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { BlockchainContext } from "@providers";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { connectWallet } = useContext(BlockchainContext);
  const walletState = useSelector((state) => state.walletReducer);

  const handleConnectRequest = async () => {
    await connectWallet();
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Welcome to Ternoa-NFT module
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Sign-in using MetaMask in order to proceed
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack align={"center"}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"gray.400"}
              color={"white"}
              _hover={{
                bg: "gray.500",
              }}
              onClick={() => handleConnectRequest()}
              disabled={walletState.loading}
            >
              {walletState.loading ? (
                <>
                  <Spinner mr={2} /> Select account & connect
                </>
              ) : (
                "🦊 Connect with Metamask"
              )}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
