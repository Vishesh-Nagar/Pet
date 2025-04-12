import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import history from "./history";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import Feed from "./components/Feed";
import AdoptFeed from "./pages/AdoptFeed";
import { DonationsPage } from "./pages/DonationsPage";
import { NgosPage } from "./pages/NgosPage";
import Login from "./components/Login";
import Register from "./components/Register";
import { LostPetPage } from "./pages/LostPetPage";
import { FoundPetPage } from "./pages/FoundPetPage";
import ChatPage from "./pages/ChatPage";
import backgroud from "./images/resources/background1.jpg";
import ChatPanel from "./components/ChatPanel";
import background from "./images/resources/chat_background.jpg";
import Profile from "./pages/Profile";
import MyFeed from "./pages/MyFeed";
import { MyDonationsPage } from "./pages/MyDonationsPage";
import { MyLostPetPage } from "./pages/MyLostPets";
import { MyFoundPetPage } from "./pages/MyFoundPets";
import ApplicationPage from "./pages/ApplicationPage";
import AdoptionRequest from "./pages/AdoptionRequestPage";
import AboutPage from "./pages/AboutPage";
import Donations from "./pages/Donations";

function App() {
    return (
        <div className="App" style={{ backgroundColor: "whitesmoke" }}>
            <Router history={history}>
                <Provider store={store}>
                    <Route
                        exact
                        path="/logout"
                        render={() => {
                            window.localStorage.clear();
                            window.location.href = "/login";
                        }}
                    ></Route>
                    <Route
                        exact
                        path="/chats"
                        render={() => (
                            <div
                                style={{
                                    background:
                                        "linear-gradient(45deg, #77c3e7 0%, #f4ca31f7 71%)",
                                }}
                            >
                                <Navbar />
                                <ChatPage />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/profile"
                        render={() => (
                            <div>
                                <Navbar />
                                <Profile
                                    viewer="me"
                                    user_id={
                                        JSON.parse(
                                            window.localStorage.getItem("user")
                                        ).id
                                    }
                                    user_type={window.localStorage.getItem(
                                        "user_type"
                                    )}
                                />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/profile/:user_type/:id"
                        render={(props) => (
                            <div>
                                <Navbar />
                                <Profile
                                    viewer="other"
                                    user_id={props.match.params.id}
                                    user_type={props.match.params.user_type}
                                />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/post/:id"
                        render={(props) => (
                            <div>
                                <Navbar />
                                <MyFeed user_id={props.match.params.id} />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/adoption/:id"
                        render={(props) => (
                            <div>
                                <Navbar />
                                <ApplicationPage
                                    user_id={props.match.params.id}
                                />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/request/:id"
                        render={(props) => (
                            <div>
                                <Navbar />
                                <AdoptionRequest
                                    user_id={props.match.params.id}
                                />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/transaction/:id"
                        render={(props) => (
                            <div>
                                <Navbar />
                                <Donations donationID={props.match.params.id} />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/login"
                        render={() => (
                            <div
                                style={{
                                    backgroundImage: `url(${backgroud})`,
                                    backgroundSize: "cover",
                                    overflow: "hidden",
                                    height: window.innerHeight,
                                }}
                            >
                                <Login />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/register"
                        render={() => (
                            <div
                                style={{
                                    backgroundImage: `url(${backgroud})`,
                                    backgroundSize: "cover",
                                    minHeight: window.innerHeight,
                                }}
                            >
                                <Register />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/"
                        render={(props) =>
                            window.localStorage.getItem("user") ? (
                                <div>
                                    <Navbar />
                                    <Feed />
                                    <Footer />
                                </div>
                            ) : (
                                (window.location.href = "/login")
                            )
                        }
                    ></Route>

                    <Route
                        exact
                        path="/adopt"
                        render={(props) =>
                            window.localStorage.getItem("user") ? (
                                <div>
                                    <Navbar />
                                    <AdoptFeed />
                                    <Footer />
                                </div>
                            ) : (
                                (window.location.href = "/login")
                            )
                        }
                    ></Route>
                    <Route
                        exact
                        path="/donations"
                        render={() => (
                            <div>
                                <Navbar />
                                <DonationsPage />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/ngos"
                        render={() => (
                            <div>
                                <Navbar />
                                <NgosPage />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/about"
                        render={() => (
                            <div>
                                <Navbar />
                                <AboutPage />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/lostpet"
                        render={() => (
                            <div>
                                <Navbar />
                                <LostPetPage />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/foundpet"
                        render={() => (
                            <div>
                                <Navbar />
                                <FoundPetPage />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/chat/:id"
                        render={(props) => (
                            <div
                                style={{
                                    padding: "100px",
                                    marginTop: "20px",
                                    backgroundImage: `url(${background})`,
                                }}
                            >
                                <Navbar />
                                <ChatPanel user1={props.match.params.id} />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/donations/:id"
                        render={(props) => (
                            <div>
                                <Navbar />
                                <MyDonationsPage
                                    user_id={props.match.params.id}
                                />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/lostpets/:id"
                        render={(props) => (
                            <div>
                                <Navbar />
                                <MyLostPetPage
                                    user_id={props.match.params.id}
                                />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/foundpets/:id"
                        render={(props) => (
                            <div>
                                <Navbar />
                                <MyFoundPetPage
                                    user_id={props.match.params.id}
                                />
                                <Footer />
                            </div>
                        )}
                    ></Route>
                </Provider>
            </Router>
        </div>
    );
}

export default App;
