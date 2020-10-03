import axios, {AxiosPromise} from "axios";
import City from "./models/City";


const BASE_URL = "http://localhost:8081/api/";

class CityDataService {

  static create(iso: string, newCity: string): AxiosPromise<City> {
    const cityName = newCity.split(" ")[0];
    const cityTemp = newCity.split(" ")[1];
    return axios.post(
      `${BASE_URL}cities?country=${iso}&city=${cityName}&temp=${cityTemp}`
    );
  }

  static getAllByCountry(iso: string): AxiosPromise<City[]> {
    return axios.get(`${BASE_URL}cities?country=${iso}`);
  }

}

export default CityDataService;
