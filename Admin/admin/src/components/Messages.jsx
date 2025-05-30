

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Box,
  Chip,
  Checkbox,
  TablePagination,
  Toolbar,
  Tooltip
} from "@mui/material";
import { Visibility, Delete, Search, Person, Delete as BulkDelete } from "@mui/icons-material";

const MessagesTable = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDetail, setOpenDetail] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const api_url = import.meta.env.VITE_api_url;
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = useSelector((state) => state.user?.currentUser);
  const token = currentUser?.accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [messagesRes, usersRes] = await Promise.all([
          axios.get(`${api_url}/api/message/messages`, config),
          axios.get(`${api_url}/api/user/users`, config)
        ]);
        setMessages(messagesRes.data);
        setUsers(usersRes.data);
        
        if (id) {
          const singleMessageRes = await axios.get(`${api_url}/api/message/${id}`, config);
          setSelectedMessage(singleMessageRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [api_url, id]);

  const getUserDetails = (userId) => {
    const user = users.find(user => user._id === userId);
    return {
      username: user?.userName || 'Unknown',
      avatar: user?.profilePicture,
      email: user?.email
    };
  };

  const filteredMessages = messages.filter(message => {
    const userDetails = getUserDetails(message.driverID?._id);
    const searchLower = searchTerm.toLowerCase();
    const messageDate = new Date(message.createdAt).toLocaleString().toLowerCase();
    
    return (
      message.subject.toLowerCase().includes(searchLower) ||
      userDetails.username.toLowerCase().includes(searchLower) ||
      messageDate.includes(searchLower)
    );
  });

  const getAvatar = (user) => {
    if (user?.profilePicture) {
      return <Avatar src={user.profilePicture} />;
    }
    return (
      <Avatar>
        {user?.userName?.charAt(0).toUpperCase() || <Person />}
      </Avatar>
    );
  };

  const getImageSrc = (base64Data) => {
    if (!base64Data) return null;
    if (base64Data.startsWith('data:image')) {
      return base64Data;
    }
    return `data:image/jpeg;base64,${base64Data}`;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${api_url}/api/message/${selectedMessage._id}`, config);
      setMessages(messages.filter(msg => msg._id !== selectedMessage._id));
      setOpenDeleteDialog(false);
      if (id) navigate('/messages');
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedMessages.map(id => 
          axios.delete(`${api_url}/api/message/${id}`, config)
        )
      );
      setMessages(messages.filter(msg => !selectedMessages.includes(msg._id)));
      setSelectedMessages([]);
      setOpenBulkDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredMessages
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((message) => message._id);
      setSelectedMessages(newSelected);
      return;
    }
    setSelectedMessages([]);
  };

  const handleSelectMessage = (id) => {
    const selectedIndex = selectedMessages.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedMessages, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedMessages.slice(1));
    } else if (selectedIndex === selectedMessages.length - 1) {
      newSelected = newSelected.concat(selectedMessages.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedMessages.slice(0, selectedIndex),
        selectedMessages.slice(selectedIndex + 1),
      );
    }

    setSelectedMessages(newSelected);
  };

  const isSelected = (id) => selectedMessages.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openMessageDetail = (message) => {
    setSelectedMessage(message);
    setOpenDetail(true);
  };

  return (
    <Box sx={{ padding: 3, width: "98%" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Messages
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by username, title, or date..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : filteredMessages.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ p: 3 }}>
          {searchTerm ? 'No messages match your search' : 'No messages available'}
        </Typography>
      ) : (
        <>
          <Paper sx={{ width: '100%', mb: 2 }}>
            {selectedMessages.length > 0 && (
              <Toolbar sx={{ bgcolor: 'action.selected' }}>
                <Typography variant="subtitle1" sx={{ flex: '1 1 100%' }}>
                  {selectedMessages.length} selected
                </Typography>
                <Tooltip title="Delete">
                  <IconButton 
                    onClick={() => setOpenBulkDeleteDialog(true)}
                    color="error"
                  >
                    <BulkDelete />
                  </IconButton>
                </Tooltip>
              </Toolbar>
            )}
            
            <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
              <Table stickyHeader aria-label="messages table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selectedMessages.length > 0 &&
                          selectedMessages.length < Math.min(rowsPerPage, filteredMessages.length - page * rowsPerPage)
                        }
                        checked={
                          filteredMessages.length > 0 &&
                          selectedMessages.length === Math.min(rowsPerPage, filteredMessages.length - page * rowsPerPage)
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMessages
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((message) => {
                      const isItemSelected = isSelected(message._id);
                      const user = users.find(u => u._id === message.driverID?._id);
                      return (
                        <TableRow 
                          key={message._id} 
                          hover
                          role="checkbox"
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={() => handleSelectMessage(message._id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              {user ? getAvatar(user) : <Avatar><Person /></Avatar>}
                              <Typography sx={{ ml: 2 }}>{user?.userName || 'Unknown'}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {new Date(message.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell>{message.subject}</TableCell>
                          <TableCell sx={{ maxWidth: 200 }}>
                            <Typography noWrap>
                              {message.body.substring(0, 50)}{message.body.length > 50 ? '...' : ''}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {message.image ? (
                              <Avatar
                                src={getImageSrc(message.image)}
                                alt="Message thumbnail"
                                sx={{ width: 56, height: 56, cursor: 'pointer' }}
                                onClick={() => openMessageDetail(message)}
                              />
                            ) : (
                              <Typography variant="caption">No image</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              onClick={() => openMessageDetail(message)}
                              color="primary"
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton 
                              onClick={() => {
                                setSelectedMessage(message);
                                setOpenDeleteDialog(true);
                              }}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredMessages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          {/* Detail View Dialog */}
          {selectedMessage && (
            <Dialog 
              open={openDetail} 
              onClose={() => setOpenDetail(false)} 
              maxWidth="md" 
              fullWidth
            >
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogContent>
                <Typography variant="subtitle1" gutterBottom>
                  From: {getUserDetails(selectedMessage.driverID?._id).username}
                </Typography>
                <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                  {selectedMessage.body}
                </Typography>
                {selectedMessage.image && (
                  <Box display="flex" justifyContent="center" mt={2}>
                    <img 
                      src={getImageSrc(selectedMessage.image)} 
                      alt="Message" 
                      style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }} 
                    />
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDetail(false)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}

          {/* Single Delete Confirmation Dialog */}
          <Dialog 
            open={openDeleteDialog} 
            onClose={() => setOpenDeleteDialog(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this message? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Bulk Delete Confirmation Dialog */}
          <Dialog 
            open={openBulkDeleteDialog} 
            onClose={() => setOpenBulkDeleteDialog(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the {selectedMessages.length} selected messages? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenBulkDeleteDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleBulkDelete} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default MessagesTable;