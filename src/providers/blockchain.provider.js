import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3Modal from "web3modal";

import {
  WALLET_ERROR,
  WALLET_REQUEST,
  WALLET_SUCCESS,
  WALLET_DISCONNECT,
  WALLET_CHAIN_UPDATE,
} from "@store/slicers";
import { ethers } from "ethers";
import { chains, contracts, convertHexToAbbreviation } from "@utils";
import Router, { useRouter } from "next/router";
import { AssetService, InfuraService } from "@services";

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [web3Modal, setWeb3Modal] = useState(null);
  const providerOptions = {};

  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [library, setLibrary] = useState(null);
  const walletState = useSelector((state) => state.walletReducer);
  const [mintStatus, setMintStatus] = useState({
    isLoading: false,
    message: "",
  });

  const connectWallet = async () => {
    try {
      dispatch(WALLET_REQUEST());
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider, "any");
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();

      setLibrary(library);
      setSigner(library.getSigner());
      setProvider(provider);

      const chainId = "0x" + network.chainId.toString(16);
      const chain_abbreviation = convertHexToAbbreviation(chainId);
      dispatch(
        WALLET_SUCCESS({
          public_address: accounts[0],
          chain_abbreviation: chain_abbreviation,
        })
      );
      if (typeof window !== undefined) router.push("/dashboard");
    } catch (error) {
      if (error.message === "User Rejected") {
        dispatch(
          WALLET_ERROR({
            error_message: "You have to connect your wallet in order to sign-in.",
          })
        );
      } else console.log(error);
    }
  };

  const changeChain = async (chainId) => {
    try {
      dispatch(WALLET_REQUEST());
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });

      const chain_abbreviation = convertHexToAbbreviation(chainId);
      console.log("chain: ", chain_abbreviation);
      dispatch(WALLET_CHAIN_UPDATE({ chain_abbreviation: chain_abbreviation }));
    } catch (error) {
      if (error.code === 4001) {
        dispatch(WALLET_ERROR({ error_message: "Change the chain in order to deploy." }));
      } else if (
        error.message === "User rejected the request." ||
        error.message === "User Rejected"
      ) {
        dispatch(
          WALLET_ERROR({
            error_message: "You have to accept the request in order to deploy the contract.",
          })
        );
        // This error code indicates that the chain has not been added to MetaMask.
      } else if (error.code === 4902) {
        const chainConfig = chains[convertHexToAbbreviation(chainId)];
        await library.provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainId,
              chainName: chainConfig.chain_name,
              rpcUrls: [chainConfig.rpc_url],
              blockExplorerUrls: [chainConfig.explorer],
            },
          ],
        });
      } else {
        dispatch(
          WALLET_ERROR({
            error_message: "Unkown error. Refresh the page and try again",
          })
        );
      }
    }
  };

  const mintAsset = async (id, values) => {
    try {
      setMintStatus({ ...mintStatus, isLoading: true, message: "Metadata uploading" });
      const smartContractConfig = contracts["ERC721Minter"];
      const currentChain = walletState?.chain_abbreviation;
      const chainConfig = chains[currentChain];
      const contractAddress = smartContractConfig.addresses[currentChain];

      const contractInstance = new ethers.Contract(
        contractAddress,
        smartContractConfig.ABI,
        signer
      );

      const metadata = {
        image: values.image,
        title: values.title,
        description: values.description,
      };

      const tokenURI = await InfuraService.upload(JSON.stringify(metadata));
      console.log(tokenURI);
      setMintStatus({ ...mintStatus, isLoading: true, message: "Minting" });

      const mintRequest = await contractInstance.createItem(tokenURI);
      let tx = await mintRequest.wait();

      const transaction_hash = tx.transactionHash;
      const token_id = Number(tx.logs[0].topics[3]).toString();

      const object = {
        chain_id: chainConfig.chain_id,
        chain_name: chainConfig.chain_name,
        contract_address: contractAddress,
        transaction_hash: transaction_hash,
        token_id: token_id,
      };
      setMintStatus({ ...mintStatus, isLoading: true, message: "Updating database" });

      const response = await AssetService.mint(id, object);
      console.log(response);
      setMintStatus({ ...mintStatus, isLoading: false, message: "" });
    } catch (error) {
      console.log(error);
      setMintStatus({ ...mintStatus, isLoading: false, message: "" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      setWeb3Modal(web3Modal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) {
          dispatch(
            WALLET_SUCCESS({
              public_address: accounts[0] || null,
              chain_abbreviation: walletState.chain_abbreviation,
            })
          );
          //connectWallet();
        }
      };

      const handleChainChanged = (chainId) => {
        dispatch(WALLET_REQUEST());
        const chain_abbreviation = convertHexToAbbreviation(chainId);
        dispatch(
          WALLET_CHAIN_UPDATE({
            chain_abbreviation: chain_abbreviation,
          })
        );
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  return (
    <BlockchainContext.Provider value={{ connectWallet, changeChain, mintAsset, mintStatus }}>
      {children}
    </BlockchainContext.Provider>
  );
};
