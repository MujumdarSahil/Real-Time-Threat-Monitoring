import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';

// Establish the socket connection (ensure server is running)
const socket = io('http://localhost:5000', {
    reconnectionAttempts: 3,  // Try to reconnect 3 times before failing
    transports: ['websocket', 'polling'], // Handle fallback transports
});

const ThreatDashboard = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Listen for the threat data event from the server
        socket.on('threat_data', (incomingData) => {
            if (Array.isArray(incomingData)) {
                setData(incomingData);
            } else {
                console.error("Invalid data format received:", incomingData);
            }
        });

        // Handle socket connection errors
        socket.on('connect_error', (err) => {
            setError('Connection error. Unable to fetch data from server.');
            console.error("Socket connection error:", err);
        });

        return () => {
            // Clean up socket connection when component unmounts
            socket.off('threat_data');  // Remove only the event listener
            socket.disconnect();  // Disconnect socket completely
        };
    }, []);

    // Sample chart data setup with default values when no data is available
    const chartData = {
        labels: data.length > 0 ? data.map(item => item.time) : [],
        datasets: [
            {
                label: 'Threats Over Time',
                data: data.length > 0 ? data.map(item => item.threatCount) : [],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,  // Smooth the line curve
            },
        ],
    };

    // Chart options for better readability
    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Threat Count',
                },
                beginAtZero: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
            <h1>Real-Time Threat Monitoring Dashboard</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div style={{ height: '400px' }}>
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default ThreatDashboard;
