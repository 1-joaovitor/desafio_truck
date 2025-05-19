import React from 'react';

const escapeRegExp = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightText = (text: string, searchTerm: string): React.ReactNode => {
    if (!searchTerm) return text;

    const escapedTerm = escapeRegExp(searchTerm);
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span
                key={index}
                style={{
                  background: '#d9ff50', 
                  color: '#222',
                  borderRadius: '3px',
                  padding: '0 2px',
                }}
            >
                {part}
            </span>
        ) : (
            part
        )
    );
};

export default highlightText;
