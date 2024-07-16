import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({ name: '', amount: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://oufa3.github.io/host_api/api.json');
        setCustomers(res.data.customers);
        setTransactions(res.data.transactions);
        setFilteredData(res.data.transactions);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));

    const filtered = transactions.filter((transaction) => {
      const customer = customers.find((x) => x.id === transaction.customer_id);
      return (
        (!filter.name || (customer && customer.name.toLowerCase().includes(value.toLowerCase()))) &&
        (!filter.amount || transaction.amount.toString().includes(filter.amount))
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Customer Transactions</h1>
      <div className="relative mb-4">
        <input
          type="text"
          name="name"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Filter By Name..."
          value={filter.name}
          onChange={handleFilterChange}
        />
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          name="amount"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Filter By Amount..."
          value={filter.amount}
          onChange={handleFilterChange}
        />
      </div>
      <table className="min-w-full my-8 bg-white">
        <thead className="text-xs text-center text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Transactions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((transaction) => {
            const customer = customers.find((c) => c.id === transaction.customer_id);
            const formattedDate = new Date(transaction.date).toLocaleDateString('en-GB', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            return (
              <tr className="dark:bg-gray-800 text-center text-white" key={transaction.id}>
                <td className="border border-gray-500 px-4 py-4">{customer ? customer.id : 'Unknown'}</td>
                <td className="border border-gray-500 px-4 py-4">{customer ? customer.name : 'Unknown'}</td>
                <td className="border border-gray-500 px-4 py-4">{formattedDate}</td>
                <td className="border border-gray-500 px-4 py-4">{transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

