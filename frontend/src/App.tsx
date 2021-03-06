import React, { useState, useEffect } from "react";
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import "./App.css";
import { useDialog } from "muibox";
import TodosContainer from "./components/TodosContainer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { Session } from "./types";
import { connect } from "react-redux";
import { getSession } from "./actions/index";

type Props = {
    dispatch: Function;
    session: Session;
};

const App: React.FC<Props> = props => {
    const { dispatch, session } = props;

    const dialog = useDialog();
    const [loggedIn, setLoggedIn] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);

    useEffect(() => {
        dispatch(getSession())
            .then(() => {
                setDoneLoading(true);
            })
            .catch((err: string) => {
                dialog.alert("Error, unable to fetch user.\n" + err);
            });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setLoggedIn(session.logged_in);
    }, [session]);

    return doneLoading ? (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Todo List</h1>
                </header>
                {loggedIn ? (
                    <Switch>
                        <Route path="/todos">
                            <TodosContainer />
                        </Route>
                        <Route path="/">
                            <Redirect to="/todos" />
                        </Route>
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                        <Route path="/signup">
                            <SignupForm />
                        </Route>
                        <Route path="/">
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                )}
            </div>
        </Router>
    ) : (
        <></>
    );
};

const mapStateToProps = (state: { session: Session }) => {
    return {
        session: state.session
    };
};

export default connect(mapStateToProps)(App);
