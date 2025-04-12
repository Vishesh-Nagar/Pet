import axios from "axios";
import React, { Component } from "react";
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";
import { connect } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ChatPanel from "../components/ChatPanel";
import LostPet from "../components/LostPet";
import { Link } from "react-router-dom";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
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
    marginTop: "0.2rem",
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
    marginTop: "10px",
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
const trowsDeclined = {
    width: 20,
    padding: "10px",
    borderColor: "rgba(0,2,0,0.1)",
    color: "red",
    fontWeight: "bold",
    marginTop: "10px",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
    minWidth: 180,
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
const fontchanges = {
    fontWeight: "bold",
    display: "inline",
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

class DisplayApplications extends Component {
    state = {
        chatPanel: false,
        viewApplication: false,
        confirm: false,
    };
    onClick = (e) => {
        axios
            .delete(`../api/lostpet/${this.props.lostpet._id}`)
            .then(window.location.reload());
    };
    onChat = (e) => {
        this.setState({ chatPanel: !this.state.chatPanel });
    };
    onView = (e) => {
        this.setState({ viewApplication: !this.state.viewApplication });
    };
    onWithdraw = (e) => {
        const formData = new FormData();
        formData.status = "Declined";
        formData.applicationID = this.props.adopter._id;

        axios.delete(`../api/request/${this.props.adopter._id}`);
        window.location.reload();
    };
    onConfirm = (e) => {
        this.setState({ confirm: !this.state.confirm });
    };
    onWithdraw1 = (e) => {
        this.setState({ confirm: !this.state.confirm });
    };

    render() {
        return (
            <div>
                <Modal
                    size="lg"
                    style={{}}
                    isOpen={this.state.viewApplication}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.onView}>
                        {" "}
                        Adoption Application
                    </ModalHeader>
                    <ModalBody
                        style={{
                            paddingTop: "20px",
                            paddingBottom: "0px",
                            display: "flex",
                            backgroundColor: "white",
                        }}
                    >
                        <div>
                            <MDBContainer gradient="sunny-morning">
                                <MDBListGroup style={{ width: "46rem" }}>
                                    <MDBListGroupItem className="block-example border-top-left-right border-warning">
                                        Name of the Applicant :{" "}
                                        <div style={fontchanges}>
                                            {this.props.adopter.name}
                                        </div>{" "}
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="block-example border-left-right border-warning">
                                        Age :
                                        <div style={fontchanges}>
                                            {this.props.adopter.age}
                                        </div>{" "}
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="block-example border-left-right border-warning">
                                        Sex :{" "}
                                        <div style={fontchanges}>
                                            {this.props.adopter.sex}
                                        </div>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="block-example border-left-right border-warning">
                                        Marital Status :{" "}
                                        <div style={fontchanges}>
                                            {this.props.adopter.marital_status}
                                        </div>{" "}
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="block-example border-left-right border-warning">
                                        Annual Income : Rs.{" "}
                                        <div style={fontchanges}>
                                            {this.props.adopter.annualIncome}
                                        </div>{" "}
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="block-example border-left-right border-warning">
                                        Residential Address :{" "}
                                        <div style={fontchanges}>
                                            {this.props.adopter.address}
                                        </div>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="block-example border-left-right border-warning">
                                        Reason for Adoption :{" "}
                                        <div style={fontchanges}>
                                            {this.props.adopter.description}
                                        </div>{" "}
                                    </MDBListGroupItem>
                                    {this.props.adopter.status ==
                                        "Approved" && (
                                        <MDBListGroupItem
                                            className="block-example border-left-right-bottom border-warning"
                                            color="success"
                                        >
                                            {" "}
                                            Status:{" "}
                                            <div style={fontchanges}>
                                                {this.props.adopter.status}
                                            </div>{" "}
                                        </MDBListGroupItem>
                                    )}
                                    {this.props.adopter.status == "Pending" && (
                                        <MDBListGroupItem
                                            className="block-example border-left-right-bottom border-warning"
                                            color="warning"
                                        >
                                            {" "}
                                            Status:{" "}
                                            <div style={fontchanges}>
                                                {this.props.adopter.status}
                                            </div>
                                        </MDBListGroupItem>
                                    )}
                                    {this.props.adopter.status ==
                                        "Declined" && (
                                        <MDBListGroupItem
                                            className="block-example border-left-right-bottom border-warning"
                                            color="danger"
                                        >
                                            {" "}
                                            Status:{" "}
                                            <div style={fontchanges}>
                                                {this.props.adopter.status}
                                            </div>
                                        </MDBListGroupItem>
                                    )}
                                </MDBListGroup>
                            </MDBContainer>

                            <div
                                style={{
                                    float: "right",
                                    position: "relative",
                                    marginTop: "-40px",
                                    marginRight: "20px",
                                    zIndex: "2",
                                }}
                            >
                                <br></br>
                                <br></br>
                                {this.props.adopter.status == "Pending" && (
                                    <Button
                                        className="declineBtn"
                                        style={{ marginLeft: "100px" }}
                                        type="submit"
                                        onClick={this.onWithdraw1}
                                    >
                                        Withdraw Application
                                    </Button>
                                )}
                            </div>
                            <br></br>
                            <br></br>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal
                    size="400px"
                    style={{ width: "900px" }}
                    isOpen={this.state.confirm}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.onConfirm}>
                        {" "}
                        Confirm Withdrawal
                    </ModalHeader>
                    <ModalBody
                        style={{
                            paddingTop: "20px",
                            paddingBottom: "10px",
                            display: "flex",
                            backgroundColor: "white",
                        }}
                    >
                        <div>
                            Are you sure you want to :
                            <div
                                style={{
                                    display: "inline",
                                    position: "relative",
                                    fontWeight: "bold",
                                }}
                            >
                                {" "}
                                WITHDRAW?
                            </div>
                            <div
                                style={{
                                    float: "right",
                                    position: "relative",
                                    marginTop: "-40px",
                                    marginRight: "20px",
                                    zIndex: "2",
                                }}
                            >
                                <br></br>
                                <br></br>

                                <Button
                                    className="declineBtn"
                                    style={{ marginLeft: "100px" }}
                                    type="submit"
                                    onClick={this.onWithdraw}
                                >
                                    Withdraw Application
                                </Button>
                            </div>
                            <br></br>
                            <br></br>
                        </div>
                    </ModalBody>
                </Modal>

                <table style={customers}>
                    <tr>
                        <td style={trows}> {this.props.adopter.owner} </td>
                        <td style={trows}>{this.props.adopter.name} </td>
                        {this.props.adopter.status == "Approved" && (
                            <td style={trowsApproved}>
                                {" "}
                                {this.props.adopter.status}{" "}
                            </td>
                        )}
                        {this.props.adopter.status == "Declined" && (
                            <td style={trowsDeclined}>
                                {" "}
                                {this.props.adopter.status}{" "}
                            </td>
                        )}
                        {this.props.adopter.status == "Pending" && (
                            <td style={trowsPending}>
                                {" "}
                                {this.props.adopter.status}{" "}
                            </td>
                        )}
                        <td style={trows}>
                            <Button className="foundBtn" onClick={this.onView}>
                                View{" "}
                            </Button>
                        </td>
                        <td style={trows}>
                            <Link to={`/chat/${this.props.adopter.ownerID}`}>
                                <Button
                                    className="foundBtn"
                                    onClick={this.onChat}
                                >
                                    Connect
                                </Button>
                            </Link>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export class MyApplications extends Component {
    state = {
        AppliedForms: [],
        files: [],
    };

    componentDidMount() {
        axios.get(`../api/adoption/${this.props.user_id}`).then((res) => {
            this.setState({ AppliedForms: res.data.items });
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
                            padding: 50,
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
                            &nbsp; &nbsp; Your Applications{" "}
                        </h5>
                        <span style={spanStyle}></span>
                        <hr />

                        <Row>
                            <table style={customers}>
                                <tr>
                                    <th style={trows}> Owner ID</th>
                                    <th style={trows}> Name of Applicant</th>
                                    <th style={trows}>
                                        {" "}
                                        Status of Application
                                    </th>
                                    <th style={trows}> Application Form</th>
                                    <th style={trows}> Connect with Owner</th>
                                </tr>
                            </table>
                            {this.state.AppliedForms.map((adopter, i) => {
                                return (
                                    <div>
                                        {adopter.status == "Pending" && (
                                            <DisplayApplications
                                                adopter={adopter}
                                                key={i}
                                                onClick={this.onClick}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            {this.state.AppliedForms.map((adopter, i) => {
                                return (
                                    <div>
                                        {adopter.status == "Approved" && (
                                            <DisplayApplications
                                                adopter={adopter}
                                                key={i}
                                                onClick={this.onClick}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            {this.state.AppliedForms.map((adopter, i) => {
                                return (
                                    <div>
                                        {adopter.status == "Declined" && (
                                            <DisplayApplications
                                                adopter={adopter}
                                                key={i}
                                                onClick={this.onClick}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
}

export default connect()(MyApplications);
