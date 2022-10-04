import CONFIG from "@config";
import { serializeForURIComponent } from "@utils";
import axios from "axios";
import { RequestService } from "./request.service";

export class AssetService {
  constructor() {
    this.apiEndpoint = `${CONFIG.api_url}/assets`;
    this.request = new RequestService();
  }

  async getByOwner(owned_by) {
    const query = {
      owned_by: owned_by,
    };
    return await this.request.get(`${this.apiEndpoint}?${serializeForURIComponent(query)}`);
  }

  async create(data) {
    const object = {
      owned_by: data.owned_by,
      image: data.image,
      title: data.title,
      description: data.description,
    };
    return this.request.post(`${this.apiEndpoint}`, object);
  }

  async delete(id) {
    return this.request.delete(`${this.apiEndpoint}/${id}`);
  }

  async update(id, data) {
    const object = {
      image: data.image,
      title: data.title,
      description: data.description,
    };
    return this.request.put(`${this.apiEndpoint}/${id}`, object);
  }

  async mint(id, object) {
    return this.request.post(`${this.apiEndpoint}/${id}/mint`, object);
  }
}
export default new AssetService();
