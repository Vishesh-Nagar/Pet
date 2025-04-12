import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Container, Row, Col, Jumbotron, Modal, ModalHeader } from "reactstrap";
import FlashMessage from "react-flash-message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const imageStyle = {
    width: 200,
    borderRadius: 100,
    alignSelf: "flex-start",
};

export class NewPost extends Component {
    state = {
        files: [],
        filesrc: [],
        ext: null,
        numfiles: 0,
        caption: "",
        filetype: [],
        upload: false,
        status: false,
        options: [
            { value: "dog", label: "Dog" },
            { value: "cat", label: "Cat" },
            { value: "fish", label: "Fish" },
            { value: "bird", label: "Bird" },
            { value: "small mammal", label: "Rabbit/Hamster/Guinea Pig" },
            { value: "reptile", label: "Reptile" },
            { value: "other", label: "Other" },
        ],
        selectedOption: null,
        tag: "other",
        displayOptions: "none",
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

    sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        var s = this.state.status ? "Yes" : "No";
        formData.append("caption", this.state.caption);
        formData.append("user", window.localStorage.getItem("user"));
        formData.append("user_type", window.localStorage.getItem("user_type"));
        formData.append("status", s);
        formData.append("tag", this.state.tag);
        for (let i = 0; i < this.state.numfiles; i++) {
            formData.append("files[]", this.state.files[i]);
        }

        for (var pair of formData.entries()) {
        }
        axios.post("api/post", formData, {
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

    checkBox = () => {
        this.setState({ status: !this.state.status });
        if (this.state.displayOptions == "none")
            this.state.displayOptions = "inline";
        else this.state.displayOptions = "none";
    };

    handleChange = (value) => {
        this.setState({ selectedOption: value, tag: value.value });
    };
    render() {
        return (
            <div>
                <Container
                    style={{
                        marginTop: "-49px",
                        paddingBottom: "10px",
                        paddingTop: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "580px",
                        marginBottom: -10,
                    }}
                >
                    <Row>
                        <Col>
                            <Jumbotron
                                style={{
                                    paddingTop: "15px",
                                    paddingBottom: "0px",
                                    display: "flex",
                                    backgroundColor: "white",
                                }}
                            >
                                {window.localStorage.getItem("user_type") ==
                                "user" ? (
                                    <a
                                        href={
                                            "http://localhost:5000/api/users/image/" +
                                            JSON.parse(
                                                window.localStorage.getItem(
                                                    "user"
                                                )
                                            ).id
                                        }
                                    >
                                        <img
                                            src={
                                                "api/users/image/" +
                                                JSON.parse(
                                                    window.localStorage.getItem(
                                                        "user"
                                                    )
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
                                                window.localStorage.getItem(
                                                    "user"
                                                )
                                            ).id
                                        }
                                    >
                                        <img
                                            src={
                                                "api/users/image/ngo/" +
                                                JSON.parse(
                                                    window.localStorage.getItem(
                                                        "user"
                                                    )
                                                ).id
                                            }
                                            style={imageStyle}
                                        ></img>
                                    </a>
                                )}
                                <form>
                                    <textarea
                                        style={{
                                            marginLeft: "15px",
                                            position: "relative",
                                            zIndex: "1",
                                        }}
                                        placeholder="Write something..."
                                        rows="2"
                                        cols="20"
                                        name="caption"
                                        onChange={this.onTextChange}
                                    />

                                    <input
                                        type="file"
                                        name="files"
                                        id="img"
                                        accept="image/*"
                                        style={{ visibility: "hidden" }}
                                        onChange={this.onFileChange}
                                        multiple
                                    />
                                    <input
                                        type="file"
                                        name="files"
                                        id="vid"
                                        accept="video/*"
                                        style={{ visibility: "hidden" }}
                                        onChange={this.onFileChange}
                                        multiple
                                    />
                                    <input
                                        type="file"
                                        name="files"
                                        id="doc"
                                        accept="application/*, text/*"
                                        style={{ visibility: "hidden" }}
                                        onChange={this.onFileChange}
                                        multiple
                                    />

                                    <div
                                        style={{
                                            float: "right",
                                            position: "relative",
                                            marginTop: "-90px",
                                            marginRight: "20px",
                                            zIndex: "2",
                                        }}
                                    >
                                        {this.state.filesrc.map((src, idx) => {
                                            return this.state.filetype[idx] ==
                                                "png" ||
                                                this.state.filetype[idx] ==
                                                    "jpeg" ||
                                                this.state.filetype[idx] ==
                                                    "jpg" ? (
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
                                            ) : this.state.filetype[idx] ==
                                                  "mp4" ||
                                              this.state.filetype[idx] ==
                                                  "ogg" ||
                                              this.state.filetype[idx] ==
                                                  "webm" ? (
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
                                        <label
                                            for="img"
                                            className="hover"
                                            style={{ fontSize: "20px" }}
                                        >
                                            <i class="fa fa-image" />
                                        </label>
                                        &nbsp;&nbsp;
                                        <label
                                            for="vid"
                                            className="hover"
                                            style={{ fontSize: "20px" }}
                                        >
                                            <i class="fa fa-video-camera" />
                                        </label>
                                        &nbsp;&nbsp;
                                        <label
                                            for="doc"
                                            className="hover"
                                            style={{ fontSize: "20px" }}
                                        >
                                            <i class="fa fa-file" />
                                        </label>
                                        &nbsp;&nbsp;
                                        {!this.state.upload ? (
                                            <button
                                                className="hover active"
                                                style={{
                                                    fontSize: "14px",
                                                    marginLeft: "10px",
                                                    backgroundColor: "#11CD32",
                                                    borderRadius: "5px",
                                                }}
                                                type="submit"
                                                onClick={this.onSubmit}
                                            >
                                                Post
                                            </button>
                                        ) : (
                                            <button
                                                disabled={true}
                                                className="hover active"
                                                style={{
                                                    fontSize: "14px",
                                                    marginLeft: "10px",
                                                    backgroundColor: "#11CD32",
                                                    borderRadius: "5px",
                                                }}
                                                type="submit"
                                            >
                                                Posting
                                            </button>
                                        )}
                                    </div>
                                    <div
                                        style={{
                                            float: "left",
                                            marginLeft: "15px",
                                            marginTop: "-40px",
                                        }}
                                    >
                                        Adoption Post:{" "}
                                        <input
                                            type="checkbox"
                                            onChange={this.checkBox}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            float: "left",
                                            marginLeft: "15px",
                                            marginTop: "-15px",
                                            marginBottom: "20px",
                                            display: this.state.displayOptions,
                                            width: "250px",
                                        }}
                                    >
                                        <Select
                                            onChange={this.handleChange}
                                            value={this.state.selectedOption}
                                            options={this.state.options}
                                        />
                                    </div>
                                </form>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default connect()(NewPost);
