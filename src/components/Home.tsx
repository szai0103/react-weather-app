import React from "react";
import {ScuHeadline, ScuLink} from "../index";

function Home(props: any) {

  const {isAuthenticated} = props.auth;
  const title = "REACT WEATHER APP";

  return (
    <div className="home">
      <div className="container text-center my-5">
        {isAuthenticated() ?
          <div>
            <ScuHeadline className="title" element="h1"
            >Welcome to {title}!
            </ScuHeadline>
            <ScuLink mode="sidebar" href="country-list" color="primary"
            >Country List
            </ScuLink>
          </div> :
          <div>
            <ScuHeadline className="title" element="h1"
            >Please, Log in by clicking on the button above to
              proceed!
            </ScuHeadline
            >
          </div>
        }
      </div>
    </div>

  );
}

export default Home;
