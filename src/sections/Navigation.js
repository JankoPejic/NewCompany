import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from "./../components/listItems";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Badge from '@mui/material/Badge';
import Toolbar from "@mui/material/Toolbar";
import axiosInstance from "../Api/axios";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import AreYouSureModal from "../components/AreYouSureModal";

const Navigation = ({ children }) => {
  const toggleDrawer = () => {
    console.log("test");
    setOpen(!open);
  };
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/logout");
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {}
  };

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
          className="fixed left-0 "
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className="bg-red-500"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>

          <IconButton color="inherit">
            {/* <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge> */}
          </IconButton>
          <label className="cursor-pointer" htmlFor="logout">
            Logout
          </label>
          <IconButton
            id="logout"
            color="white"
            aria-label="add to shopping cart"
            className="!border !border-white !text-white"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        className={`absolute top-0 h-screen w-fit inline-block 	`}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>

      <Box
        className={`transition-all duration-[250] w-full ${
          open ? "pl-[240px]" : "pl-[72px]"
        }`}
      >
        {children}
      </Box>
      <AreYouSureModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        headerText="Are you sure you want to logout?"
        subHeaderText="You will be logged out of the application."
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navigation;

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
