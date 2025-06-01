import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  PersonOutline,
  AccountCircle,
  ExitToApp
} from "@mui/icons-material";
import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/userSlice";
import Logo from "../assets/IFBC-Logo.png";
// Add this import at the top of your Navbar.jsx file
import { selectCurrentUser, selectIsAuthenticated } from "../redux/userSlice";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const userName = currentUser?.userName || "Guest";
  const userEmail = currentUser?.email || "";
  const profilePicture = currentUser?.profilePicture || "";
  const isAdmin = currentUser?.role === 'admin'; // Example admin check based on role

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleMenuClose();
  };

  const renderAvatar = () => {
    if (profilePicture) {
      return <Avatar src={profilePicture} alt={userName} />;
    } else if (userEmail) {
      return <Avatar sx={{ bgcolor: '#3f51b5' }}>{userEmail.charAt(0).toUpperCase()}</Avatar>;
    }
    return <Avatar sx={{ bgcolor: '#3f51b5' }}><AccountCircle /></Avatar>;
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#082f49', zIndex: 50 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            width: 380, 
            height: 56, 
            display: 'flex', 
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          {/* <img src={Logo} alt="Sarna Trucking Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
           {/* <div 
                    onClick={() => navigate('/')} 
                    className='flex items-center  h-10  mb-2 hover:cursor-pointer'
                  > */}
                   <div className='flex flex-row items-center'><img src={Logo} alt="Sarna Trucking Logo" className='h-8'/> <span className='text-lg font-bold px-3 mt-2'>IFBC Trucking App Demo 2</span></div> 
                  {/* </div> */}
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Button 
            component={Link} 
            to="https://trucking-app-1.onrender.com/" 
            color="inherit"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Home
          </Button>
          
          {isAdmin && (
            <Button 
              component={Link} 
              to="/admin" 
              color="inherit"
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Admin
            </Button>
          )}
          
          <Button 
            component={Link} 
            to="https://trucking-app-1.onrender.com/services" 
            color="inherit"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Services
          </Button>
          
          <Button 
            component={Link} 
            to="https://trucking-app-1.onrender.com/about" 
            color="inherit"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            About Us
          </Button>
          
          <Button 
            component={Link} 
            to="https://trucking-app-1.onrender.com/contact" 
            color="inherit"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Contact Us
          </Button>
        </Box>

        {/* User Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isAuthenticated ? (
            <>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {renderAvatar()}
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
            <Button 
              component={Link} 
              to="/login" 
              color="inherit"
              startIcon={<PersonOutline />}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Login
            </Button>
          )}

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <Box sx={{ 
          display: { xs: 'flex', md: 'none' }, 
          flexDirection: 'column', 
          bgcolor: '#082f49',
          p: 2,
          gap: 1,
          marginTop: "10px",
          textAlign: 'left',
          borderTop: '1px solid white'
        }}>
          <Button 
            component={Link} 
            to="https://trucking-app-1.onrender.com/" 
            color="inherit"
            fullWidth
            onClick={handleDrawerToggle}
            sx={{ justifyContent: 'flex-start' }}
          >
            Home
          </Button>
          
          {isAdmin && (
            <Button 
              component={Link} 
              to="/admin" 
              color="inherit"
              fullWidth
              onClick={handleDrawerToggle}
              sx={{ justifyContent: 'flex-start' }}
            >
              Admin
            </Button>
          )}
          
          <Button 
            component={Link} 
            to="https://trucking-app-1.onrender.com/services" 
            color="inherit"
            fullWidth
            onClick={handleDrawerToggle}
            sx={{ justifyContent: 'flex-start' }}
          >
            Services
          </Button>
          
          <Button 
            component={Link} 
            to="https://trucking-app-1.onrender.com/about" 
            color="inherit"
            fullWidth
            onClick={handleDrawerToggle}
            sx={{ justifyContent: 'flex-start' }}
          >
            About Us
          </Button>
          
          <Button 
            component={Link} 
            to="https://trucking-app-1.onrender.com/contact" 
            color="inherit"
            fullWidth
            onClick={handleDrawerToggle}
            sx={{ justifyContent: 'flex-start' }}
          >
            Contact Us
          </Button>
        </Box>
      )}
    </AppBar>
  );
}

export default Navbar;
























