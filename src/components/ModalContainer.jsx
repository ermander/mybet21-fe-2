import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import FiltersModal from "./FiltersModal";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setFirstBookmaker: (payload) =>
    dispatch({
      type: "SET_FIRST_BOOKMAKER",
      payload: payload,
    }),
  openFilterModal: () =>
    dispatch({
      type: "SHOW_FILTER_MODAL",
    }),
});

function ModalContainer(props) {
  const filterFirstBookmaker = (firstBookmaker) => {
    console.log(firstBookmaker)
    props.setFirstBookmaker(firstBookmaker);
    let odds = props.odds
    if (firstBookmaker === "MacaoWin") {
      odds = odds.filter((odd) => odd.book_one === "macao");
    }
    if (firstBookmaker === "SirPlay") {
      odds = odds.filter((odd) => odd.book_one === "sirplay");
    }
    console.log(odds.length)
    props.setFilteredOdds(odds);
  };

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
              onChange={(e) => filterFirstBookmaker(e.currentTarget.value)}
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
