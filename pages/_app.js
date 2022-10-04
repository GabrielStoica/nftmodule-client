import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../redux/store";
import { BlockchainProvider } from "@providers";

function TernoaNFTModule({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <BlockchainProvider>
          <Component {...pageProps} />
        </BlockchainProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default TernoaNFTModule;
