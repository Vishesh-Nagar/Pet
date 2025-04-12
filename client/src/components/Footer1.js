import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../images/logo_fetch.jpeg";
import { Container, Row, Col } from "reactstrap";

export class Footer1 extends Component {
    render() {
        return (
            <div>
                <footer>
                    <Row>
                        <Col>
                            <Row>
                                <a href="#" title="">
                                    <img src={logo} style={{ height: 90 }} />
                                </a>
                            </Row>
                            <Row>
                                <i class="ti-map-alt"></i>
                                <p>33 new montgomery, CA USA 94105.</p>
                            </Row>
                            <Row>
                                <i class="ti-mobile"></i>
                                <p>+1-56-346 345</p>
                            </Row>
                        </Col>
                        <Col>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                        </Col>
                        <Col>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                        </Col>
                        <Col>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                            <Row></Row>
                        </Col>
                    </Row>
                </footer>
            </div>
        );
    }
}

export default connect()(Footer1);

// import SimpleReactFooter from "simple-react-footer";

// import React, { Component } from 'react'

// export class Footer extends Component {
//     render() {
//         const description = "Winkel is here to deliver smiles at your doorsteps. It has an amazing collection of toys ranging from cute stuffed animals to inquisitive games that will ignite the curiosity within your child. Don't let your kid get bored during this lockdown. Bring home a friend for your child. Bring home happiness.";
//         const title = "Winkel"
//         const columns = [
//             {
//                 title: "About",
//                 resources: [
//                     {
//                         name: "Winkel",
//                         link: "/about"
//                     },
//                     {
//                         name: "Developers",
//                         link: "/developers"
//                     },
//                 ]
//             },
//             {
//                 title: "Catalog",
//                 resources: [
//                     {
//                         name: "Wooden",
//                         link: "/woodentoys"
//                     },
//                     {
//                         name: "Stuffed",
//                         link: "/stuffedanimals"
//                     },

//                 ]
//             },
//             {
//                 title: "Delivery",
//                 resources: [
//                     {
//                         name: "Locations",
//                         link: "/delivery"
//                     },
//                 ]
//             }
//         ];
//         return (
//             <div>
//                 <SimpleReactFooter
//                     description={description}
//                     title={title}
//                     columns={columns}
//                     copyright="Rohini & Cheena"
//                     iconColor="white"
//                     backgroundColor="pink"
//                     fontColor="white"
//                     copyrightColor="grey"
//                 />

//             </div>
//             )

//     };
// }

// export default Footer
