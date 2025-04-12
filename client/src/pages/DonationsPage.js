import axios from "axios";
import React, { Component } from "react";
import {
    Button,
    Container,
    Row,
    Modal,
    ModalBody,
    ModalHeader,
    CardImg,
    CardText,
    CardTitle,
    CardSubtitle,
} from "reactstrap";
import { connect } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import NewDrive from "../components/NewDrive";
import "react-toastify/dist/ReactToastify.css";

const mainStyle = {
    position: "relative",
    padding: "3rem",
    textAlign: "center",
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
    marginLeft: "2.5rem",
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
        makeDonation: false,
        order_id: "",
        success: false,
    };
    onClick = (e) => {
        this.setState({ makeDonation: !this.state.makeDonation });
    };
    onTextChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    async displayRazorpay() {
        const formData = new FormData();
        formData.name = this.state.name;
        formData.contactNo = this.state.contactNo;
        formData.emailID = this.state.emailID;
        formData.amount = this.state.amount;
        formData.cause = this.props.donation.description;
        formData.donation = this.props.donation.name;
        formData.donationID = this.props.donation._id;
        formData.currentAmount = this.props.donation.currentAmount;

        const res = this.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("../api/contribute/orders", {
            formData,
        });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;
        this.state.order_id = result.data.order_id;
        this.setState({ makeDonation: !this.state.makeDonation });
        const options = {
            key: "rzp_test_vD3ROTXl5eQm7N",
            amount: amount.toString(),
            currency: currency,
            name: this.props.donation.name,
            donation_ID: this.props.donation._id,
            current_Amount: this.props.donation.currentAmount,
            userID: JSON.parse(window.localStorage.getItem("user")).id,
            user_name: JSON.parse(window.localStorage.getItem("user")).name,
            user_type: window.localStorage.getItem("user_type"),
            ngoID: this.props.donation.user_id,

            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    amount: options.amount,
                    donationID: options.donation_ID,
                    currentAmount: options.current_Amount,
                    userID: options.userID,
                    user_name: options.user_name,
                    user_type: options.user_type,
                    ngoID: options.ngoID,
                };

                const result = await axios.post(
                    `/api/contribute/success`,
                    data
                );
            },
            prefill: {
                name: this.state.name,
                email: this.state.emailID,
                contact: this.state.contactNo,
            },
            notes: {
                address: "Fetch!",
            },
            theme: {
                color: "#D4A537",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        this.setState({ makeDonation: !this.state.makeDonation });
        axios.get(`/api/post`);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.name = this.state.name;
        formData.contactNo = this.state.contactNo;
        formData.emailID = this.state.emailID;
        formData.amount = this.state.amount;
        formData.cause = this.props.donation.description;
        formData.donation = this.props.donation.name;
        formData.donationID = this.props.donation._id;
        formData.currentAmount = this.props.donation.currentAmount;
        this.displayRazorpay();
    };
    render() {
        return (
            <Container>
                <Modal
                    size="400px"
                    style={{ width: "900px" }}
                    isOpen={this.state.success}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.success}>
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
                        <div>SUCCESS!</div>
                    </ModalBody>
                </Modal>

                <Modal
                    style={{}}
                    isOpen={this.state.makeDonation}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.onClick}>
                        Make a Donation
                    </ModalHeader>
                    <ModalBody
                        style={{
                            paddingTop: "20px",
                            paddingBottom: "0px",
                            display: "flex",
                            backgroundColor: "white",
                        }}
                    >
                        <form>
                            <label
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                            >
                                Name of the Donor
                            </label>
                            <br></br>
                            <input
                                type="string"
                                name="name"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="Name of the Donor"
                                onChange={this.onTextChange}
                            ></input>

                            <br></br>
                            <br></br>
                            <label
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                            >
                                Amount
                            </label>
                            <br></br>
                            <input
                                type="number"
                                name="amount"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="(in INR)"
                                onChange={this.onTextChange}
                            ></input>

                            <br></br>
                            <br></br>

                            <label
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                            >
                                Email ID
                            </label>
                            <br></br>
                            <input
                                type="email"
                                name="emailID"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="xyz@abc.com"
                                onChange={this.onTextChange}
                            ></input>

                            <br></br>
                            <br></br>
                            <label
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                            >
                                Contact Number
                            </label>
                            <br></br>
                            <input
                                type="number"
                                name="contactNo"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="10 digits"
                                onChange={this.onTextChange}
                            ></input>
                            <br></br>
                            <br></br>
                            <button
                                className="hover"
                                style={{
                                    marginLeft: "15px",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    backgroundColor: "green",
                                }}
                                type="submit"
                                onClick={this.onSubmit}
                            >
                                Donate
                            </button>
                            <br></br>
                            <br></br>
                        </form>
                    </ModalBody>
                </Modal>
                <div style={divStyle}>
                    <div style={{ display: "flex" }}>
                        <a
                            href={
                                "http://localhost:5000/api/users/image/ngo/" +
                                this.props.donation.user_id
                            }
                        >
                            <img
                                src={
                                    "api/users/image/ngo/" +
                                    this.props.donation.user_id
                                }
                                style={dpStyle}
                            ></img>
                        </a>
                        <div style={{ marginLeft: "5px", marginTop: "15px" }}>
                            <a
                                className="linkhover"
                                href={`/profile/ngo/${this.props.donation.user_id}`}
                            >
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
                                    "api/post/image/" +
                                    this.props.files[0].filename
                                }
                            />
                        </a>
                    </div>
                    <CardTitle tag="h5">{this.props.donation.name}</CardTitle>
                    <CardSubtitle>
                        Amount Raised: &#8377;{" "}
                        {this.props.donation.currentAmount}
                        <br></br>
                        Target Amount: &#8377;{" "}
                        {this.props.donation.targetAmount}
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
                    <Button onClick={this.onClick} className="donateBtn">
                        Donate
                    </Button>
                </div>
            </Container>
        );
    }
}

export class DonationsPage extends Component {
    state = {
        Donations: [],
        files: [],
    };

    componentDidMount() {
        axios.get("api/donations/").then((res) => {
            this.setState({ Donations: res.data.items, files: res.data.files });
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
                            &nbsp; &nbsp;Active Donation Drives
                        </h5>
                        <div
                            style={{
                                display: "flex",
                                float: "right",
                                marginTop: "-80px",
                            }}
                        >
                            {window.localStorage.getItem("user_type") ==
                            "ngo" ? (
                                <NewDrive />
                            ) : null}
                        </div>
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

export default connect()(DonationsPage);
