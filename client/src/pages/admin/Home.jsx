import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentTable from '../../components/admin/PaymentTable';
import Divider from '@mui/material/Divider';
import { apiUrl } from '../../utils/Constants';


const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState({});

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${apiUrl}/card/all`);
      setCards(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setLoading(false);
    }

  };

  const getOverview = async () => {
    try {
      const resp = await axios.get(`${apiUrl}/item/sales/overview`)
      console.log(resp.data);
      setOverview(resp.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCards();
    getOverview()
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-">
      <div className='my-5 bg-white border rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        <div className='border shadow-xl p-3 rounded-xl text-center'>
          <p className='font-semibold text-base text-gray-700 mb-2'>Pending Amount</p>
          <hr className="my-2" />
          <p className='text-xl font-bold text-gray-900'>{overview?.pendingAmount}</p>
        </div>
        <div className='border shadow-xl p-3 rounded-xl text-center'>
          <p className='font-semibold text-base text-gray-700 mb-2'>Total Sales</p>
          <hr className="my-2" />
          <p className='text-xl font-bold text-gray-900'>{overview?.totalSaleAmount}</p>
        </div>
        <div className='border shadow-xl p-3 rounded-xl text-center'>
          <p className='font-semibold text-base text-gray-700 mb-2'>Approved Orders</p>
          <hr className="my-2" />
          <p className='text-xl font-bold text-gray-900'>{overview?.totalApprovedOrders}</p>
        </div>
        <div className='border shadow-xl p-3 rounded-xl text-center'>
          <p className='font-semibold text-base text-gray-700 mb-2'>Pending Orders</p>
          <hr className="my-2" />
          <p className='text-xl font-bold text-gray-900'>{overview?.totalPendingOrders}</p>
        </div>
        <div className='border shadow-xl p-3 rounded-xl text-center'>
          <p className='font-semibold text-base text-gray-700 mb-2'>Rejected Orders</p>
          <hr className="my-2" />
          <p className='text-xl font-bold text-gray-900'>{overview?.totalRejectedOrders}</p>
        </div>
      </div>
      <h1 className="text-3xl font-semibold mb-4 text-center">All Payment Methods of Customers</h1>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <PaymentTable cards={cards} />
      )}
    </div>
  );
  
  
  
  
};

export default Home;

