import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Driver {
  id: number;
  name: string;
  pricePerKm: number;
}

const App: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [cost, setCost] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8080/drivers')
      .then(response => setDrivers(response.data));
  }, []);

  const handleCalculateCost = () => {
    if (selectedDriver && distance > 0) {
      axios.post('http://localhost:8080/calculate-cost', {
        driverId: selectedDriver,
        distance,
      })
      .then(response => setCost(response.data.cost));
    }
  };

  return (
    <div>
      <h1>Car Ride App</h1>
      <div>
        <h2>Select Driver</h2>
        <select onChange={(e) => setSelectedDriver(Number(e.target.value))}>
          <option value="">Select a driver</option>
          {drivers.map(driver => (
            <option key={driver.id} value={driver.id}>{driver.name}</option>
          ))}
        </select>
      </div>
      <div>
        <h2>Enter Distance</h2>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
        />
      </div>
      <button onClick={handleCalculateCost}>Calculate Cost</button>
      {cost !== null && <h3>Cost: ${cost}</h3>}
    </div>
  );
};

export default App;
