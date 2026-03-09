import React from 'react';
import { DownloadCloud, PlayCircle, Star } from 'lucide-react';

export default function SiteCard({ site }) {
    const isWatch = site.actions.includes('watch') && !site.actions.includes('download');
    const isBoth = site.actions.includes('watch') && site.actions.includes('download');

    return (
        <a href={site.url} target="_blank" rel="noopener noreferrer" className={`site-card glass-panel ${site.recommended ? 'recommended-card' : ''}`}>
            {site.recommended && (
                <div className="recommended-badge">
                    <Star size={12} fill="currentColor" strokeWidth={0} /> RECOMMENDED
                </div>
            )}
            <div className="site-header">
                <h3 className="site-name">{site.name}</h3>
                <div className="action-icons">
                    {(isWatch || isBoth) && <PlayCircle size={20} className="action-icon watch" />}
                    {(!isWatch || isBoth) && <DownloadCloud size={20} className="action-icon download" />}
                </div>
            </div>
            <p className="site-description">{site.description}</p>
        </a>
    );
}
