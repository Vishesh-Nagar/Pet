import axios from "axios";
import React, { Component } from "react";
import {
    Button,
    Row,
    Col,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
} from "reactstrap";
import { connect } from "react-redux";
import "react-alice-carousel/lib/alice-carousel.css";
import FoundPet from "../components/FoundPet";
import { Link } from "react-router-dom";
import Select from "react-select";
const Geo = require("geo-nearby");
var ipapi = require("ipapi.co");

const mainStyle = {
    position: "relative",
    marginTop: "40px",
    padding: "3rem",
};

const divStyle = {
    width: 250,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    marginTop: "3.5rem",
    marginLeft: "3.5rem",
    padding: "10px",
    textAlign: "center",
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
};

const buttonStyle = {
    border: "None",
    borderRadius: "20px",
    background: "white",
    color: "black",
    float: "right",
};
const dpStyle = {
    width: 50,
    height: 50,

    borderRadius: 25,
    overflow: "hidden",
    alignSelf: "flex-start",
};

const spanStyle = {
    float: "right",
    marginTop: "-1.5rem",
};

class DisplayFoundPet extends Component {
    state = {
        chatPanel: false,
    };
    toggle = () => {
        this.setState({ chatPanel: !this.state.chatPanel });
    };
    onClick = (e) => {
        this.setState({ chatPanel: !this.state.chatPanel });
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
                    <div style={{ marginLeft: "5px", marginTop: "15px" }}>
                        <a
                            className="linkhover"
                            href={`/profile/${this.props.lostpet.user_type}/${this.props.lostpet.user_id}`}
                        >
                            <h6>{this.props.lostpet.user_name}</h6>
                        </a>
                    </div>
                </div>
                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
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
                <CardTitle tag="h5">{this.props.lostpet.breed}</CardTitle>
                <CardSubtitle>
                    Location:{" "}
                    {`${this.props.lostpet.location.city}, ${this.props.lostpet.location.region}`}
                    <br></br>
                    Found On: {this.props.lostpet.lastseen}
                </CardSubtitle>
                <CardBody
                    className="myColumn1"
                    style={{
                        height: "100px",
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    <CardText style={{ color: "#1A5C6D", lineHeight: "18px" }}>
                        {this.props.lostpet.description}
                    </CardText>
                </CardBody>
                <Link to={`/chat/${this.props.lostpet.user_id}`}>
                    <Button className="foundBtn" onClick={this.onClick}>
                        Connect
                    </Button>
                </Link>
            </div>
        );
    }
}

export class FoundPetPage extends Component {
    state = {
        location: {},
        radius: 100000,
        dummy: false,
        LostPetsInitial: [],
        files: [],
        LostPets: [],
        options: [
            { value: "", label: "Select Radius" },
            { value: "5", label: "Within 5 km radius" },
            { value: "10", label: "Within 10 km radius" },
            { value: "50", label: "Within 50 km radius" },
            { value: "100", label: "Within 100 km radius" },
            { value: "500", label: "Within 500 km radius" },
            { value: "1000", label: "Within 1000 km radius" },
            { value: "0", label: "More than 1000 km radius" },
        ],
        selectedOption: { value: "", label: "Select Radius" },
        selectedValue: "",
    };

    componentDidMount() {
        ipapi.location((loc) => {
            this.setState({ location: loc });
        });
        axios.get("api/lostpet/found").then((res) => {
            this.setState({
                LostPetsInitial: res.data.items,
                files: res.data.files,
            });
        });
    }

    implementChange = () => {
        var y = parseInt(this.state.selectedValue) * 1000;
        if (y == 0) {
            this.setState({ LostPets: this.state.LostPetsInitial });
            return;
        }
        if (this.state.LostPetsInitial.length == 0) return;
        const data = [];
        var i = 0;
        while (i < this.state.LostPetsInitial.length) {
            data.push([
                this.state.LostPetsInitial[i].location.latitude,
                this.state.LostPetsInitial[i].location.longitude,
                this.state.LostPetsInitial[i]._id,
            ]);
            i++;
        }
        const dataSet = Geo.createCompactSet(data);
        const geo = new Geo(dataSet, { sorted: true });
        var p = geo.nearBy(
            this.state.location.latitude,
            this.state.location.longitude,
            y
        );

        var temp = [];
        var ind = 0;
        while (ind < p.length) {
            temp.push(
                this.state.LostPetsInitial.find((x) => x._id == p[ind].i)
            );
            ind++;
        }

        this.setState({ LostPets: temp });
    };

    handleChange = (value) => {
        this.state.selectedOption = value;
        this.state.selectedValue = value.value;
        this.implementChange();
    };

    render() {
        return (
            <div className="container" style={mainStyle}>
                <div style={containerStyle}>
                    <Row>
                        <Col>
                            <i
                                class="fa fa-file-text-o fa-lg"
                                aria-hidden="true"
                                style={{ float: "left", marginTop: 4 }}
                            ></i>
                            <h5 style={{ fontFamily: "muli" }}>
                                {" "}
                                &nbsp; &nbsp;Found Pets Near Your Location
                            </h5>
                        </Col>
                        <Col>
                            <div style={{ width: "250px" }}>
                                <Select
                                    style={{ marginLeft: -60 }}
                                    onChange={this.handleChange}
                                    value={this.state.selectedOption}
                                    options={this.state.options}
                                />
                            </div>
                        </Col>
                    </Row>
                    <div
                        style={{
                            display: "flex",
                            float: "right",
                            marginTop: "-80px",
                        }}
                    >
                        <FoundPet location={this.state.location} />
                    </div>
                    <span style={spanStyle}></span>
                    <hr />

                    <Row>
                        {this.state.LostPets.map((lostpet, i) => {
                            var files = this.state.files.filter((f) =>
                                lostpet.files.includes(f._id)
                            );
                            return (
                                <div>
                                    {
                                        <DisplayFoundPet
                                            lostpet={lostpet}
                                            files={files}
                                            key={i}
                                        />
                                    }
                                </div>
                            );
                        })}
                    </Row>
                </div>
            </div>
        );
    }
}

export default connect()(FoundPetPage);
