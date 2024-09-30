import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
    const chartData = {
        labels: data.map(threat => threat.time), // Assuming threat object has a 'time' field
        datasets: [{
            label: 'Threat Level',
            data: data.map(threat => threat.level), // Assuming threat object has a 'level' field
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
        }]
    };

    return (
        <div>
            <h2>Threat Level Over Time</h2>
            <Line data={chartData} />
        </div>
    );
};

export default Chart;
