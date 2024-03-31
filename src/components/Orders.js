import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axiosInstance from '../Api/axios';
import { UserContext } from '../App';

export default function Orders() {
const [orders, setOrders] = useState([])
const user = React.useContext(UserContext)

async function getOrders (user) {
  try{
    if(user){
      console.log('user :>> ', user);
      const result = await axiosInstance.get('http://localhost:5000/orders/' + user.user.id);
      if(result.data.orders){
        setOrders(result.data.orders)
      }
    }
  }catch(error){
    console.log(error)
  }
  }

useEffect(() => {
    getOrders(user)
    console.log("getOrdersEff");
},[user])

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name: </TableCell>
            <TableCell>Order Date: </TableCell>
            <TableCell>Edited Date: </TableCell>
            <TableCell>Amount: </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 && orders?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.customer_name}</TableCell>
              <TableCell>{row.created_at.split("T")[0]}</TableCell>
              <TableCell>{row.updated_at.split("T")[0]}</TableCell>
              <TableCell>{`$${row.order_amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
