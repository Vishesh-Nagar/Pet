import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/main.min.css";
import "../css/style.css";
import "../css/color.css";
import "../css/responsive.css";
import logo from "../images/logo_fetch.jpeg";

export class Footer extends Component {
    render() {
        return (
            <footer>
                <div class="container">
                    <div class="row">
                        <div
                            class="col-lg-4 col-md-4"
                            style={{ marginLeft: 70 }}
                        >
                            <div class="widget">
                                <div class="foot-logo">
                                    <div class="logo">
                                        <a href="" title="">
                                            <img
                                                src={logo}
                                                style={{ height: 90 }}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-4">
                            <div class="widget">
                                <div class="widget-title">
                                    <h4>Navigate</h4>
                                </div>
                                <ul class="list-style">
                                    <li>
                                        <a href="/donations" title="">
                                            Donate
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/lostpet" title="">
                                            Lost Pets
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/foundpet" title="">
                                            Found Pets
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-4">
                            <div class="widget">
                                <div class="widget-title">
                                    <h4>useful links</h4>
                                </div>
                                <ul class="list-style">
                                    <li>
                                        <a href="/about" title="">
                                            About Fetch
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default connect()(Footer);
