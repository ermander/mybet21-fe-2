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
  // setFilters = (options) => {

  //     // // Filtering by date and time
  //     // // Deleting odds with no data or time specified
  //     // odds = odds.filter(
  //     //   (odd) => odd.start_date !== undefined || odd.start_time !== undefined
  //     // );
  //     // if (options.startDate !== "") {
  //     //   const initialDate = new Date(options.startDate);
  //     //   const finalDate = new Date(options.endDate);

  //     //   if (options.startTime !== "") {
  //     //     initialDate.setHours(parseInt(options.startTime.split(":")[0]));
  //     //     initialDate.setMinutes(parseInt(options.startTime.split(":")[1]));
  //     //   }

  //     //   if (options.endTime !== "") {
  //     //     finalDate.setHours(parseInt(options.endTime.split(":")[0]));
  //     //     finalDate.setMinutes(parseInt(options.endTime.split(":")[1]));
  //     //   }
  //     //   // Creating a valid date format
  //     //   odds = odds.map((odd) => {
  //     //     let date = new Date();
  //     //     date.setFullYear(
  //     //       parseInt(odd.start_date.split("/")[2]),
  //     //       parseInt(odd.start_date.split("/")[1] - 1),
  //     //       parseInt(odd.start_date.split("/")[0])
  //     //     );
  //     //     date.setHours(parseInt(odd.start_time.split(":")[0]));
  //     //     date.setMinutes(parseInt(odd.start_time.split(":")[0]));
  //     //     return {
  //     //       ...odd,
  //     //       date,
  //     //     };
  //     //   });
  //     //   // Filtering by start date
  //     //   if (options.startTime !== "") {
  //     //     odds = odds.filter(
  //     //       (odd) => odd.date.valueOf() >= initialDate.valueOf()
  //     //     );
  //     //   }
  //     //   if (options.endTime !== "") {
  //     //     // Filtering by end date
  //     //     odds = odds.filter(
  //     //       (odd) => odd.date.valueOf() <= finalDate.valueOf()
  //     //     );
  //     //   }
  //     // }
  //     odds.map((odd) => console.log(parseFloat(odd.odd_one <= options.maxOdd)));
  //     // Min Odd
  //   }
  // };
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
