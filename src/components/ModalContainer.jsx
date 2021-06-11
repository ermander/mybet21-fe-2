import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Button, Form } from "react-bootstrap";
import FiltersModal from "./FiltersModal"

class ModalContainer extends Component {
  state={
    showFilterModal: false,
  }

  showFilterModal = () => {
    this.setState({showFilterModal: !this.state.showFilterModal})
  }

  render() {
    return (
      <div id="modal-container">
        {/* Hidden Modals */}
        <FiltersModal show={this.state.showFilterModal} noShow={this.showFilterModal}/>
        <Row className="no-gutters">
          <Col xs={3}>
            <Button onClick={this.showFilterModal}>Filtri</Button>
          </Col>
          <Col xs={3}>
            <Form.Group>
              <Form.Control as="select">
                <option>Bookmakers</option>
                <option>MacaoWin</option>
                <option>SirPlay</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Button>
              Filtra per Data
              <FontAwesomeIcon icon={faRedo} />
            </Button>
          </Col>
          <Col xs={3}>
            <Button>
              Filtra per Rating
              <FontAwesomeIcon icon={faRedo} />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ModalContainer;