import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Modal, ModalBody, ModalHeader, Button, Row, Col } from "reactstrap";

const mainStyle = {
    position: "relative",
    marginTop: "4rem",
    paddingTop: "3rem",
    paddingLeft: "3rem",
};
const imageStyle = {
    width: 50,
    height: 50,
    borderRadius: 25,
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
        formData.append("age", this.state.age);
        formData.append("marital_status", this.state.marital_status);
        formData.append("location", this.state.location);
        formData.append("description", this.state.description);
        formData.append("sex", this.state.sex);
        formData.append("annualIncome", this.state.annualIncome);
        formData.append("address", this.state.address);

        for (let i = 0; i < this.state.numfiles; i++) {
            formData.append("files[]", this.state.files[i]);
        }

        for (var pair of formData.entries()) {
        }
        axios.post("api/post/apply/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    };
    render() {
        return (
            <div className="container" style={mainStyle}>
                <Button onClick={this.toggle}>Create a Donation Drive</Button>
                <br></br>
                <br></br>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Apply for Adoption
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
                                type="string"
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
                                <label for="img">
                                    <i class="fa fa-image" />
                                </label>
                                &nbsp;&nbsp;
                                <button
                                    style={{ marginLeft: "10px" }}
                                    type="submit"
                                    onClick={this.onSubmit}
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default connect()(NewPost);
