import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import FeedPost from "../components/FeedPost";
import { Container } from "reactstrap";
import "react-alice-carousel/lib/alice-carousel.css";
import Select from "react-select";

export class AdoptFeed extends Component {
    state = {
        posts: [],
        files: [],
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
        i: 0,
    };
    componentDidMount = () => {
        axios
            .get(`api/post/available/${this.state.tag}`)
            .then((res) => {
                this.setState({ posts: res.data.items, files: res.data.files });
            })
            .catch((res) => {
                window.location.href = "/login";
            });
    };

    changeAnimal = () => {
        axios.get(`api/post/available/${this.state.tag}`).then((res) => {
            this.setState({ posts: res.data.items, files: res.data.files });
        });
    };
    handleChange = (value) => {
        this.state.selectedOption = value;
        this.state.tag = value.value;
        this.changeAnimal();
    };
    render() {
        return (
            <div
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    marginTop: 90,
                }}
            >
                <div
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}
                >
                    <h1>Adopt Me!!</h1>
                    <br></br>
                    <br></br>
                </div>
                <div
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        color: "coral",
                    }}
                >
                    <h3>We both need the Love &#10084;</h3>
                </div>
                <div
                    style={{
                        marginLeft: "38%",
                        marginBottom: "20px",
                        width: "300px",
                    }}
                >
                    <Select
                        onChange={this.handleChange}
                        value={this.state.selectedOption}
                        options={this.state.options}
                    />
                </div>

                <Container
                    className="myColumn1"
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 90,
                        marginTop: 10,
                        height: "1800px",
                        overflowY: "scroll",
                        overflowX: "auto",
                        position: "",
                    }}
                >
                    {this.state.posts.map((post, i) => {
                        var files = this.state.files.filter((f) =>
                            post.files.includes(f._id)
                        );
                        return (
                            <div>
                                {
                                    <FeedPost
                                        post={post}
                                        files={files}
                                        key={i}
                                        width="700px"
                                        words="650"
                                    />
                                }
                            </div>
                        );
                    })}
                </Container>
            </div>
        );
    }
}
export default connect()(AdoptFeed);
