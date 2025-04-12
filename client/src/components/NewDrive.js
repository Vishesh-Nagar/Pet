import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Modal, ModalBody, ModalHeader, Button, Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainStyle = {
    position: "relative",
    marginTop: "4rem",
    paddingTop: "3rem",
    paddingLeft: "3rem",
};
const imageStyle = {
    width: 100,
    borderRadius: 50,
    alignSelf: "flex-start",
};

export class NewPost extends Component {
    state = {
        files: [],
        filesrc: [],
        ext: null,
        numfiles: 0,
        description: "",
        location: "",
        category: "",
        startDate: null,
        endDate: null,
        filetype: [],
        targetAmount: 0,
        isOpen: false,
        name: "",
        upload: false,
    };
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    onFileChange = (e) => {
        var prev = this.state.numfiles;
        this.state.numfiles += e.target.files.length;
        var i = 0;
        var src = this.state.filesrc;
        var files = this.state.files;
        var filetype = this.state.filetype;
        while (i < this.state.numfiles - prev) {
            files.push(e.target.files[i]);
            filetype.push(e.target.files[i].name.split(".").pop());
            src.push(URL.createObjectURL(e.target.files[i]));
            i++;
        }
        this.setState({ filesrc: src, files: files, filetype: filetype });
    };

    onTextChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("targetAmount", this.state.targetAmount);
        formData.append("endDate", this.state.endDate);
        formData.append("startDate", this.state.startDate);
        formData.append("location", this.state.location);
        formData.append("description", this.state.description);
        formData.append(
            "user_id",
            JSON.parse(window.localStorage.getItem("user")).id
        );
        formData.append(
            "user_name",
            JSON.parse(window.localStorage.getItem("user")).name
        );

        for (let i = 0; i < this.state.numfiles; i++) {
            formData.append("files[]", this.state.files[i]);
        }

        for (var pair of formData.entries()) {
        }
        axios.post("/api/donations/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        this.setState({ upload: true });
        toast.success("Posting...");
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    };
    render() {
        return (
            <div>
                <Button className="register" onClick={this.toggle}>
                    Create a Donation Drive
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Start a Donation Drive
                    </ModalHeader>
                    <ModalBody
                        style={{
                            paddingTop: "20px",
                            paddingBottom: "0px",
                            display: "flex",
                            backgroundColor: "white",
                        }}
                    >
                        {window.localStorage.getItem("user_type") == "user" ? (
                            <a
                                href={
                                    "http://localhost:5000/api/users/image/" +
                                    JSON.parse(
                                        window.localStorage.getItem("user")
                                    ).id
                                }
                            >
                                <img
                                    src={
                                        "api/users/image/" +
                                        JSON.parse(
                                            window.localStorage.getItem("user")
                                        ).id
                                    }
                                    style={imageStyle}
                                ></img>
                            </a>
                        ) : (
                            <a
                                href={
                                    "http://localhost:5000/api/users/image/ngo/" +
                                    JSON.parse(
                                        window.localStorage.getItem("user")
                                    ).id
                                }
                            >
                                <img
                                    src={
                                        "api/users/image/ngo/" +
                                        JSON.parse(
                                            window.localStorage.getItem("user")
                                        ).id
                                    }
                                    style={imageStyle}
                                ></img>
                            </a>
                        )}{" "}
                        <form>
                            <label
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                            >
                                Name of the Drive
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
                                placeholder="Pet Donation Drive"
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
                                Target Amount
                            </label>
                            <br></br>
                            <input
                                type="string"
                                name="targetAmount"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                placeholder="100"
                                onChange={this.onTextChange}
                            ></input>
                            <br></br>
                            <br></br>
                            <Row>
                                <Col>
                                    <label
                                        style={{
                                            marginLeft: "15px",
                                            position: "relative",
                                            zIndex: "1",
                                        }}
                                    >
                                        Start Date
                                    </label>
                                    <br></br>
                                    <input
                                        type="date"
                                        name="startDate"
                                        style={{
                                            marginLeft: "15px",
                                            position: "relative",
                                            zIndex: "1",
                                            borderColor: "#eeeeee",
                                            borderRadius: "6px",
                                            borderWidth: "1px",
                                        }}
                                        onChange={this.onTextChange}
                                    ></input>
                                </Col>
                                <Col>
                                    <label
                                        style={{
                                            marginLeft: "15px",
                                            position: "relative",
                                            zIndex: "1",
                                        }}
                                    >
                                        End Date
                                    </label>
                                    <br></br>
                                    <input
                                        type="date"
                                        name="endDate"
                                        style={{
                                            marginLeft: "15px",
                                            position: "relative",
                                            zIndex: "1",
                                            borderColor: "#eeeeee",
                                            borderRadius: "6px",
                                            borderWidth: "1px",
                                        }}
                                        onChange={this.onTextChange}
                                    ></input>
                                </Col>
                            </Row>
                            <br></br>
                            <label
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                            >
                                Describe the purpose of the drive
                            </label>
                            <br></br>
                            <textarea
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                                placeholder="write something..."
                                rows="3"
                                cols="20"
                                name="description"
                                onChange={this.onTextChange}
                            />
                            <input
                                type="file"
                                name="files"
                                id="img"
                                accept="image/*"
                                style={{ visibility: "hidden" }}
                                onChange={this.onFileChange}
                            />

                            <div
                                style={{
                                    float: "right",
                                    position: "relative",
                                    marginTop: "-40px",
                                    marginRight: "20px",
                                    zIndex: "2",
                                }}
                            >
                                {this.state.filesrc.map((src, idx) => {
                                    return this.state.filetype[idx] == "png" ||
                                        this.state.filetype[idx] == "jpeg" ||
                                        this.state.filetype[idx] == "jpg" ? (
                                        <img
                                            src={src}
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                marginLeft: "5px",
                                                marginBottom: "20px",
                                            }}
                                        />
                                    ) : this.state.filetype[idx] == "mp4" ||
                                      this.state.filetype[idx] == "ogg" ||
                                      this.state.filetype[idx] == "webm" ? (
                                        <video
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                marginLeft: "5px",
                                            }}
                                        >
                                            <source src={src} />
                                        </video>
                                    ) : (
                                        <embed
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                marginLeft: "5px",
                                            }}
                                            name="plugin"
                                            src={src}
                                            type="application/pdf"
                                        />
                                    );
                                })}
                                <br></br>
                                <label className="hover" for="img">
                                    <i class="fa fa-image" />
                                </label>
                                &nbsp;&nbsp;
                                {!this.state.upload ? (
                                    <button
                                        className="hover active"
                                        style={{
                                            marginLeft: "10px",
                                            backgroundColor: "#f4ca31f7",
                                        }}
                                        type="submit"
                                        onClick={this.onSubmit}
                                    >
                                        Post
                                    </button>
                                ) : (
                                    <button
                                        className="hover active"
                                        style={{
                                            marginLeft: "10px",
                                            backgroundColor: "#FFD700",
                                        }}
                                        type="submit"
                                        disabled
                                    >
                                        Posting
                                    </button>
                                )}
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect()(NewPost);
