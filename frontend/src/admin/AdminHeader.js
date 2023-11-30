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
const drawerWidth = 240;

function AdminHeader(props) {
    const {component}=props 
    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(()=>{
        if(localStorage.getItem('admin')){
              
        }else{
            navigate("/adminlogin")
        }
    })

    const [active,isactive] = React.useState("/")

    const Menu = [
        {
            name: "verify vehicle",
            Icon: <DirectionsCarFilledIcon />,
            isactive: true,
            to: "/admin/verifyvehicle"
        },
        {
            name: "verify Rides",
            Icon: <DirectionsCarFilledIcon />,
            isactive: false,
            to: "/admin/verifyrides"
        }
        
    ]
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography sx={{alignItems:"center",textAlign:"center",width:"100%",fontWeight:"bold",fontSize:"18px"}}>HELLO ADMIN</Typography>
            </Toolbar>
            <Divider />
            <List>
                {Menu.map((menuitem, index) => (

                    <ListItem key={menuitem.name} component={Link} to={menuitem.to} sx={{backgroundColor:menuitem.to===location.pathname?"#00000099":"",textDecoration:"none",color:"black"}} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {menuitem.Icon}
                            </ListItemIcon>
                            <ListItemText primary={menuitem.name} />
                        </ListItemButton>
                    </ListItem>


                ))}

                
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
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
                        display: { xxs:"block",xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xxs:'none', xs: 'none', sm: 'block' },
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

AdminHeader.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default AdminHeader;