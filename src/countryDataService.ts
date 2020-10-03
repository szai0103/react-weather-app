import axios from "axios";
import {Country} from "./models/country";

const BASE_URL = "http://localhost:8082/api/";


class CountryDataService {
  static getAll(): Promise<Country[]> {
    return axios.get(`${BASE_URL}/countries`);
  }
}

export default CountryDataService;
