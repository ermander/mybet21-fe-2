import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

// Components
import ModalContainer from "../components/ModalContainer"
import Disclaimer from "../components/Disclaimer"
import OddsmatcherTable from "../components/OddsmatcherTable";

// Bookmakers Logos
import { logos } from "../utilities/bookmakerLogos"

class Oddsmatcher extends Component {
  state = {
    isLoading: true,
    odds: [],
  };

  fetchOdds = async () => {
    try {
      this.setState({ isLoading: true, odds: [] });
      const response = await fetch("https://the-master-matched-be-new.herokuapp.com/mybet21/oddsmatcher");
      const parsedResponse = await response.json();
      const odds = parsedResponse.map((odd) => {
        return{
          ...odd,
          book_one_image: (
            <img src={logos[odd.book_one]} alt={logos[odd.book_one]}/>
          ),
          book_two_image: (
            <img src={logos[odd.book_two]} alt={logos[odd.book_two]}/>
          ),
          tableRoi: odd.roi.toFixed(2) + "%"
        }
      })
      odds.sort((a, b) => {
        return b.roi - a.roi;
      })
      console.log(odds[1].book_one)
      this.setState({ isLoading: false, odds: odds });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.fetchOdds()
  }

  render() {
    return (
      <div>
        <ModalContainer />        
        <div id="oddsmatcher-table-container"> 
        {
          this.state.isLoading ?
          (
            <Spinner animation="border" variant="info" id="oddsmatcher-spinner" />
          )
          :
          (             
            <OddsmatcherTable odds={this.state.odds} />
          )
        }        
        </div>
        <Disclaimer />
      </div>
    );
  }
}

export default Oddsmatcher;
