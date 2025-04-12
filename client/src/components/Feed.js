import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import FeedPost from "../components/FeedPost";
import NewPost from "../components/NewPost";
import {
    Container,
    Row,
    Col,
    Button,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

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
    width: 230,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "white",
};

const containerStyle = {
    width: 1050,
    height: "auto",
    margin: "0 auto",
    padding: 50,
    position: "relative",
    background: "white",
};

const imageStyle = {
    height: "8rem",
    width: "8rem",
};
const dpStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "flex-start",
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

class LostPet extends Component {
    state = {
        chatPanel: false,
        makeDonation: false,
    };

    onClick = (e) => {
        if (this.props.lostpet.user_type == "ngo") {
            const body = {
                user_id: JSON.parse(window.localStorage.getItem("user")).id,
                user_name: JSON.parse(window.localStorage.getItem("user")).name,
                user_type: window.localStorage.getItem("user_type"),
            };

            axios.post(
                `/api/lostpet/ngo/notify/${this.props.lostpet.user_id}`,
                body
            );
        } else {
            const body = {
                user_id: JSON.parse(window.localStorage.getItem("user")).id,
                user_name: JSON.parse(window.localStorage.getItem("user")).name,
                user_type: window.localStorage.getItem("user_type"),
            };
            axios.post(
                `/api/lostpet/notify/${this.props.lostpet.user_id}`,
                body
            );
        }
    };

    render() {
        return (
            <div style={divStyle}>
                <div style={{ display: "flex" }}>
                    {this.props.lostpet.user_type == "ngo" ? (
                        <a
                            href={
                                "http://localhost:5000/api/users/image/ngo/" +
                                this.props.lostpet.user_id
                            }
                        >
                            <img
                                src={
                                    "api/users/image/ngo/" +
                                    this.props.lostpet.user_id
                                }
                                style={dpStyle}
                            ></img>
                        </a>
                    ) : (
                        <a
                            href={
                                "http://localhost:5000/api/users/image/" +
                                this.props.lostpet.user_id
                            }
                        >
                            <img
                                src={
                                    "api/users/image/" +
                                    this.props.lostpet.user_id
                                }
                                style={dpStyle}
                            ></img>
                        </a>
                    )}
                    <div style={{ marginLeft: "5px", marginTop: "5px" }}>
                        <a
                            className="linkhover"
                            href={`/profile/${this.props.lostpet.user_type}/${this.props.lostpet.user_id}`}
                        >
                            <h6>{this.props.lostpet.user_name}</h6>
                        </a>
                    </div>
                </div>
                {this.props.files && this.props.files.length > 0 && (
                    <div style={{ marginTop: "5px" }}>
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
                )}
                <CardBody>
                    <CardText>
                        <CardTitle tag="h6">
                            {this.props.lostpet.breed}{" "}
                        </CardTitle>
                        <CardSubtitle>
                            Location: {this.props.lostpet.location.city}
                        </CardSubtitle>
                        <CardSubtitle>
                            Last Seen: {this.props.lostpet.lastseen}
                        </CardSubtitle>
                    </CardText>
                    <Link to={`/chat/${this.props.lostpet.user_id}`}>
                        <Button
                            className="foundBtn"
                            onClick={this.onClick}
                            size="sm"
                        >
                            Found
                        </Button>
                    </Link>
                </CardBody>
            </div>
        );
    }
}

class DisplayDonation extends Component {
    state = {
        makeDonation: false,
    };
    onDonate = (e) => {
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
                    <div style={{ marginLeft: "5px", marginTop: "5px" }}>
                        <a
                            className="linkhover"
                            href={`/profile/ngo/${this.props.donation.user_id}`}
                        >
                            <h6>{this.props.donation.user_name}</h6>
                        </a>
                    </div>
                </div>

                <div style={{ marginTop: "5px" }}>
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
                                "api/post/image/" + this.props.files[0].filename
                            }
                        />
                    </a>
                </div>
                <CardBody>
                    <CardText>
                        <CardTitle tag="h6">
                            {this.props.donation.name}
                        </CardTitle>
                        <CardSubtitle>
                            {" "}
                            Amount Raised: &#8377;{" "}
                            {this.props.donation.currentAmount}{" "}
                        </CardSubtitle>
                        <CardSubtitle>
                            Target Amount: &#8377;{" "}
                            {this.props.donation.targetAmount}
                        </CardSubtitle>

                        <CardSubtitle>
                            Ends On: {this.props.donation.endDate}
                        </CardSubtitle>
                    </CardText>

                    <Button
                        className="donateBtn"
                        size="sm"
                        onClick={this.onDonate}
                    >
                        Donate
                    </Button>
                </CardBody>
                <Modal
                    style={{}}
                    isOpen={this.state.makeDonation}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.onDonate}>
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
            </div>
        );
    }
}

export class Feed extends Component {
    state = {
        posts: [],
        files: [],
        Donations: [],
        filesDonations: [],
        LostPets: [],
        fileslostpets: [],
    };

    componentDidMount = () => {
        axios
            .get("api/post")
            .then((res) => {
                this.setState({ posts: res.data.items, files: res.data.files });
            })
            .catch((res) => {
                window.location.href = "/login";
            });

        axios.get("api/donations/").then((res) => {
            this.setState({
                Donations: res.data.items,
                filesDonations: res.data.files,
            });
        });

        axios.get("api/lostpet/").then((res) => {
            this.setState({
                LostPets: res.data.items,
                fileslostpets: res.data.files,
            });
        });
    };
    render() {
        return (
            <Container
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "90px",
                }}
            >
                <Row>
                    <Col
                        className="myColumn1"
                        style={{
                            marginBottom: 90,
                            marginRight: -20,
                            marginTop: 90,
                            height: "1300px",
                            overflowY: "scroll",
                            overflowX: "auto",
                        }}
                        xs={"auto"}
                    >
                        <div>
                            {this.state.LostPets.map((lostpet, i) => {
                                var files = this.state.fileslostpets.filter(
                                    (f) => lostpet.files.includes(f._id)
                                );
                                return (
                                    <div>
                                        {
                                            <LostPet
                                                lostpet={lostpet}
                                                files={files}
                                                key={i}
                                                onClick={this.onClick}
                                            />
                                        }
                                        <br></br>
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                    <Col
                        xs={"auto"}
                        className="myColumn1"
                        style={{
                            marginBottom: 90,
                            marginTop: 90,
                            height: "1300px",
                            overflowY: "scroll",
                            overflowX: "auto",
                            position: "",
                        }}
                    >
                        <div>
                            <NewPost />
                            {this.state.posts.map((post, i) => {
                                var files = this.state.files.filter((f) =>
                                    post.files.includes(f._id)
                                );
                                return (
                                    <div>
                                        {
                                            <FeedPost
                                                post={post}
                                                files={files}
                                                key={i}
                                                width="550px"
                                                words="480"
                                            />
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                    <Col
                        className="myColumn1"
                        style={{
                            marginBottom: 90,
                            marginTop: 90,
                            height: "1300px",
                            overflowY: "scroll",
                            overflowX: "auto",
                            position: "",
                        }}
                        xs={"auto"}
                    >
                        <div style={{}}>
                            {this.state.Donations.map((donation, i) => {
                                var files = this.state.filesDonations.filter(
                                    (f) => donation.files.includes(f._id)
                                );
                                return (
                                    <div>
                                        <Row>
                                            {
                                                <DisplayDonation
                                                    donation={donation}
                                                    files={files}
                                                    key={i}
                                                />
                                            }
                                        </Row>
                                        <br></br>
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default connect()(Feed);
