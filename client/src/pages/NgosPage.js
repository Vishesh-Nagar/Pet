import axios from "axios";
import React, { Component } from "react";
import {
    Button,
    Row,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
} from "reactstrap";
import { connect } from "react-redux";
import white from "../images/white.png";

const mainStyle = {
    position: "relative",
    marginTop: "4rem",
    padding: "3rem",
};

const JumbotronStyle = {
    background: "F5F5F5",
    marginTop: "3.5rem",
    marginLeft: "5rem",
    width: "12rem",
    borderRadius: "20px",
    padding: "10px",
    textAlign: "center",
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

const spanStyle = {
    float: "right",
    marginTop: "-1.5rem",
};

class DisplayDonation extends Component {
    render() {
        return (
            // <div>
            <div style={divStyle}>
                <CardImg top width="50" src={white} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h6">Card title</CardTitle>
                    <CardSubtitle className="mb-2 text-muted">
                        Card subtitle
                    </CardSubtitle>
                    <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </CardText>
                    <Button>Button</Button>
                </CardBody>
            </div>
        );
    }
}

export class NgosPage extends Component {
    state = {
        Ngos: [],
    };

    componentDidMount() {
        axios.get("api/ngo").then((res) => {
            this.setState({ Ngos: res.data });
        });
    }

    render() {
        return (
            <div className="container" style={mainStyle}>
                <div style={containerStyle}>
                    <i
                        class="fa fa-file-text-o fa-lg"
                        aria-hidden="true"
                        style={{ float: "left", marginTop: 4 }}
                    ></i>
                    <h5 style={{ fontFamily: "muli" }}>
                        {" "}
                        &nbsp; &nbsp;Registered NGOs
                    </h5>
                    <span style={spanStyle}></span>
                    <hr />
                    <Row>
                        {this.state.Ngos.map((ngo, i) => {
                            return (
                                <div>
                                    {<DisplayDonation ngo={ngo} key={i} />}
                                </div>
                            );
                        })}
                    </Row>
                </div>
            </div>
        );
    }
}

export default connect()(NgosPage);
