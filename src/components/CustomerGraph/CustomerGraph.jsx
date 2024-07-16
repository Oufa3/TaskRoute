import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const CustomerGraph = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState('Ahmed Ali');
  const [graphData, setGraphData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://oufa3.github.io/host_api/api.json');
        setCustomers(res.data.customers);
        setTransactions(res.data.transactions);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const customer = customers.find(c => c.name === selectedCustomerName);
    if (customer) {
      const customerTransactions = transactions.filter(t => t.customer_id === customer.id);
      const data = customerTransactions.reduce((acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
          acc[date] = { date, amount: 0 };
        }
        acc[date].amount += transaction.amount;
        return acc;
      }, {});
      setGraphData(Object.values(data));
    }
  }, [selectedCustomerName, customers, transactions]);

  return (
    <div className="my-5">
      <h2 className="text-3xl font-bold mb-6 text-blue-500">Transaction Graph for Customer</h2>
      {error && <div className="text-red-500">{error}</div>}
      <label className="w-1/2 mb-4">
        Select Customer : 
        <input
          type="text"
          list="customer-names"
          value={selectedCustomerName}
          onChange={(e) => setSelectedCustomerName(e.target.value)}
          className="border border-gray-300 rounded p-2 mt-1 my-4"
        />
        <datalist id="customer-names">
          {customers.map(customer => (
            <option key={customer.id} value={customer.name}>
              {customer.name}
            </option>
          ))}
        </datalist>
      </label>
      {selectedCustomerName && graphData.length > 0 && (
        <ResponsiveContainer width="90%" height={400}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CustomerGraph;
