import React from 'react';
import ScatterChartWithZoom from './ScatterChartWithZoom';

const App = () => {
  return (
    <div>
      <h1>Chart using Chart.js Plugins</h1>
      <div style={{ width: '800px', height: '400px' }}>
        <ScatterChartWithZoom />
      </div>
    </div>
  );
}

export default App;
