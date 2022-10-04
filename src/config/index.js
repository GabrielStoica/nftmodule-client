const CONFIG = {
  api_url: process.env.API_URL || "http://localhost:3500",
  infura_project_id: process.env.INFURA_PROJECT_ID || "",
  infura_secret_key: process.env.INFURA_API_SECRET_KEY || "",
  infura_api_endpoint: process.env.INFURA_API_ENDPOINT || "https://ipfs.infura.io:5001",
  infura_dedicated_gateway: process.env.INFURA_DEDICATED_GATEWAY || "https://infura-ipfs.io/",
};

export default CONFIG;
