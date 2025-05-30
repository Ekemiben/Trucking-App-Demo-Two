import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import {DeleteOutline} from "@mui/icons-material"
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';



// const rows = [
//   { id: 1, Load: 'Eggs', Weight: "25",  Desc:"This is a fragile load", client:"jon snow", origin:"chicargo", Destination:"New york" },
//   { id: 2, Load: 'Eggs',  Weight: "25",  Desc:"This is a fragile load", client:"jon snow", origin:"chicargo", Destination:"New york"},
//   { id: 3, Load: 'Eggs',  Weight: "25",  Desc:"This is a fragile load", client:"jon snow", origin:"chicargo", Destination:"New york" },
//   { id: 4, Load: 'Eggs', Weight: "25",  Desc:"This is a fragile load", client:"jon snow", origin:"chicargo", Destination:"New york"},
//   { id: 5, Load: 'Eggs',  Weight: "25",  Desc:"This is a fragile load", client:"jon snow", origin:"chicargo", Destination:"New york"  },
//   { id: 6, Load: 'Eggs',  Weight: "25",  Desc:"This is a fragile load", client:"jon snow", origin:"chicargo", Destination:"New york"},
//   { id: 7, Load: 'Eggs',  Weight: "25",  Desc:"This is a fragile load", client:"jon snow", origin:"chicargo", Destination:"New york"},
//   { id: 8, Load: 'Eggs',  Weight: "25", Desc:"This is a fragile load", client:"jon snow", origin:"chicargo", Destination:"New york"},
//   { id: 9, Load: 'Eggs',  Weight: "25",  Desc:"This is a fragile load", client:"jon snow", origin:"chicargo", Destination:"New york"},
// ];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {

 const [orders, setorders] = useState([])
 const [users, setusers] = useState([])
  const api_url = import.meta.env.VITE_api_url;
  const currentUser = useSelector(state=>state.user?.currentUser)
 const token = currentUser?.accessToken
 const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};


useEffect(()=>{
  const getUsers = async()=>{
    try {
      const res = await axios.get(`${api_url}/api/truckbooking/truckbookings`,config)
    setorders(res.data)
    } catch (error) {
      console.log(error)
    } 
  }
  getUsers()
},[api_url,token])
useEffect(()=>{
  const getUsers = async()=>{
    try {
      const res = await axios.get(`${api_url}/api/user/users`,config)
    setusers(res.data)
    } catch (error) {
      console.log(error)
    } 
  }
  getUsers()
},[api_url,token])

const userName = (id)=>{

    const user = users.find((user)=>user._id === id)
  return user?.userName
}

const userImage = (id)=>{

  const user = users.find((user)=>user._id === id)
return user?.image
}
const handleDelete = async(id)=>{
  console.log(id)
try {
  const res = await axios.delete(`${api_url}/api/truckbooking/${id}`,config)
  alert(res.data)
  window.location.reload();
} catch (error) {
  console.log(error)
}
}

  const columns = [
    

    { field: 'clientID', headerName: 'client', renderCell:(params)=>{
     return(
        <div>
          <img src={userImage(params.row.clientID)} alt="" />
          <h3>{userName(params.row.clientID)}</h3>
        </div>
     )
    }, width: 100 },
    { field: 'loadType', headerName: 'Load', width:100},
    {
      field: 'loadWeight',
      headerName:'Weight(tons)', width: 40,
    },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'time', headerName: 'Time', width: 80 },
    
    {
      field: 'specialInstructions',
      headerName:'Desc', 
      width: 150,
    },
    {
      field: 'pickupLocation',
      headerName:'origin', 
      width: 100,
    },
    {
      field: 'dropoffLocation',
      headerName:'Destination', 
      width: 100,
    },
    {
      field: 'delete',
      headerName:'delete', renderCell:(params)=>{
          return(
              <DeleteOutline className='text-red-700' onClick={()=>{handleDelete(params.row._id)}}/>
          )
      }, width: 80,
    },
    
    
   
   
  ];
  return (
    <Paper sx={{ height: 400, width: 1000 }}>
      <DataGrid
        rows={orders}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={row=>row._id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}