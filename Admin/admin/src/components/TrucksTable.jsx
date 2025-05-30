import { DataGrid} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {DeleteOutline} from "@mui/icons-material"
import {Link} from "react-router-dom"
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';




const rows = [
  { id: 1, truck_no: ' 457jlk', driver: "Jon snow",  max_weight:"45",  },
  { id: 2, truck_no: '457jlk',  driver: "Jon snow",  max_weight:"45",  },
  { id: 3, truck_no: '457jlk',  driver: "Jon snow",  max_weight:"45",  },
  { id: 4, truck_no: '457jlk', driver: "Jon snow",  max_weight:"45",  },
  { id: 5, truck_no: '457jlk',  driver: "Jon snow",  max_weight:"45",  },
  { id: 6, truck_no: '457jlk',  driver: "Jon snow",  max_weight:"45",  },
  { id: 7, truck_no: '457jlk',  driver: "Jon snow",  max_weight:"45", },
  { id: 8, truck_no: '457jlk',  driver: "Jon snow", max_weight:"45",  },
  { id: 9, truck_no: '457jlk',  driver: "Jon snow",  max_weight:"45",  },
];



export default function DataTable() {
  const [trucks, setTrucks] = useState([])
  const api_url = import.meta.env.VITE_api_url;

  useEffect(()=>{
    const getTrucks = async()=>{
      try {
        const res = await axios.get(`${api_url}/api/truck/trucks`)
      setTrucks(res.data)
      } catch (error) {
        console.log(error)
      } 
    }
    getTrucks()
  },[api_url])
  
  const handleDelete = async(id)=>{
  try {
    const res = await axios.delete(`${api_url}/api/user/${id}`,config)
    alert(res.data)
    window.location.reload();
  } catch (error) {
    console.log(error)
  }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'truck_no', headerName: 'Truck_no', renderCell: (params)=>{
      return( 
          <div className='flex items-center'>
      <img className='w-10 h-10' src=
       {params.row.image || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"} alt="" />
      {params.row.truckNo}
      </div>
      ) 
    }, width:180},
    
    { field: 'driver', headerName: 'Driver', width: 180 },
    {
      field: 'maxLoadWeight',
      headerName:'Max_weight(tons)', 
      width: 120,
    },
    
    
   
    {
      field: 'Action',
      headerName:'Action', renderCell:(params)=>{
        return(
            <div className='flex justify-between items-center pt-2 gap-2'>
              <Link to={`/truckedit/${params.row._id}`} className='bg-green-900 text-white w-20 h-8 flex justify-center items-center px-2 rounded-sm'>Edit</Link>
               <DeleteOutline className='text-red-700'/>
            </div>
        )
      },
      width: 80,
    }
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <>
    <div className="flex justify-between items-center p-4">
    <h1 className="font-bold text-3xl text-gray-800"> Trucks</h1>
            <Link
              to="/newtruck"
              className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
              Create
            </Link>
          </div>
    <Paper sx={{ height: 400, width: 1000 }}>
      <DataGrid
        rows={trucks}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={row=>row._id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    </>
  );
}