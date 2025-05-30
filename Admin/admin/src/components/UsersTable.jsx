import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { DeleteOutline, ManageSearch, Visibility, Delete as BulkDeleteIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Alert,
  CircularProgress,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Toolbar
} from '@mui/material';

export default function UserDataTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const api_url = import.meta.env.VITE_api_url;
  const currentUser = useSelector(state => state.user?.currentUser);
  const token = useSelector(state => state.user?.token);
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
  const isAdmin = currentUser?.role === 'admin';

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isAdmin) {
      setError('You do not have permission to view this page');
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api_url}/api/user/users`, config);
        if (response.data?.success) {
          setUsers(response.data.users || []);
          setFilteredUsers(response.data.users || []);
        } else {
          throw new Error(response.data?.message || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch users';
        setError(errorMessage);

        if (error.response?.status === 403) {
          setSnackbar({ open: true, message: 'Session expired. Please log in again.' });
          setTimeout(() => navigate('/login'), 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [api_url, token, isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${api_url}/api/user/${id}`, config);
      if (response.data?.success) {
        setUsers(prev => prev.filter(user => user._id !== id));
        setSnackbar({ open: true, message: response.data.message || 'User deleted successfully' });
      } else {
        throw new Error(response.data?.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.response?.data?.message || error.message || 'Failed to delete user');
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedRows.map(id => axios.delete(`${api_url}/api/user/${id}`, config))
      );
      setUsers(prev => prev.filter(user => !selectedRows.includes(user._id)));
      setSelectedRows([]);
      setSnackbar({ open: true, message: 'Selected users deleted successfully' });
    } catch (error) {
      console.error('Error deleting users:', error);
      setError('Failed to delete selected users');
    } finally {
      setOpenBulkDeleteDialog(false);
    }
  };

  const columns = [
    {
      field: 'userName',
      headerName: 'Username',
      renderCell: (params) => (
        <div className='flex items-center'>
          <img
            className='w-10 h-10 rounded-full mr-2 object-cover'
            src={params.row.image || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"}
            alt={params.row.userName}
            onError={(e) => { e.target.src = "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"; }}
          />
          {params.row.userName || 'N/A'}
        </div>
      ),
      width: 220
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: (params) => (
        <a href={`mailto:${params.row.email}`} className="text-blue-600 hover:underline">
          {params.row.email || 'N/A'}
        </a>
      )
    },
    {
      field: 'phone_no',
      headerName: 'Phone',
      width: 150,
      renderCell: (params) =>
        params.row.phone_no ? (
          <a href={`tel:${params.row.phone_no}`} className="hover:text-blue-600">
            {params.row.phone_no}
          </a>
        ) : <span>N/A</span>
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
      renderCell: (params) => <div className="truncate">{params.row.address || 'N/A'}</div>
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          params.row.role === 'admin' ? 'bg-purple-100 text-purple-800' :
          params.row.role === 'driver' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {params.row.role || 'N/A'}
        </span>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className='flex justify-between items-center gap-2'>
          <Tooltip title="View">
            <Link to={`/useredit/${params.row._id}`}>
              <IconButton color="primary" size="small">
                <Visibility />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton 
              onClick={() => {
                setSelectedRows([params.row._id]);
                setOpenDeleteDialog(true);
              }} 
              color="error" 
              size="small"
            >
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ];

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress size={60} /></Box>;
  }

  if (error) {
    return <Box sx={{ width: '100%', p: 3 }}><Alert severity="error">{error}</Alert></Box>;
  }

  if (!isAdmin) {
    return <Box sx={{ width: '100%', p: 3 }}><Alert severity="error">You do not have permission to view this page.</Alert></Box>;
  }

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>User Management</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ManageSearch />
              </InputAdornment>
            ),
          }}
          sx={{ width: 400 }}
        />
        <Button
          component={Link}
          to="/newuser"
          variant="contained"
          color="success"
          sx={{ bgcolor: 'green.700', '&:hover': { bgcolor: 'green.800' } }}
        >
          Create New User
        </Button>
      </Box>

      <Paper sx={{ height: 500, width: '100%', overflow: 'hidden' }}>
        {selectedRows.length > 0 && (
          <Toolbar sx={{ bgcolor: 'action.selected' }}>
            <Typography variant="subtitle1" sx={{ flex: '1 1 100%' }}>
              {selectedRows.length} selected
            </Typography>
            <Tooltip title="Delete Selected">
              <IconButton 
                onClick={() => setOpenBulkDeleteDialog(true)}
                color="error"
              >
                <BulkDeleteIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        )}
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          checkboxSelection
          disableSelectionOnClick
          sx={{
            border: 0,
            '& .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          rowSelectionModel={selectedRows}
          slots={{ toolbar: GridToolbar }}
        />
      </Paper>

      {/* Single Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => handleDelete(selectedRows[0])} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={openBulkDeleteDialog} onClose={() => setOpenBulkDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedRows.length} selected users? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBulkDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleBulkDelete} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
}








