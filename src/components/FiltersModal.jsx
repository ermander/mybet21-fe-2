import React, { useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import "../styles/_filters-modal.scss";
import { months } from "../utilities/months";
import { logos } from "../utilities/bookmakerLogos";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  openFilterModal: () =>
    dispatch({
      type: "SHOW_FILTER_MODAL",
    }),
  setFilters: (payload) =>
    dispatch({
      type: "SET_FILTERS",
      payload: payload,
    }),
  setFirstBookmaker: (payload) =>
    dispatch({
      type: "SET_FIRST_BOOKMAKER",
      payload: payload,
    }),
  prova: (options) => dispatch(handleFilters(options)),
});

const handleFilters = (options) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_FILTERS",
        payload: options,
      });
      const response = await fetch("https://odds-and-db-be-server.herokuapp.com/mybet21/prova", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });
      let odds = await response.json();
      console.log("The response is: ", odds);
      if (response.ok) {
        odds = odds.map((odd) => {
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
        dispatch({
          type: "SET_MAIN_ODDS",
          payload: odds,
        });
        dispatch({
          type: "SHOW_FILTER_MODAL",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

function FilterModal(props) {
  // FIRST TIME STATUS
  const [marketStatusFullTime, setMarketStatusFullTime] = useState({
    allMarkets: true,
    oneXTwo: false,
    underOver: false,
    goalNoGoal: false,
  });
  const [marketStatusFirstTime, setMarketStatusFirstTime] = useState({
    allMarketsFirstTime: true,
    oneXTwoFirstTime: false,
    underOverFirstTime: false,
    goalNoGoalFirstTime: false,
  });
  // SECOND TIME STATUS
  const [marketStatusSecondTime, setMarketStatusSecondTime] = useState({
    allMarketsSecondTime: true,
    oneXTwoSecondTime: false,
    underOverSecondTime: false,
    goalNoGoalSecondTime: false,
  });
  // MIN AND MAX ODD STATUS
  const [minOdd, setMinOdd] = useState("");
  const [maxOdd, setMaxOdd] = useState("");
  // INITIAL DATE STATUS
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [initialHour, setInitialHour] = useState();
  const [finalHour, setFinalHour] = useState();

  const resetFilters = () => {
    setMarketStatusFullTime({
      allMarkets: true,
      oneXTwo: false,
      underOver: false,
      goalNoGoal: false,
    });
    setMarketStatusFirstTime({
      allMarketsFirstTime: true,
      oneXTwoFirstTime: false,
      underOverFirstTime: false,
      goalNoGoalFirstTime: false,
    });
    setMarketStatusSecondTime({
      allMarketsSecondTime: true,
      oneXTwoSecondTime: false,
      underOverSecondTime: false,
      goalNoGoalSecondTime: false,
    });
    setMinOdd("");
    setMaxOdd("");
    firstDateSet();
    props.setFirstBookmaker("");
    props.prova({
      //FULL TIME
      allMarkets: marketStatusFullTime.allMarkets,
      oneXTwo: marketStatusFullTime.oneXTwo,
      underOver: marketStatusFullTime.underOver,
      goalNoGoal: marketStatusFullTime.goalNoGoal,
      // FIRST TIME
      allMarketsFirstTime: marketStatusFirstTime.allMarketsFirstTime,
      oneXTwoFirstTime: marketStatusFirstTime.oneXTwoFirstTime,
      underOverFirstTime: marketStatusFirstTime.underOverFirstTime,
      goalNoGoalFirstTime: marketStatusFirstTime.goalNoGoalFirstTime,
      // SECOND TIME
      allMarketsSecondTime: marketStatusSecondTime.allMarketsSecondTime,
      oneXTwoSecondTime: marketStatusSecondTime.oneXTwoSecondTime,
      underOverSecondTime: marketStatusSecondTime.underOverSecondTime,
      goalNoGoalSecondTime: marketStatusSecondTime.goalNoGoalSecondTime,
      minOdd: minOdd,
      maxOdd: maxOdd,
      initialDate: initialDate,
      finalDate: finalDate,
      initialHour: initialHour,
      finalHour: finalHour,
    });
  };

  const firstDateSet = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let finalMonth = month + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getUTCMinutes();

    if (month <= 9) {
      for (let i = 0; i <= 9; i++) {
        if (month === i) month = `0${month}`;
      }
    }
    if (finalMonth <= 9) {
      for (let i = 0; i <= 9; i++) {
        if (finalMonth === i) finalMonth = `0${finalMonth}`;
      }
    }
    if (day <= 9) {
      for (let i = 0; i <= 9; i++) {
        if (day === i) day = `0${day}`;
      }
    }
    console.log(finalMonth)
    const newInitialDate = `${year}-${month}-${day}`;
    const newFinalDate = `${year}-${finalMonth}-${day}`;
    let newInitialAndFinalHour = `${hour}:${minutes}`;
    if (newInitialAndFinalHour[1] === ":") {
      newInitialAndFinalHour = `0${hour}:${minutes}`;
    }
    setInitialDate(newInitialDate);
    setFinalDate(newFinalDate);
    setInitialHour(newInitialAndFinalHour);
    setFinalHour(newInitialAndFinalHour);
  };

  const setMarketsFilters = (market) => {
    if (market === "allMarkets") {
      marketStatusFullTime.allMarkets === true
        ? setMarketStatusFullTime({
            allMarkets: false,
            oneXTwo: true,
            underOver: true,
            goalNoGoal: true,
          })
        : setMarketStatusFullTime({
            allMarkets: true,
            oneXTwo: false,
            underOver: false,
            goalNoGoal: false,
          });
    }
    if (market === "oneXTwo") {
      marketStatusFullTime.oneXTwo === true
        ? setMarketStatusFullTime({
            ...marketStatusFullTime,
            allMarkets: false,
            oneXTwo: false,
          })
        : setMarketStatusFullTime({
            ...marketStatusFullTime,
            allMarkets: false,
            oneXTwo: true,
          });
    }
    if (market === "underOver") {
      marketStatusFullTime.underOver === true
        ? setMarketStatusFullTime({
            ...marketStatusFullTime,
            allMarkets: false,
            underOver: false,
          })
        : setMarketStatusFullTime({
            ...marketStatusFullTime,
            allMarkets: false,
            underOver: true,
          });
    }
    if (market === "goalNoGoal") {
      marketStatusFullTime.goalNoGoal === true
        ? setMarketStatusFullTime({
            ...marketStatusFullTime,
            allMarkets: false,
            goalNoGoal: false,
          })
        : setMarketStatusFullTime({
            ...marketStatusFullTime,
            allMarkets: false,
            goalNoGoal: true,
          });
    }

    if (market === "allMarketsFirstTime") {
      marketStatusFirstTime.allMarketsFirstTime === true
        ? setMarketStatusFirstTime({
            allMarketsFirstTime: false,
            oneXTwoFirstTime: false,
            underOverFirstTime: false,
            goalNoGoalFirstTime: false,
          })
        : setMarketStatusFirstTime({
            allMarketsFirstTime: true,
            oneXTwoFirstTime: false,
            underOverFirstTime: false,
            goalNoGoalFirstTime: false,
          });
    }
    if (market === "oneXTwoFirstTime") {
      marketStatusFirstTime.oneXTwoFirstTime === true
        ? setMarketStatusFirstTime({
            ...marketStatusFirstTime,
            allMarketsFirstTime: false,
            oneXTwoFirstTime: false,
          })
        : setMarketStatusFirstTime({
            ...marketStatusFirstTime,
            allMarketsFirstTime: false,
            oneXTwoFirstTime: true,
          });
    }
    if (market === "underOverFirstTime") {
      marketStatusFirstTime.underOverFirstTime === true
        ? setMarketStatusFirstTime({
            ...marketStatusFirstTime,
            allMarketsFirstTime: false,
            underOverFirstTime: false,
          })
        : setMarketStatusFirstTime({
            ...marketStatusFirstTime,
            allMarketsFirstTime: false,
            underOverFirstTime: true,
          });
    }
    if (market === "goalNoGoalFirstTime") {
      marketStatusFirstTime.goalNoGoalFirstTime === true
        ? setMarketStatusFirstTime({
            ...marketStatusFirstTime,
            allMarketsFirstTime: false,
            goalNoGoalFirstTime: false,
          })
        : setMarketStatusFirstTime({
            ...marketStatusFirstTime,
            allMarketsFirstTime: false,
            goalNoGoalFirstTime: true,
          });
    }

    if (market === "allMarketsSecondTime") {
      marketStatusSecondTime.allMarketsSecondTime === true
        ? setMarketStatusSecondTime({
            allMarketsSecondTime: false,
            oneXTwoSecondTime: false,
            underOverSecondTime: false,
            goalNoGoalSecondTime: false,
          })
        : setMarketStatusSecondTime({
            allMarketsSecondTime: true,
            oneXTwoSecondTime: false,
            underOverSecondTime: false,
            goalNoGoalSecondTime: false,
          });
    }
    if (market === "oneXTwoSecondTime") {
      marketStatusSecondTime.oneXTwoSecondTime === true
        ? setMarketStatusSecondTime({
            ...marketStatusSecondTime,
            allMarketsSecondTime: false,
            oneXTwoSecondTime: false,
          })
        : setMarketStatusSecondTime({
            ...marketStatusSecondTime,
            allMarketsSecondTime: false,
            oneXTwoSecondTime: true,
          });
    }
    if (market === "underOverSecondTime") {
      marketStatusSecondTime.underOveSecondTimer === true
        ? setMarketStatusSecondTime({
            ...marketStatusSecondTime,
            allMarketsSecondTime: false,
            underOverSecondTime: false,
          })
        : setMarketStatusSecondTime({
            ...marketStatusSecondTime,
            allMarketsSecondTime: false,
            underOverSecondTime: true,
          });
    }
    if (market === "goalNoGoalSecondTime") {
      marketStatusSecondTime.goalNoGoalSecondTime === true
        ? setMarketStatusSecondTime({
            ...marketStatusSecondTime,
            allMarketsSecondTime: false,
            goalNoGoalSecondTime: false,
          })
        : setMarketStatusSecondTime({
            ...marketStatusSecondTime,
            allMarketsSecondTime: false,
            goalNoGoalSecondTime: true,
          });
    }
  };
  useEffect(() => {
    firstDateSet();
  }, []);
  return (
    <div>
      <Modal show={props.showFilterModal}>
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
                    checked={marketStatusFullTime.allMarkets}
                    onChange={() => setMarketsFilters("allMarkets")}
                  ></Form.Check>
                  <Form.Check inline className="text-form">
                    <span>Tutti</span>
                  </Form.Check>
                </div>
                <div>
                  <Form.Check
                    inline
                    checked={marketStatusFullTime.oneXTwo}
                    onChange={() => setMarketsFilters("oneXTwo")}
                  ></Form.Check>
                  <Form.Check inline className="text-form">
                    <span>1X2</span>
                  </Form.Check>
                </div>
                <div>
                  <Form.Check
                    inline
                    checked={marketStatusFullTime.underOver}
                    onChange={() => setMarketsFilters("underOver")}
                  ></Form.Check>
                  <Form.Check inline className="text-form">
                    <span>U/O</span>
                  </Form.Check>
                </div>
                <div>
                  <Form.Check
                    inline
                    checked={marketStatusFullTime.goalNoGoal}
                    onChange={() => setMarketsFilters("goalNoGoal")}
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
                    checked={marketStatusFirstTime.allMarketsFirstTime}
                    onChange={() => setMarketsFilters("allMarketsFirstTime")}
                  ></Form.Check>
                  <Form.Check inline className="text-form">
                    <span>Tutti</span>
                  </Form.Check>
                </div>
                <div>
                  <Form.Check
                    inline
                    checked={marketStatusFirstTime.oneXTwoFirstTime}
                    onChange={() => setMarketsFilters("oneXTwoFirstTime")}
                  ></Form.Check>
                  <Form.Check inline className="text-form">
                    <span>1X2</span>
                  </Form.Check>
                </div>
                <div>
                  <Form.Check
                    inline
                    checked={marketStatusFirstTime.underOverFirstTime}
                    onChange={() => setMarketsFilters("underOverFirstTime")}
                  ></Form.Check>
                  <Form.Check inline className="text-form">
                    <span>U/O</span>
                  </Form.Check>
                </div>
                <div>
                  <Form.Check
                    inline
                    checked={marketStatusFirstTime.goalNoGoalFirstTime}
                    onChange={() => setMarketsFilters("goalNoGoalFirstTime")}
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
                    checked={marketStatusSecondTime.allMarketsSecondTime}
                    onChange={() => setMarketsFilters("allMarketsSecondTime")}
                  ></Form.Check>
                  <Form.Check inline className="text-form">
                    <span>Tutti</span>
                  </Form.Check>
                </div>
                <div>
                  <Form.Check
                    inline
                    checked={marketStatusSecondTime.oneXTwoSecondTime}
                    onChange={() => setMarketsFilters("oneXTwoSecondTime")}
                  ></Form.Check>
                  <Form.Check inline className="text-form">
                    <span>1X2</span>
                  </Form.Check>
                </div>
                <div>
                  <Form.Check
                    inline
                    checked={marketStatusSecondTime.underOverSecondTime}
                    onChange={() => setMarketsFilters("underOverSecondTime")}
                  ></Form.Check>
                  <Form.Check inline className="text-form">
                    <span>U/O</span>
                  </Form.Check>
                </div>
                <div>
                  <Form.Check
                    inline
                    checked={marketStatusSecondTime.goalNoGoalSecondTime}
                    onChange={() => setMarketsFilters("goalNoGoalSecondTime")}
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
                <Row className="no-gutters" style={{ marginBottom: "0.5rem" }}>
                  <Col xs={2}>
                    <strong>Inizio:</strong>
                  </Col>
                  <Col xs={7}>
                    <InputGroup>
                      <FormControl
                        value={initialDate}
                        onChange={(e) => setInitialDate(e.currentTarget.value)}
                        type="date"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={3}>
                    <InputGroup>
                      <FormControl
                        value={initialHour}
                        onChange={(e) => setInitialHour(e.currentTarget.value)}
                        type="time"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="no-gutters" style={{ marginBottom: "0.5rem" }}>
                  <Col xs={2}>
                    <strong>Fine:</strong>
                  </Col>
                  <Col xs={7}>
                    <InputGroup>
                      <FormControl
                        value={finalDate}
                        onChange={(e) => setFinalDate(e.currentTarget.value)}
                        type="date"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={3}>
                    <InputGroup>
                      <FormControl
                        value={finalHour}
                        onChange={(e) => setFinalHour(e.currentTarget.value)}
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
                          setMinOdd(parseFloat(e.currentTarget.value))
                        }
                        type="number"
                        placeholder={"Quota Min: " + minOdd}
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={5}>
                    <InputGroup>
                      <FormControl
                        onChange={(e) =>
                          setMaxOdd(parseFloat(e.currentTarget.value))
                        }
                        type="number"
                        placeholder={"Quota Max: " + maxOdd}
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
                  props.prova({
                    //FULL TIME
                    allMarkets: marketStatusFullTime.allMarkets,
                    oneXTwo: marketStatusFullTime.oneXTwo,
                    underOver: marketStatusFullTime.underOver,
                    goalNoGoal: marketStatusFullTime.goalNoGoal,
                    // FIRST TIME
                    allMarketsFirstTime:
                      marketStatusFirstTime.allMarketsFirstTime,
                    oneXTwoFirstTime: marketStatusFirstTime.oneXTwoFirstTime,
                    underOverFirstTime:
                      marketStatusFirstTime.underOverFirstTime,
                    goalNoGoalFirstTime:
                      marketStatusFirstTime.goalNoGoalFirstTime,
                    // SECOND TIME
                    allMarketsSecondTime:
                      marketStatusSecondTime.allMarketsSecondTime,
                    oneXTwoSecondTime: marketStatusSecondTime.oneXTwoSecondTime,
                    underOverSecondTime:
                      marketStatusSecondTime.underOverSecondTime,
                    goalNoGoalSecondTime:
                      marketStatusSecondTime.goalNoGoalSecondTime,
                    minOdd: minOdd,
                    maxOdd: maxOdd,
                    initialDate: initialDate,
                    finalDate: finalDate,
                    initialHour: initialHour,
                    finalHour: finalHour,
                  })
                }
              >
                Applica
              </Button>
            </Col>
            <Col xs={4}>
              <Button variant="dark" onClick={() => props.openFilterModal()}>
                Chiudi
              </Button>
            </Col>
            <Col xs={4}>
              <Button variant="danger" onClick={() => resetFilters()}>
                Resetta
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
