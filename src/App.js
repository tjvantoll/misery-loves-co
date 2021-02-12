import React from 'react';
import './App.css';

function App() {
  const [allArrangements, setAllArrangements] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [cacti, setCacti] = React.useState([]);
  const [touchMeNots, setTouchMeNots] = React.useState([]);
  const [weapons, setWeapons] = React.useState([]);

  const audioTag = React.useRef(null);

  const [showFlowers, setShowFlowers] = React.useState(true);
  const [horrorMode, setHorrorMode] = React.useState(false);
  const [myersMode, setMyersMode] = React.useState(false);

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
    fetch('https://my-json-server.typicode.com/samidip/valentinegrinch/cactuses')
      .then(response => response.json())
      .then(data => {
        setCacti(data);
      })
  }, []);

  React.useEffect(() => {
    fetch('https://my-json-server.typicode.com/samidip/valentinegrinch/touchmenots')
      .then(response => response.json())
      .then(data => {
        setTouchMeNots(data);
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
      setShowFlowers(false);
      setMyersMode(false);
      setTimeout(() => {
        setDisabled(false);
      }, 3000);
      return;
    }

    if (value.toLowerCase().includes('ros')) {
      setMyersMode(true);
      setShowFlowers(true);
      audioTag.current.currentTime = 0;
      audioTag.current.play();
      return;
    }

    if (value.toLowerCase().includes('ro')) {
      setMyersMode(false);
      audioTag.current.pause();
      setHorrorMode(false);
      setItems([...touchMeNots]);
      return;
    }

    if (value.toLowerCase().includes('r')) {
      setItems([...cacti]);
      return;
    }

    setHorrorMode(false);
    setMyersMode(false);
    audioTag.current.pause();
    setShowFlowers(true);
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
      <div className={myersMode ? 'myers-mode' : ''}>
      <div className={horrorMode ? 'horror-mode' : ''}>
        <header className="header">
          <h1>
            { horrorMode ? 'Misery Loves Co.' : 'Misery Flowers' }
            <span onMouseOver={() => { setShowFlowers(!showFlowers)}} onMouseOut={() => { setShowFlowers(!showFlowers)}}>
              <span style={{ display: showFlowers ? 'inline' : 'none' }}>🌷🌻</span>
              <span style={{ display: showFlowers ? 'none' : 'inline' }}>🔪🩸</span>
            </span>
            <img alt="Misery loves co logo" src="/logo.png" />
          </h1>
        </header>
        <form>
          <label className="sr-only" htmlFor="Search">Search:</label>
          <input placeholder="Pick your poison...roses?" disabled={isDisabled ? 'disabled' : ''} id="Search" type="text" name="flower" onChange={filter} />
        </form>
        <div className="card-list">
          {items.map(item => (
            <div key={item.id} className="card">
              <p>{item.name}</p>
              <img src={item.url} alt={item.name} />
            </div>
          ))}
        </div>

        <audio ref={audioTag} src="/halloween-theme.mp3"></audio>
        <img className="myers" alt="Michael Myers says hi" src="/myers.png" />
      </div>
      </div>
    </>
  );
}

export default App; 