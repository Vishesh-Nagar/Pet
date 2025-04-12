import axios from "axios";
import React, { Component } from "react";
import {
    Button,
    Row,
    CardImg,
    CardText,
    CardTitle,
    CardSubtitle,
    Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";
import { connect } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

const mainStyle = {
    position: "relative",
    padding: "3rem",
};

const JumbotronStyle = {
    background: "F5F5F5",
    marginTop: "3.5rem",
    marginLeft: "5rem",
    width: "12rem",
    borderRadius: "20px",
    padding: "10px",
    textAlign: "center",
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

const containerStyle = {
    width: 1050,
    height: "auto",
    marginTop: "30px",
    padding: 50,
    position: "relative",
    background: "white",
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

const spanStyle = {
    float: "right",
    marginTop: "-1.5rem",
};

const dpStyle = {
    width: 50,
    height: 50,

    borderRadius: 25,
    overflow: "hidden",
    alignSelf: "flex-start",
};

class DisplayDonation extends Component {
    state = {
        viewDonations: false,
        donor: [],
    };
    onClick = (e) => {
        axios
            .delete(`../api/donations/${this.props.donation._id}`)
            .then(window.location.reload());
    };

    render() {
        return (
            <div style={divStyle}>
                <Modal
                    size="lg"
                    style={{}}
                    isOpen={this.state.viewDonations}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.onView}>
                        {" "}
                        Current Donations
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
                                        Name of the Applicant :blah
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBContainer>
                            <br></br>
                            <br></br>
                        </div>
                    </ModalBody>
                </Modal>
                <div style={{ display: "flex" }}>
                    <a
                        href={
                            "http://localhost:5000/api/users/image/ngo/" +
                            this.props.donation.user_id
                        }
                    >
                        <img
                            src={
                                "../api/users/image/ngo/" +
                                this.props.donation.user_id
                            }
                            style={dpStyle}
                        ></img>
                    </a>
                    <div style={{ marginLeft: "5px", marginTop: "15px" }}>
                        <a style={{}} href="">
                            <h6>{this.props.donation.user_name}</h6>
                        </a>
                    </div>
                </div>

                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <a
                        href={
                            "http://localhost:5000/api/post/image/" +
                            this.props.files[0].filename
                        }
                    >
                        <CardImg
                            top
                            style={{
                                height: "200px",
                                width: "200px",
                                objectFit: "cover",
                            }}
                            src={
                                "../api/post/image/" +
                                this.props.files[0].filename
                            }
                        />
                    </a>
                </div>
                <CardTitle tag="h5">{this.props.donation.name}</CardTitle>
                <CardSubtitle>
                    Target Amount: {this.props.donation.targetAmount}
                    <br></br>
                    Starts On: {this.props.donation.startDate}
                    <br></br>
                    Ends On: {this.props.donation.endDate}
                </CardSubtitle>

                <CardText
                    className="myColumn1"
                    style={{
                        color: "#BE8A1B",
                        height: "100px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        lineHeight: "18px",
                    }}
                >
                    {this.props.donation.description}
                </CardText>

                <a href={`/transaction/${this.props.donation._id}`}>
                    {" "}
                    <Button className="foundBtn">View Donations</Button>
                </a>
                <br></br>
                <div style={{ padding: "5px" }}> </div>
                <Button onClick={this.onClick} className="deleteBtn">
                    Delete Drive
                </Button>
            </div>
        );
    }
}

export class MyDonationsPage extends Component {
    state = {
        Donations: [],
        files: [],
        Contributes: [],
    };

    componentDidMount() {
        axios.get(`../api/donations/my/${this.props.user_id}`).then((res) => {
            this.setState({ Donations: res.data.items, files: res.data.files });
        });

        axios.get(`../api/contributes/${this.props._id}`).then((res) => {
            this.setState({ Contributes: res.data.items });
        });
    }

    render() {
        return (
            <div className="container" style={mainStyle}>
                <div style={containerStyle}>
                    <div>
                        <i
                            class="fa fa-file-text-o fa-lg"
                            aria-hidden="true"
                            style={{ float: "left", marginTop: 4 }}
                        ></i>
                        <h5 style={{ fontFamily: "muli" }}>
                            {" "}
                            &nbsp; &nbsp;Your Donation Drives
                        </h5>
                    </div>

                    <span style={spanStyle}></span>
                    <hr />

                    <Row>
                        {this.state.Donations.map((donation, i) => {
                            var files = this.state.files.filter((f) =>
                                donation.files.includes(f._id)
                            );
                            return (
                                <div>
                                    {
                                        <DisplayDonation
                                            donation={donation}
                                            files={files}
                                            key={i}
                                        />
                                    }
                                </div>
                            );
                        })}
                    </Row>
                </div>
            </div>
        );
    }
}

export default connect()(MyDonationsPage);
