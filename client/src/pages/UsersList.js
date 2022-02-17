import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useContext, useState, useCallback, useEffect} from 'react';
import {useHTTP} from '../hooks/http.hook';
import {AuthContext} from '../context/auth.context';
import {useNavigate} from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';
import BootstrapTable from 'react-bootstrap-table-next';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UsersList(props) {

  const message = useMessage();
  const [users, setUsers] = useState([]);
  const {request} = useHTTP();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

    const [form, setForm] = useState({
        headMsg: '', bodyMsg: ''
    });

  const fetchUsers = useCallback(async() => {
    try {
      const fetched = await request('/api/messages/userslist', 'GET');
      setUsers(fetched);
    } catch (e) {console.log(e.message)}
  }, [request]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  function deleteSelect(row, size) {
    for (let i = size - 1; i >= 0; i--) {
      if (props.selectedUsers[i] === row) props.selectedUsers.splice(i, 1);
    }
  }

  const changeHandler = event => {
    setForm({...form, 
        [event.target.name]: event.target.value,
    });
  };

console.log(auth);

const sendMessage =  async () => {
    if (props.selectedUsers.length > 0) {
        try {
            let toUsers = props.selectedUsers;
            const data = await request('/api/messages/sendmessage', 'POST', {...form, auth, toUsers});
            message(data.message);
            navigate('/message');
        } catch (e) {
            message('Enter head and text.');
        }
    }
    else message('Select recipient.');
}

  const columns = [{
    dataField: 'email',
    text: 'Select recipient',
    }, {
    dataField: 'name',
    text: '',
    }
  ];

  const selectRow = {
    mode: 'checkbox',
    hideSelectColumn: true,
    clickToSelect: true,
    style: { backgroundColor: '#d6d6d6'},
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) props.selectedUsers.push(row);
      if (!isSelect) deleteSelect(row, props.selectedUsers.length);
    },
  };

  return (
    <Container className='table' fluid='true'>
        <Row>
            <Col fluid="true">
                <BootstrapTable 
                    keyField='email'
                    data={users}
                    columns={columns}
                    selectRow={selectRow}
                    bordered={false}     
                />
            </Col>
            <Col>
                <InputGroup className="mb-3">
                    <FormControl
                        name="headMsg"
                        placeholder="message theme"
                        onChange={changeHandler}
                    />
                    <Button variant="success" id="button-addon1" onClick={sendMessage}>Send</Button>
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        rows={5}
                        name="bodyMsg"
                        onChange={changeHandler}
                        placeholder="your message"
                        as="textarea"
                        aria-label="With textarea"
                    />
                </InputGroup>
            </Col>

      </Row>
    </Container>
  )
}

export default UsersList;