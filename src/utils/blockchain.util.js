export const convertHexToAbbreviation = (hex) => {
  switch (hex) {
    case "0x4":
      return "rinkeby";
    case "0x5":
      return "goerli";
    default:
      return "unknown";
  }
};
export const shortAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
