import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { DeleteOutline, Visibility, Delete as BulkDeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function ApplicationsTable() {
  const [apps, setApps] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const api_url = import.meta.env.VITE_api_url;
  const currentUser = useSelector(state => state.user?.currentUser);
  const token = useSelector(state => state.user?.token);
  const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
  const isAdmin = currentUser?.role === 'admin';

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

    const getApps = async () => {
      try {
        const res = await axios.get(`${api_url}/api/application`, config);
        setApps(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError(error.response?.data?.message || 'Failed to fetch applications');
        setLoading(false);
      }
    };
    
    getApps();
  }, [api_url, token, isAuthenticated, isAdmin, navigate]);

  const filteredApps = apps.filter(app => {
    if (!app) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      (app.fullName?.toLowerCase() || '').includes(searchLower) ||
      (app.email?.toLowerCase() || '').includes(searchLower) ||
      (app.phone?.toLowerCase() || '').includes(searchLower)
    );
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api_url}/api/application/${id}`, config);
      setApps(apps.filter(app => app._id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
      setError(error.response?.data?.message || 'Failed to delete application');
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedRows.map(id =>
          axios.delete(`${api_url}/api/application/${id}`, config)
        )
      );
      setApps(apps.filter(app => !selectedRows.includes(app._id)));
      setSelectedRows([]);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error bulk deleting applications:', error);
      setError(error.response?.data?.message || 'Failed to delete applications');
    }
  };

  const handleViewDetails = (application) => {
    navigate(`/applications/${application._id}`, { state: { application } });
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      renderCell: (params) => {
        return (
          <div className='flex items-center'>
            <img
              className='w-10 h-10 rounded-full mr-2'
              src={params.row.image || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"}
              alt={params.row.fullName}
            />
            {params.row.fullName}
          </div>
        );
      },
      width: 220
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'licenseNumber', headerName: 'License Number', width: 150 },
    {
      field: 'details',
      headerName: 'Details',
      renderCell: (params) => (
        <Tooltip title="View Full Details">
          <IconButton 
            onClick={() => handleViewDetails(params.row)}
            color="primary"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
      ),
      width: 100,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Tooltip title="Delete">
          <IconButton onClick={() => {
            setSelectedRows([params.row._id]);
            setOpenDeleteDialog(true);
          }}>
            <DeleteOutline color="error" />
          </IconButton>
        </Tooltip>
      ),
      width: 100,
    }
  ];

  if (!isAuthenticated) {
    return null;
  }

  if (!isAdmin) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          You do not have permission to access this page. Only administrators can view applications.
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <div className=' w-[82vw] h-[100vh]'>
      <Box sx={{ width: '100%', p: 3, height: 100 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Applications
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3, maxWidth: 500 }}
        />
        
        {selectedRows.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Delete Selected">
              <IconButton
                onClick={() => setOpenDeleteDialog(true)}
                color="error"
                size="large"
              >
                <BulkDeleteIcon fontSize="large" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({selectedRows.length})
                </Typography>
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredApps}
            columns={columns}
            disableRowSelectionOnClick
            getRowId={row => row._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            sx={{ border: 0 }}
            slots={{
              toolbar: GridToolbar,
            }}
            onRowSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            rowSelectionModel={selectedRows}
          />
        </Paper>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>
            {selectedRows.length > 1 ? 'Delete Selected Applications' : 'Delete Application'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedRows.length > 1
                ? `Are you sure you want to delete these ${selectedRows.length} applications? This action cannot be undone.`
                : 'Are you sure you want to delete this application? This action cannot be undone.'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={selectedRows.length > 1 ? handleBulkDelete : () => {
                handleDelete(selectedRows[0]);
                setOpenDeleteDialog(false);
              }}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}








