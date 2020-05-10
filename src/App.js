import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Routes from './Routes'
import { Auth } from 'aws-amplify';
import { AppContext } from './libs/contextLib';
import { useStateWithLabel } from './libs/stateWithLabel';

function App(props) {
    const [isAuthenticated, userHasAuthenticated] = useStateWithLabel(false, 'isAuthenticated');
    const [isAuthenticating, setIsAuthenticating] = useStateWithLabel(true, 'isAuthenticating');

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        } catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
    }

    async function handleLogout() {
        await Auth.signOut();
        userHasAuthenticated(false);
        props.history.push('/login');
    }

    return (
        !isAuthenticating &&
        <div className="App">
            <Navbar id="nbar" inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Matrimony</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <Nav pullRight>
                            {isAuthenticated
                                ? <NavItem onClick={handleLogout}>Logout</NavItem>
                                : <>
                                    <LinkContainer to="/signup">
                                        <NavItem>Signup</NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <NavItem>Login</NavItem>
                                    </LinkContainer>
                                </>
                            }
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
                <Routes/>
            </AppContext.Provider>
        </div>
    );
}

export default withRouter(App);
