import React, { useEffect } from 'react';
import './App.css';
import { Link, withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Routes from './Routes'
import { Auth } from 'aws-amplify';
import { AppContext } from './libs/contextLib';
import { useStateWithLabel } from './libs/stateWithLabel';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function App(props) {
    const [isAuthenticated, userHasAuthenticated] = useStateWithLabel(false, 'isAuthenticated');
    const [isAuthenticating, setIsAuthenticating] = useStateWithLabel(true, 'isAuthenticating');
    const [emailId, setEmailId] = useStateWithLabel('', 'emailId');

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            const currentUserInfo = await Auth.currentUserInfo();
            setEmailId(currentUserInfo.attributes.email);
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
            <Navbar expand="lg">
                <Container>
                <Navbar.Brand as={Link} to="/">
                    {/*<img*/}
                    {/*    alt=""*/}
                    {/*    src="./images/logo.png"*/}
                    {/*    width="30"*/}
                    {/*    height="30"*/}
                    {/*    className="d-inline-block align-top"*/}
                    {/*/>{' '}*/}
                    <em>Prime Matrimony</em></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuthenticated
                            ? <Nav.Item onClick={handleLogout}><span className="text-white">Logout</span></Nav.Item>
                            : <>
                                <Nav.Link as={Link} to="/about">
                                    About Us
                                </Nav.Link>
                                <Nav.Link as={Link} to="/pricing">
                                    Pricing
                                </Nav.Link> <Nav.Link as={Link} to="/signup">
                                Register
                            </Nav.Link>
                                {/*<Nav.Link as={Link} to="/login">*/}
                                {/*    Login*/}
                                {/*</Nav.Link>*/}
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <AppContext.Provider value={{isAuthenticated, userHasAuthenticated, emailId, setEmailId}}>
                <Routes/>
            </AppContext.Provider>
        </div>
    );
}

export default withRouter(App);
