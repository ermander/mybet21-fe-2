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
      const response = await fetch(
        "https://odds-and-db-be-server.herokuapp.com/mybet21/oddsmatcher"
      );
      const parsedResponse = await response.json();
      const odds = parsedResponse.map((odd) => {
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
      const rawHistory = await fetch("https://odds-and-db-be-server.herokuapp.com/mybet21/history")
      const history = await rawHistory.json()


      this.setState({ isLoading: false, odds: odds, temporaryOdds: odds });
    } catch (error) {
      console.log(error);
    }
  };
  // Odds filter based on first bookmaker preference
  firstBookmaker = (firstBookmaker) => {
    let newOdds = this.state.odds;
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
    let odds = this.state.temporaryOdds;
    if (options.filters === false) this.setState({ showFilterModal: false });
    if (options.filters === true) {
      if (options.allMarket === true) {
        this.setState({
          showFilterModal: false,
          temporaryOdds: this.state.odds,
        });
      } else {
        if (!options.oneXTwo)
          odds = odds.filter((odd) => odd.odd_one_type !== ("1" || "x" || "2"));
        if (!options.underOver)
          odds = odds.filter(
            (odd) =>
              odd.odd_one_type !==
              ("U0.5" ||
                "O0.5" ||
                "U1.5" ||
                "O1.5" ||
                "U2.5" ||
                "O2.5" ||
                "U3.5" ||
                "O3.5")
          );
        if (!options.goalNogoal)
          odds = odds.filter(
            (odd) => odd.odd_one_type !== ("goal" || "no goal")
          );
      }
    }
    odds.sort((a, b) => {
      return b.roi - a.roi;
    });
    this.setState({ temporaryOdds: odds, showFilterModal: false });
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
