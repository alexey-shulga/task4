import React, {useContext} from 'react';
import {AuthContext} from '../context/auth.context';
import {useNavigate} from 'react-router-dom';
import UsersList from './UsersList'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export const NewMessage = () => {

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    navigate('/auth');
  }

  const returnHandler = event => {
    navigate('/messages');
  }

    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>Welcome, {auth.userNAME} | New message </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <ButtonGroup aria-label="Basic example">
                  <Button variant="outline-danger" onClick={returnHandler}>Return</Button>
                  <Button variant="outline-light" onClick={logoutHandler}>Logout</Button>
                </ButtonGroup>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        <UsersList selectedUsers={[]}/>
        </div>
      )
};