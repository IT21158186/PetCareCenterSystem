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
    <div className="bg-gray-100 min-h-screen p-8">
      <div className='my-5 bg-white border rounded-xl p-5 flex items-center justify-between'>

        <div className='w-max border shadow-xl p-5 rounded-xl'>
          <p className='font-bold'>Pending Amount</p>
          <hr />
          <p className='px-0 pt-4'>{overview?.pendingAmount}</p>
        </div>
        <div className='w-max border shadow-xl p-5 rounded-xl'>
          <p className='font-bold'>Total Sales</p>
          <hr />
          <p className='px-0 pt-4'>{overview?.totalSaleAmount}</p>
        </div>
        <div className='w-max border shadow-xl p-5 rounded-xl'>
          <p className='font-bold'>Approved Orders</p>
          <hr />
          <p className='px-0 pt-4'>{overview?.totalApprovedOrders}</p>
        </div>
        <div className='w-max border shadow-xl p-5 rounded-xl'>
          <p className='font-bold'>Pending Orders</p>
          <hr />
          <p className='px-0 pt-4'>{overview?.totalPendingOrders}</p>
        </div>
        <div className='w-max border shadow-xl p-5 rounded-xl'>
          <p className='font-bold'>Rejected Orders</p>
          <hr />
          <p className='px-0 pt-4'>{overview?.totalRejectedOrders}</p>
        </div>


      </div>
      <h1 className="text-3xl font-semibold mb-4 text-center">All Payment Methods of Customers</h1>
      <Divider />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <PaymentTable cards={cards} />
      )}
    </div>
  );
};

export default Home;

