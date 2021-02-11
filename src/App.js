import React from 'react';
import './App.css';

function App() {
  const [allArrangements, setAllArrangements] = React.useState([]);
  const [weapons, setWeapons] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [horrorMode, setHorrorMode] = React.useState(false);
  const [isDisabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    fetch('https://my-json-server.typicode.com/samidip/valentinegrinch/arrangements')
      .then(response => response.json())
      .then(data => {
        setAllArrangements(data);
        setItems(data);
      })
  }, []);

  React.useEffect(() => {
    fetch('https://my-json-server.typicode.com/samidip/valentinegrinch/horrorweapons')
      .then(response => response.json())
      .then(data => {
        setWeapons(data);
      })
  }, []);

  const filter = (props) => {
    const value = props.target.value;

    if (value.toLowerCase().includes('rose')) {
      setItems([...weapons]);
      setDisabled(true);
      setHorrorMode(true);
      setTimeout(() => {
        setDisabled(false);
      }, 3000);
      return;
    }

    setHorrorMode(false);
    const newArrangements = allArrangements.filter(arrangement => {
      if (value === '') {
        return true;
      }
      return arrangement.name.toLowerCase().includes(value.toLowerCase())
        || arrangement.flowertype.toLowerCase().includes(value.toLowerCase());
    });
    setItems([...newArrangements]);
  }

  return (
    <>
      <div className={horrorMode ? 'horror-mode' : ''}>
        <header className="header">
          <h1>Misery Loves Co. 🔪🩸</h1>
        </header>
        <form>
          <label htmlFor="Search">Search:</label>
          <input disabled={isDisabled ? 'disabled' : ''} id="Search" type="text" name="flower" onChange={filter} />
        </form>
        <div className="card-list">
          {items.map(item => (
            <div key={item.id} className="card">
              <p>{item.name}</p>
              <img src={item.url} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App; 