import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Alert, Navbar, Nav, Container } from "react-bootstrap";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import NotesContext from "../contexts/NotesContext";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import "../contexts/Notes.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Notes() {
  const [error, setError] = useState(null);
  const { currentUser, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    db.collection(currentUser.email)                    //try to input currentUser for collection("todos") => collection(currentUser)
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setTodos(
          snapshot.docs.map(doc => ({
            id: doc.id,
            item: doc.data()
          }))
        );
      });
  }, [input]);
  
  console.log(currentUser.email);

  const addTodo = e => {
    e.preventDefault();
    db.collection(currentUser.email).add({ //changed from "todos" to currentUser
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
  };

  console.log(todos);
  
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        expand="lg"
        collapseOnSelect
        className="ml-auto px-3"
        
      >
        <Navbar.Brand>Comp484</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#">My Events</Nav.Link>
            <Nav.Link href="#">My Calendar</Nav.Link>
            <Nav.Link href="#">Reminders</Nav.Link>
            <Nav.Link href="/notes">Notes</Nav.Link>
            <button
              variant="link"
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <div className="notes">
        <h1>Notes React-Firebase</h1>
        <form>
                      
          <FormControl>
                           <InputLabel>Write a TODO</InputLabel>
                           
            <Input value={input} onChange={e => setInput(e.target.value)} />
                          
          </FormControl>
                        
          <Button
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
            disabled={!input}
          >
            Add Todo
          </Button>
                  
        </form>
                
        <ul>
                      
          {todos.map(it => (
            <NotesContext key={it.id} arr={it} />
          ))}
                  
        </ul>
      </div>
    </>
  );
}

export default Notes;
