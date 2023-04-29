## NFT Client Module

The NFT Client module is a Next.js based app that facilitates the process of minting assets on the Rinkeby or Goerli networks using two pre-deployed ERC721-compatible smart contracts. It offers a range of features that streamline the asset creation process, including connectivity with MetaMask, automatic detection of wallet state (chain and address), and the ability to create, edit, and delete assets while storing them in a MongoDB Atlas cloud cluster. Check the [nftmodule-server](https://github.com/gabrielstoica/nftmodule-server) for the back-end workflow.

The app provides the following set of features:

- connect using MetaMask;
- detect wallet state(chain, address);
- create, edit and delete new asset, storing in a MongoDB atlas cloud cluster;
- upload asset image to IPFS using a Infura dedicated-gateway (find it below);
- mint an asset on Rinkeby/Goerli networks based on 2 pre-deployed ERC721-compatible smart contracts;
- when selecting the desired chain, the app is capable of detecting if your current network doesn't match with the selected one and request for changing it;

## Usage

Use the following command to run the development server:

```bash
npm run dev
# or
yarn dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
