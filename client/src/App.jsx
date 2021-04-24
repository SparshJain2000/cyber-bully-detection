import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home.page";
import Post from "./pages/post.page";
import Feed from "./pages/feed.page";
import Navbar from "./components/navbar.component";
import { Component } from "react";

class App extends Component {
    state = { loading: false };
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
                            <Route path='/feed' exact component={Feed} />
                        </Switch>
                    </main>
                )}
            </BrowserRouter>
        );
    }
}

export default App;
