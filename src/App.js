import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Modal,
  Spinner,
  Form,
  Alert
} from "react-bootstrap";
import axios from "axios";

export default function App() {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebSite] = useState("");
  const [username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPhone("");
    setWebSite("");
    setUsername("");
    setId("");
    setShowAlert(false);
  };

  const handleClose = () => {
    setShow(false);
    setShowAlert(false);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios("https://jsonplaceholder.typicode.com/users");
      setData(result.data);
    }
    fetchData();
  }, []);

  const handleUpdate = (item) => {
    setShow(true);
    setId(item.id);
    setName(item.name);
    setEmail(item.email);
    setPhone(item.phone);
    setWebSite(item.website);
    setUsername(item.username);
  };

  const saveUpdate = () => {
    let array = [];

    data.forEach((element) => {
      if (element.id === id) {
        element.name = name;
        element.username = username;
        element.website = website;
        element.email = email;
        element.phone = phone;
        array.push(element);
      }
    });
    setData((user) => [...user, array]);
    handleDelete(array);
    setShowAlert(true);
  };

  const handleDelete = (e) => {
    let array = [];
    data.forEach((element) => {
      if (element.id !== e.id) {
        array.push(element);
      }
    });
    setData(array);
  };

  const handleAdd = () => {
    let add = {
      name: name,
      username: username,
      website: website,
      email: email,
      phone: phone
    };
    setData((user) => [...user, add]);
    setShowAlert(true);
  };

  const handleHideAdd = () => {
    clearInputs();
    setShowAlert(false);
    setShowAdd(false);
  };

  return (
    <div>
      {!data ? (
        <div align="center" style={{ padding: "50vh" }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div align="center" style={{ padding: "5vh" }}>
            <Button
              block
              size="lg"
              variant="primary"
              style={{}}
              onClick={() => setShowAdd(!show)}
            >
              Add new user
            </Button>
          </div>
          <Modal show={showAdd} onHide={handleHideAdd}>
            <Modal.Header closeButton>
              <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Alert show={showAlert} variant={"success"}>
                    Added
                  </Alert>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setWebSite(e.target.value)}
                    value={website}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleHideAdd}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAdd}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>

          <br />

          <div align="center">
            <Row>
              {data.map((item) => (
                <div align="center" key={item.id}>
                  <Col>
                    <Card
                      style={{
                        boxShadow: `6px 2px 16px 0px rgba(136, 165, 191, 0.48) , -6px -2px 16px 0px rgba(255, 255, 255, 0.8) `,
                        borderRadius: "20px",
                        margin: "1vh",
                        minWidth: "30vh",
                        minHeight: "20vh"
                      }}
                    >
                      <Card.Body>
                        <Card.Header>
                          <h4 align="center">{item.name}</h4>
                        </Card.Header>
                        <strong>Username: </strong>
                        {item.username}
                        <br />
                        <strong>Email: </strong>
                        {item.email}
                        <br />
                        <strong>Phone: </strong>
                        {item.phone}
                        <br />
                        <strong>Website: </strong>
                        <a href={item.website}>{item.website}</a>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          style={{ marginInline: "1vh" }}
                          onClick={() => handleUpdate(item)}
                          variant="primary"
                        >
                          Modify
                        </Button>
                        <Button
                          style={{ marginInline: "1vh" }}
                          onClick={() => handleDelete(item)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                </div>
              ))}
            </Row>
          </div>

          {name ? (
            <Modal show={show} onHide={() => setShow(!show)}>
              <Modal.Header closeButton>
                <Modal.Title>Editar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Alert show={showAlert} variant={"success"}>
                      Modified
                    </Alert>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setWebSite(e.target.value)}
                      value={website}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={saveUpdate}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          ) : null}
        </>
      )}
    </div>
  );
}
