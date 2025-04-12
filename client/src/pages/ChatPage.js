import React, { Component } from "react";
import { ChatList } from "react-chat-elements";
import { Container, Row, Col } from "reactstrap";
import "react-chat-elements/dist/main.css";
import { connect } from "react-redux";
import axios from "axios";
import { getMessages, addMessage, getMessageList } from "../actions/chatAction";
import PropTypes from "prop-types";

const styleparent = {
    position: "absolute",
    height: 500,
    width: "100%",
    textAlign: "center",
};

const imageStyle = {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: "flex-start",
    marginLeft: 15,
};
const stylechild = {
    height: "500px",
    width: "800px",
    backgroundColor: "#e5e4e2",
    overflow: "scroll",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    margin: "auto",
    marginTop: "100px",
    textAlign: "left",
};

export class ChatPage extends Component {
    state = {
        chatopen: null,
        chatSource: [],

        messageList: [
            {
                position: "right",
                type: "text",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
            },
            {
                position: "right",
                type: "text",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
            },
            {
                position: "right",
                type: "text",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
            },
        ],
        msg: "",
    };
    componentDidMount = () => {
        this.props.getMessageList();
        const messageList = this.props.chat.messageList.msgs;
        const unread_messages = this.props.chat.messageList.unread_messages;
        this.state.chatSource = [];
        for (var key in messageList) {
            const arr = messageList[key];
            var title;
            if (arr[arr.length - 1].position == "left")
                title = arr[arr.length - 1].sender;
            else title = arr[arr.length - 1].receiver;
            const { subtitle } = arr[arr.length - 1];
            var date = arr[arr.length - 1].updatedAt;
            var avatar = `http://localhost:3000/api/users/image/ngo/${key}`;
            axios.get(`api/users/isuser/${key}`).then((res) => {
                if (res.data.flag) {
                    avatar = `http://localhost:3000/api/users/image/${key}`;
                }

                const alt = key;
                const unread = unread_messages[key];
                this.state.chatSource.push({
                    title,
                    subtitle,
                    avatar,
                    alt,
                    unread,
                    date,
                });
            });
        }
        this.state.chatSource.sort((m1, m2) => {
            return new Date(m2.date).getTime() - new Date(m1.date).getTime();
        });
    };

    async getflag(key) {
        const res = await axios(`/api/users/isuser/${key}`);
        return await res.data.flag;
    }

    componentDidUpdate = () => {
        this.props.getMessageList();
        const messageList = this.props.chat.messageList.msgs;
        const unread_messages = this.props.chat.messageList.unread_messages;
        this.state.chatSource = [];
        for (var key in messageList) {
            const arr = messageList[key];
            var title;
            if (arr[arr.length - 1].position == "left")
                title = arr[arr.length - 1].sender;
            else title = arr[arr.length - 1].receiver;
            const { subtitle } = arr[arr.length - 1];
            var date = new Date(arr[arr.length - 1].updatedAt);
            var avatar = `http://localhost:3000/api/users/image/${key}`;

            const alt = key;
            const unread = unread_messages[key];

            this.state.chatSource.push({
                title,
                subtitle,
                avatar,
                alt,
                unread,
                date,
            });
        }
        this.state.chatSource.sort((m1, m2) => {
            return new Date(m2.date).getTime() - new Date(m1.date).getTime();
        });
    };

    addMessage = (e) => {
        this.setState({
            messageList: [...this.state.messageList, this.state.msg],
        });
        this.setState({ msg: "" });
        this.inputRef.clear();
    };

    inputRef = React.createRef();

    render() {
        return (
            <Container style={{ marginBottom: 650 }}>
                <Row>
                    <Col>
                        <div style={styleparent}>
                            <div style={stylechild} className="myColumn1">
                                <div
                                    style={{
                                        height: 80,
                                        width: "100%",
                                        position: "sticky",
                                        top: 0,
                                        padding: 10,
                                        background:
                                            "linear-gradient(45deg, #77c3e7 0%, #f4ca31f7 71%)",
                                        color: "white",
                                        fontSize: "20px",
                                        zIndex: 10,
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
                                    &nbsp;Fetch Messenger
                                </div>
                                <ChatList
                                    dataSource={this.state.chatSource}
                                    onClick={(e) => {
                                        window.location.href = `/chat/${e.alt}`;
                                    }}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ChatPage.propTypes = {
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    getMessageList: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    chat: state.chat,
});
export default connect(mapStateToProps, {
    getMessages,
    addMessage,
    getMessageList,
})(ChatPage);
