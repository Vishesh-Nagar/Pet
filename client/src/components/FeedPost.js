import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Container,
    Row,
    Col,
    Button,
    Jumbotron,
    Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";
import doc from "../images/document.png";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import ShowMoreText from "react-show-more-text";

import logo from "../images/AVAILABLE.png";
const imageStyle = {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: "flex-start",
};

const statusFont = {
    color: "Red",
    fontSize: "2rem",
};

function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

function getDifferenceInHours(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60));
}

function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60));
}

export class FeedPost extends Component {
    state = {
        data: [],
        time: "just now",
        likes: 0,
        applicants: 0,
        liked: false,
        applied: false,
        show: false,
        adoptForm: false,
        name: "",
        age: "",
        sex: "",
        marital_status: "",
        location: "",
        address: "",
        annualIncome: 0,
        description: "",
        owner: "",
        ownerID: "",
        postStatus: false,
        flag: false,
    };
    componentDidMount = () => {
        this.showModal = this.showModal.bind(this);
        const nowTime = new Date(Date.now());
        const postTime = new Date(this.props.post.time);
        const minutes = getDifferenceInMinutes(postTime, nowTime);
        const hours = getDifferenceInHours(postTime, nowTime);
        const days = getDifferenceInDays(postTime, nowTime);
        if (minutes < 60 && minutes > 1)
            this.state.time = `${minutes} minutes ago`;
        else if (hours == 1) this.state.time = `${hours} hour ago`;
        else if (hours > 1 && hours < 24)
            this.state.time = `${hours} hours ago`;
        else if (days == 1) this.state.time = `${days} day ago`;
        else if (days > 1) this.state.time = `${days} days ago`;

        this.state.user_type = window.localStorage.getItem("user_type");
        if (this.state.user_type == "user") {
            axios
                .get(
                    `../api/post/like/${
                        JSON.parse(window.localStorage.getItem("user")).id
                    }/${this.props.post._id}`,
                    {
                        headers: {
                            "x-auth-token":
                                window.localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) =>
                    this.setState({
                        liked: res.data.flag,
                        likes: this.props.post.likes,
                    })
                );

            axios
                .get(
                    `../api/post/apply/${
                        JSON.parse(window.localStorage.getItem("user")).id
                    }/${this.props.post._id}`,
                    {
                        headers: {
                            "x-auth-token":
                                window.localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) =>
                    this.setState({
                        applied: res.data.flag,
                        applicants: this.props.post.applicants,
                    })
                );
        } else {
            axios
                .get(
                    `../api/post/ngo/like/${
                        JSON.parse(window.localStorage.getItem("user")).id
                    }/${this.props.post._id}`,
                    {
                        headers: {
                            "x-auth-token":
                                window.localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) =>
                    this.setState({
                        liked: res.data.flag,
                        likes: this.props.post.likes,
                    })
                );

            axios
                .get(
                    `../api/post/ngo/apply/${
                        JSON.parse(window.localStorage.getItem("user")).id
                    }/${this.props.post._id}`,
                    {
                        headers: {
                            "x-auth-token":
                                window.localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) =>
                    this.setState({
                        applied: res.data.flag,
                        applicants: this.props.post.applicants,
                    })
                );
        }
    };
    showModal = () => {
        this.setState({ show: true });
    };

    onTextChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    componentDidUpdate = () => {
        const nowTime = new Date(Date.now());
        const postTime = new Date(this.props.post.time);
        const minutes = getDifferenceInMinutes(postTime, nowTime);
        const hours = getDifferenceInHours(postTime, nowTime);
        const days = getDifferenceInDays(postTime, nowTime);
        if (minutes < 60 && minutes > 1)
            this.state.time = `${minutes} minutes ago`;
        else if (hours == 1) this.state.time = `${hours} hour ago`;
        else if (hours > 1 && hours < 24)
            this.state.time = `${hours} hours ago`;
        else if (days == 1) this.state.time = `${days} day ago`;
        else if (days > 1) this.state.time = `${days} days ago`;
    };

    executeOnClick = () => {
        this.setState({ flag: !this.state.flag });
    };
    onLike = () => {
        var l;
        if (this.state.liked) l = this.state.likes - 1;
        else l = this.state.likes + 1;
        if (!this.state.liked) {
            if (window.localStorage.getItem("user_type") == "user") {
                axios.post(
                    `../api/post/like/${
                        JSON.parse(window.localStorage.getItem("user")).id
                    }/${this.props.post._id}`,
                    {
                        headers: {
                            "x-auth-token":
                                window.localStorage.getItem("token"),
                        },
                    }
                );
            } else {
                axios.post(
                    `../api/post/ngo/like/${
                        JSON.parse(window.localStorage.getItem("user")).id
                    }/${this.props.post._id}`,
                    {
                        headers: {
                            "x-auth-token":
                                window.localStorage.getItem("token"),
                        },
                    }
                );
            }
        } else {
            if (window.localStorage.getItem("user_type") == "user") {
                axios.post(
                    `../api/post/dislike/${
                        JSON.parse(window.localStorage.getItem("user")).id
                    }/${this.props.post._id}`,
                    {
                        headers: {
                            "x-auth-token":
                                window.localStorage.getItem("token"),
                        },
                    }
                );
            } else {
                axios.post(
                    `../api/post/ngo/dislike/${
                        JSON.parse(window.localStorage.getItem("user")).id
                    }/${this.props.post._id}`,
                    {
                        headers: {
                            "x-auth-token":
                                window.localStorage.getItem("token"),
                        },
                    }
                );
            }
        }

        this.setState({ likes: l, liked: !this.state.liked });
    };

    delete = () => {
        axios
            .delete(`../api/post/${this.props.post._id}`)
            .then(window.location.reload());
    };
    onApply = () => {
        this.setState({ adoptForm: !this.state.adoptForm });
    };
    stopApplicants = () => {
        this.setState({ postStatus: !this.state.postStatus });
        const formData = new FormData();
        formData.status = "No";
        axios.put(`/api/post/${this.props.post._id}`, { formData });
        window.location.reload();
    };
    startApplicants = () => {
        this.setState({ postStatus: !this.state.postStatus });
        const formData = new FormData();
        formData.status = "Yes";
        axios.put(`/api/post/${this.props.post._id}`, { formData });
        window.location.reload();
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.state.applicants = this.state.applicants + 1;

        axios.post(
            `../api/post/apply/${
                JSON.parse(window.localStorage.getItem("user")).id
            }/${this.props.post._id}`,
            {
                headers: {
                    "x-auth-token": window.localStorage.getItem("token"),
                },
            }
        );
        const formData = new FormData();
        formData.name = this.state.name;
        formData.age = this.state.age;
        formData.marital_status = this.state.marital_status;
        formData.sex = this.state.sex;
        formData.annualIncome = this.state.annualIncome;
        formData.address = this.state.address;
        formData.owner = this.props.post.user_name;
        formData.ownerID = this.props.post.user_id;
        formData.description = this.state.description;

        axios.post(
            `/api/post/apply/${
                JSON.parse(window.localStorage.getItem("user")).id
            }/${this.props.post._id}/`,
            { formData }
        );
        this.onApply();
        if (this.props.post.user_type == "ngo") {
            const body = {
                user_id: JSON.parse(window.localStorage.getItem("user")).id,
                user_name: JSON.parse(window.localStorage.getItem("user")).name,
                user_type: window.localStorage.getItem("user_type"),
            };

            axios.post(`/api/post/ngo/notify/${this.props.post.user_id}`, body);
        } else {
            const body = {
                user_id: JSON.parse(window.localStorage.getItem("user")).id,
                user_name: JSON.parse(window.localStorage.getItem("user")).name,
                user_type: window.localStorage.getItem("user_type"),
            };
            axios.post(`/api/post/notify/${this.props.post.user_id}`, body);
        }
    };

    render() {
        return (
            <Container
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Row>
                    <Col>
                        <Jumbotron
                            style={{
                                padding: "20px",
                                backgroundColor: "white",
                                width: this.props.width,
                            }}
                        >
                            <div style={{ display: "flex", float: "right" }}>
                                {this.props.viewer == "me" ? (
                                    <div>
                                        {" "}
                                        <Button
                                            onClick={this.delete}
                                            className="deleteBtn"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                ) : null}
                            </div>
                            <div style={{ display: "flex" }}>
                                {this.props.post.user_type == "user" ? (
                                    <a
                                        href={
                                            "http://localhost:5000/api/users/image/" +
                                            this.props.post.user_id
                                        }
                                    >
                                        <img
                                            src={
                                                "../api/users/image/" +
                                                this.props.post.user_id
                                            }
                                            style={imageStyle}
                                        ></img>
                                    </a>
                                ) : (
                                    <a
                                        href={
                                            "http://localhost:5000/api/users/image/ngo/" +
                                            this.props.post.user_id
                                        }
                                    >
                                        <img
                                            src={
                                                "../api/users/image/ngo/" +
                                                this.props.post.user_id
                                            }
                                            style={imageStyle}
                                        ></img>
                                    </a>
                                )}

                                <div style={{ marginLeft: "10px" }}>
                                    <a
                                        className="linkhover"
                                        href={`/profile/${this.props.post.user_type}/${this.props.post.user_id}`}
                                    >
                                        {this.props.post.user_name}
                                    </a>
                                    <br></br>
                                    {this.props.post.user_type == "user" ? (
                                        <span style={{ fontSize: "10px" }}>
                                            (General User)
                                        </span>
                                    ) : (
                                        <span style={{ fontSize: "10px" }}>
                                            (Animal Shelter)
                                        </span>
                                    )}
                                    <br></br>
                                    <span style={{ fontSize: "12px" }}>
                                        Published: {this.state.time}
                                    </span>
                                </div>

                                {this.props.post.available == "Yes" &&
                                this.props.viewer != "me" &&
                                this.props.width == "700px" ? (
                                    <div style={{ marginLeft: "300px" }}>
                                        <img
                                            src={logo}
                                            style={{
                                                display: "inline",
                                                float: "right",
                                                height: 40,
                                            }}
                                        />
                                    </div>
                                ) : null}
                                {this.props.post.available == "Yes" &&
                                this.props.viewer != "me" &&
                                this.props.width != "700px" ? (
                                    <div style={{ marginLeft: "200px" }}>
                                        <img
                                            src={logo}
                                            style={{
                                                display: "inline",
                                                float: "right",
                                                height: 40,
                                            }}
                                        />
                                    </div>
                                ) : null}

                                <br></br>
                            </div>

                            {this.props.files.length > 0 ? (
                                <AliceCarousel
                                    disableButtonsControls={true}
                                    mouseTracking={true}
                                    controlsStrategy="responsive"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {this.props.files.map((f, i) => {
                                        return (
                                            <div>
                                                {f.contentType == "image/png" ||
                                                f.contentType == "image/jpeg" ||
                                                f.contentType == "image/jpg" ? (
                                                    <a
                                                        href={
                                                            "http://localhost:5000/api/post/image/" +
                                                            f.filename
                                                        }
                                                    >
                                                        <img
                                                            style={{
                                                                width: "700px",
                                                                height: "500px",
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                            src={
                                                                "../api/post/image/" +
                                                                f.filename
                                                            }
                                                        ></img>
                                                    </a>
                                                ) : f.contentType ==
                                                      "video/mp4" ||
                                                  f.contentType ==
                                                      "video/ogg" ||
                                                  f.contentType ==
                                                      "video/webm" ? (
                                                    <video
                                                        style={{
                                                            width: "700px",
                                                            height: "500px",
                                                            objectFit: "cover",
                                                        }}
                                                        controls
                                                    >
                                                        <source
                                                            src={
                                                                "api/post/video/" +
                                                                f.filename
                                                            }
                                                        />
                                                    </video>
                                                ) : f.contentType ===
                                                      "application/pdf" ||
                                                  f.contentType ===
                                                      "application/octet-stream" ||
                                                  f.contentType ===
                                                      "text/plain" ||
                                                  f.contentType ===
                                                      "application/x-zip-compressed" ? (
                                                    <a
                                                        href={
                                                            "http://localhost:5000/api/post/document/" +
                                                            f.filename
                                                        }
                                                    >
                                                        <img
                                                            src={doc}
                                                            width="30px"
                                                        ></img>
                                                        &nbsp;&nbsp;
                                                        {f.metadata}
                                                    </a>
                                                ) : (
                                                    f.metadata
                                                )}
                                            </div>
                                        );
                                    })}
                                </AliceCarousel>
                            ) : null}
                            <div
                                style={{
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    marginTop: "15px",
                                }}
                            >
                                <p>
                                    <ShowMoreText
                                        lines={3}
                                        more="(more)"
                                        less="(less)"
                                        className="content-css"
                                        anchorClass="my-anchor-css-class"
                                        onClick={this.executeOnClick}
                                        expanded={this.state.flag}
                                        width={this.props.words}
                                    >
                                        {this.props.post.caption}
                                    </ShowMoreText>
                                </p>
                                <div>
                                    <ul>
                                        <li
                                            style={{
                                                float: "left",
                                                display: "inline",
                                                marginRight: "20px",
                                                marginLeft: "-40px",
                                            }}
                                        >
                                            {this.state.liked ? (
                                                <div>
                                                    <button
                                                        onClick={this.onLike}
                                                        title="Applications"
                                                        class="hover active"
                                                        style={{
                                                            fontSize: "20px",
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius:
                                                                "20px",
                                                            border: "0px solid white",
                                                            backgroundColor:
                                                                "#E74C3C",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <i class="fa fa-heart"></i>
                                                    </button>
                                                    <span>
                                                        {" "}
                                                        {this.state.likes}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <button
                                                        onClick={this.onLike}
                                                        title="Applications"
                                                        class="hover active"
                                                        style={{
                                                            fontSize: "20px",
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius:
                                                                "20px",
                                                            border: "0px solid white",
                                                            backgroundColor:
                                                                "#E74C3C",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <i class="fa fa-heart-o"></i>
                                                    </button>
                                                    <span>
                                                        {" "}
                                                        {this.state.likes}
                                                    </span>
                                                </div>
                                            )}
                                        </li>
                                        <li
                                            style={{
                                                display: "inline",
                                                marginRight: "20px",
                                            }}
                                        >
                                            {this.props.post.available ==
                                            "Yes" ? (
                                                <div>
                                                    <button
                                                        onClick={this.onApply}
                                                        title="Applications"
                                                        class="hover active"
                                                        style={{
                                                            fontSize: "20px",
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius:
                                                                "20px",
                                                            border: "0px solid white",
                                                            backgroundColor:
                                                                "#77c3e7",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <i class="fa fa-user"></i>
                                                    </button>
                                                    <span>
                                                        {" "}
                                                        {this.state.applicants}
                                                    </span>
                                                </div>
                                            ) : null}
                                            {this.props.viewer == "me" &&
                                            this.props.post.available ==
                                                "Yes" ? (
                                                <div
                                                    style={{
                                                        display: "inline",
                                                        float: "right",
                                                    }}
                                                >
                                                    {" "}
                                                    <Button
                                                        onClick={
                                                            this.stopApplicants
                                                        }
                                                        className="declineBtn"
                                                    >
                                                        Stop Receiving
                                                        Applicants
                                                    </Button>
                                                </div>
                                            ) : null}
                                            {this.props.viewer == "me" &&
                                            this.props.post.available ==
                                                "No" ? (
                                                <div
                                                    style={{
                                                        display: "inline",
                                                        float: "right",
                                                    }}
                                                >
                                                    {" "}
                                                    <Button
                                                        onClick={
                                                            this.startApplicants
                                                        }
                                                        className="approveBtn"
                                                    >
                                                        Resume Receiving
                                                        Applicants
                                                    </Button>
                                                </div>
                                            ) : null}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
                <Modal
                    style={{}}
                    isOpen={this.state.adoptForm}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.onApply}>
                        Submit Application
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
                                Name of the Applicant
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
                                placeholder="Name of the Applicant"
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
                                Age
                            </label>
                            <br></br>
                            <input
                                type="string"
                                name="age"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="Age"
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
                                Sex
                            </label>
                            <br></br>
                            <input
                                type="string"
                                name="sex"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="Male/Female/Other"
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
                                Marital Status
                            </label>
                            <br></br>
                            <input
                                type="string"
                                name="marital_status"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="Married/Unmarried"
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
                                Annual Income
                            </label>
                            <br></br>
                            <input
                                type="number"
                                name="annualIncome"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="In INR"
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
                                Permanent Address
                            </label>
                            <br></br>
                            <input
                                type="string"
                                name="Address"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="Place of Residence"
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
                                Reason for Adoption
                            </label>
                            <br></br>

                            <textarea
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                                placeholder="Tell us why you want to go ahead with this adoption..."
                                rows="3"
                                cols="20"
                                name="description"
                                onChange={this.onTextChange}
                            />

                            <div
                                style={{
                                    float: "left",
                                    position: "relative",
                                    marginTop: "-40px",
                                    marginRight: "20px",
                                    zIndex: "2",
                                }}
                            >
                                <br></br>
                                <br></br>
                                <button
                                    className="hover"
                                    style={{
                                        marginLeft: "15px",
                                        backgroundColor: "green",
                                        borderRadius: "5px",
                                    }}
                                    type="submit"
                                    onClick={this.onSubmit}
                                >
                                    Submit Application
                                </button>
                            </div>
                            <br></br>
                            <br></br>
                        </form>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

export default connect()(FeedPost);
