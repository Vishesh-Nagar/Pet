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
import { register, registerngo } from "../actions/authAction";

import logo from "../images/logo_fetch.jpeg";

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

export class Register extends Component {
    state = {
        userform: false,
        ngoform: false,
        showform: false,
        username: "",
        password: null,
        email: null,
        confirmpassword: null,
        contact: "",
        hno: "",
        state: "",
        street: "",
        pincode: "",
        city: "",
        files: [],
        license: "",
        flag: 0,
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    userReg = (e) => {
        e.preventDefault();
        const { username, email, password, confirmpassword, files } =
            this.state;
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        var regex = /\d/;
        if (
            username.length == "" ||
            email == "" ||
            password == "" ||
            confirmpassword == "" ||
            files.length == 0
        ) {
            this.setState({ flag: 3 });
            return;
        }
        if (
            password.length < 6 ||
            !format.test(password) ||
            !regex.test(password)
        ) {
            console.log(
                "Password must contain 6 or more characters including a special symbol and a number"
            );
            this.setState({ flag: 1 });
            return;
        }
        if (confirmpassword != password) {
            console.log("passwords do not match");
            this.setState({ flag: 2 });
            return;
        }
        this.props.register({
            name: username,
            email: email,
            password: password,
            confirm: confirmpassword,
            files: files,
        });
    };

    ngoReg = (e) => {
        e.preventDefault();
        const {
            username,
            email,
            password,
            confirmpassword,
            contact,
            files,
            license,
        } = this.state;
        const address = {
            hno: this.state.hno,
            state: this.state.state,
            street: this.state.street,
            pincode: this.state.pincode,
            city: this.state.city,
        };
        let isnum = /^\d+$/;
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        var regex = /\d/;

        if (
            username.length == "" ||
            email == "" ||
            password == "" ||
            confirmpassword == "" ||
            files.length == 0 ||
            license == "" ||
            contact == "" ||
            address.hno == "" ||
            address.state == "" ||
            address.city == "" ||
            address.pincode == "" ||
            address.street == ""
        ) {
            this.setState({ flag: 3 });
            return;
        }
        if (!isnum.test(contact)) {
            this.setState({ flag: 4 });
            return;
        }
        if (!isnum.test(address.pincode)) {
            this.setState({ flag: 5 });
            return;
        }
        if (
            password.length < 6 ||
            !format.test(password) ||
            !regex.test(password)
        ) {
            console.log(
                "Password must contain 6 or more characters including a special symbol and a number"
            );
            this.setState({ flag: 1 });
            return;
        }
        if (confirmpassword != password) {
            console.log("passwords do not match");
            this.setState({ flag: 2 });
            return;
        }
        this.props.registerngo({
            name: username,
            email: email,
            password: password,
            contact: contact,
            address: address,
            files: files,
            license: license,
        });
    };

    onFileChange = (e) => {
        this.state.files.push(e.target.files[0]);
        this.setState({ files: this.state.files });
    };

    render() {
        return (
            <Container
                style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Row>
                    <Col></Col>
                    <Col>
                        <div style={centerStyle}>
                            <img
                                src={logo}
                                style={{ height: 110, marginTop: "2%" }}
                            ></img>
                            <br></br>
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
                                        Register As General User
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
                                        Register As Animal Shelter
                                    </Button>
                                </div>
                            </div>
                        ) : null}
                        {this.state.userForm ? (
                            <div style={divStyle}>
                                {this.state.flag == 1 ? (
                                    <FlashMessage duration={5000}>
                                        <strong style={{ color: "red" }}>
                                            Password must contain 6 or more
                                            characters including a special
                                            symbol and a number
                                        </strong>
                                    </FlashMessage>
                                ) : null}
                                {this.state.flag == 2 ? (
                                    <FlashMessage duration={5000}>
                                        <strong style={{ color: "red" }}>
                                            Passwords do not match
                                        </strong>
                                    </FlashMessage>
                                ) : null}
                                {this.state.flag == 3 ? (
                                    <FlashMessage duration={5000}>
                                        <strong style={{ color: "red" }}>
                                            PPlease fill all fields
                                        </strong>
                                    </FlashMessage>
                                ) : null}
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Label for="username">Username</Label>
                                        <Input
                                            onChange={this.onChange}
                                            style={InputStyle}
                                            type="string"
                                            name="username"
                                            id="username"
                                            placeholder="jonh doe"
                                        />
                                    </FormGroup>
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
                                            placeholder="*********"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            onChange={this.onChange}
                                            style={InputStyle}
                                            type="password"
                                            name="confirmpassword"
                                            id="confirmpassword"
                                            placeholder="*********"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="files">
                                            Profile Picture
                                        </Label>
                                        <Input
                                            style={InputStyle}
                                            onChange={this.onFileChange}
                                            type="file"
                                            accept="image/*"
                                            name="files"
                                            id="files"
                                        />
                                    </FormGroup>
                                    <Row
                                        style={{
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            className="register"
                                            style={btnStyle}
                                            onClick={this.userReg}
                                        >
                                            Register
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                        ) : this.state.ngoForm ? (
                            <div style={divStyle}>
                                {this.state.flag == 1 ? (
                                    <FlashMessage duration={5000}>
                                        <strong style={{ color: "red" }}>
                                            Password must contain 6 or more
                                            characters including a special
                                            symbol and a number
                                        </strong>
                                    </FlashMessage>
                                ) : null}
                                {this.state.flag == 2 ? (
                                    <FlashMessage duration={5000}>
                                        <strong style={{ color: "red" }}>
                                            Passwords do not match
                                        </strong>
                                    </FlashMessage>
                                ) : null}
                                {this.state.flag == 3 ? (
                                    <FlashMessage duration={5000}>
                                        <strong style={{ color: "red" }}>
                                            Please fill all fields
                                        </strong>
                                    </FlashMessage>
                                ) : null}
                                {this.state.flag == 4 ? (
                                    <FlashMessage duration={5000}>
                                        <strong style={{ color: "red" }}>
                                            Contact number not valid
                                        </strong>
                                    </FlashMessage>
                                ) : null}
                                {this.state.flag == 5 ? (
                                    <FlashMessage duration={5000}>
                                        <strong style={{ color: "red" }}>
                                            Pincode not valid
                                        </strong>
                                    </FlashMessage>
                                ) : null}
                                <Form
                                    onSubmit={this.onSubmit}
                                    style={{ width: "800px" }}
                                >
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="username">
                                                    Username
                                                </Label>
                                                <Input
                                                    onChange={this.onChange}
                                                    style={InputStyle}
                                                    type="string"
                                                    name="username"
                                                    id="username"
                                                    placeholder="john doe"
                                                />
                                            </FormGroup>
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
                                                <Row>
                                                    <Col>
                                                        <Label for="password">
                                                            Password
                                                        </Label>
                                                        <Input
                                                            onChange={
                                                                this.onChange
                                                            }
                                                            style={InputStyle}
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                            placeholder="********"
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Label for="confirmpassword">
                                                            Confirm Password
                                                        </Label>
                                                        <Input
                                                            onChange={
                                                                this.onChange
                                                            }
                                                            style={InputStyle}
                                                            type="password"
                                                            name="confirmpassword"
                                                            id="confirmpassword"
                                                            placeholder="********"
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="files">
                                                    Profile Picture
                                                </Label>
                                                <Input
                                                    style={InputStyle}
                                                    onChange={this.onFileChange}
                                                    type="file"
                                                    accept="image/*"
                                                    name="files"
                                                    id="files"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="contact">
                                                    Contact
                                                </Label>
                                                <Input
                                                    onChange={this.onChange}
                                                    style={InputStyle}
                                                    type="string"
                                                    name="contact"
                                                    id="contact"
                                                    placeholder="9988776543"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="">
                                                    Business Address
                                                </Label>
                                                <Row>
                                                    <Col>
                                                        <Label for="hno">
                                                            Building
                                                        </Label>
                                                        <Input
                                                            onChange={
                                                                this.onChange
                                                            }
                                                            style={InputStyle}
                                                            type="string"
                                                            name="hno"
                                                            id="hno"
                                                            placeholder="B-123"
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Label for="hno">
                                                            Street
                                                        </Label>
                                                        <Input
                                                            onChange={
                                                                this.onChange
                                                            }
                                                            style={InputStyle}
                                                            type="string"
                                                            name="street"
                                                            id="street"
                                                            placeholder="8th Street"
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Label for="hno">
                                                            City
                                                        </Label>
                                                        <Input
                                                            onChange={
                                                                this.onChange
                                                            }
                                                            style={InputStyle}
                                                            type="string"
                                                            name="city"
                                                            id="city"
                                                            placeholder="Ukiah"
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Label for="hno">
                                                            State
                                                        </Label>
                                                        <Input
                                                            onChange={
                                                                this.onChange
                                                            }
                                                            style={InputStyle}
                                                            type="string"
                                                            name="state"
                                                            id="state"
                                                            placeholder="California"
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Label for="hno">
                                                            Pincode
                                                        </Label>
                                                        <Input
                                                            onChange={
                                                                this.onChange
                                                            }
                                                            style={InputStyle}
                                                            type="string"
                                                            name="pincode"
                                                            id="pincode"
                                                            placeholder="95482"
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>NGO License No.</Label>
                                                <Input
                                                    onChange={this.onChange}
                                                    style={InputStyle}
                                                    type="string"
                                                    name="license"
                                                    id="license"
                                                    placeholder="114567893"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            className="register"
                                            style={btnStyle}
                                            onClick={this.ngoReg}
                                        >
                                            Register
                                        </Button>
                                    </Row>
                                </Form>
                            </div>
                        ) : null}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    registerngo: PropTypes.func.isRequired,
};

export default connect(null, { register, registerngo })(Register);
