
import React, { useState, useEffect,useRef } from "react";
import CheckBox from "../Components/CheckBox";
import "../css/style.css";
import FileUploadCard from "./Users/bamlak/Desktop/react/frontend/src/Pages/user/FileUploadCard.js"; 


import {
  AiOutlineUpload,
  AiOutlineCloudUpload,
  AiOutlineMore,
  AiOutlineLink,
} from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  TextField,
  List,
  Button,
  Icon,
  AvatarGroup,
} from "@mui/material";
import { getDocuments, getInstance } from "../api/apihanlder";
import { Redirect,useNavigate } from "react-router-dom";
function ComponentView() {
  const styles = {
    color: "black",
    position: "absolute",
    backgroundColor: "white",
    width: "36rem",
    height: "20rem",
    boxShadow: "6px 6px 30px grey",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="createLink" style={styles}>
      <AiOutlineCloudUpload
        style={{ height: "150", width: "150" }}
      ></AiOutlineCloudUpload>
    </div>
  );
}


//function createlinkcard
function CreateLinkCard({ isOpen = false, onClose }) {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(true);
  const navigate = useNavigate();
  const documentList = [];
  for (const iterator of docs) {
    documentList.push(<CheckBox>Sql Certificate</CheckBox>);
  }
  const styles = {
    color: "black",
    position: "absolute",
    backgroundColor: "white",
    width: "36rem",
    fontSize: "24px",
    boxShadow: "6px 6px 30px grey",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    padding: "50px 0 10px 20px",
  };
  useEffect(() => {
    getInstance()
      .get("documents/")
      .then((response) => {
      })
      .catch((error) => {
        if (error.response.status === 401)  navigate('/login');
      });
  }, []);
  if (!isLogged) {
   ;
  }
  return isOpen ? (
    <div className="createLink" style={styles}>
      <form action="http://localhost:8000/links/" method="post">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 50px 0 30px",
          }}
        >
          <TextField label="Link Name">Write some thing</TextField>
          <AvatarGroup max={4}>
            <Avatar>N</Avatar>
            <Avatar>N</Avatar>
            <Avatar>N</Avatar>
            <Avatar>N</Avatar>
            <Avatar>N</Avatar>
          </AvatarGroup>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-around",
          }}
        >
          <div style={{ display: "inline-block" }}>
            <label style={{ fontSize: "1.2rem", fontWeigth: "bold" }}>
              Add Documents
            </label>
            {documentList}
            <br />
            <div
              style={{
                overflow: "auto",
                height: "150px",
                padding: "20px",
                display: "inline-block",
              }}
            ></div>
          </div>
          <div style={{ display: "inline-block", margin: "10px 10px 0 20px" }}>
            <TextField inputname="search" label="Add Users" type="search">
              Search users...
            </TextField>
            <br />

            <div
              style={{
                display: "inline-block",
                height: "150px",
                width: "100%",
                overflow: "auto",
                backgroundColor: "cyan",
              }}
            >
              <List>
                <ListItem>Hello</ListItem>
                <ListItem>Hello</ListItem>
                <ListItem>Hello</ListItem>
              </List>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={onClose}>Close</Button>
          <Button>Save</Button>
        </div>
      </form>
    </div>
  ) : null;
}




function DocumentView({
  nurl = [
    "http://localhost:8000/medias/addis_abeba_meskele_square1687976193.jpg",
    "http://localhost:8000/medias/images(3)1687976193.jpg",
  ],
}) {
  const [url, setUrl] = useState(nurl[0]);
  console.log(`uri("${url}")`);
  const styles = {
    color: "black",
    position: "absolute",
    backgroundColor: "white",
    width: "36rem",
    height: "20.25rem",
    boxShadow: "6px 6px 30px grey",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    display: "flex",
    alignItems: "start",
  };
  function handleNext() {
    setUrl(nurl[1]);
  }
  function handlePrev() {
    setUrl(nurl[0]);
  }
  let txt =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  return (
    <div style={styles}>
      <div
        style={{
          height: "20.25rem",
          width: "18rem",
          borderRadius: "20px",
          backgroundImage: `url("${url}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "18rem",
            justifyContent: "space-between",
          }}
        >
          <IoIosArrowBack
            onClick={handlePrev}
            style={{ display: "inline", width: "2rem", height: "2rem" }}
          />
          <IoIosArrowForward
            onClick={handleNext}
            style={{ display: "inline", width: "2rem", height: "2rem" }}
          />
        </div>
      </div>
      <div style={{ width: "18rem" }}>
        <ListItem>
          <Avatar
            src="http://localhost:8000/medias/images(3)1687976193.jpg"
            style={{ margin: "10px" }}
          />
          <ListItemText primary="Stupid" secondary="Nothing" />
          <AiOutlineMore style={{ height: "30", width: "30" }} />
        </ListItem>
        <TextField
          fullWidth
          defaultValue={txt}
          inputProps={{ readOnly: true }}
          style={{ padding: "10px", fontSize: 12, width: "16rem" }}
          multiline
          id="standard-basic"
          label=""
          variant="standard"
        />
        From
        <ListItem>
          <Avatar
            src="http://localhost:8000/medias/images(3)1687976193.jpg"
            style={{ margin: "10px" }}
          />
          <ListItemText
            primary="Stupid"
            secondary="Nothing"
            style={{ fontSize: 12 }}
          />
        </ListItem>
      </div>
    </div>
  );
}


function DocumentHome(props) {
  const [isCreateLinkOpen, setOpen] = useState(false);
  const closeLinkCreate = () => {
    setOpen(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "end",
          backgroundColor: "red",
          width: "100%",
          height: "10%",
          alignItems: "center",
          padding: "0 50px 0 0",
        }}
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create Link <AiOutlineLink />
        </Button>
        
      </div>
      <div style={{ display: "flex", width: "60%", backgroundColor: "blue" }}>
        <CreateLinkCard isOpen={isCreateLinkOpen} onClose={closeLinkCreate} />
        <List>
          <LinkItem />
          <LinkItem />
          <LinkItem />
          <LinkItem />
          <LinkItem />
          <LinkItem />
        </List>
      </div>
    </div>
  );



}

function LinkItem() {
  return <ListItem>Hello</ListItem>;
}





export default CreateLinkCard;
