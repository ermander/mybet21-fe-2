import React, { useEffect, useState } from "react";
// BOOTSTRAP
import { Spinner } from "react-bootstrap";
// COMPONENTS
import ModalContainer from "../components/ModalContainer";
import Disclaimer from "../components/Disclaimer";
import OddsmatcherTable from "../components/OddsmatcherTable";
import InitialOdds from "../components/InitialOdds";
// REDUX
import { connect } from "react-redux";
// EXTERNAL FUNCTIONS
import { fetchOdds } from "../functions/fetchOdds";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  handleFetchOdds: () => dispatch(mainFetchOdds()),
});

const mainFetchOdds = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_MAIN_ODDS",
      payload: [],
    });
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });
    let odds = await fetchOdds();
    odds = odds.odds;
    odds = odds.map((odd) => {
      return {
        ...odd,
        initialOdds:
          odd.complementaryData === undefined ? (
            "Non Disponibile"
          ) : (
            <InitialOdds complementaryData={odd.complementaryData} />
          ),
      };
    });

    dispatch({
      type: "SET_MAIN_ODDS",
      payload: odds,
    });
    dispatch({
      type: "IS_LOADING",
      payload: false,
    });
  };
};

function OddsMatcher(props) {
  useEffect(() => {
    props.handleFetchOdds();
  }, []);
  return (
    <div>
      <ModalContainer />
      <div id="oddsmatcher-table-container">
        {props.isLoading ? (
          <Spinner animation="border" variant="info" id="oddsmatcher-spinner" />
        ) : (
          <OddsmatcherTable />
        )}
      </div>
      <Disclaimer />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OddsMatcher);
