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
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.noShow}>
          <Modal.Header>
            <h3>Filtri Di Ricerca</h3>
          </Modal.Header>
          <Modal.Body>
            <Row className="no-gutters"> 
              <Col xs={12} md={2}>
                <div className="filters-modal-form-col">
                  <h5>Mercati Esito Finale</h5>
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
                  <Row className="no-gutters" style={{ marginBottom: "0.5rem" }}>
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
                  <Row className="no-gutters" style={{ marginBottom: "0.5rem" }}>
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
                <Button variant="success" onClick={this.props.noShow}>Applica</Button>
              </Col>
              <Col xs={4}>
                <Button variant="dark" onClick={this.props.noShow}>Chiudi</Button>
              </Col>
              <Col xs={4}>
                <Button variant="danger" onClick={this.props.noShow}>Resetta</Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FiltersModal;
