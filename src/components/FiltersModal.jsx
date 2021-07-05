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
    allMarket: true,
    oneXTwo: false,
    underOver: false,
    goalNogoal: false,
  };

  setMarketFilters = (market) => {
    if (market === "allMarkets") {
      this.state.allMarket === true
        ? this.setState({ oneXTwo: false, underOver: false, goalNogoal: false })
        : this.setState({
            allMarket: true,
            oneXTwo: false,
            underOver: false,
            goalNogoal: false,
          });
    }
    if (market === "1x2") {
      this.state.oneXTwo === true
        ? this.setState({ allMarket: false, oneXTwo: false })
        : this.setState({ allMarket: false, oneXTwo: true });
    }
    if (market === "underOver") {
      this.state.underOver === true
        ? this.setState({ allMarket: false, underOver: false })
        : this.setState({ allMarket: false, underOver: true });
    }
    if (market === "goalNogoal") {
      this.state.goalNogoal === true
        ? this.setState({ allMarket: false, goalNogoal: false })
        : this.setState({ allMarket: false, goalNogoal: true });
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
                      checked={this.state.allMarket}
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
                      onChange={() => this.setMarketFilters("1x2")}
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
                    <Form.Check inline></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>Tutti</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check inline></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>1X2</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check inline></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>U/O</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check inline></Form.Check>
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
                    <Form.Check inline></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>Tutti</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check inline></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>1X2</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check inline></Form.Check>
                    <Form.Check inline className="text-form">
                      <span>U/O</span>
                    </Form.Check>
                  </div>
                  <div>
                    <Form.Check inline></Form.Check>
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
                        <FormControl type="date" />
                      </InputGroup>
                    </Col>
                    <Col xs={3}>
                      <InputGroup>
                        <FormControl type="time" />
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
                        <FormControl type="date" />
                      </InputGroup>
                    </Col>
                    <Col xs={3}>
                      <InputGroup>
                        <FormControl type="time" />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="no-gutters">
                    <Col xs={2}>
                      <strong>Quota:</strong>
                    </Col>
                    <Col xs={5}>
                      <InputGroup>
                        <FormControl type="number" placeholder="Quota Min." />
                      </InputGroup>
                    </Col>
                    <Col xs={5}>
                      <InputGroup>
                        <FormControl type="number" placeholder="Quota Max." />
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
                  onClick={() => this.props.setFilters({
                    filters: true,
                    allMarket: this.state.allMarket,
                    oneXTwo: this.state.oneXTwo,
                    underOver: this.state.underOver,
                    goalNogoal: this.state.goalNogoal
                  })}
                >
                  Applica
                </Button>
              </Col>
              <Col xs={4}>
                <Button
                  variant="dark"
                  onClick={() => this.props.setFilters({
                    filters: false
                  })}
                >
                  Chiudi
                </Button>
              </Col>
              <Col xs={4}>
                <Button
                  variant="danger"
                  onClick={() => this.props.setFilters({
                    filters: false
                  })}
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