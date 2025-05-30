
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  Modal,
  IconButton,
  Tooltip
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useState } from "react";

const DetailsPage = () => {
  const [openPdfModal, setOpenPdfModal] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const application = location.state?.application;
  const api_url = import.meta.env.VITE_api_url;

  if (!application) {
    navigate('/applications');
    return null;
  }

  const handleViewPdf = () => {
    if (!application.resume) {
      setError('No resume available for this application');
      return;
    }
    
    setCurrentPdf({
      url: `${api_url}${application.resume}`,
      name: `${application.fullName}_resume.pdf`
    });
    setOpenPdfModal(true);
  };

  return (
    <div>
      <div className="mt-20">
        <div className="flex flex-row ml-20 mb-8 items-center">
          <KeyboardBackspaceIcon 
            className="font-bold text-4xl hover:cursor-pointer" 
            onClick={() => navigate('/applications')}
          />
          <h1 className="ml-3 font-bold text-xl text-gray-800">View Driver's Detail</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row w-full justify-around">
          <div className="flex flex-col border-2 rounded-3xl shadow-md">
            <p className="p-7 font-bold text-lg text-gray-700">
              Personal Information
            </p>
            <div className="  lg:w-[450px]">
              <div className="flex ml-7 justify-between w-[70%]">
                <p className="text-gray-700 font-semibold">Full Name:</p>
                <p className="text-gray-500">{application.fullName}</p>
              </div>
              <div className="flex ml-7 justify-between w-[70%]">
                <p className="text-gray-700 font-semibold">Phone:</p>
                <p className="text-gray-500">{application.phone}</p>
              </div>
              <div className="flex ml-7 justify-between w-[70%]">
                <p className="text-gray-700 font-semibold">Address:</p>
                <p className="text-gray-500">{application.address}</p>
              </div>
              <div className="flex ml-7 justify-between w-[70%]">
                <p className="text-gray-700 font-semibold">City:</p>
                <p className="text-gray-500">{application.city}</p>
              </div>
              <div className="flex ml-7 justify-between w-[70%]">
                <p className="text-gray-700 font-semibold">State:</p>
                <p className="text-gray-500">{application.state}</p>
              </div>
              <div className="flex ml-7 justify-between w-[70%] pb-7">
                <p className="text-gray-700 font-semibold">Zip Code:</p>
                <p className="text-gray-500">{application.zipCode}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-2 rounded-3xl shadow-md h-full">
            <p className="p-7 font-bold text-lg text-gray-700">
              Other Details
            </p>
            <div className="w-[450px]">
              <div className="flex ml-7 justify-between w-[70%]">
                <p className="text-gray-700 font-semibold">License Number:</p>
                <p className="text-gray-500">{application.licenseNumber}</p>
              </div>
              <div className="flex ml-7 justify-between w-[70%]">
                <p className="text-gray-700 font-semibold">Truck Type:</p>
                <p className="text-gray-500">{application.truckType}</p>
              </div>
              <div className="flex ml-7 justify-between w-[70%]">
                <p className="text-gray-700 font-semibold">Years of Experience:</p>
                <p className="text-gray-500">{application.yearsOfExperience} years</p>
              </div>
              <div className="flex ml-7 justify-between w-[70%] mb-8">
                <p className="text-gray-700 font-semibold">Resume:</p>
                {application.resume ? (
                  <p 
                    className="text-red-500 hover:cursor-pointer"
                    onClick={handleViewPdf}
                  >
                    View/Download
                  </p>
                ) : (
                  <p className="text-gray-500">Not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <Box sx={{ width: '100%', p: 3 }}>
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        </Box>
      )}

      <Modal
        open={openPdfModal}
        onClose={() => {
          setOpenPdfModal(false);
          setCurrentPdf(null);
        }}
        aria-labelledby="pdf-viewer-modal"
        aria-describedby="modal-to-view-pdf-resumes"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: '80%',
          height: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}>
            <Typography variant="h6">
              {currentPdf ? `Resume: ${currentPdf.name}` : 'Resume Viewer'}
            </Typography>
            <Box>
              <Tooltip title="Download">
                <IconButton 
                  component="a"
                  href={currentPdf?.url}
                  download={currentPdf?.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon color="primary" />
                </IconButton>
              </Tooltip>
              <IconButton onClick={() => setOpenPdfModal(false)}>
                <CancelPresentationIcon color="error" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{
            flexGrow: 1,
            border: '1px solid #ccc',
            borderRadius: 1,
            overflow: 'hidden',
          }}>
            {currentPdf?.url ? (
              <iframe
                src={currentPdf.url}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="PDF Viewer"
              />
            ) : (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
                <Typography>No resume available</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailsPage;











