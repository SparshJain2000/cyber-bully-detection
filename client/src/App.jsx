import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home.page";
import Post from "./pages/post.page";
import Feed from "./pages/feed.page";
import Auth from "./pages/auth.page";
import Navbar from "./components/navbar.component";
import AuthContext from "./context/auth.context";
import { Component } from "react";
import Loader from "./components/loader.component";
class App extends Component {
    state = {
        loading: true,
        token: null,
        user: null,
    };
    componentDidMount() {
        this.setState({ loading: false });
        if (localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user);
            console.log(new Date(user.expiry) > new Date());
            if (new Date(user.expiry) < new Date()) {
                console.log("EXPIRED !!!");
                this.logout();
            } else this.setState({ loading: false, ...user });
        } else {
            const { loading, ...user } = this.state;
            localStorage.setItem("user", JSON.stringify(user));
        }
    }
    login = (token, tokenExpiration, user) => {
        this.setState({ token, user });
        localStorage.setItem(
            "user",
            JSON.stringify({
                token,
                user,
                expiry: new Date(
                    new Date().getTime() + 60000 * 60 * tokenExpiration,
                ),
            }),
        );
    };
    logout = () => {
        this.setState({
            token: null,
            user: null,
        });
        localStorage.removeItem("user");
    };
    render() {
        return (
            <BrowserRouter>
                <AuthContext.Provider
                    value={{
                        token: this.state.token,
                        user: this.state.user,
                        login: this.login,
                        logout: this.logout,
                    }}>
                    <Navbar />
                    {this.state.loading ? (
                        <Loader />
                    ) : (
                        <main className='d-flex flex-column'>
                            <Switch>
                                <Route path='/' exact component={Home} />
                                <Route path='/post' exact component={Post} />
                                <Route path='/feed' exact component={Feed} />
                                <Route
                                    path='/auth/login'
                                    exact
                                    component={Auth}
                                />
                                <Route
                                    path='/auth/signup'
                                    exact
                                    component={Auth}
                                />
                            </Switch>
                        </main>
                    )}
                </AuthContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
