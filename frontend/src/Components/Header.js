import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AddCardIcon from '@mui/icons-material/AddCard';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    Link,
    useNavigate

} from "react-router-dom";
import Home from '../pages/Home';
import YourRides from '../pages/YourRides';
import AddaRide from '../pages/AddaRide';
import AddedRides from '../pages/AddedRides';
import Account from '../pages/Account';
import '../index.css'
import axios from 'axios';
import { Constants } from '../Constants';
import { Avatar, Badge, Button, Dialog, DialogTitle, Fade, ListItemAvatar, Menu, Popper, Tooltip, colors } from '@mui/material';
import { GlobalContext } from '../Context/GlobalContext';
import { makeStyles } from '@material-ui/core';
import SingleChat from '../pages/SingleChat';
const drawerWidth = 240;

function Header(props) {
 
    const useStyles = makeStyles({
        topScrollPaper: {
          alignItems: "flex-start"
        },
        topPaperScrollBody: {
          verticalAlign: "top"
        }
      });
    const token = localStorage.getItem("jwt")
    const [userid, setuserid] = React.useState("")
    const [un,setun]=React.useState("")
    const location = useLocation()

    const { Notifications, setNotifications } = React.useContext(GlobalContext)
    const verifyuser = async () => {

        const { data } = await axios.post(Constants.BACKEND_END_POINT + Constants.BACKEND_MIDDLE_POINT + "/VerifyUser",
            { jwt: token },
            {
                withCredentials: true,
            }
        );
        if (!data.status) {
            localStorage.removeItem("jwt")
            navigate("/log-in");
        } else {
            // axios.get(Constants.BACKEND_END_POINT+"/notifications/"+data.id).then((res)=>{
            //     setNotifications(res.data)
            //     console.log(res.data)
            //     setuserid(data.name)
            // })
            setuserid(data.id)
            setun(data.name)


        }
    }

    React.useEffect(() => {
      
       
        if (token !== null) {
            verifyuser()
        } else {
            if(location.pathname==="/" || location.pathname==="/home"){

            }else{
                navigate("/log-in")
            }

        }
    
    }, [])

    const { component } = props
    
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showchat, setshowchat] = React.useState(false)
    const [openchat, setopenchat] = React.useState(false);
    const [receiverid,setreceiverid]=React.useState("")
    const MenuItems = [
        {
            name: "Book Ride",
            Icon: <DirectionsCarFilledIcon />,
            isactive: true,
            to: "/"
        },
        {
            name: "Your rides",
            Icon: <AirportShuttleIcon />,
            isactive: false,
            to: "/yourrides"
        },
        {
            name: "Add a ride",
            Icon: <AddCardIcon />,
            isactive: false,
            to: "/addaride"
        },
        {
            name: "Added rides",
            Icon: <BookmarkAddedIcon />,
            isactive: false,
            to: "/addedrides"
        },




    ]
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const open = Boolean(anchorEl);
    const drawer = (
        <div>
            <Toolbar>
                <Typography sx={{ alignItems: "center", textAlign: "center", width: "100%", fontWeight: "bold", fontSize: "18px" }}>Car-Go Connect</Typography>

            </Toolbar>
            <Divider />
            <List>
                {MenuItems.map((menuitem, index) => (
                    <ListItem key={menuitem.name} component={Link} to={menuitem.to} sx={{ backgroundColor: menuitem.to === location.pathname ? "#00000099" : "", textDecoration: "none", color: "black" }} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {menuitem.Icon}
                            </ListItemIcon>
                            <ListItemText primary={menuitem.name} />
                        </ListItemButton>
                    </ListItem>


                ))}

                <ListItem disablePadding component={Button}  sx={{ color: "inherit", textTransform: "none", p: 0,display:userid!==""?"block":"none" }} onClick={() => {
                    localStorage.removeItem('jwt')
                    navigate(0)
                }} >
                    <ListItemButton >
                        <ListItemIcon>
                            {<ExitToAppIcon />}
                        </ListItemIcon>
                        <ListItemText primary={"Signout"} />
                    </ListItemButton>
                </ListItem>
            </List>

        </div>
    );
    
                
    
    const classes = useStyles();

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
          
             {userid!==""? <SingleChat open={openchat} setopen={setopenchat} userid={receiverid} loggedinuser={userid} setloggedinuser={setreceiverid} />:<></>}
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    justifyContent: "space-between",
                    display: "flex"
                }}
            >
                <Toolbar sx={{
                    justifyContent: "space-between",
                    display: "flex"
                }}  >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Car-Go Connect
                    </Typography>

                    <Box sx={{}}>
                        <IconButton sx={{ color: "white", mr: 2,display:userid!==""?"":"none" }} onClick={(e) =>setshowchat(true) }>
                            <Badge color="secondary" badgeContent={Notifications.length}>
                                <MailIcon sx={{ fontSize: 30 }} />
                            </Badge>

                        </IconButton>
                        
                        <Dialog 
                        
                        classes={{
                            scrollPaper: classes.topScrollPaper,
                            paperScrollBody: classes.topPaperScrollBody
                          }}
                        onClose={()=>setshowchat(false)}  sx={{alignItems:"flex-start",verticalAlign:"top",justifyContent:"start",mt:"-40%",display:userid!==""?"":"none" }} open={showchat}>
                            <DialogTitle sx={{fontWeight:"600",fontSize:18,p:1}}>New Messages</DialogTitle>
                            <List sx={{ p: 0 }}>
                                {Notifications.map((notify) => (
                                    <ListItem disableGutters key={notify._id} sx={{p:0,mb:0.5}} >
                                        <ListItemButton onClick={()=>{
                                            setreceiverid(notify.sender._id)
                                            setshowchat(false)
                                            setopenchat(true)
                                        }} sx={{p:1,backgroundColor:colors.blue[900],":hover":{
                                            backgroundColor:colors.blue[900]
                                        }}} >
                                            <ListItemText sx={{fontWeight:"600",color:"white"}}  primary={"new message from "+ notify.sender.fn+" "+notify.sender.ln} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                               
                            </List>
                        </Dialog>
                        
                        <Tooltip>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem>
                                <Typography textAlign="center">{un}</Typography>
                            </MenuItem>

                        </Menu>
                    </Box >
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: false, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xxs: "block", xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xxs: 'none', xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {component}
            </Box>
        </Box>
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Header;