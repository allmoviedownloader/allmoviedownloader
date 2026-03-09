import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ query, setQuery }) {
    return (
        <div className="search-container glass-panel">
            <Search className="search-icon" size={24} color="var(--text-secondary)" />
            <input
                type="text"
                className="search-input"
                placeholder="Try 'watch anime' or 'download movie'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
            />
        </div>
    );
}
