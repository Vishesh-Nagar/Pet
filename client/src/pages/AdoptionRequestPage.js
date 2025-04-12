import axios from "axios";
import React, { Component } from "react";
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Table,
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

    onChat = (e) => {
        this.setState({ chatPanel: !this.state.chatPanel });
    };
    stopApplicants = () => {
        this.setState({ postStatus: !this.state.postStatus });
        const formData = new FormData();
        formData.status = "No";

        axios.put(`/api/post/${this.props.post._id}`, { formData });
        window.location.reload();
    };
    onApprove = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        let formData = new FormData();
        formData.status = "Approved";
        formData.applicationID = this.props.adopter._id;

        axios.put(`/api/request`, { formData });
        this.setState({ postStatus: !this.state.postStatus });

        formData = new FormData();
        formData.status = "No";

        axios.put(`/api/post/${this.props.adopter.postID}`, { formData });
        window.location.reload();
    };
    onApprove1 = (e) => {
        this.setState({ confirm: !this.state.confirm });
        this.setState({ approve: !this.state.approve });
    };
    onDecline1 = (e) => {
        this.setState({ confirm: !this.state.confirm });
        this.setState({ decline: !this.state.decline });
    };
    onConfirm = (e) => {
        if (this.state.approve) {
            this.setState({ approve: !this.state.approve });
        } else {
            this.setState({ decline: !this.state.decline });
        }
        this.setState({ confirm: !this.state.confirm });
    };
    onDecline = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        const formData = new FormData();
        formData.status = "Declined";
        formData.applicationID = this.props.adopter._id;

        axios.put(`/api/request`, { formData });
        window.location.reload();
    };

    onView = (e) => {
        this.setState({ viewApplication: !this.state.viewApplication });
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
                                        className="approveBtn"
                                        style={{ marginLeft: "100px" }}
                                        type="submit"
                                        onClick={this.onApprove1}
                                    >
                                        Approve Adoption
                                    </Button>
                                )}

                                {this.props.adopter.status == "Pending" && (
                                    <Button
                                        className="declineBtn"
                                        style={{ marginLeft: "20px" }}
                                        type="submit"
                                        onClick={this.onDecline1}
                                    >
                                        Decline Adoption
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
                        Confirm Decision
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
                            {this.state.approve && (
                                <div
                                    style={{
                                        display: "inline",
                                        position: "relative",
                                    }}
                                >
                                    {" "}
                                    APPROVE?
                                </div>
                            )}
                            {this.state.decline && (
                                <div
                                    style={{
                                        display: "inline",
                                        position: "relative",
                                    }}
                                >
                                    {" "}
                                    Decline?
                                </div>
                            )}
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
                                {this.state.approve && (
                                    <Button
                                        className="approveBtn"
                                        style={{ marginLeft: "100px" }}
                                        type="submit"
                                        onClick={this.onApprove}
                                    >
                                        Yes, Approve!
                                    </Button>
                                )}

                                {this.state.decline && (
                                    <Button
                                        className="declineBtn"
                                        style={{ marginLeft: "20px" }}
                                        type="submit"
                                        onClick={this.onDecline}
                                    >
                                        Yes, Decline!
                                    </Button>
                                )}
                            </div>
                            <br></br>
                            <br></br>
                        </div>
                    </ModalBody>
                </Modal>

                <Table hover>
                    <tbody>
                        {this.props.adopter.status == "Pending" && (
                            <tr style={tableStyle}>
                                <td style={trows}>
                                    {this.props.adopter.name}{" "}
                                </td>
                                <td style={trowsPending}>
                                    {" "}
                                    {this.props.adopter.status}{" "}
                                </td>
                                <td style={trows}>
                                    <Button
                                        className="foundBtn"
                                        onClick={this.onView}
                                    >
                                        View{" "}
                                    </Button>
                                </td>
                                <td style={trows}>
                                    <Link
                                        to={`/chat/${this.props.adopter.userID}`}
                                    >
                                        <Button
                                            className="foundBtn"
                                            onClick={this.onChat}
                                        >
                                            Connect
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Table hover>
                    <tbody>
                        {this.props.adopter.status == "Approved" && (
                            <tr>
                                <td style={trows}>
                                    {this.props.adopter.name}{" "}
                                </td>
                                {this.props.adopter.status == "Approved" && (
                                    <td style={trowsApproved}>
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
                                    <Button
                                        className="foundBtn"
                                        onClick={this.onView}
                                    >
                                        View{" "}
                                    </Button>
                                </td>
                                <td style={trows}>
                                    <Link
                                        to={`/chat/${this.props.adopter.userID}`}
                                    >
                                        <Button
                                            className="foundBtn"
                                            onClick={this.onChat}
                                        >
                                            Connect
                                        </Button>
                                    </Link>
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
        axios.get(`../api/request/${this.props.user_id}`).then((res) => {
            this.setState({ AdoptRequests: res.data.items });
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
                            &nbsp; &nbsp;Applications To Your Posts
                        </h5>

                        <span style={spanStyle}></span>
                        <hr />

                        <Row>
                            <table style={customers}>
                                <tr>
                                    <th style={trows}> Name of Applicant</th>
                                    <th style={trows}>
                                        {" "}
                                        Status of Application
                                    </th>
                                    <th style={trows}> View Application</th>
                                    <th style={trows}>
                                        {" "}
                                        Connect with Applicant
                                    </th>
                                </tr>
                            </table>
                            {this.state.AdoptRequests.map((adopter, i) => {
                                return (
                                    <div>
                                        {adopter.status == "Pending" && (
                                            <DisplayRequests
                                                adopter={adopter}
                                                key={i}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                            <br></br>
                            {this.state.AdoptRequests.map((adopter, i) => {
                                return (
                                    <div>
                                        {adopter.status == "Approved" && (
                                            <DisplayRequests
                                                adopter={adopter}
                                                key={i}
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

export default connect()(AdoptionLists);
