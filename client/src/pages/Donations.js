import axios from "axios";
import React, { Component } from "react";
import { Container, Row, Table } from "reactstrap";
import { connect } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
const mainStyle = {
    position: "relative",
    marginTop: "40px",
    padding: "3rem",
};

const divStyle = {
    width: 250,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    marginTop: "3.5rem",
    marginLeft: "3.5rem",
    padding: "10px",
    textAlign: "center",
};

const customers = {
    width: 600,
    padding: "10px",
    borderColor: "rgba(0,2,0,0.1)",
    position: "relative",
    marginTop: "20px",
    overflow: "hidden",
};
const trows = {
    width: 20,
    padding: "10px",
    borderColor: "rgba(0,2,0,0.1)",
    marginTop: "10px",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
    minWidth: 180,
};
const trows1 = {
    width: 20,
    padding: "10px",
    borderColor: "rgba(0,2,0,0.1)",
    marginTop: "10 px",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
    minWidth: 300,
};
const trowsApproved = {
    width: 20,
    padding: "10px",
    borderColor: "rgba(0,2,0,0.1)",
    color: "green",
    fontWeight: "bold",
    marginTop: "10px",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
    minWidth: 180,
};
const trowsPending = {
    width: 20,
    padding: "10px",
    borderColor: "rgba(0,2,0,0.1)",
    color: "blue",
    fontWeight: "bold",
    marginTop: "10px",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
    minWidth: 180,
};
const tableStyle = {
    marginTop: "5px",
    margin: "5px",
    padding: "10px",
};
const imageStyle = {
    height: "8rem",
};

const buttonStyle = {
    border: "None",
    borderRadius: "20px",
    background: "white",
    color: "black",
    float: "right",
};

const dpStyle = {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: "flex-start",
};

const spanStyle = {
    float: "right",
    marginTop: "-1.5rem",
};
const fontchanges = {
    fontWeight: "bold",
    display: "inline",
};

class DisplayRequests extends Component {
    state = {
        chatPanel: false,
        postID: "",
        viewApplication: false,
        confirm: false,
        approve: false,
        decline: false,
        postStatus: false,
    };

    render() {
        function convert(str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [day, mnth, date.getFullYear()].join("-");
        }

        return (
            <div>
                <Table hover>
                    <tbody>
                        {this.props.transaction.status == "SUCCESS" && (
                            <tr style={tableStyle}>
                                <td style={trows}>
                                    {" "}
                                    {convert(
                                        this.props.transaction
                                            .date_of_transaction
                                    )}{" "}
                                </td>

                                <td style={trows}>
                                    {this.props.transaction.donor}{" "}
                                </td>
                                <td style={trows}>
                                    {" "}
                                    {this.props.transaction.amount}{" "}
                                </td>
                                <td style={trows1}>
                                    {" "}
                                    {this.props.transaction.emailID}{" "}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export class AdoptionLists extends Component {
    state = {
        AdoptRequests: [],
        files: [],
    };

    componentDidMount() {
        axios
            .get(`../api/transaction/${this.props.donationID}`)
            .then((res) => {
                this.setState({ AdoptRequests: res.data.items });
            })
            .catch((error) => {
                console.log(error.res);
            });
    }

    render() {
        return (
            <Container>
                <div className="container" style={mainStyle}>
                    <div
                        style={{
                            height: "auto",
                            margin: "0 auto",
                            padding: 100,
                            position: "relative",
                            background: "white",
                        }}
                    >
                        <i
                            class="fa fa-file-text-o fa-lg"
                            aria-hidden="true"
                            style={{ float: "left", marginTop: 4 }}
                        ></i>
                        <h5 style={{ fontFamily: "muli" }}>
                            {" "}
                            &nbsp; &nbsp; Donations to your Drive:{" "}
                            {this.props.donationID}{" "}
                        </h5>

                        <span style={spanStyle}></span>
                        <hr />
                        <Row>
                            <table style={customers}>
                                <tr>
                                    <th style={trows}> Date of Transaction</th>
                                    <th style={trows}> Name of Applicant</th>

                                    <th style={trows}> Amount (in INR)</th>
                                    <th style={trows1}> Email ID</th>
                                </tr>
                            </table>
                            {this.state.AdoptRequests.map((transaction, i) => {
                                return (
                                    <div>
                                        {
                                            <DisplayRequests
                                                transaction={transaction}
                                                key={i}
                                            />
                                        }
                                    </div>
                                );
                            })}
                            <br></br>
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
}

export default connect()(AdoptionLists);
