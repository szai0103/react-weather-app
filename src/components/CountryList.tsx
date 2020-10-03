import React from "react";
import Country from "../models/Country";
import CountryDataService from "../country-data-service";
import {Route} from "react-router-dom";
import {ScuAnchor, ScuAnchorGroup} from "../index";

class CountryList extends React.Component<any> {
  state: CountryListInterface = {
    countries: [],
  };

  componentDidMount() {
    CountryDataService.getAll()
      .then(response => {
        // @ts-ignore
        const countries = response.data;
        this.setState({countries});
      })
      .catch(e => {
        window.console.error(e.message);
      });
  }
  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div className="city-list"> {this.state.countries.map((country: Country) =>
        <ScuAnchorGroup key={country.id}
                          scu-theme="schwarz">
          <Route render={({history}) =>
            <ScuAnchor className="country-entity" key={country.id} text={country.name.toUpperCase()}
                        onClick={() => {
                          history.push(`/country-list/${country.iso}`)
                        }}
            />
          } />
        </ScuAnchorGroup>
      )}
      </div>
    )
  }
}

interface CountryListInterface {
  countries: Country[]
}

export default CountryList;
