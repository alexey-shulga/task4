import React, {useContext, useState, useEffect, useCallback} from 'react';
import {AuthContext} from '../context/auth.context';
import {useNavigate} from 'react-router-dom';
import {useHTTP} from '../hooks/http.hook';
import BootstrapTable from 'react-bootstrap-table-next';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

export const UserPage = () => {

  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  const {userID} = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const {request} = useHTTP();

  const fetchMessages = useCallback(async() => {
    try {
      const fetched = await request('/api/messages/loadmessages', 'GET', null, {
        Authorization: `${userID}`
      });
      setMessages(fetched);
    } catch (e) {console.log(e.message)}
  }, [userID, request]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    navigate('/auth');
  }

  const newMessageHandler = event => {
    navigate('/newmessage');
  }

  const sendMessagesHandler = event => {
    navigate('/sendmessages');
  }

  const columns = [{
    dataField: 'fromName',
    text: 'FROM:'
  },{
    dataField: 'fromEmail',
    text: ''
  },{
    dataField: 'headMsg',
    text: 'TOPIC:'
  }, {
    dataField: 'date',
    text: 'DATE:'
  }];

  const expandRow = {
    onlyOneExpanding: true,
    renderer: row => (
      <div>
        <p>{ messages.map(value => {
          if (value._id === row._id) return (<Form.Control as="textarea" rows={5} readOnly>{value.bodyMsg}</Form.Control>)
          return (<p></p>)
        }) }</p>
      </div>
    )
  };

    return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>Welcome, {auth.userNAME}</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <ButtonGroup aria-label="Basic example">
                  <Button variant="outline-warning" onClick={newMessageHandler}>New message</Button>
                  <Button variant="outline-light" onClick={logoutHandler}>Logout</Button>
                </ButtonGroup>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className='buttons'>
            <ButtonGroup aria-label="Basic example">
              <Button variant="success">Incoming messages</Button>
              <Button variant="outline-secondary" onClick={sendMessagesHandler}>Sent messages</Button>
            </ButtonGroup>
          </div>

          <div className='table'>
            <BootstrapTable
              keyField='_id'
              data={messages}
              columns={columns}
              expandRow={expandRow}
              bordered={false}
              noDataIndication="No messages" 
              striped
            />
          </div>

        </div>
      )
};