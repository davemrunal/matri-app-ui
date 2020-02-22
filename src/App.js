import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import './App.css';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from './Routes'

function App(props) {
    return (
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Purna Matrimony</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <Nav pullRight>
                            <LinkContainer to={"/signup"}>
                                <NavItem href="/signup">Signup</NavItem>
                            </LinkContainer>
                            <LinkContainer to={"/login"}>
                                <NavItem href="/login">Login</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes/>
        </div>
    );
}

export default App;
