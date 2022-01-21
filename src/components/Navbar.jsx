import React from "react";
import axios from "axios";
import { backend } from "../backend";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Button from "@mui/material/Button";
import { Avatar } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { socket } from "./SocketConnection";


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  if(name===undefined)
  {name="None"
  }
  name=`${name}  `
  const first=name.split(' ')[0][0]
  const last=name.split(' ')[1][0]
  var short=""
  if(last===undefined)
  short=first
  else short=first+last
  return {

    sx: {
      bgcolor: stringToColor(name),
    },
    children: short,
  };
}


const Navbar = (props) => {
  
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log(socket.disconnected)
    if(socket.disconnected===false) socket.close()
    // console.log("Logging out");
    await axios
      .get(backend + "/logout", { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        const data = res.data;
        if (data.status) {
          navigate("/login");
        } else {
          alert("Not logged in");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  console.log("navbar", props);
  return (
    <div className="navbar_body">
      <div className="website_name">
        <b>Watch-Party</b>
      </div>
      <div className="nav_bar_details">
        <div className="user_details">
          <Tooltip title={props.username||"Hello"}>
          <Avatar {...stringAvatar(props.username)} />
          </Tooltip>
        </div>
        <div className="about_us">About Us</div>
        <Button
          color="error"
          variant="contained"
          onClick={handleLogout}
          className="logout"
        >
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
