import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

class Navigation extends React.Component {
    render() {
        const {user, loggedIn} = this.props;

        return (
            <Navbar inverse collapseOnSelect className='navigation'>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Book Shop</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {loggedIn && (
                            <LinkContainer to={'/users/' + user.id}>
                                <NavItem>Account</NavItem>
                            </LinkContainer>
                        )}
                    </Nav>
                    {user && user.role === 'ROLE_ADMIN' && (
                        <Nav>
                            <LinkContainer to="/users-all">
                                <NavItem>List all users</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/books/new">
                                <NavItem>Add new book</NavItem>
                            </LinkContainer>
                        </Nav>)}
                    <Nav pullRight>
                        <LinkContainer to="/basket">
                            <NavItem>Basket</NavItem>
                        </LinkContainer>
                        {loggedIn ? (
                            <LinkContainer to="/logout">
                                <NavItem>Logout</NavItem>
                            </LinkContainer>
                        ) : (
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    const {user, loggedIn} = state.authentication;
    return {
        user,
        loggedIn
    };
}

const connectedNavigation = connect(mapStateToProps)(Navigation);
export {connectedNavigation as Navigation};