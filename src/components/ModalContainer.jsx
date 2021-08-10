import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import FiltersModal from "./FiltersModal";
import { logos } from "../utilities/bookmakerLogos";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setFirstBookmaker: (options) => dispatch(handleSetFirtBookmaker(options)),
  openFilterModal: () =>
    dispatch({
      type: "SHOW_FILTER_MODAL",
    }),
});

const handleSetFirtBookmaker = (options) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_MAIN_ODDS",
      payload: [],
    });
    console.log(options);
    let filters = options.filters;
    let data = {
      allMarkets: filters.allMarkets,
      allMarketsFirstTime: filters.allMarketsFirstTime,
      allMarketsSecondTime: filters.allMarketsSecondTime,
      initialDate: new Date(`${options.initialDate}, ${options.initialHour}`),
      finalDate: new Date(`${options.finalDate}, ${options.finalHour}`),
      goalNoGoal: filters.goalNoGoal,
      goalNoGoalFirstTime: filters.goalNoGoalFirstTime,
      goalNoGoalSecondTime: filters.goalNoGoalSecondTime,
      maxOdd: filters.maxOdd,
      minOdd: filters.minOdd,
      oneXTwo: filters.oneXTwo,
      oneXTwoFirstTime: filters.oneXTwoFirstTime,
      oneXTwoSecondTime: filters.oneXTwoSecondTime,
      underOver: filters.underOver,
      underOverFirstTime: filters.underOverFirstTime,
      underOverSecondTime: filters.underOverSecondTime,
      firstBookmaker: options.firstBookmaker,
      prova: "prova"
    };

    console.log(data);

    const response = await fetch("https://odds-and-db-be-server.herokuapp.com/mybet21/prova", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let parsedResponse = await response.json();
    parsedResponse = parsedResponse.map((odd) => {
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
    console.log(parsedResponse);
    dispatch({
      type: "SET_MAIN_ODDS",
      payload: parsedResponse,
    });
  };
};

function ModalContainer(props) {
  return (
    <div id="modal-container">
      {/* Hidden Modals */}
      <FiltersModal />
      <Row className="no-gutters">
        <Col xs={3}>
          <Button onClick={props.openFilterModal}>Filtri</Button>
        </Col>
        <Col xs={3}>
          <Form.Group>
            <Form.Control
              as="select"
              onChange={(e) =>
                props.setFirstBookmaker({
                  firstBookmaker: e.currentTarget.value,
                  filters: props.filters,
                })
              }
            >
              <option>Bookmakers</option>
              <option>MacaoWin</option>
              <option>SirPlay</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={3}></Col>
        <Col xs={3}></Col>
      </Row>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
