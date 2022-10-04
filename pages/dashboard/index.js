import React, { useContext, useEffect, useState } from "react";
import { Button, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { Asset, DashboardLayout, NoAssets, NewAsset } from "@components";
import { AssetService, InfuraService } from "@services";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import DeleteAsset from "@components/Assets/DeleteAsset";
import { BlockchainContext } from "@providers";
import { PlusSquareIcon, SettingsIcon } from "@chakra-ui/icons";

const DashboardHomePage = () => {
  const [assets, setAssets] = useState([]);
  const toast = useToast();

  const [newAssetModalOpen, setNewAssetModalOpen] = useState(false);
  const { mintAsset } = useContext(BlockchainContext);
  const walletState = useSelector((state) => state.walletReducer);
  const router = useRouter();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error notification",
        description: `${error}`,
        status: "error",
        duration: 5000,
        position: "bottom-right",
        isClosable: true,
      });
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast({
        title: "Asset notification",
        description: `${success}`,
        status: "success",
        duration: 5000,
        position: "bottom-right",
        isClosable: true,
      });
      setSuccess(null);
    }
  }, [success]);

  const init = async () => {
    try {
      const owned_by = walletState?.public_address;
      const response = await AssetService.getByOwner(owned_by);
      setAssets(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onNewAsset = async (values) => {
    try {
      let metadata = {
        image: values.image,
        title: values.title,
        description: values.description,
      };
      metadata.owned_by = walletState?.public_address;
      const response = await AssetService.create(metadata);

      if (response.status !== "ok") {
        setError("Unexpected error. Try again");
        return;
      }
      setSuccess("Asset created successfully!");
      await init();
    } catch (error) {
      console.log(error);
      setError("Unexpected error. Try again");
    }
  };

  const onDeleteAsset = async (id) => {
    try {
      const response = await AssetService.delete(id);
      //add error
      if (response.status !== "ok") {
        setError("Unexpected error. Try again");
        return;
      }
      setSuccess("Asset deleted successfully!");
      await init();
    } catch (error) {
      console.log(error);
      setError("Unexpected error. Try again");
    }
  };

  const onEditAsset = async (id, values) => {
    try {
      const response = await AssetService.update(id, values);
      //add error
      if (response.status !== "ok") {
        setError("Unexpected error. Try again");
        return;
      }
      setSuccess("Asset updated successfully!");
      await init();
    } catch (error) {
      console.log(error);
      setError("Unexpected error. Try again");
    }
  };

  const onMintAsset = async (id, values) => {
    try {
      await mintAsset(id, values);
      await init();
    } catch (error) {
      console.log(error);
      setError("Unexpected error. Try again");
    }
  };

  const onUploadFile = async (file) => {
    try {
      const response = await InfuraService.upload(file);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (walletState) {
      if (!walletState.loading && !walletState.public_address) router.push("/");
      else init();
    }
  }, [walletState]);

  return (
    <DashboardLayout public_address={walletState?.public_address}>
      <Stack direction="row" justifyContent="space-between">
        <Heading as="h1">Your assets</Heading>
        <Button onClick={() => setNewAssetModalOpen(true)}>
          <PlusSquareIcon mr={2} />
          Create new
        </Button>
      </Stack>

      {assets && assets.length ? (
        assets.map((asset) => {
          return (
            <Asset
              id={asset._id}
              image={asset.data?.image}
              title={asset.data?.title}
              description={asset.data?.description}
              nft={asset.data?.nft}
              public_address={walletState?.public_address}
              timestamp={asset.timestamp}
              minted={asset.minted}
              onDeleteAsset={onDeleteAsset}
              onEditAsset={onEditAsset}
              onUploadFile={onUploadFile}
              onMintAsset={onMintAsset}
            />
          );
        })
      ) : (
        <NoAssets />
      )}

      <NewAsset
        open={newAssetModalOpen}
        onClose={() => setNewAssetModalOpen(false)}
        onCancel={() => setNewAssetModalOpen(false)}
        onNewAsset={onNewAsset}
        onUploadFile={onUploadFile}
      />
    </DashboardLayout>
  );
};

export default DashboardHomePage;
