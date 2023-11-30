import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,

} from "react-router-dom";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CreateAccount from "./Registration/CreateAccount";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import VerifyOtp from "./Registration/VerifyOtp";
import CreateSignup from "./Registration/CreateSignup";
import EnterDetails from "./Registration/EnterDetails";
import Location from "./Registration/Location";

import Spinner from "./GlobalComponents/Spinner";
import { GlobalContextProvider } from "./Context/GlobalContext";
import { SignUpContextProvider } from "./Context/SignupContext";
import Spin from "./GlobalComponents/Spin";
import ErrorSnackbar from "./GlobalComponents/ErrorSnackbar";
import SuccessSnackbar from "./GlobalComponents/SuccessSnackbar";
import ForgetPassword from "./Registration/ForgetPassword";
import Home from "./pages/Home";
import CreatePassword from "./Registration/CreatePassword";
import AddaRide from "./pages/AddaRide";
import AddedRides from "./pages/AddedRides";
import Account from "./pages/Account";

import Header from "./Components/Header";
import AdminHeader from "./admin/AdminHeader";
import VerifyVehicle from "./admin/VerifyVehicle";
import VerifyRides from "./admin/VerifyRides";
import YourRides from "./pages/YourRides";
import axios from "axios";
import { Constants } from "./Constants";
import React from "react";
import AdminLogin from "./admin/AdminLogin";

function App() {

  const theme = createTheme({
    breakpoints: {
      values: {
        xxs: 0,
        xs: 414,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });


  
  return (
    <ThemeProvider theme={theme}>

      <GlobalContextProvider>
        <SignUpContextProvider>
          <Spinner />
          <Spin />
          <ErrorSnackbar />
          <SuccessSnackbar />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router>
              <Routes>
                <Route exact path="/log-in" element={<CreateAccount></CreateAccount>} />
                <Route excat path="/location" element={<Location></Location>} />
                <Route exact path="/sign-up" element={<CreateSignup></CreateSignup>} />
                <Route exact path="/verify-otp" element={<VerifyOtp></VerifyOtp>} />
                <Route exact path="/enter-details" element={<EnterDetails></EnterDetails>} />

                <Route exact path='/forgotpassword' element={<ForgetPassword />} />
                <Route exact path='/newpassword' element={<CreatePassword />} />
                <Route path="/" element={
                  <Header component={<Home />}>

                  </Header>
                } />
                <Route path="/yourrides" element={
                  <Header component={<YourRides />} >
                   
                  </Header>
                } />
                <Route path="/addaride" element={<Header component={<AddaRide />}>

                </Header>} />
                <Route path="/addedrides" element={<Header component={<AddedRides />}>

                </Header>} />
                

                <Route path="/admin" element={
                  <AdminHeader component={<VerifyVehicle />} />

                } />
                <Route path="/admin/verifyvehicle" element={
                  <AdminHeader component={<VerifyVehicle />} />

                } />

                <Route path="/admin/verifyrides" element={
                  <AdminHeader component={<VerifyRides />} />

                } />

            <Route exact path="/adminlogin" element={<AdminLogin/>} />





              </Routes>

            </Router>
          </LocalizationProvider>
        </SignUpContextProvider>
      </GlobalContextProvider>

    </ThemeProvider>
  );
}

export default App;
