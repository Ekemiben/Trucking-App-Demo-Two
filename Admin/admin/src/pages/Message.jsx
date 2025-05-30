


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
// } from "@mui/material";
// import { Visibility, Delete } from "@mui/icons-material";

// const Message = () => {
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [openDetail, setOpenDetail] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const api_url = import.meta.env.VITE_api_url;
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const currentUser = useSelector((state) => state.user?.currentUser);
//   const token = currentUser?.accessToken;

//   useEffect(() => {
//     const getMessage = async () => {
//       if (!token) return;
//       setLoading(true);
//       try {
//         const res = await axios.get(`${api_url}/api/message/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMessage(res.data);
//       } catch (error) {
//         console.error("Error fetching message:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getMessage();
//   }, [api_url, id, token]);

//   const getImageSrc = (base64Data) => {
//     if (!base64Data) return null;
//     if (base64Data.startsWith('data:image')) {
//       return base64Data;
//     }
//     return `data:image/jpeg;base64,${base64Data}`;
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${api_url}/api/message/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       navigate(-1); // Go back to previous page after deletion
//     } catch (error) {
//       console.error("Error deleting message:", error);
//     } finally {
//       setOpenDeleteDialog(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20, marginTop: 20, width: "98%" }}>
//       {loading ? (
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </div>
//       ) : message ? (
//         <>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="message table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: "gray" }}>Title</TableCell>
//                   <TableCell sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: "gray"}}>Message</TableCell>
//                   <TableCell sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: "gray" }}></TableCell>
//                   <TableCell sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: "gray" }}></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow>
//                   <TableCell sx={{ fontSize: '1rem', color: "gray" }}>{message.subject}</TableCell>
//                   <TableCell sx={{ fontSize: '1rem', color: "gray" }}>{message.body.substring(0, 50)}...</TableCell>
//                   <TableCell>
//                     {message.image ? (
//                       <Avatar
//                         src={getImageSrc(message.image)}
//                         alt="Message"
//                         variant="square"
//                         sx={{ width: 100, height: 100 }}
//                       />
//                     ) : (
//                       <Avatar
//                         sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
//                       >
//                         {message.subject?.charAt(0) || 'M'}
//                       </Avatar>
//                     )}
//                   </TableCell>
//                   <TableCell sx={{display:"flex", flexDirection:"row",  marginTop:"30px", border:"none"}}>
//                     <IconButton onClick={() => setOpenDetail(true)} color="primary">
//                       <Visibility />
//                     </IconButton>
//                     <IconButton onClick={() => setOpenDeleteDialog(true)} color="error">
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Detail View Dialog */}
//           <Dialog open={openDetail} onClose={() => setOpenDetail(false)} maxWidth="md" fullWidth>
//             <DialogTitle>{message.subject}</DialogTitle>
//             <DialogContent>
//               <Typography variant="body1" paragraph>{message.body}</Typography>
//               {message.image && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
//                   <img 
//                     src={getImageSrc(message.image)} 
//                     alt="Message" 
//                     style={{ maxWidth: '100%', maxHeight: '60vh' }} 
//                   />
//                 </div>
//               )}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDetail(false)} color="primary">
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {/* Delete Confirmation Dialog */}
//           <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
//             <DialogTitle>Confirm Delete</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Are you sure you want to delete this message? This action cannot be undone.
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
//         </>
//       ) : (
//         <Typography variant="body1">No message found</Typography>
//       )}
//     </div>
//   );
// };

// export default Message;



