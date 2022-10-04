import ERC721Minter from "../data/contracts/ERC721Minter.sol/ERC721Minter.json";

export const contracts = {
  ERC721Minter: {
    ABI: ERC721Minter.abi,
    bytecode: ERC721Minter.bytecode,
    addresses: {
      rinkeby: "0x9e551Cf168994de2Aa688E271848d9Ae17424f1f",
      goerli: "0x9E0EC40C60045B2FcE64DfE02CA8b9fC356ADAB6",
    },
  },
};
