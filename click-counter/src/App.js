import React from "react";
import './App.css';



function App() {
  const [count, setCount] = React.useState(0);
  const [error, setError] = React.useState('');
  return (
    <div data-test='component-app'>
      <h1 data-test="counter-display">The counter is currently&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      <h2 data-test='error-message'>{error}</h2>
      <button data-test="increment-button"
      onClick={() => {
        setCount(count + 1)
        setError('');
      }}
      >Increment counter</button>
      <button data-test="decrement-button"
      onClick={() => { 
          if(count > 0) {
            setCount(count - 1)
          } else {
            setError('The counter cannot go below 0')
          }
        }
      }
      > Go Down</button>
    </div>
  );
}

export default App;
