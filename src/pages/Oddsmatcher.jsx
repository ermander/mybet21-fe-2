import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

// Components
import ModalContainer from "../components/ModalContainer";
import Disclaimer from "../components/Disclaimer";
import OddsmatcherTable from "../components/OddsmatcherTable";

// Bookmakers Logos
import { logos } from "../utilities/bookmakerLogos";

class Oddsmatcher extends Component {
  state = {
    isLoading: true,
    odds: [],
    temporaryOdds: [],
    firstBookmaker: "",
    showFilterModal: false,
    history: [],
  };

  fetchOdds = async () => {
    try {
      this.setState({ isLoading: true, odds: [] });
      const response = await fetch("https://odds-and-db-be-server.herokuapp.com/oddsmatcher");
      const parsedResponse = await response.json();
      let odds = parsedResponse.map((odd) => {
        const bet = 100;
        const commission = 0.05;
        const layStake = (odd.odd_one * bet) / (odd.odd_two - commission);
        const rawRating = (1 - commission) * layStake;
        const rating = rawRating.toFixed(2);
        return {
          ...odd,
          book_one_image: (
            <img src={logos[odd.book_one]} alt={logos[odd.book_one]} />
          ),
          book_two_image: (
            <img src={logos[odd.book_two]} alt={logos[odd.book_two]} />
          ),
          tableRoi: rating + "%",
          roi: rating,
        };
      });
      odds.sort((a, b) => {
        return b.roi - a.roi;
      });

      // Adding history to the for every match
      const rawHistory = await fetch("https://odds-and-db-be-server.herokuapp.com/history");
      const history = await rawHistory.json();
      odds = odds.map((odd, i) => {
        const rawInfo = history.filter(
          (info) => info.univoca === `${odd.home}${odd.away}${odd.book_one}`
        );
        if (rawInfo !== undefined) {
          odd.historyInfo = rawInfo[0];
          let data = odd.historyInfo[odd.odd_one_type];
          console.log(data)
          if (data !== undefined && data[0] !== 0) {
            data = data[0];
          }
          if(data !== undefined && data[0] === 0){
            let whileController = true
            let counter = 0
            while(whileController){
              if(data[counter] === 0) counter = counter + 1 
              if(data[counter] !== 0){
                data = data[counter]
                whileController = false
              }
            }
          }
          return {
            ...odd,
            quotaIniziale: "@" + data,
          };
        }
      });

      this.setState({ isLoading: false, odds: odds, temporaryOdds: odds });
    } catch (error) {
      console.log(error);
    }
  };
  // Odds filter based on first bookmaker preference
  firstBookmaker = (firstBookmaker) => {
    let newOdds = this.state.odds;
    this.setState({ firstBookmaker: firstBookmaker });
    if (firstBookmaker !== ("" || "Bookmakers")) {
      if (firstBookmaker === "MacaoWin") {
        newOdds = newOdds.filter(
          (odd) => (odd.book_one || odd.book_two) === "macao"
        );
      }
      if (firstBookmaker === "SirPlay") {
        newOdds = newOdds.filter(
          (odd) => (odd.book_one || odd.book_two) === "sirplay"
        );
      }
    }
    this.setState({ temporaryOdds: newOdds });
  };

  // Odds filter based on markets, odds value and date
  setFilters = (options) => {
    console.log(options);
    let odds = this.state.odds;
    let filteredOdds = [];

    if (options.filters === false && options.reset === false) {
      this.setState({ showFilterModal: false, temporaryOdds: odds });
    } else if (options.filters === false && options.reset === true) {
      this.setState({ showFilterModal: false, temporaryOdds: odds });
    } else {
      // First bookmaker
      if (this.state.firstBookmaker !== ("" || "Bookmakers")) {
        if (this.state.firstBookmaker === "MacaoWin") {
          odds = odds.filter(
            (odd) => (odd.book_one || odd.book_two) === "macao"
          );
        }
        if (this.state.firstBookmaker === "SirPlay") {
          odds = odds.filter(
            (odd) => (odd.book_one || odd.book_two) === "sirplay"
          );
        }
      }

      // Filter for full time
      if (options.allMarkets) {
        let oneXTwo = odds.filter((odd) => odd.market === "1X2");
        let underOver = odds.filter((odd) => odd.market === "U/O");
        let goalNogoal = odds.filter((odd) => odd.market === "GG/NG");
        filteredOdds = []
          .concat(filteredOdds)
          .concat(oneXTwo)
          .concat(underOver)
          .concat(goalNogoal);
      } else {
        if (options.oneXTwo) {
          let addOdds = odds.filter((odd) => odd.market === "1X2");
          filteredOdds = [].concat(filteredOdds).concat(addOdds);
        }
        if (options.underOver) {
          let addOdds = odds.filter((odd) => odd.market === "U/O");
          filteredOdds = [].concat(filteredOdds).concat(addOdds);
        }
        if (options.goalNogoal) {
          let addOdds = odds.filter((odd) => odd.market === "GG/NG");
          filteredOdds = [].concat(filteredOdds).concat(addOdds);
        }
      }

      if (options.allMarketsFirstTime) {
        let oneXTwo = odds.filter((odd) => odd.market === "1X2_t1");
        let underOver = odds.filter((odd) => odd.market === "U/O_t1");
        let goalNogoal = odds.filter((odd) => odd.market === "GG/NG_t1");
        filteredOdds = []
          .concat(filteredOdds)
          .concat(oneXTwo)
          .concat(underOver)
          .concat(goalNogoal);
      } else {
        if (options.oneXTwoFirstTime) {
          let addOdds = odds.filter((odd) => odd.market === "1X2_t1");
          filteredOdds = [].concat(filteredOdds).concat(addOdds);
        }
        if (options.underOverFirstTime) {
          let addOdds = odds.filter((odd) => odd.market === "U/O_t1");
          filteredOdds = [].concat(filteredOdds).concat(addOdds);
        }
        if (options.goalNogoalFirstTime) {
          let addOdds = odds.filter((odd) => odd.market === "GG/NG_t1");
          filteredOdds = [].concat(filteredOdds).concat(addOdds);
        }
      }
      if (options.allMarketsSecondTime) {
        let oneXTwo = odds.filter((odd) => odd.market === "1X2_t2");
        let underOver = odds.filter((odd) => odd.market === "U/O_t2");
        let goalNogoal = odds.filter((odd) => odd.market === "GG/NG_t2");
        filteredOdds = []
          .concat(filteredOdds)
          .concat(oneXTwo)
          .concat(underOver)
          .concat(goalNogoal);
      } else {
        if (options.oneXTwoSecondTime) {
          let addOdds = odds.filter((odd) => odd.market === "1X2_t2");
          filteredOdds = [].concat(filteredOdds).concat(addOdds);
        }
        if (options.underOverSecondTime) {
          let addOdds = odds.filter((odd) => odd.market === "U/O_t2");
          filteredOdds = [].concat(filteredOdds).concat(addOdds);
        }
        if (options.goalNogoalSecondTime) {
          let addOdds = odds.filter((odd) => odd.market === "GG/NG_t2");
          filteredOdds = [].concat(filteredOdds).concat(addOdds);
        }
      }

      // Sorting the odds to have the higher rating
      filteredOdds.sort((a, b) => {
        return b.roi - a.roi;
      });

      // Filtering by date and time
      // Date informations
      let startYear =
        options.startDate !== ""
          ? parseInt(options.startDate.split("-")[0])
          : NaN;
      let startMonth =
        options.startDate !== ""
          ? parseInt(options.startDate.split("-")[1])
          : NaN;
      let startDay =
        options.startDate !== ""
          ? parseInt(options.startDate.split("-")[2])
          : NaN;
      let endYear =
        options.endDate !== "" ? parseInt(options.endDate.split("-")[0]) : NaN;
      let endMonth =
        options.endDate !== "" ? parseInt(options.endDate.split("-")[1]) : NaN;
      let endDay =
        options.endDate !== "" ? parseInt(options.endDate.split("-")[2]) : NaN;
      let startHour =
        options.startTime !== ""
          ? parseInt(options.startTime.split(":")[0])
          : NaN;
      let startMinute =
        options.startTime !== ""
          ? parseInt(options.startTime.split(":")[1])
          : NaN;
      let endHour =
        options.endTime !== "" ? parseInt(options.endTime.split(":")[0]) : NaN;
      let endMinute =
        options.endTime !== "" ? parseInt(options.endTime.split(":")[1]) : NaN;

      // Deleting odds with no data or time specified
      filteredOdds = filteredOdds.filter(
        (odd) => odd.start_date !== undefined && odd.start_time !== undefined
      );
      // Start Date
      if (!isNaN(startYear) && !isNaN(startMonth) && !isNaN(startDay)) {
        filteredOdds = filteredOdds.filter(
          (odd) =>
            parseInt(odd.start_date.split("/")[0]) >= startDay &&
            parseInt(odd.start_date.split("/")[1]) >= startMonth &&
            parseInt(odd.start_date.split("/")[2]) >= startYear
        );
      }
      // Start Time
      if (!isNaN(startHour) && !isNaN(startMinute)) {
        filteredOdds = filteredOdds.filter(
          (odd) => parseInt(odd.start_time.split(":")[0]) >= startHour
          //&&
          //parseInt(odd.start_time.split(":")[1]) >= startMinute
        );
        // odds = odds.filter((odd) =>
        //     parseInt(odd.start_time.split(":")[1]) >= startMinute
        // )
      }

      // End Date
      if (!isNaN(endYear) && !isNaN(endMonth) && !isNaN(endDay)) {
        filteredOdds = filteredOdds.filter(
          (odd) =>
            parseInt(odd.start_date.split("/")[0]) <= endDay &&
            parseInt(odd.start_date.split("/")[1]) <= endMonth &&
            parseInt(odd.start_date.split("/")[2]) <= endYear
        );
      }
      // End Time
      if (!isNaN(endHour) && !isNaN(endMinute)) {
        filteredOdds = filteredOdds.filter(
          (odd) => parseInt(odd.start_time.split(":")[0]) <= endHour
          // &&
          // parseInt(odd.start_time.split(":")[1]) <= startMinute
        );
      }

      // Min Odd
      if (!isNaN(options.minOdd)) {
        filteredOdds = filteredOdds.filter(
          (odd) => parseFloat(odd.odd_one) >= options.minOdd
        );
      }
      // Max Odd
      if (!isNaN(options.maxOdd)) {
        filteredOdds = filteredOdds.filter(
          (odd) => parseFloat(odd.odd_one) >= options.minOdd
        );
      }

      // Filtering by min and max odd

      this.setState({ temporaryOdds: filteredOdds, showFilterModal: false });
    }
  };

  closeFilterModal = () => {
    this.setState({ showFilterModal: false });
  };

  openFilterModal = () => {
    this.setState({ showFilterModal: true });
  };

  componentDidMount = () => {
    this.fetchOdds();
  };

  render() {
    return (
      <div>
        <ModalContainer
          firstBookmaker={this.firstBookmaker}
          setFilters={this.setFilters}
          showFilterModal={this.state.showFilterModal}
          openFilterModal={this.openFilterModal}
          closeFilterModal={this.closeFilterModal}
        />
        <div id="oddsmatcher-table-container">
          {this.state.isLoading ? (
            <Spinner
              animation="border"
              variant="info"
              id="oddsmatcher-spinner"
            />
          ) : (
            <OddsmatcherTable odds={this.state.temporaryOdds} />
          )}
        </div>
        <Disclaimer />
      </div>
    );
  }
}

export default Oddsmatcher;
