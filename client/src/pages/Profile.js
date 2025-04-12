import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Row,
    Col,
    Button,
    Form,
    Label,
    Input,
    ModalHeader,
    ModalBody,
    Modal,
} from "reactstrap";
import { Link } from "react-router-dom";

const imageStyle = {
    width: 200,
    borderRadius: 100,
    marginLeft: "70px",
};

export class Profile extends Component {
    state = {
        user: null,
        posts: [],
        drives: [],
        ngomodal: false,
        usermodal: false,
    };

    toggle = () => {
        this.setState({ ngomodal: !this.state.ngomodal });
    };

    toggle1 = () => {
        this.setState({ usermodal: !this.state.usermodal });
    };

    componentDidMount = () => {
        if (this.props.user_type == "user") {
            axios
                .get(`/api/auth/user/${this.props.user_id}`, {
                    headers: {
                        "x-auth-token": window.localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    this.setState({ user: res.data });
                });
        } else {
            axios
                .get(`/api/ngo/user/${this.props.user_id}`, {
                    headers: {
                        "x-auth-token": window.localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    this.setState({ user: res.data });
                });
        }
    };

    render() {
        return (
            <div
                style={{
                    marginTop: "100px",
                    marginLeft: "50px",
                    marginBottom: "100px",
                }}
            >
                {this.props.user_type == "user" ? (
                    <div>
                        {this.state.user ? (
                            <Row>
                                <Col></Col>

                                <Col
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <h1 style={{ marginLeft: "40px" }}>
                                        General User
                                    </h1>
                                    {this.props.viewer == "me" ? (
                                        <div>
                                            <img
                                                src={
                                                    "/api/users/image/" +
                                                    this.props.user_id
                                                }
                                                style={imageStyle}
                                            ></img>
                                            <Button
                                                onClick={this.toggle1}
                                                className="register"
                                                style={{ marginLeft: "130px" }}
                                            >
                                                View
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <img
                                                src={
                                                    "../../api/users/image/" +
                                                    this.props.user_id
                                                }
                                                style={imageStyle}
                                            ></img>{" "}
                                            <Link
                                                to={`/chat/${this.props.user_id}`}
                                            >
                                                {" "}
                                                <Button
                                                    className="register"
                                                    style={{
                                                        marginLeft: "110px",
                                                    }}
                                                >
                                                    Message
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                    <br></br>
                                    <Form>
                                        <Label>Name</Label>
                                        <Input
                                            placeholder={
                                                this.state.user.user.name
                                            }
                                            disabled="true"
                                        ></Input>
                                        <br></br>
                                        <Label>Email</Label>
                                        <Input
                                            placeholder={
                                                this.state.user.user.email
                                            }
                                            disabled="true"
                                        ></Input>
                                    </Form>

                                    <Modal
                                        isOpen={this.state.usermodal}
                                        toggle={this.toggle1}
                                    >
                                        <ModalHeader>View</ModalHeader>
                                        <ModalBody style={{ padding: "50px" }}>
                                            <a
                                                href={`/post/${this.state.user.user._id}`}
                                            >
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>Posts</h5>
                                                </Row>
                                            </a>
                                            <br></br>

                                            <a
                                                href={`/lostpets/${this.state.user.user._id}`}
                                            >
                                                {" "}
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>Pets Lost</h5>
                                                </Row>
                                            </a>
                                            <br></br>
                                            <a
                                                href={`/foundpets/${this.state.user.user._id}`}
                                            >
                                                {" "}
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>Pets Found</h5>
                                                </Row>
                                            </a>
                                            <br></br>
                                            <a
                                                href={`/adoption/${this.state.user.user._id}`}
                                            >
                                                {" "}
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>
                                                        Adoption Applications
                                                    </h5>
                                                </Row>
                                            </a>
                                            <br></br>
                                            <a
                                                href={`/request/${this.state.user.user._id}`}
                                            >
                                                {" "}
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>
                                                        {" "}
                                                        Applications to You
                                                    </h5>
                                                </Row>
                                            </a>
                                        </ModalBody>
                                    </Modal>
                                </Col>
                                <Col></Col>
                            </Row>
                        ) : null}
                    </div>
                ) : (
                    <div>
                        {this.state.user ? (
                            <Row>
                                <Col></Col>
                                <Col>
                                    <h1 style={{ marginLeft: "35px" }}>
                                        Animal Shelter
                                    </h1>
                                    {this.props.viewer == "me" ? (
                                        <div>
                                            <img
                                                src={
                                                    "/api/users/image/ngo/" +
                                                    this.props.user_id
                                                }
                                                style={imageStyle}
                                            ></img>
                                            <Button
                                                onClick={this.toggle}
                                                className="register"
                                                style={{ marginLeft: "130px" }}
                                            >
                                                View
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <img
                                                src={
                                                    "../../api/users/image/ngo/" +
                                                    this.props.user_id
                                                }
                                                style={imageStyle}
                                            ></img>
                                            <Link
                                                to={`/chat/${this.props.user_id}`}
                                            >
                                                {" "}
                                                <Button
                                                    className="register"
                                                    style={{
                                                        marginLeft: "110px",
                                                    }}
                                                >
                                                    Message
                                                </Button>
                                            </Link>
                                        </div>
                                    )}

                                    <Form>
                                        <Label>Animal Shelter Name</Label>
                                        <Input
                                            placeholder={
                                                this.state.user.user.name
                                            }
                                            disabled="true"
                                        ></Input>
                                        <br></br>
                                        <Label>License ID</Label>
                                        <Input
                                            placeholder={
                                                this.state.user.user.license
                                            }
                                            disabled="true"
                                        ></Input>
                                        <br></br>
                                        <Row>
                                            <Col>
                                                <Label>Email</Label>
                                                <Input
                                                    placeholder={
                                                        this.state.user.user
                                                            .email
                                                    }
                                                    disabled="true"
                                                ></Input>
                                            </Col>
                                            <Col>
                                                <Label>Contact</Label>
                                                <Input
                                                    placeholder={
                                                        this.state.user.user
                                                            .contact
                                                    }
                                                    disabled="true"
                                                ></Input>
                                            </Col>
                                        </Row>

                                        <br></br>
                                        <Label>Address</Label>
                                        <Input
                                            placeholder={`${this.state.user.user.hno}, ${this.state.user.user.street}, ${this.state.user.user.city}`}
                                            disabled="true"
                                        ></Input>
                                    </Form>

                                    <Modal
                                        isOpen={this.state.ngomodal}
                                        toggle={this.toggle}
                                    >
                                        <ModalHeader>View</ModalHeader>
                                        <ModalBody style={{ padding: "50px" }}>
                                            <a
                                                href={`/post/${this.state.user.user._id}`}
                                            >
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>Posts</h5>
                                                </Row>
                                            </a>
                                            <br></br>
                                            <a
                                                href={`/donations/${this.state.user.user._id}`}
                                            >
                                                {" "}
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>Donation Drives</h5>
                                                </Row>
                                            </a>
                                            <br></br>
                                            <a
                                                href={`/lostpets/${this.state.user.user._id}`}
                                            >
                                                {" "}
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>Pets Lost</h5>
                                                </Row>
                                            </a>
                                            <br></br>
                                            <a
                                                href={`/foundpets/${this.state.user.user._id}`}
                                            >
                                                {" "}
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>Pets Found</h5>
                                                </Row>
                                            </a>
                                            <br></br>
                                            <a
                                                href={`/request/${this.state.user.user._id}`}
                                            >
                                                {" "}
                                                <Row
                                                    className="hover"
                                                    style={{
                                                        backgroundColor:
                                                            "#77c3e7",
                                                        borderRadius: "5px",
                                                        height: "40px",
                                                        color: "white",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <h5>
                                                        {" "}
                                                        Applications to You
                                                    </h5>
                                                </Row>
                                            </a>
                                        </ModalBody>
                                    </Modal>
                                </Col>
                                <Col></Col>
                            </Row>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }
}

export default connect()(Profile);
