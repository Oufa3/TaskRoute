import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const AllCustomersGraph = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57', '#a4c8e0', '#d84b2a', '#ff84c0'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://oufa3.github.io/host_api/api.json');
        setCustomers(res.data.customers);
        setTransactions(res.data.transactions);
        
        const data = res.data.transactions.reduce((acc, transaction) => {
          const date = transaction.date;
          if (!acc[date]) {
            acc[date] = { date };
            res.data.customers.forEach(customer => {
              acc[date][customer.name] = 0;
            });
          }
          const customer = res.data.customers.find(c => c.id === transaction.customer_id);
          if (customer) {
            acc[date][customer.name] += transaction.amount;
          }
          return acc;
        }, {});
        setGraphData(Object.values(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="my-5">
      <h2 className="text-3xl font-bold mb-6 text-blue-500">Transactions Graph for All Customers</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {customers.map((customer, index) => (
            <Line
              key={customer.id}
              type="monotone"
              dataKey={customer.name}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllCustomersGraph;
