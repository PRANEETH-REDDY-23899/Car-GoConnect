import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Card, IconButton, InputBase, Typography, colors } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { Constants } from '../Constants';
import { io } from 'socket.io-client';
import { GlobalContext } from '../Context/GlobalContext';

var socket, selectedchatcompare;
export default function SingleChat({ userid, loggedinuser, open, setopen, setloggedinuser }) {

    const [createdchat, setCreatedchat] = React.useState({})
    const [message, setmessage] = React.useState("")
    const [Messages, setMessages] = React.useState([])
    const [socketconnected, setsocketconnected] = React.useState(false)
    const scrollRef = React.useRef()
    const { Notifications, setNotifications } = React.useContext(GlobalContext)


    React.useEffect(() => {

        socket = io(Constants.BACKEND_END_POINT)
        socket.emit("setup", {
            _id: loggedinuser
        })
        socket.on("connection", () => setsocketconnected(true))


    }, [])
    React.useEffect(() => {

        if (userid !== "" && loggedinuser !== "") {


            axios.post(Constants.BACKEND_END_POINT + "/accesschat", {
                userid: userid,
                loggedinuser: loggedinuser
            }).then((res) => {
                setCreatedchat(res.data)
                socket.emit("chatjoin", res.data._id)

            })
        }


    }, [open])

    React.useEffect(() => {
        if (Object.keys(createdchat).includes("_id")){
            axios.get(Constants.BACKEND_END_POINT + "/allmessages/" + createdchat._id).then((response) => {
                console.log(response.data)
                setMessages(response.data)

            })
        }
        selectedchatcompare = createdchat
    }, [createdchat])


    React.useEffect(() => {
        setmessage("")
    }, [Messages])


    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [open]);
    const SendMessage = async () => {

        if (message !== "") {
            await axios.post(Constants.BACKEND_END_POINT + "/sendmessage", {
                sender: loggedinuser,
                chat: createdchat._id,
                content: message
            }).then((res) => {
                socket.emit("sendmessage", res.data)
                setMessages([...Messages, res.data])

            })
        }
    }
    const toggleDrawer = (anchor, ope) => (event) => {

        setopen(ope);
    };
    console.log(Notifications, "-----------------")
    React.useEffect(() => {
        socket.on("messagereceived", (newmessage) => {

            if (!selectedchatcompare || selectedchatcompare._id !== newmessage.chat._id) {

                if (!Notifications.includes(newmessage)) {
                    setNotifications([newmessage, ...Notifications])
                }

            } else {
                setMessages([...Messages, newmessage])
            }
        })
    })

    console.log(Messages, "-----Messages------")

    const list = (anchor) => (
        <Box
            sx={{ width: 500, p: 2 }}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box>
                <Box sx={{ borderBottom: "1px solid black", display: "flex", alignItems: "center" }} >
                    <IconButton onClick={() => {
                   
                        setCreatedchat("")
                        setloggedinuser("")
                        setopen(false)
                    }} >
                        <CloseIcon />
                    </IconButton>
                    {createdchat.users && open && <Typography sx={{ ml: 2, fontWeight: "600" }}>{createdchat?.users[0]._id !== loggedinuser ? createdchat?.users[0].fn + " " + createdchat?.users[0].ln : createdchat?.users[1].fn + " " + createdchat?.users[1].ln}</Typography>}
                </Box>
                <Box ref={scrollRef} sx={{ height: "70dvh", backgroundColor: colors.grey[200], mt: 2, borderRadius: 2, p: 2, overflow: "scroll" }}>
                    {Messages.length && Messages.map((m) => {
                        if (m.sender._id === loggedinuser) {
                            return <Box sx={{ justifyContent: "end", display: "flex", m: 1 }} ><Typography sx={{ backgroundColor: "green", p: 1, borderRadius: 2, color: "white" }} >{m.content}</Typography></Box>
                        } else {
                            return <Box sx={{ justifyContent: "start", display: "flex", m: 1 }} ><Typography sx={{ backgroundColor: "green", p: 1, borderRadius: 2, color: "white" }} >{m.content}</Typography></Box>
                        }
                    })}

                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: -0.2 }}>
                    <InputBase value={message} onChange={(e) => {
                        setmessage(e.target.value)
                    }} sx={{ border: "0.5px solid grey", width: "90%", borderRadius: 2, px: 2 }} placeholder='Enter message' ></InputBase>
                    <IconButton sx={{ ml: 1 }} onClick={() => {
                        SendMessage()
                        setmessage("")
                    }} >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <SwipeableDrawer
                    anchor={'right'}
                    open={open}
                    onClose={toggleDrawer('right', false)}
                    onOpen={toggleDrawer('right', true)}
                >

                    {Object.keys(createdchat).length ? list('right') : <></>}
                </SwipeableDrawer>
            </React.Fragment>

        </div>
    );
}
