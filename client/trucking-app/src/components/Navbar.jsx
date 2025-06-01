

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  PersonOutline,
  AccountCircle,
  ExitToApp
} from "@mui/icons-material";
import { 
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/userSlice";
import Logo from '/images/IFBC-Logo.png';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentUser = useSelector(state => state.user?.currentUser);
  const user = currentUser?.user;
  const userName = user?.userName || "Guest";
  const userEmail = user?.email || "";
  const profilePicture = user?.profilePicture || "";
  const isAdmin = currentUser?.user?.role === "admin";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleMenuClose();
  };

  const renderAvatar = () => {
    if (profilePicture) {
      return <Avatar src={profilePicture} className="w-8 h-8" />;
    } else if (userEmail) {
      return <Avatar className="w-8 h-8">{userEmail.charAt(0).toUpperCase()}</Avatar>;
    }
    return <AccountCircle className="w-8 h-8" />;
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-sky-950 border-b-1 text-white flex items-center justify-between py-4 px-8 text-sm">
        <div 
          onClick={() => navigate('/')} 
          className='flex items-center  h-10  mb-2 hover:cursor-pointer'
        >
         <div className='flex flex-row items-center '><img src={Logo} alt="Sarna Trucking Logo" className='h-8'/> <span className='text-lg font-bold px-3 mt-2'>IFBC Trucking App Demo 2</span></div> 
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className='font-semibold text-lg'>Home</Link>
            </li>
            <li>
              <Link to="/services" className='font-semibold text-lg'>Services</Link>
            </li>
            <li>
              <Link to="/about" className='font-semibold text-lg'>About Us</Link>
            </li>
            <li>
              <Link to="/contact" className='font-semibold text-lg'>Contact Us</Link>
            </li>
            {/* <li>
              <Link to="/message" className='font-semibold text-lg'>Message</Link>
            </li> */}
            <li>
              <Link to="/driver-form" className='font-semibold text-lg'>Driver Application</Link>
            </li>
            {/* {isAdmin && (
              <li>
                <Link to="https://trucking-app-admin.onrender.com" className='font-semibold text-lg'>Admin</Link>
              </li>
            )} */}
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleProfileMenuOpen}
              >
                {renderAvatar()}
                <span className="hidden md:block text-sm"></span>
              </div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className="mt-2"
              >
                <MenuItem>
                  <ListItemIcon>
                    {renderAvatar()}
                  </ListItemIcon>
                  <ListItemText primary={userName} secondary={userEmail} />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-1 font-semibold text-lg"
            >
              {/* <PersonOutline /> */}
              {/* <span>Login</span> */}
            </Link>
          )}

          
          <div className="md:hidden">
            {toggle ? (
              <CloseIcon 
                onClick={() => setToggle(false)} 
                className="cursor-pointer" 
              />
            ) : (
              <MenuIcon 
                onClick={() => setToggle(true)} 
                className="cursor-pointer" 
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {toggle && (
        <nav className="md:hidden bg-sky-950 text-white p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/" onClick={() => setToggle(false)}>Home</Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setToggle(false)}>Services</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setToggle(false)}>About Us</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setToggle(false)}>Contact Us</Link>
            </li>
            {/* <li>
              <Link to="/message" onClick={() => setToggle(false)}>Message</Link>
            </li> */}
            <li>
              <Link to="/driver-form" onClick={() => setToggle(false)}>Driver Application</Link>
            </li>
            {/* {isAdmin && (
              <li>
                <Link 
                  to="https://trucking-app-admin.onrender.com" 
                  onClick={() => setToggle(false)}
                >
                  Admin
                </Link>
              </li>
            )} */}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Navbar;





