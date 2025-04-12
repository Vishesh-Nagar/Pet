import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Modal, ModalBody, ModalHeader, Button, Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var ipapi = require("ipapi.co");

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
        lastseen: null,
        filetype: [],
        isOpen: false,
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
        formData.append("description", this.state.description);
        formData.append("lastseen", this.state.lastseen);
        formData.append("user", window.localStorage.getItem("user"));
        formData.append("user_type", window.localStorage.getItem("user_type"));
        formData.append("breed", this.state.breed);
        formData.append("location", JSON.stringify(this.props.location));

        for (let i = 0; i < this.state.numfiles; i++) {
            formData.append("files[]", this.state.files[i]);
        }

        for (var pair of formData.entries()) {
        }
        axios.post("api/lostpet/found", formData, {
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
                    Found A Lost Pet?
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Found Pet Information
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
                                Animal Breed
                            </label>
                            <br></br>
                            <input
                                type="string"
                                name="breed"
                                id="breed"
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                    borderColor: "#eeeeee",
                                    borderRadius: "6px",
                                    borderWidth: "1px",
                                }}
                                onChange={this.onTextChange}
                            />
                            <br></br>
                            <br></br>
                            <label
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                            >
                                Found On
                            </label>
                            <br></br>
                            <input
                                type="date"
                                name="lastseen"
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
                            <br></br>
                            <br></br>
                            <label
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                            >
                                Describe the pet and where you found it.
                            </label>
                            <br></br>
                            <textarea
                                style={{
                                    marginLeft: "15px",
                                    position: "relative",
                                    zIndex: "1",
                                }}
                                placeholder="describe the pet..."
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
