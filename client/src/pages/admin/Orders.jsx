import React, { useState, useEffect } from 'react';
import { useAuth } from '../common/AuthContext';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { usePDF } from 'react-to-pdf';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@mui/material';

export default function AdminOrders() {
  const [transactions, setTransactions] = useState([]);
  const { id } = useAuth();
  const { toPDF, targetRef } = usePDF({ filename: 'Orders.pdf' });
  const [selectedTr, setSelTR] = useState({})
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)


  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/card/transactions/all`)
      setTransactions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Handle error
    }
  };

  const updateTransaction = async () => {
    try {
      const response = await authAxios.put(`${apiUrl}/card/order/${selectedTr._id}`, selectedTr)
      console.log(response.data);
      toast.success('Order Updated')
      setUpdateModal(false)
      getAllTransactions()
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Handle error
    }
  }

  const deleteTr = async () => {
    try {
      const response = await authAxios.delete(`${apiUrl}/card/order/${selectedTr._id}`)
      console.log(response.data);
      toast.warning('Order Deleted')
      getAllTransactions()
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Handle error
    }
  }

  const handleUpdateDialogOpen = (t) => {
    setSelTR(t)
    setUpdateModal(true)
  }

  const handleDeleteDialogOpen = (t) => {
    setSelTR(t)
    setDeleteModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelTR(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <button onClick={() => toPDF()}>Download PDF</button>
        <div ref={targetRef}>
          <h1 className="text-center font-bold text-2xl my-5">All Orders</h1>
          <table className="min-w-full leading-normal w-full" >


            <thead>


              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Shipping Address
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {index}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {transaction?.productId?.title || 'Item No Longer Available'}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {transaction.amount}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {transaction?.userid?.shippingAddress || 'Address No Longer Available'}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {transaction.status}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {new Date(transaction.createdAt).toDateString()}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center justify-between gap-3">
                    <Button variant="outlined" color="primary" onClick={() => handleUpdateDialogOpen(transaction)}>Update</Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteDialogOpen(transaction)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <DialogTitle>Delete Payment Details</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the Order?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)} color="primary">No</Button>
          <Button color="secondary" onClick={deleteTr}>Yes</Button>
        </DialogActions>
      </Dialog>


      {/* Update Payment Details Dialog */}
      <Dialog open={updateModal} onClose={() => setUpdateModal(false)}>
        <DialogTitle>Update Order Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="ID"
            label="Order ID"
            type="text"
            fullWidth
            name="ID"
            value={selectedTr?._id || ''}
            onChange={handleInputChange}
            disabled
          />
          <TextField
            margin="dense"
            id="product"
            label="Product"
            type="text"
            fullWidth
            name="product"
            value={selectedTr?.productId?.title || ''}
            disabled
          />
          <TextField
            margin="dense"
            id="qty"
            label="Quantity"
            type="text"
            fullWidth
            name="qty"
            value={selectedTr?.qty || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="createdAt"
            label="Order Placed Date"
            type="text"
            fullWidth
            name="expYear"
            value={selectedTr?.createdAt || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="shippingAddress"
            label="Shipping Address"
            type="text"
            fullWidth
            name="shippingAddress"
            value={selectedTr?.userid?.shippingAddress || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="cardType"
            type="text"
            fullWidth
            name="cardType"
            value={selectedTr?.userid?.email || ''}
            onChange={handleInputChange}
          />
          <p>Status</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='status'
            value={selectedTr?.status}
            onChange={handleInputChange}
            className='w-full'
            label="Status"
          >
            <MenuItem value="pending">pending</MenuItem>
            <MenuItem value="approved">approved</MenuItem>
            <MenuItem value="completed">completed</MenuItem>
            <MenuItem value="rejected">rejected</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateModal(false)} color="primary">Cancel</Button>
          <Button onClick={updateTransaction} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
