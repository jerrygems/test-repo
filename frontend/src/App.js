import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Backend</h1>
      <div>
        {data.map(item => (
          <p key={item.id}>
            ID: {item.id}, Name: {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
