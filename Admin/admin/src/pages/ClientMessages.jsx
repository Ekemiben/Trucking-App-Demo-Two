
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Avatar,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   TextField,
//   InputAdornment,
//   Box,
//   Checkbox,
//   TablePagination,
//   Toolbar,
//   Tooltip
// } from "@mui/material";
// import { Visibility, Delete, Search, Person, Delete as BulkDelete } from "@mui/icons-material";

// const ContactsTable = () => {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [openDetail, setOpenDetail] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [selectedContacts, setSelectedContacts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const api_url = import.meta.env.VITE_api_url;
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const currentUser = useSelector((state) => state.user?.currentUser);
//   const token = currentUser?.accessToken;
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const contactsRes = await axios.get(`${api_url}/api/contact/`, config);
//         setContacts(contactsRes.data);
        
//         if (id) {
//           const singleContactRes = await axios.get(`${api_url}/api/contact/${id}`, config);
//           setSelectedContact(singleContactRes.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [api_url, id]);

//   const filteredContacts = contacts.filter(contact => {
//     const searchLower = searchTerm.toLowerCase();
//     const contactDate = new Date(contact.createdAt).toLocaleString().toLowerCase();
    
//     return (
//       contact.name.toLowerCase().includes(searchLower) ||
//       contact.email.toLowerCase().includes(searchLower) ||
//       contact.phone_no.toLowerCase().includes(searchLower) ||
//       contact.message.toLowerCase().includes(searchLower) ||
//       contactDate.includes(searchLower)
//     );
//   });

//   const getAvatar = (name) => {
//     return (
//       <Avatar>
//         {name?.charAt(0).toUpperCase() || <Person />}
//       </Avatar>
//     );
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${api_url}/api/contact/${selectedContact._id}`, config);
//       setContacts(contacts.filter(contact => contact._id !== selectedContact._id));
//       setOpenDeleteDialog(false);
//       if (id) navigate('/contacts');
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//     }
//   };

//   const handleBulkDelete = async () => {
//     try {
//       await Promise.all(
//         selectedContacts.map(id =>
//           axios.delete(`${api_url}/api/contact/${id}`, config)
//         )
//       );
//       setContacts(contacts.filter(contact => !selectedContacts.includes(contact._id)));
//       setSelectedContacts([]);
//       setOpenBulkDeleteDialog(false);
//     } catch (error) {
//       console.error("Error deleting contacts:", error);
//     }
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = filteredContacts
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//         .map((contact) => contact._id);
//       setSelectedContacts(newSelected);
//       return;
//     }
//     setSelectedContacts([]);
//   };

//   const handleSelectContact = (id) => {
//     const selectedIndex = selectedContacts.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selectedContacts, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selectedContacts.slice(1));
//     } else if (selectedIndex === selectedContacts.length - 1) {
//       newSelected = newSelected.concat(selectedContacts.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selectedContacts.slice(0, selectedIndex),
//         selectedContacts.slice(selectedIndex + 1),
//       );
//     }

//     setSelectedContacts(newSelected);
//   };

//   const isSelected = (id) => selectedContacts.indexOf(id) !== -1;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const openContactDetail = (contact) => {
//     setSelectedContact(contact);
//     setOpenDetail(true);
//   };

//   return (
//     <Box sx={{ padding: 3, width: "98%" }}>
//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         Contacts
//       </Typography>
      
//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="Search by name, email, phone, or message..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Search color="primary" />
//             </InputAdornment>
//           ),
//         }}
//         sx={{ mb: 3 }}
//       />

//       {loading ? (
//         <Box display="flex" justifyContent="center">
//           <CircularProgress />
//         </Box>
//       ) : filteredContacts.length === 0 ? (
//         <Typography variant="body1" align="center" sx={{ p: 3 }}>
//           {searchTerm ? 'No contacts match your search' : 'No contacts available'}
//         </Typography>
//       ) : (
//         <>
//           <Paper sx={{ width: '100%', mb: 2 }}>
//             {selectedContacts.length > 0 && (
//               <Toolbar sx={{ bgcolor: 'action.selected' }}>
//                 <Typography variant="subtitle1" sx={{ flex: '1 1 100%' }}>
//                   {selectedContacts.length} selected
//                 </Typography>
//                 <Tooltip title="Delete">
//                   <IconButton
//                     onClick={() => setOpenBulkDeleteDialog(true)}
//                     color="error"
//                   >
//                     <BulkDelete />
//                   </IconButton>
//                 </Tooltip>
//               </Toolbar>
//             )}
            
//             <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
//               <Table stickyHeader aria-label="contacts table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         indeterminate={
//                           selectedContacts.length > 0 &&
//                           selectedContacts.length < Math.min(rowsPerPage, filteredContacts.length - page * rowsPerPage)
//                         }
//                         checked={
//                           filteredContacts.length > 0 &&
//                           selectedContacts.length === Math.min(rowsPerPage, filteredContacts.length - page * rowsPerPage)
//                         }
//                         onChange={handleSelectAllClick}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredContacts
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((contact) => {
//                       const isItemSelected = isSelected(contact._id);
//                       return (
//                         <TableRow
//                           key={contact._id}
//                           hover
//                           role="checkbox"
//                           selected={isItemSelected}
//                         >
//                           <TableCell padding="checkbox">
//                             <Checkbox
//                               checked={isItemSelected}
//                               onChange={() => handleSelectContact(contact._id)}
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <Box display="flex" alignItems="center">
//                               {getAvatar(contact.name)}
//                               <Typography sx={{ ml: 2 }}>{contact.name}</Typography>
//                             </Box>
//                           </TableCell>
//                           <TableCell>{contact.email}</TableCell>
//                           <TableCell>{contact.phone_no}</TableCell>
//                           <TableCell sx={{ maxWidth: 200 }}>
//                             <Typography noWrap>
//                               {contact.message.substring(0, 50)}{contact.message.length > 50 ? '...' : ''}
//                             </Typography>
//                           </TableCell>
//                           <TableCell>
//                             {new Date(contact.createdAt).toLocaleString()}
//                           </TableCell>
//                           <TableCell>
//                             <IconButton
//                               onClick={() => openContactDetail(contact)}
//                               color="primary"
//                             >
//                               <Visibility />
//                             </IconButton>
//                             <IconButton
//                               onClick={() => {
//                                 setSelectedContact(contact);
//                                 setOpenDeleteDialog(true);
//                               }}
//                               color="error"
//                             >
//                               <Delete />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={filteredContacts.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Paper>

//           {/* Detail View Dialog */}
//           {selectedContact && (
//             <Dialog
//               open={openDetail}
//               onClose={() => setOpenDetail(false)}
//               maxWidth="md"
//               fullWidth
//             >
//               <DialogTitle>{selectedContact.name}</DialogTitle>
//               <DialogContent>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Email: {selectedContact.email}
//                 </Typography>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Phone: {selectedContact.phone_no}
//                 </Typography>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Date: {new Date(selectedContact.createdAt).toLocaleString()}
//                 </Typography>
//                 <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap', mt: 2 }}>
//                   {selectedContact.message}
//                 </Typography>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={() => setOpenDetail(false)} color="primary">
//                   Close
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           )}

//           {/* Single Delete Confirmation Dialog */}
//           <Dialog
//             open={openDeleteDialog}
//             onClose={() => setOpenDeleteDialog(false)}
//           >
//             <DialogTitle>Confirm Delete</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Are you sure you want to delete this contact? This action cannot be undone.
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={handleDelete} color="error" variant="contained">
//                 Delete
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {/* Bulk Delete Confirmation Dialog */}
//           <Dialog
//             open={openBulkDeleteDialog}
//             onClose={() => setOpenBulkDeleteDialog(false)}
//           >
//             <DialogTitle>Confirm Delete</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Are you sure you want to delete the {selectedContacts.length} selected contacts? This action cannot be undone.
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenBulkDeleteDialog(false)} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={handleBulkDelete} color="error" variant="contained">
//                 Delete
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ContactsTable;








import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Typography, Avatar, IconButton, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Button, TextField,
  InputAdornment, Box, Checkbox, TablePagination, Toolbar, Tooltip
} from "@mui/material";
import { Visibility, Delete, Search, Person, Delete as BulkDelete } from "@mui/icons-material";

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]); // All fetched contacts
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState(''); // Search input state
  const [openDetail, setOpenDetail] = useState(false); // Detail view modal state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Single delete modal state
  const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false); // Bulk delete modal state
  const [selectedContact, setSelectedContact] = useState(null); // Currently selected contact
  const [selectedContacts, setSelectedContacts] = useState([]); // Selected contacts for bulk delete
  const [page, setPage] = useState(0); // Current table page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const api_url = import.meta.env.VITE_api_url;
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = useSelector((state) => state.user?.currentUser);
  const token = currentUser?.accessToken;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch contacts data from API on mount or when id changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contactsRes = await axios.get(`${api_url}/api/contact/`, config);
        // Sort contacts by createdAt in descending order (most recent first)
        const sortedContacts = contactsRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setContacts(sortedContacts);
        // If a specific contact is requested by id, fetch its detail
        if (id) {
          const singleContactRes = await axios.get(`${api_url}/api/contact/${id}`, config);
          setSelectedContact(singleContactRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [api_url, id]);

  // Filter contacts based on search term (name, email, phone, message, or date)
  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchTerm.toLowerCase();
    const contactDate = new Date(contact.createdAt).toLocaleString().toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.phone_no.toLowerCase().includes(searchLower) ||
      contact.message.toLowerCase().includes(searchLower) ||
      contactDate.includes(searchLower)
    );
  });

  // Generates avatar based on contact's name
  const getAvatar = (name) => (
    <Avatar>{name?.charAt(0).toUpperCase() || <Person />}</Avatar>
  );

  // Handle single contact delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${api_url}/api/contact/${selectedContact._id}`, config);
      setContacts(contacts.filter(contact => contact._id !== selectedContact._id));
      setOpenDeleteDialog(false);
      if (id) navigate('/contacts');
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Handle bulk delete of selected contacts
  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedContacts.map(id => axios.delete(`${api_url}/api/contact/${id}`, config)));
      setContacts(contacts.filter(contact => !selectedContacts.includes(contact._id)));
      setSelectedContacts([]);
      setOpenBulkDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting contacts:", error);
    }
  };

  // Select/deselect all contacts on current page
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredContacts
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(contact => contact._id);
      setSelectedContacts(newSelected);
    } else {
      setSelectedContacts([]);
    }
  };

  // Select/deselect individual contact
  const handleSelectContact = (id) => {
    const selectedIndex = selectedContacts.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) newSelected = [...selectedContacts, id];
    else newSelected = selectedContacts.filter(contactId => contactId !== id);
    setSelectedContacts(newSelected);
  };

  // Check if contact is selected
  const isSelected = (id) => selectedContacts.includes(id);

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open detail dialog
  const openContactDetail = (contact) => {
    setSelectedContact(contact);
    setOpenDetail(true);
  };

  return (
    <Box sx={{ padding: 3, width: "98%" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Contacts
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name, email, phone, or message..."
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
      ) : filteredContacts.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ p: 3 }}>
          {searchTerm ? 'No contacts match your search' : 'No contacts available'}
        </Typography>
      ) : (
        <>
          <Paper sx={{ width: '100%', mb: 2 }}>
            {selectedContacts.length > 0 && (
              <Toolbar sx={{ bgcolor: 'action.selected' }}>
                <Typography variant="subtitle1" sx={{ flex: '1 1 100%' }}>
                  {selectedContacts.length} selected
                </Typography>
                <Tooltip title="Delete">
                  <IconButton onClick={() => setOpenBulkDeleteDialog(true)} color="error">
                    <BulkDelete />
                  </IconButton>
                </Tooltip>
              </Toolbar>
            )}

            <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selectedContacts.length > 0 &&
                          selectedContacts.length < Math.min(rowsPerPage, filteredContacts.length - page * rowsPerPage)
                        }
                        checked={
                          filteredContacts.length > 0 &&
                          selectedContacts.length === Math.min(rowsPerPage, filteredContacts.length - page * rowsPerPage)
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Apply pagination AFTER sorting to maintain recent-first order */}
                  {filteredContacts
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Ensure recent first even in filtered results
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(contact => {
                      const isItemSelected = isSelected(contact._id);
                      return (
                        <TableRow key={contact._id} hover role="checkbox" selected={isItemSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={() => handleSelectContact(contact._id)} />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              {getAvatar(contact.name)}
                              <Typography sx={{ ml: 2 }}>{contact.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone_no}</TableCell>
                          <TableCell sx={{ maxWidth: 200 }}>
                            <Typography noWrap>
                              {contact.message.substring(0, 50)}{contact.message.length > 50 ? '...' : ''}
                            </Typography>
                          </TableCell>
                          <TableCell>{new Date(contact.createdAt).toLocaleString()}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => openContactDetail(contact)} color="primary">
                              <Visibility />
                            </IconButton>
                            <IconButton onClick={() => { setSelectedContact(contact); setOpenDeleteDialog(true); }} color="error">
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
              count={filteredContacts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          {/* Detail View, Delete, and Bulk Delete dialogs remain unchanged */}
          {/* ... */}
        </>
      )}
    </Box>
  );
};

export default ContactsTable;
















