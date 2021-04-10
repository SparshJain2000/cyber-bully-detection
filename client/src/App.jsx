import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home.page";
// import Job from "./pages/job.page";
// import Worker from "./pages/worker.page";
// import AuthEmployer from "./pages/authEmployer.page";
// import AuthWorker from "./pages/authWorker.page";
// import CreateJob from "./pages/createjob.page";
// import Profile from "./pages/profile.page";
import Post from "./pages/post.page";
import Navbar from "./components/navbar.component";
// import Footer from "./components/footer.component";
// import Loading from "./components/loader.component";
import { Component } from "react";
// import AuthContext from "./context/auth.context";

class App extends Component {
    state = { loading: false, token: null, userId: null, isEmployer: false };
    // componentDidMount() {
    //     this.setState({ loading: false });
    //     if (sessionStorage.getItem("user")) {
    //         const user = JSON.parse(sessionStorage.getItem("user"));
    //         console.log(user);
    //         console.log(new Date(user.expiry) > new Date());
    //         if (new Date(user.expiry) < new Date()) {
    //             console.log("EXPIRED !!!");
    //             this.logout();
    //         } else this.setState({ loading: false, ...user });
    //     } else {
    //         const { loading, ...user } = this.state;
    //         sessionStorage.setItem("user", JSON.stringify(user));
    //     }
    // }
    // login = (token, userId, tokenExpiration, isEmployer) => {
    //     this.setState({ token, userId, isEmployer });
    //     sessionStorage.setItem(
    //         "user",
    //         JSON.stringify({
    //             token,
    //             userId,
    //             isEmployer,
    //             expiry: new Date(
    //                 new Date().getTime() + 60000 * 60 * tokenExpiration,
    //             ),
    //         }),
    //     );
    // };
    // logout = () => {
    //     this.setState({ token: null, userId: null, isEmployer: false });
    //     sessionStorage.removeItem("user");
    // };
    render() {
        return (
            <BrowserRouter>
                <Navbar />
                {this.state.loading ? (
                    <>Loading</>
                ) : (
                    <main>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/post' exact component={Post} />
                        </Switch>
                    </main>
                )}
            </BrowserRouter>
        );
    }
}

export default App;
