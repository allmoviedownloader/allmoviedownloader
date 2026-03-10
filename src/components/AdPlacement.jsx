import React from 'react';

export default function AdPlacement({ id }) {
    return (
        <div 
            id={`ezoic-pub-ad-placeholder-${id}`} 
            className="ezoic-ad-container"
            style={{ margin: '2rem 0', minHeight: '50px', display: 'flex', justifyContent: 'center' }}
        >
            {/* Ezoic placeholder for ID: {id} */}
        </div>
    );
}
