import React, { Component } from "react";
import {
    ChatList,
    MessageList,
    Input,
    Button,
    SideBar,
    Dropdown,
    Popup,
    MeetingList,
} from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import FaSearch from "react-icons/lib/fa/search";
import FaComments from "react-icons/lib/fa/comments";
import FaClose from "react-icons/lib/fa/close";
import FaMenu from "react-icons/lib/md/more-vert";
import FaSquare from "react-icons/lib/md/crop-square";
import "../css/temp.css";

export class Temp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
            list: "chat",
            messageList: [],
        };

        this.addMessage = this.addMessage.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.addMessage(7);
    }

    getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    token() {
        return parseInt((Math.random() * 10) % 8);
    }

    photo(size) {
        return "";
    }

    random(type, mtype) {
        switch (type) {
            case "message":
                mtype = mtype || this.token();
                var status = "waiting";
                switch (mtype) {
                    case 0:
                        mtype = "photo";
                        status = "sent";
                        break;
                    case 1:
                        mtype = "file";
                        status = "sent";
                        break;
                    case 2:
                        mtype = "system";
                        status = "received";
                        break;
                    case 3:
                        mtype = "location";
                        break;
                    case 4:
                        mtype = "spotify";
                        break;
                    case 5:
                        mtype = "meeting";
                        break;
                    case 6:
                        mtype = "video";
                        status = "sent";
                        break;
                    case 7:
                        mtype = "audio";
                        break;
                    default:
                        mtype = "text";
                        status = "read";
                        break;
                }

                return {
                    position: this.token() >= 1 ? "right" : "left",
                    forwarded: true,
                    replyButton: true,
                    reply:
                        this.token() >= 1
                            ? {
                                  photoURL:
                                      this.token() >= 1
                                          ? `data:image/png;base64,${this.photo(
                                                150
                                            )}`
                                          : null,
                                  title: "hello",
                                  titleColor: this.getRandomColor(),
                                  message: "hello",
                              }
                            : null,
                    meeting:
                        this.token() >= 1
                            ? {
                                  subject: "hello",
                                  title: "hello",
                                  date: +new Date(),
                                  collapseTitle: "hello",
                                  participants: Array(this.token() + 6)
                                      .fill(1)
                                      .map((x) => ({
                                          id: parseInt(
                                              (Math.random() * 10) % 7
                                          ),
                                          title: "hello",
                                      })),
                                  dataSource: Array(this.token() + 5)
                                      .fill(1)
                                      .map((x) => ({
                                          id: String(Math.random()),
                                          avatar: `data:image/png;base64,${this.photo()}`,
                                          message: "hello",
                                          title: "hello",
                                          avatarFlexible: true,
                                          date: +new Date(),
                                          event: {
                                              title: "hello",
                                              avatars: Array(this.token() + 2)
                                                  .fill(1)
                                                  .map((x) => ({
                                                      src: `data:image/png;base64,${this.photo()}`,
                                                      title: "react, rce",
                                                  })),
                                              avatarsLimit: 5,
                                          },
                                          record: {
                                              avatar: `data:image/png;base64,${this.photo()}`,
                                              title: "hello",
                                              savedBy: "Kaydeden: " + "hello",
                                              time: new Date().toLocaleString(),
                                          },
                                      })),
                              }
                            : null,
                    type: mtype,
                    theme: "white",
                    view: "list",
                    title: "hello",
                    titleColor: this.getRandomColor(),
                    text:
                        mtype === "spotify"
                            ? "spotify:track:0QjjaCaXE45mvhCnV3C0TA"
                            : "hello",
                    data: {
                        videoURL:
                            this.token() >= 1
                                ? "https://www.w3schools.com/html/mov_bbb.mp4"
                                : "http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4",
                        audioURL: "https://www.w3schools.com/html/horse.mp3",
                        uri: `data:image/png;base64,${this.photo(150)}`,
                        status: {
                            click: true,
                            loading: 0.5,
                            download: mtype === "video",
                        },
                        size: "100MB",
                        width: 300,
                        height: 300,
                        latitude: "37.773972",
                        longitude: "-122.431297",
                        staticURL:
                            "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-circle+FF0000(LONGITUDE,LATITUDE)/LONGITUDE,LATITUDE,ZOOM/270x200@2x?access_token=KEY",
                    },
                    onLoad: () => {},
                    status: status,
                    date: +new Date(),
                    onReplyMessageClick: () => {},
                    avatar: `data:image/png;base64,${this.photo()}`,
                };
            case "chat":
                return {
                    id: String(Math.random()),
                    avatar: `data:image/png;base64,${this.photo()}`,
                    avatarFlexible: true,
                    statusColor: "lightgreen",
                    statusColorType:
                        parseInt((Math.random() * 100) % 2) === 1
                            ? "encircle"
                            : undefined,
                    alt: "hello",
                    title: "hello",
                    date: new Date(),
                    subtitle: "hello",
                    unread: parseInt((Math.random() * 10) % 3),
                    dropdownMenu: (
                        <Dropdown
                            animationPosition="norteast"
                            title="Dropdown Title"
                            buttonProps={{
                                type: "transparent",
                                color: "#cecece",
                                icon: {
                                    component: <FaMenu />,
                                    size: 24,
                                },
                            }}
                            items={[
                                {
                                    icon: {
                                        component: <FaSquare />,
                                        float: "left",
                                        color: "red",
                                        size: 22,
                                    },
                                    text: "Menu Item",
                                },
                                {
                                    icon: {
                                        component: <FaSquare />,
                                        float: "left",
                                        color: "purple",
                                        size: 22,
                                    },
                                    text: "Menu Item",
                                },
                                {
                                    icon: {
                                        component: <FaSquare />,
                                        float: "left",
                                        color: "yellow",
                                        size: 22,
                                    },
                                    text: "Menu Item",
                                },
                            ]}
                        />
                    ),
                };
            case "meeting":
                return {
                    id: String(Math.random()),
                    lazyLoadingImage: `data:image/png;base64,${this.photo()}`,
                    avatarFlexible: true,
                    subject: "hello",
                    date: new Date(),
                    avatars: Array(this.token() + 2)
                        .fill(1)
                        .map((x) => ({
                            src: `data:image/png;base64,${this.photo()}`,
                        })),
                    closable: true,
                };
        }
    }

    addMessage(mtype) {
        var list = this.state.messageList;
        list.push(this.random("message", mtype));
        this.setState({
            messageList: list,
        });
    }

    render() {
        var arr = [];
        for (var i = 0; i < 5; i++) arr.push(i);

        var chatSource = arr.map((x) => this.random("chat"));
        var meetingSource = arr.map((x) => this.random("meeting"));

        return (
            <div className="container">
                <div className="chat-list">
                    <SideBar
                        top={
                            <div>
                                <Popup
                                    header="Lorem ipsum dolor sit amet."
                                    headerButtons={[
                                        {
                                            type: "transparent",
                                            color: "black",
                                            onClick: () => {
                                                this.setState({ show: false });
                                            },
                                            icon: {
                                                component: <FaClose />,
                                                size: 18,
                                            },
                                        },
                                    ]}
                                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem animi veniam voluptas eius!"
                                    footerButtons={[
                                        {
                                            color: "white",
                                            backgroundColor: "#ff5e3e",
                                            text: "Vazgeç",
                                        },
                                        {
                                            color: "white",
                                            backgroundColor: "lightgreen",
                                            text: "Tamam",
                                        },
                                    ]}
                                />

                                <Button
                                    type="transparent"
                                    color="black"
                                    text={
                                        this.state.list === "chat"
                                            ? "MeetingList"
                                            : "ChatList"
                                    }
                                    onClick={() => {
                                        this.setState({
                                            list:
                                                this.state.list === "chat"
                                                    ? "meeeting"
                                                    : "chat",
                                        });
                                    }}
                                />
                            </div>
                        }
                        center={
                            this.state.list === "chat" ? (
                                <ChatList dataSource={chatSource} />
                            ) : (
                                <MeetingList dataSource={meetingSource} />
                            )
                        }
                        bottom={
                            <span>
                                <Button
                                    type="transparent"
                                    color="black"
                                    icon={{
                                        component: <FaComments />,
                                        size: 18,
                                    }}
                                />
                                <Button
                                    type="transparent"
                                    color="black"
                                    icon={{
                                        component: <FaSearch />,
                                        size: 18,
                                    }}
                                />
                                <Button text="Count"></Button>
                            </span>
                        }
                    />
                </div>
                <div className="right-panel">
                    <MessageList
                        className="message-list"
                        lockable={true}
                        downButtonBadge={10}
                        dataSource={this.state.messageList}
                    />

                    <Input
                        placeholder="Message."
                        defaultValue=""
                        ref="input"
                        multiline={true}
                        onKeyPress={(e) => {
                            if (e.shiftKey && e.charCode === 13) {
                                return true;
                            }
                            if (e.charCode === 13) {
                                this.refs.input.clear();
                                this.addMessage();
                                e.preventDefault();
                                return false;
                            }
                        }}
                        rightButtons={
                            <Button
                                text="Gönder"
                                onClick={() => this.addMessage()}
                            />
                        }
                    />
                </div>
            </div>
        );
    }
}

export default Temp;
