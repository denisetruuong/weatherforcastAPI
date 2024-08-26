import { promises as fs } from "fs";
import { v4 } from "uuid";

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string) {
    this.name = name;
    this.id = v4();
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private async read(): Promise<string> {
    try {
      return await fs.readFile("db/db.json", "utf8");
    } catch (error: any) {
      return error;
    }
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
      return await fs.writeFile("db/db.json", JSON.stringify(cities));
    } catch (error) {
      return error;
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    let cities: string;
    cities = await this.read();
    let cityArray: City[];
    try {
      cityArray = [].concat(JSON.parse(cities));
    } catch (error) {
      cityArray = [];
    }

    return cityArray;
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    let newCity: City = new City(city);
    const cityLists = await this.getCities();
    const newCityList = cityLists.concat(newCity);
    await this.write(newCityList);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cityLists = await this.getCities();
    const newCityList = cityLists.filter((city) => city.id !== id);
    await this.write(newCityList);
  }
}

export default new HistoryService();
