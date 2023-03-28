
import { useState } from 'react';
import './App.css';
import { BasicTable } from './components/BasicTable';
import { PaginationTable } from './components/PaginationTable';
// import { SortingTable } from './components/SortingTable';

function App() {
  const [sort, setsort] = useState(true);

  return (
    <div className="App">
      {sort ? (<PaginationTable />) : < BasicTable />}
    </div>
  );
}

export default App;
