import React from "react";
import {ScuAnchor, ScuAnchorGroup, ScuButton, ScuInput} from "../index";
import {City} from "../models/city";
import CityDataService from "../cityDataService";

class CityList extends React.Component<any> {
  state: CityListInterface = {
    selectedCountry: window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1),
    currentCities: [],
    newCity: null
  };

  componentDidMount() {
    this.loadCities();
  }

  private handleChange = (e: CustomEvent<string>) => {
    e.preventDefault();
    const newCityInputElement: HTMLInputElement = document.querySelector("#newCity");
    const name = newCityInputElement.value.split(" ")[0];
    const temperature = newCityInputElement.value.split(" ")[1];
    const newCity = {name, temperature};
    this.setState({newCity});
  };

  private handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.addCity();

  };

  private addCity() {
    CityDataService
      .create(this.state.selectedCountry, this.state.newCity.name + " " + this.state.newCity.temperature)
      .then(response => {
        if (response.status === 201) {
          this.loadCities();
        }
      })
      .catch(e => {
        window.console.error(e.message);
      });
  }

  private loadCities() {
    CityDataService
      .getAllByCountry(this.state.selectedCountry)
      .then(response => {
        this.setState({currentCities: response.data});
      })
      .catch(e => {
        window.console.error(e.message);
      });
  }

  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div>
        {isAuthenticated() ?
          <div>
            <div className="country-list"> {this.state.currentCities.map((city: City) =>
              <ScuAnchorGroup key={city.id}
                              scu-theme="schwarz">
                <ScuAnchor className="city-entity"
                           key={city.id}
                           text={`${city.name.toUpperCase()} ${city.temperature}`}
                />
              </ScuAnchorGroup>
            )}
            </div>
            <div className="new-city" scu-theme="schwarz">
              <ScuInput id="newCity"
                        inputMode="text"
                        placeholder="City and temperature"
                        onScuchange={this.handleChange}
              />
              <ScuButton
                class="add-button"
                text="Add"
                variant="default"
                color="primary"
                onClick={this.handleClick}
              />
            </div>
          </div> : null
        }
      </div>
    )
  }
}

interface CityListInterface {
  selectedCountry: string,
  currentCities: City[],
  newCity: City
}

export default CityList;
