import { useEffect, useState } from 'react';
import './App.css'
import CategoryChart from './CategoryChart';
import MonthlySpendingChart from './MonthlySpendingChart';

function App() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = import.meta.env.VITE_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }
  // const [darkMode, setDarkMode] = useState(false);

  // function toggleTheme() {
  //   setDarkMode(!darkMode);
  // }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = import.meta.env.VITE_API_URL + '/transaction';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price,
        name,
        description,
        datetime,
        category
      })
    }).then(response => {
      response.json().then(json => {
        setTransactions(prevTransactions => [...prevTransactions, json]); // Add new transaction without reload
        setName('');
        setPrice('');
        setDescription('');
        setDatetime("");
        setCategory('');
        console.log('result', json);
      })
    })
  }
  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    // <div className={darkMode ? 'app dark-mode' : 'app light-mode'}>
    //   <button onClick={toggleTheme}>
    //     Switch to {darkMode ? 'Light' : 'Dark'} Mode
    //   </button>
   <div className="container">
   <section className='charts'>
      <CategoryChart transactions={transactions} />
      <MonthlySpendingChart transactions={transactions} />
    </section>
    <main>
      <h1>₹{balance}<span>.{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type='text'
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder={'item name'} />
          <input type='text' value={price} onChange={ev => setPrice(ev.target.value)} placeholder={'price'}/>  
          <input value={datetime}
            onChange={ev => setDatetime(ev.target.value)}
            type='date' />
        </div>
        <div className='basic'>
        <div className='description'>
          <input type='text'
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            placeholder={'description'} />
        </div>
       
        {/* {transactions.length} */}
        <select value={category} onChange={e => setCategory(e.target.value)} >
        <option value="" disabled>Select a category</option> {/* Placeholder option */}
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Other" defaultChecked>Other</option>
      </select>
      </div>
      <button type='submit'>Add new transaction</button>
      </form>
      <div className='transactions'>
        {transactions.length > 0 && transactions.map(transaction => (
          <div className='transaction' key={transaction._id}>
            <div className='left'>
              <div className='name'>{transaction.name}</div>
              <div className='description'>{transaction.description}</div>
            </div>
            <div className='right'>
            {/* <div className={'price ' + (transaction.price < 0 ? 'red' : 'green')}>${transaction.price}</div> */}
              <div className={'price'}>${transaction.price}</div>
              <div className='datetime'>{transaction.datetime.split('T')[0]}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
    </div>
  )
}

export default App;
