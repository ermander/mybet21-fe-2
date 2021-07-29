import React, { useEffect, useState } from "react";
// BOOTSTRAP
import { Spinner } from "react-bootstrap";
// COMPONENTS
import ModalContainer from "../components/ModalContainer";
import Disclaimer from "../components/Disclaimer";
import OddsmatcherTable from "../components/OddsmatcherTable";
// REDUX
import { connect } from "react-redux";
// EXTERNAL FUNCTIONS
import { fetchOdds, fetchHistory } from "../functions/fetchOdds";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
});


function OddsMatcher(props) {
  const [odds, setOdds] = useState([])
  const [temporaryOdds, setTemporaryOdds] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleFetchOdds = async () => {
    setIsLoading(true)
    const odds = await fetchOdds();
    const history = await fetchHistory()
    console.log(odds.odds)
    console.log("Odds are here")
    setOdds(odds.odds)
    setTemporaryOdds(odds.odds)
    console.log("Stato", temporaryOdds, odds)
    setIsLoading(false)
  };

  // // Odds filter based on first bookmaker preference
  // firstBookmaker = (firstBookmaker) => {
  //   let newOdds = this.state.odds;
  //   this.setState({ firstBookmaker: firstBookmaker });
  //   if (firstBookmaker !== ("" || "Bookmakers")) {
  //     if (firstBookmaker === "MacaoWin") {
  //       newOdds = newOdds.filter(
  //         (odd) => (odd.book_one || odd.book_two) === "macao"
  //       );
  //     }
  //     if (firstBookmaker === "SirPlay") {
  //       newOdds = newOdds.filter(
  //         (odd) => (odd.book_one || odd.book_two) === "sirplay"
  //       );
  //     }
  //   }
  //   this.setState({ temporaryOdds: newOdds });
  // };

  // // Odds filter based on markets, odds value and date
  // setFilters = (options) => {
  //   console.log(options);
  //   let odds = this.state.odds;
  //   let filteredOdds = [];

  //   if (options.filters === false && options.reset === false) {
  //     this.setState({ showFilterModal: false, temporaryOdds: odds });
  //   } else if (options.filters === false && options.reset === true) {
  //     this.setState({ showFilterModal: false, temporaryOdds: odds });
  //   } else {
  //     // First bookmaker
  //     if (this.state.firstBookmaker !== ("" || "Bookmakers")) {
  //       if (this.state.firstBookmaker === "MacaoWin") {
  //         odds = odds.filter(
  //           (odd) => (odd.book_one || odd.book_two) === "macao"
  //         );
  //       }
  //       if (this.state.firstBookmaker === "SirPlay") {
  //         odds = odds.filter(
  //           (odd) => (odd.book_one || odd.book_two) === "sirplay"
  //         );
  //       }
  //     }

  //     // // Filter for full time
  //     // if (options.allMarkets) {
  //     //   let oneXTwo = odds.filter((odd) => odd.market === "1X2");
  //     //   let underOver = odds.filter((odd) => odd.market === "U/O");
  //     //   let goalNogoal = odds.filter((odd) => odd.market === "GG/NG");
  //     //   filteredOdds = []
  //     //     .concat(filteredOdds)
  //     //     .concat(oneXTwo)
  //     //     .concat(underOver)
  //     //     .concat(goalNogoal);
  //     // } else {
  //     //   if (options.oneXTwo) {
  //     //     let addOdds = odds.filter((odd) => odd.market === "1X2");
  //     //     filteredOdds = [].concat(filteredOdds).concat(addOdds);
  //     //   }
  //     //   if (options.underOver) {
  //     //     let addOdds = odds.filter((odd) => odd.market === "U/O");
  //     //     filteredOdds = [].concat(filteredOdds).concat(addOdds);
  //     //   }
  //     //   if (options.goalNogoal) {
  //     //     let addOdds = odds.filter((odd) => odd.market === "GG/NG");
  //     //     filteredOdds = [].concat(filteredOdds).concat(addOdds);
  //     //   }
  //     // }

  //     // if (options.allMarketsFirstTime) {
  //     //   let oneXTwo = odds.filter((odd) => odd.market === "1X2_t1");
  //     //   let underOver = odds.filter((odd) => odd.market === "U/O_t1");
  //     //   let goalNogoal = odds.filter((odd) => odd.market === "GG/NG_t1");
  //     //   filteredOdds = []
  //     //     .concat(filteredOdds)
  //     //     .concat(oneXTwo)
  //     //     .concat(underOver)
  //     //     .concat(goalNogoal);
  //     // } else {
  //     //   if (options.oneXTwoFirstTime) {
  //     //     let addOdds = odds.filter((odd) => odd.market === "1X2_t1");
  //     //     filteredOdds = [].concat(filteredOdds).concat(addOdds);
  //     //   }
  //     //   if (options.underOverFirstTime) {
  //     //     let addOdds = odds.filter((odd) => odd.market === "U/O_t1");
  //     //     filteredOdds = [].concat(filteredOdds).concat(addOdds);
  //     //   }
  //     //   if (options.goalNogoalFirstTime) {
  //     //     let addOdds = odds.filter((odd) => odd.market === "GG/NG_t1");
  //     //     filteredOdds = [].concat(filteredOdds).concat(addOdds);
  //     //   }
  //     // }
  //     // if (options.allMarketsSecondTime) {
  //     //   let oneXTwo = odds.filter((odd) => odd.market === "1X2_t2");
  //     //   let underOver = odds.filter((odd) => odd.market === "U/O_t2");
  //     //   let goalNogoal = odds.filter((odd) => odd.market === "GG/NG_t2");
  //     //   filteredOdds = []
  //     //     .concat(filteredOdds)
  //     //     .concat(oneXTwo)
  //     //     .concat(underOver)
  //     //     .concat(goalNogoal);
  //     // } else {
  //     //   if (options.oneXTwoSecondTime) {
  //     //     let addOdds = odds.filter((odd) => odd.market === "1X2_t2");
  //     //     filteredOdds = [].concat(filteredOdds).concat(addOdds);
  //     //   }
  //     //   if (options.underOverSecondTime) {
  //     //     let addOdds = odds.filter((odd) => odd.market === "U/O_t2");
  //     //     filteredOdds = [].concat(filteredOdds).concat(addOdds);
  //     //   }
  //     //   if (options.goalNogoalSecondTime) {
  //     //     let addOdds = odds.filter((odd) => odd.market === "GG/NG_t2");
  //     //     filteredOdds = [].concat(filteredOdds).concat(addOdds);
  //     //   }
  //     // }

  //     // // Sorting the odds to have the higher rating
  //     // filteredOdds.sort((a, b) => {
  //     //   return b.roi - a.roi;
  //     // });

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
  //     if (!isNaN(options.minOdd)) {
  //       filteredOdds = filteredOdds.filter(
  //         (odd) => parseFloat(odd.odd_one) >= parseFloat(options.minOdd)
  //       );
  //     }
  //     // Max Odd
  //     if (!isNaN(options.maxOdd)) {
  //       filteredOdds = filteredOdds.filter(
  //         (odd) => parseFloat(odd.odd_one) >= parseFloat(options.minOdd)
  //       );
  //     }

  //     // Filtering by min and max odd

  //     this.setState({ temporaryOdds: filteredOdds, showFilterModal: false });
  //   }
  // };
  useEffect(() => {
    handleFetchOdds();
  }, []);
  return (
    <div>
      <ModalContainer odds={odds}/>
      <div id="oddsmatcher-table-container">
        {isLoading ? (
          <Spinner animation="border" variant="info" id="oddsmatcher-spinner" />
        ) : (
          <OddsmatcherTable odds={temporaryOdds}/>
        )}
      </div>
      <Disclaimer />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OddsMatcher);
