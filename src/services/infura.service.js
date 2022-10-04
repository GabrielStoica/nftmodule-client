import CONFIG from "@config";
import { create } from "ipfs-http-client";

export class InfuraService {
  constructor() {
    this.project_id = CONFIG.infura_project_id;
    this.secret_key = CONFIG.infura_secret_key;
    this.api_endpoint = CONFIG.infura_api_endpoint;
    this.dedicated_gateway = CONFIG.infura_dedicated_gateway;
    this.authorization = "Basic " + btoa(this.project_id + ":" + this.secret_key);
  }

  async upload(file) {
    const authorization = this.authorization;
    const client = create({
      url: this.api_endpoint,
      headers: { authorization },
    });

    const added = await client.add(file);

    return `${this.dedicated_gateway}/ipfs/${added.path}`;
  }
}

export default new InfuraService();
