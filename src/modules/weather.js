import { fetchWeather } from "./weatherService";

export default class Weather {
  async search(query) {
    try {
      const response = await fetchWeather(query);
      if (response.cod === "404") {
        toastr.error(`No result find for your search`);
      }
      return Promise.resolve(response)
    } catch (error) {
      console.log("Error", error);
      toastr.error("Error while searching, try again", "An error occured!");
      Promise.reject(error)
    }
  }
}
