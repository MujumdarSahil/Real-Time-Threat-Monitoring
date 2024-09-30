import React from 'react';

const Alert = ({ data }) => {
    return (
        <div>
            <h2>Threat Alerts</h2>
            <ul>
                {data.map((threat, index) => (
                    <li key={index}>{threat.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default Alert;
