import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import PropTypes from "prop-types";
import FlashMessage from "react-flash-message";
import { connect } from "react-redux";
import { login, loginngo } from "../actions/authAction";
import { Link } from "react-router-dom";

import logo from "../images/logo_fetch.jpeg";

const fullHeightCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
};

const darkerLinkStyle = {
    color: "#555",
    textDecoration: "none",
    fontWeight: "bold",
};

const InputStyle = {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "white",
    opacity: "80%",
    color: "black",
};

const divStyle = {
    padding: 15,
    marginTop: "1%",
    borderRadius: "20px",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "rgba(255, 255, 255,0.8)",
};

const btnStyle = {
    opacity: "90%",
    borderRadius: "25px",
    height: "40px",
    width: "100px",
    padding: "0px",
};

const centerStyle = {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
};

export class Login extends Component {
    state = {
        userform: false,
        ngoform: false,
        showform: false,
        password: null,
        email: null,
        flag: 0,
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    userLogin = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ flag: 1 });
            return;
        }
        this.props.login({ email, password });
        setTimeout(() => this.setState({ flag: 2 }), 2000);
    };

    ngoLogin = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ flag: 1 });
            return;
        }
        this.props.loginngo({ email, password });
        setTimeout(() => this.setState({ flag: 2 }), 1000);
    };

    render() {
        return (
            <Container fluid style={fullHeightCenter}>
                <Row className="w-100 justify-content-center">
                    <Col xs="12" sm="10" md="6" lg="4">
                        <div style={divStyle}>
                            <div style={centerStyle}>
                                <img
                                    src={logo}
                                    style={{
                                        height: 110,
                                        marginBottom: "10px",
                                    }}
                                />
                            </div>
                            {!this.state.showForm ? (
                                <div>
                                    <div style={centerStyle}>
                                        <Button
                                            onClick={() =>
                                                this.setState({
                                                    showForm: true,
                                                    userForm: true,
                                                })
                                            }
                                            className="register"
                                        >
                                            Login As General User
                                        </Button>
                                    </div>
                                    <div style={centerStyle}>
                                        <Button
                                            onClick={() =>
                                                this.setState({
                                                    showForm: true,
                                                    ngoForm: true,
                                                })
                                            }
                                            className="register"
                                        >
                                            Login As Animal Shelter
                                        </Button>
                                    </div>
                                    <br />
                                    <div style={centerStyle}>
                                        <Link
                                            to="/register"
                                            style={darkerLinkStyle}
                                        >
                                            Don't have an account? Sign up!
                                        </Link>
                                    </div>
                                </div>
                            ) : null}

                            {this.state.userForm && (
                                <Form onSubmit={this.userLogin}>
                                    {this.state.flag === 1 && (
                                        <FlashMessage duration={5000}>
                                            <strong style={{ color: "red" }}>
                                                Please fill all fields
                                            </strong>
                                        </FlashMessage>
                                    )}
                                    {this.state.flag === 2 && (
                                        <FlashMessage duration={5000}>
                                            <strong style={{ color: "red" }}>
                                                Login failed
                                            </strong>
                                        </FlashMessage>
                                    )}
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            onChange={this.onChange}
                                            style={InputStyle}
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="jdoe@gmail.com"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            onChange={this.onChange}
                                            style={InputStyle}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="********"
                                        />
                                    </FormGroup>
                                    <div style={centerStyle}>
                                        <Button
                                            className="register"
                                            style={btnStyle}
                                            type="submit"
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </Form>
                            )}

                            {this.state.ngoForm && (
                                <Form onSubmit={this.ngoLogin}>
                                    {this.state.flag === 1 && (
                                        <FlashMessage duration={5000}>
                                            <strong style={{ color: "red" }}>
                                                Please fill all fields
                                            </strong>
                                        </FlashMessage>
                                    )}
                                    {this.state.flag === 2 && (
                                        <FlashMessage duration={5000}>
                                            <strong style={{ color: "red" }}>
                                                Login failed
                                            </strong>
                                        </FlashMessage>
                                    )}
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            onChange={this.onChange}
                                            style={InputStyle}
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="jdoe@gmail.com"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            onChange={this.onChange}
                                            style={InputStyle}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="********"
                                        />
                                    </FormGroup>
                                    <div style={centerStyle}>
                                        <Button
                                            className="register"
                                            style={btnStyle}
                                            type="submit"
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    loginngo: PropTypes.func.isRequired,
};

export default connect(null, { login, loginngo })(Login);
