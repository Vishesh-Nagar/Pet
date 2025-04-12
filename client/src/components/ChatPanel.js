import React, { Component } from "react";
import { connect } from "react-redux";
import { MessageList } from "react-chat-elements";
import { Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import "react-chat-elements/dist/main.css";
import axios from "axios";
import { getMessages, addMessage } from "../actions/chatAction";
import PropTypes from "prop-types";
import history from "../history";

const imageStyle = {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: "flex-start",
    marginLeft: 15,
};

export class ChatPanel extends Component {
    i = 0;
    state = {
        msg: {},
        msgList: [],
        files: [],
        filesrc: [],
        ext: null,
        numfiles: 0,
        caption: "",
        filetype: [],
        name_user: "",
        type_user: "",
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

    componentDidMount = () => {
        this.props.getMessages(this.props.user1);
        const userMessages = this.props.chat.userMessages;
        userMessages.map((msg) => {
            const { position, type, text, data } = msg;
            const date = new Date(msg.updatedAt);
            this.state.msgList.push({ position, type, text, date, data });
        });

        axios.get(`/api/auth/name/${this.props.user1}`).then((res) => {
            this.setState({ name_user: res.data.name });
        });

        axios.get(`/api/auth/${this.props.user1}`).then((res) => {
            this.setState({ type_user: res.data.type });
        });
    };

    componentDidUpdate = () => {
        this.i++;
        this.props.getMessages(this.props.user1);
        const userMessages = this.props.chat.userMessages;
        this.state.msgList = [];
        userMessages.map((msg) => {
            const { position, type, text, data } = msg;
            const date = new Date(msg.updatedAt);
            this.state.msgList.push({ position, type, text, date, data });
        });
        if (this.i < 5) this.scrollRef.scrollIntoView({ behavior: "smooth" });
    };

    onChange = (e) => {
        this.setState({
            msg: {
                position: "right",
                type: "text",
                text: e.target.value,
            },
        });
    };

    addMessage = (e) => {
        e.preventDefault();
        this.formRef.reset();
        if (this.state.files.length == 0) {
            this.setState({ msgList: [...this.state.msgList, this.state.msg] });
            this.setState({ msg: "" });
            this.props.addMessage(
                this.state.msg.text,
                this.state.position,
                "text",
                null,
                null,
                this.props.user1
            );
        } else {
            var msglistnew = [];
            var i = 0;
            while (i < this.state.files.length) {
                if (
                    this.state.filetype[i] == "png" ||
                    this.state.filetype[i] == "jpeg" ||
                    this.state.filetype[i] == "jpg"
                ) {
                    msglistnew.push({
                        position: this.state.msg.position,
                        type: "photo",
                        text: this.state.msg.text,
                        uri: this.state.filesrc[i],
                        file: this.state.files[i],
                    });
                } else if (
                    this.state.filetype[i] == "mp4" ||
                    this.state.filetype[i] == "ogg" ||
                    this.state.filetype[i] == "webm"
                ) {
                    msglistnew.push({
                        position: this.state.msg.position,
                        type: "video",
                        text: this.state.msg.text,
                        uri: this.state.filesrc[i],
                        file: this.state.files[i],
                    });
                } else {
                    msglistnew.push({
                        position: this.state.msg.position,
                        type: "file",
                        text: this.state.msg.text,
                        uri: this.state.filesrc[i],
                        file: this.state.files[i],
                    });
                }
                i++;
            }
            this.setState({
                msgList: [...this.state.msgList, msglistnew],
                files: [],
                filesrc: [],
                filetype: [],
                msg: "",
            });
            i = 0;
            while (i < msglistnew.length) {
                this.props.addMessage(
                    msglistnew[i].text,
                    msglistnew[i].position,
                    msglistnew[i].type,
                    msglistnew[i].uri,
                    msglistnew[i].file,
                    this.props.user1
                );
                i++;
            }
        }
    };

    formRef = React.createRef();
    scrollRef = React.createRef();

    render() {
        return (
            <div>
                <div style={{ backgroundColor: "lightgray" }} overflow="hidden">
                    <div
                        style={{
                            height: 80,
                            marginBottom: 20,
                            background: "gray",
                            display: "flex",
                            alignItems: "center",
                            border: "2px solid white",
                        }}
                    >
                        {this.state.type_user == "user" ? (
                            <a
                                href={
                                    "http://localhost:5000/api/users/image/" +
                                    this.props.user1
                                }
                            >
                                <img
                                    src={
                                        "http://localhost:5000/api/users/image/" +
                                        this.props.user1
                                    }
                                    style={imageStyle}
                                ></img>
                            </a>
                        ) : (
                            <a
                                href={
                                    "http://localhost:5000/api/users/image/ngo/" +
                                    this.props.user1
                                }
                            >
                                <img
                                    src={
                                        "http://localhost:5000/api/users/image/ngo/" +
                                        this.props.user1
                                    }
                                    style={imageStyle}
                                ></img>
                            </a>
                        )}
                        <span
                            style={{
                                marginLeft: 15,
                                fontSize: "20px",
                                color: "white",
                            }}
                        >
                            {this.state.name_user}
                        </span>
                    </div>
                    <MessageList
                        className="message-list"
                        toBottomHeight={"100%"}
                        dataSource={this.state.msgList}
                        onClick={(msg) => {
                            history.push(msg.data.uri);
                        }}
                    />

                    <div
                        style={{
                            marginTop: 720,
                            background: "gray",
                            position: "sticky",
                            padding: "5px",
                        }}
                        ref={(el) => (this.scrollRef = el)}
                    >
                        <form ref={(el) => (this.formRef = el)}>
                            <InputGroup>
                                <Input
                                    defaultValue=""
                                    placeholder="Write something..."
                                    onChange={this.onChange}
                                />
                                <InputGroupAddon
                                    addonType="append"
                                    style={{ backgroundColor: "white" }}
                                >
                                    <label
                                        for="img"
                                        style={{ marginTop: 8, marginLeft: 8 }}
                                    >
                                        <i class="fa fa-image" />
                                    </label>
                                    &nbsp;&nbsp;&nbsp;
                                    <label for="vid" style={{ marginTop: 8 }}>
                                        <i class="fa fa-video-camera" />
                                    </label>
                                    &nbsp;&nbsp;&nbsp;
                                    <label for="doc" style={{ marginTop: 8 }}>
                                        <i class="fa fa-file" />
                                    </label>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        color="success"
                                        onClick={this.addMessage}
                                    >
                                        Send
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </form>

                        <div
                            style={{
                                float: "right",
                                position: "relative",
                                marginTop: "-35px",
                                marginRight: "170px",
                                zIndex: "5",
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
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "transparent" }}>
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
                </div>
            </div>
        );
    }
}

ChatPanel.propTypes = {
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    chat: state.chat,
});
export default connect(mapStateToProps, { addMessage, getMessages })(ChatPanel);
