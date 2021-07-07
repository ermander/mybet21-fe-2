import React, { Component } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../styles/_filters-modal.scss";

class FiltersModal extends Component {
  state = {
    allMarkets: true,
    oneXTwo: false,
    underOver: false,
    goalNogoal: false,
    allMarketsFirstTime: true,
    oneXTwoFirstTime: false,
    underOverFirstTime: false,
    goalNogoalFirstTime: false,
    allMarketsSecondTime: true,
    oneXTwoSecondTime: false,
    underOverSecondTime: false,
    goalNogoalSecondTime: false,
    minOdd: "",
    maxOdd: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  };

  setMarketFilters = (market) => {
    if (market === "allMarkets") {
      this.state.allMarkets === true
        ? this.setState({
            allMarkets: false,
            oneXTwo: false,
            underOver: false,
            goalNogoal: false,
          })
        : this.setState({
            allMarkets: true,
            oneXTwo: false,
            underOver: false,
            goalNogoal: false,
          });
    }
    if (market === "oneXTwo") {
      this.state.oneXTwo === true
        ? this.setState({ allMarkets: false, oneXTwo: false })
        : this.setState({ allMarkets: false, oneXTwo: true });
    }
    if (market === "underOver") {
      this.state.underOver === true
        ? this.setState({ allMarkets: false, underOver: false })
        : this.setState({ allMarkets: false, underOver: true });
    }
    if (market === "goalNogoal") {
      this.state.goalNogoal === true
        ? this.setState({ allMarkets: false, goalNogoal: false })
        : this.setState({ allMarkets: false, goalNogoal: true });
    }

    if (market === "allMarketsFirstTime") {
      this.state.allMarketsFirstTime === true
        ? this.setState({
            allMarketsFirstTime: false,
            oneXTwoFirstTime: false,
            underOverFirstTime: false,
            goalNogoalFirstTime: false,
          })
        : this.setState({
            allMarketsFirstTime: true,
            oneXTwoFirstTime: false,
            underOverFirstTime: false,
            goalNogoalFirstTime: false,
          });
    }
    if (market === "oneXTwoFirstTime") {
      this.state.oneXTwoFirstTime === true
        ? this.setState({ allMarketsFirstTime: false, oneXTwoFirstTime: false })
        : this.setState({ allMarketsFirstTime: false, oneXTwoFirstTime: true });
    }
    if (market === "underOverFirstTime") {
      this.state.underOverFirstTime === true
        ? this.setState({
            allMarketsFirstTime: false,
            underOverFirstTime: false,
          })
        : this.setState({
            allMarketsFirstTime: false,
            underOverFirstTime: true,
          });
    }
    if (market === "goalNogoalFirstTime") {
      this.state.goalNogoalFirstTime === true
        ? this.setState({
            allMarketsFirstTime: false,
            goalNogoalFirstTime: false,
          })
        : this.setState({
            allMarketsFirstTime: false,
            goalNogoalFirstTime: true,
          });
    }

    if (market === "allMarketsSecondTime") {
      this.state.allMarketsSecondTime === true
        ? this.setState({
            allMarketsSecondTime: false,
            oneXTwoSecondTime: false,
            underOverSecondTime: false,
            goalNogoalSecondTime: false,
          })
        : this.setState({
            allMarketsSecondTime: true,
            oneXTwoSecondTime: false,
            underOverSecondTime: false,
            goalNogoalSecondTime: false,
          });
    }
    if (market === "oneXTwoSecondTime") {
      this.state.oneXTwoSecondTime === true
        ? this.setState({
            allMarketsSecondTime: false,
            oneXTwoSecondTime: false,
          })
        : this.setState({
            allMarketsSecondTime: false,
            oneXTwoSecondTime: true,
          });
    }
    if (market === "underOverSecondTime") {
      this.state.underOveSecondTimer === true
        ? this.setState({
            allMarketsSecondTime: false,
            underOverSecondTime: false,
          })
        : this.setState({
            allMarketsSecondTime: false,
            underOverSecondTime: true,
          });
    }
    if (market === "goalNogoalSecondTime") {
      this.state.goalNogoalSecondTime === true
        ? this.setState({
            allMarketsSecondTime: false,
            goalNogoalSecondTime: false,
          })
        : this.setState({
            allMarketsSecondTime: false,
            goalNogoalSecondTime: true,
          });
    }
  };
  render() {
    return (
      <div>
        <Modal
          show={this.props.showFilterModal}
          onHide={this.props.showFilterModal}
        >
          <Modal.Header>
            <h3>Filtri Di Ricerca</h3>
          </Modal.Header>
          <Modal.Body>
            <Row className="no-gutters">
              <Col xs={12} md={2}>
                <div className="filters-modal-form-col">
                  <h5>Mercati Esito Finale</h5>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.allMarkets}
                      onChange={() => this.setMarketFilters("allMarkets")}
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>Tutti</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.oneXTwo}
                      onChange={() => this.setMarketFilters("oneXTwo")}
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>1X2</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.underOver}
                      onChange={() => this.setMarketFilters("underOver")}
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>U/O</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.goalNogoal}
                      onChange={() => this.setMarketFilters("goalNogoal")}
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>GG/NG</span>
                    </Form.Check>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={2}>
                <div className="filters-modal-form-col">
                  <h5>Mercati Esito 1°T</h5>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.allMarketsFirstTime}
                      onChange={() =>
                        this.setMarketFilters("allMarketsFirstTime")
                      }
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>Tutti</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.oneXTwoFirstTime}
                      onChange={() => this.setMarketFilters("oneXTwoFirstTime")}
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>1X2</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.underOverFirstTime}
                      onChange={() =>
                        this.setMarketFilters("underOverFirstTime")
                      }
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>U/O</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.goalNogoalFirstTime}
                      onChange={() =>
                        this.setMarketFilters("goalNogoalFirstTime")
                      }
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>GG/NG</span>
                    </Form.Check>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={2}>
                <div className="filters-modal-form-col">
                  <h5>Mercati Esito 2°T</h5>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.allMarketsSecondTime}
                      onChange={() =>
                        this.setMarketFilters("allMarketsSecondTime")
                      }
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>Tutti</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.oneXTwoSecondTime}
                      onChange={() =>
                        this.setMarketFilters("oneXTwoSecondTime")
                      }
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>1X2</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.underOverSecondTime}
                      onChange={() =>
                        this.setMarketFilters("underOverSecondTime")
                      }
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>U/O</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check
                      inline
                      checked={this.state.goalNogoalSecondTime}
                      onChange={() =>
                        this.setMarketFilters("goalNogoalSecondTime")
                      }
                    ></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>GG/NG</span>
                    </Form.Check>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="filters-modal-form-col">
                  <h5>Data, Ora e Quote</h5>
                  <Row
                    className="no-gutters"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <Col xs={2}>
                      <strong>Inizio:</strong>
                    </Col>
                    <Col xs={7}>
                      <InputGroup>
                        <FormControl
                          onChange={(e) =>
                            this.setState({ startDate: e.currentTarget.value })
                          }
                          type="date"
                        />
                      </InputGroup>
                    </Col>
                    <Col xs={3}>
                      <InputGroup>
                        <FormControl
                          onChange={(e) =>
                            this.setState({ startTime: e.currentTarget.value })
                          }
                          type="time"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row
                    className="no-gutters"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    <Col xs={2}>
                      <strong>Fine:</strong>
                    </Col>
                    <Col xs={7}>
                      <InputGroup>
                        <FormControl
                          onChange={(e) =>
                            this.setState({ endDate: e.currentTarget.value })
                          }
                          type="date"
                        />
                      </InputGroup>
                    </Col>
                    <Col xs={3}>
                      <InputGroup>
                        <FormControl
                          onChange={(e) =>
                            this.setState({ endTime: e.currentTarget.value })
                          }
                          type="time"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="no-gutters">
                    <Col xs={2}>
                      <strong>Quota:</strong>
                    </Col>
                    <Col xs={5}>
                      <InputGroup>
                        <FormControl
                          onChange={(e) =>
                            this.setState({ minOdd: e.currentTarget.value })
                          }
                          type="number"
                          placeholder="Quota Min."
                        />
                      </InputGroup>
                    </Col>
                    <Col xs={5}>
                      <InputGroup>
                        <FormControl
                          onChange={(e) =>
                            this.setState({ maxOdd: e.currentTarget.value })
                          }
                          type="number"
                          placeholder="Quota Max."
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Row className="no-gutters">
              <Col xs={4}>
                <Button
                  variant="success"
                  onClick={() =>
                    this.props.setFilters({
                      filters: true,
                      allMarkets: this.state.allMarkets,
                      oneXTwo: this.state.oneXTwo,
                      underOver: this.state.underOver,
                      goalNogoal: this.state.goalNogoal,
                      allMarketsFirstTime: this.state.allMarketsFirstTime,
                      oneXTwoFirstTime: this.state.oneXTwoFirstTime,
                      underOverFirstTime: this.state.underOverFirstTime,
                      goalNogoalFirstTime: this.state.goalNogoalFirstTime,
                      allMarketsSecondTime: this.state.allMarketsSecondTime,
                      oneXTwoSecondTime: this.state.oneXTwoSecondTime,
                      underOverSecondTime: this.state.underOverSecondTime,
                      goalNogoalSecondTime: this.state.goalNogoalSecondTime,
                      minOdd: this.state.minOdd,
                      maxOdd: this.state.maxOdd,
                      startDate: this.state.startDate,
                      endDate: this.state.endDate,
                      startTime: this.state.startTime,
                      endTime: this.state.endTime,
                    })
                  }
                >
                  Applica
                </Button>
              </Col>
              <Col xs={4}>
                <Button
                  variant="dark"
                  onClick={() =>
                    this.props.setFilters({
                      filters: false,
                      reset: false,
                    })
                  }
                >
                  Chiudi
                </Button>
              </Col>
              <Col xs={4}>
                <Button
                  variant="danger"
                  onClick={() =>
                    this.props.setFilters(
                      {
                        filters: false,
                        reset: true,
                      },
                      this.setState({
                        allMarkets: true,
                        oneXTwo: false,
                        underOver: false,
                        goalNogoal: false,
                        allMarketsFirstTime: true,
                        oneXTwoFirstTime: false,
                        underOverFirstTime: false,
                        goalNogoalFirstTime: false,
                        allMarketsSecondTime: true,
                        oneXTwoSecondTime: false,
                        underOverSecondTime: false,
                        goalNogoalSecondTime: false,
                        minOdd: "",
                        maxOdd: "",
                        startDate: "",
                        endDate: "",
                        startTime: "",
                        endTime: "",
                      })
                    )
                  }
                >
                  Resetta
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FiltersModal;
