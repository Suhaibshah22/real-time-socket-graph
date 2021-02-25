import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

import io from 'socket.io-client';
import { useEffect, useState } from 'react';


import {
  Line,
  LineChart,
  XAxis,
  YAxis
} from 'recharts';

const socket = io();

// const socket = io('url here',{   //This undefined could be a problem. 
//     transports: ['websocket', 'polling']
//   });
  
  const App = ({}) => {
    const [data, setData] = useState([]);
  
    // 1. listen for a cpu event and update the state
    useEffect(() => {
      socket.on('Node1Data', temperature => {
        setData(currentData => [...currentData, temperature]);
      });
    }, []);
  
    // 2. render the line chart using the state
    return (
      <div>
        <h1>Real Time Temperature Over MQTT</h1>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" />
        </LineChart>
      </div>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
