import React, { useState, useEffect } from 'react';
import { useAuth } from '../common/AuthContext';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { usePDF } from 'react-to-pdf';
import { toast } from 'react-toastify';

export default function AdminOrders() {
  const [transactions, setTransactions] = useState([]);
  const { id } = useAuth();
  const { toPDF, targetRef } = usePDF({filename: 'MyTransactions.pdf'});
  const [selectedTr, setSelTR] = useState({})

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

  const updateTransaction =async()=>{
    try {
      const response = await authAxios.get(`${apiUrl}/card/transactions/order/${selectedTr._id}`,selectedTr)
      console.log(response.data);
      toast.success('Order Updated')
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Handle error
    }
  }



  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <button onClick={() => toPDF()}>Download PDF</button>
      <div ref={targetRef}>
      <h1 className="text-center font-bold text-2xl">All Orders</h1>
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
            {transactions?.map((transaction,index) => (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
