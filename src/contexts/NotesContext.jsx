import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import { db } from "../firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./Notes.css";
import { useAuth } from "../contexts/AuthContext";

const NotesContext = ({ arr }) => {
  const { currentUser } = useAuth();
  return (
    <List className="todo__list">
                  
      <ListItem>
                        
        <ListItemAvatar />
                        
        <ListItemText primary={arr.item.todo} secondary={arr.item.todo} />
                    
      </ListItem>
      <DeleteForeverIcon
        onClick={() => {
          db.collection(currentUser.email)
            .doc(arr.id)
            .delete();
        }}
      />
              
    </List>
  );
};
export default NotesContext;
