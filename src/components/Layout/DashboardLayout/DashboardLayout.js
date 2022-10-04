import React from "react";
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
} from "@chakra-ui/react";
import NavBar from "./NavBar";

const DashboardLayout = (props) => {
  const { children, public_address } = props;
  return (
    <>
      <NavBar public_address={public_address} />
      <Container maxW={"7xl"} p="12">
        {children}
      </Container>
    </>
  );
};

export default DashboardLayout;
