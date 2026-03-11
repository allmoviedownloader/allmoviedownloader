import { useState, useMemo, useEffect } from 'react';
import SiteCard from './components/SiteCard';
import { sites } from './data/sites';
import { ChevronLeft, Clapperboard, Tv, AlertCircle } from 'lucide-react';
import AdPlacement from './components/AdPlacement';

// Import local, guaranteed ultra-fast assets
import appLogo from './assets/logo.png';
const BASE_MOVIE_POSTERS = [
    '/posters/movies/m1.jpg', '/posters/movies/m2.jpg', '/posters/movies/m3.jpg', '/posters/movies/m4.jpg',
    '/posters/movies/m5.jpg', '/posters/movies/m6.jpg', '/posters/movies/m7.jpg', '/posters/movies/m8.jpg',
    '/posters/movies/m9.jpg', '/posters/movies/m11.jpg', '/posters/movies/m13.jpg', '/posters/movies/m14.jpg',
    '/posters/movies/m16.jpg', '/posters/movies/m18.jpg', '/posters/movies/m22.jpg', '/posters/movies/m23.jpg',
    '/posters/movies/m28.jpg'
];

const BASE_ANIME_POSTERS = Array.from({ length: 20 }, (_, i) => `/posters/anime/a${i + 1}.jpg`);

// Duplicate mathematically to generate a massive 60+ grid
const MOVIE_POSTERS = [...BASE_MOVIE_POSTERS, ...BASE_MOVIE_POSTERS, ...BASE_MOVIE_POSTERS, ...BASE_MOVIE_POSTERS];
const ANIME_POSTERS = [...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS];

// Utility to shuffle an array (Fisher-Yates)
const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

function StaticBundleWall({ category }) {
    // Determine the exact pool of 16 highly curated posters for the bundle view
    const pool = useMemo(() => {
        if (category === 'movie') return shuffleArray([...BASE_MOVIE_POSTERS]).slice(0, 16);
        // fallback duplicate anime to fill 16 slots if needed
        if (category === 'anime') return shuffleArray([...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS, ...BASE_ANIME_POSTERS]).slice(0, 16);
        return [];
    }, [category]);

    return (
        <section className="static-bundle-viewport" aria-hidden="true">
            <div className="static-bundle-grid">
                {pool.map((url, i) => (
                    <div 
                        key={`static-${i}`} 
                        className="poster-item static-poster" 
                        style={{ backgroundImage: `url(${url})` }}
                        role="img"
                        aria-label={`${category === 'movie' ? 'Movie' : 'Anime'} poster ${i + 1}`}
                    ></div>
                ))}
            </div>
            <div className="parallax-overlay"></div>
        </section>
    );
}

function ParallaxWall({ category, step }) {
    // If we have selected a category, switch entirely to the clean, fixed 12-poster bundle background
    if (step > 0) {
        return <StaticBundleWall category={category} />;
    }

    // Determine pool dynamically based on user category click state (Homepage mixed)
    const pool = useMemo(() => {
        return shuffleArray([...BASE_MOVIE_POSTERS, ...BASE_ANIME_POSTERS]);
    }, []);

    // Multiply pool massively to create a huge, endless grid that animates infinitely
    const massiveGrid = useMemo(() => {
        const grid = [];
        for (let i = 0; i < 4; i++) {
            grid.push(...pool); // Repeat pool 4 times for width
        }
        return grid;
    }, [pool]);

    // We split them into three immense tracks that slide backwards/forwards
    const track1 = massiveGrid.slice(0, 30);
    const track2 = massiveGrid.slice(30, 60);
    const track3 = massiveGrid.slice(60, 90);

    return (
        <section className="parallax-viewport" aria-hidden="true">
            {/* The 3D spinning container linked to mouse tracking */}
            <div className="parallax-inner">
                <div className="poster-track track-right">
                    {track1.map((url, i) => (
                        <div 
                            key={`tr1-${i}`} 
                            className="poster-item" 
                            style={{ backgroundImage: `url(${url})` }}
                            role="img"
                            aria-label="Trending search background poster"
                        ></div>
                    ))}
                </div>
                <div className="poster-track track-left">
                    {track2.map((url, i) => (
                        <div 
                            key={`tr2-${i}`} 
                            className="poster-item" 
                            style={{ backgroundImage: `url(${url})` }}
                            role="img"
                            aria-label="Popular media background poster"
                        ></div>
                    ))}
                </div>
                <div className="poster-track track-right">
                    {track3.map((url, i) => (
                        <div 
                            key={`tr3-${i}`} 
                            className="poster-item" 
                            style={{ backgroundImage: `url(${url})` }}
                            role="img"
                            aria-label="Latest release background poster"
                        ></div>
                    ))}
                </div>
            </div>
            {/* Dark overlay specifically integrated in Parallax */}
            <div className="parallax-overlay"></div>
        </section>
    );
}

function App() {
    const [step, setStep] = useState(0); // 0: Home, 1: Selection, 2: Watch/Download
    const [category, setCategory] = useState(null); // 'movie' or 'anime'
    const [action, setAction] = useState(null); // 'watch' or 'download'

    // Desktop: Update global CSS variables based on mouse position to tilt the background
    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15; // Max rotation 15deg
        const y = (e.clientY / window.innerHeight - 0.5) * -15; // Invert Y
        document.documentElement.style.setProperty('--mouse-x', `${y}deg`);
        document.documentElement.style.setProperty('--mouse-y', `${x}deg`);
    };

    // Gyroscope tracking for Mobile Parallax (Tilting phone)
    useEffect(() => {
        const handleOrientation = (e) => {
            if (!e.beta || !e.gamma) return;

            // beta: front-to-back tilt (-180 to 180)
            // gamma: left-to-right tilt (-90 to 90)
            // We map these to the same -15 to 15 deg range as mouse
            const x = Math.max(-15, Math.min(15, e.gamma / 2));
            const y = Math.max(-15, Math.min(15, -e.beta / 2));

            document.documentElement.style.setProperty('--mouse-x', `${y}deg`);
            document.documentElement.style.setProperty('--mouse-y', `${x}deg`);
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, []);

    // Permission request for iOS devices
    const requestPermission = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                await DeviceOrientationEvent.requestPermission();
            } catch (e) {
                console.error("Gyroscope permission denied", e);
            }
        }
    };

    // Preload extremely high res images lazily, prioritize first 5 so UI doesn't stutter building DOM
    useEffect(() => {
        const allPosters = [...BASE_MOVIE_POSTERS, ...BASE_ANIME_POSTERS];
        allPosters.forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    }, []);

    // Ezoic Ad Activation Logic
    useEffect(() => {
        if (window.ezstandalone && window.ezstandalone.cmd) {
            window.ezstandalone.cmd.push(function() {
                // For dynamic SPAs, it's best to destroy old placeholders before showing new ones
                // to avoid ID conflicts and unpredictable behavior.
                window.ezstandalone.destroyAll();
                window.ezstandalone.showAds();
            });
        }
        
        // Developer Helper: Log message if Ezoic Debugger is active in URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('ez_js_debugger')) {
            console.log("🛠️ FindMyShow: Ezoic Debug Mode is Active.");
        }
    }, [step]);

    const filteredSites = useMemo(() => {
        if (step !== 2) return [];
        return sites.filter(site =>
            site.types.includes(category) &&
            (action === 'both' ? (site.actions.includes('watch') || site.actions.includes('download')) : site.actions.includes(action))
        ).sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));
    }, [step, category, action]);

    const handleCategorySelect = (cat) => {
        requestPermission(); // Trigger iOS permission on first interaction
        setCategory(cat);
        setStep(1);
    };

    const handleActionSelect = (act) => {
        setAction(act);
        setStep(2);
    };

    const goBack = () => {
        if (step === 2) setStep(1);
        else if (step === 1) setStep(0);
    };

    const resetAll = () => {
        setStep(0);
        setCategory(null);
        setAction(null);
    };

    return (
        <div className="app-wrapper" onMouseMove={handleMouseMove}>
            <ParallaxWall category={category} step={step} />

            <div className="app-container">
                <header className="header-section">
                    <div className="brand" onClick={resetAll} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={appLogo} alt="FindMyShow Logo" className="app-logo" />
                        <h1 className="main-title" style={{ margin: 0 }}>FindMyShow</h1>
                    </div>
                    {step > 0 && (
                        <button className="back-btn" onClick={goBack}>
                            <ChevronLeft size={20} /> Back
                        </button>
                    )}
                </header>

                <main className="main-content">
                    {step === 0 && (
                        <div className="step-container animate-fade-in">
                            <h2 className="step-title">What do you want to see?</h2>
                            <div className="selection-grid">
                                <div className="selection-card movie-card" onClick={() => handleCategorySelect('movie')}>
                                    <div className="card-content">
                                        <Clapperboard size={48} />
                                        <span>Movies</span>
                                    </div>
                                </div>
                                <div className="selection-card anime-card" onClick={() => handleCategorySelect('anime')}>
                                    <div className="card-content">
                                        <Tv size={48} />
                                        <span>Anime</span>
                                    </div>
                                </div>
                            </div>

                            <div className="info-disclaimer animate-stagger" style={{ animationDelay: '0.2s' }}>
                                <p>
                                    All the websites listed here are carefully selected platforms where you can find everything you need in one place.
                                    We only share sources that are known to work properly and provide a smooth user experience.
                                    Our goal is to make it easier for users to access trusted websites without confusion.
                                </p>
                            </div>

                            <AdPlacement id="101" />
                        </div>
                    )}

                    {step === 1 && (
                        <div className="step-container animate-slide-right">
                            <h2 className="step-title">How do you want it?</h2>
                            <div className="selection-grid">
                                <div className="selection-card action-card watch" onClick={() => handleActionSelect('watch')}>
                                    <div className="card-content">
                                        <span>Online Watch</span>
                                    </div>
                                </div>
                                <div className="selection-card action-card download" onClick={() => handleActionSelect('download')}>
                                    <div className="card-content">
                                        <span>Download</span>
                                    </div>
                                </div>
                            </div>
                            <AdPlacement id="102" />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="results-container animate-fade-in">
                            <div className="results-header">
                                <h2 className="results-title">
                                    Websites for {action === 'watch' ? 'Watching' : 'Downloading'} {category === 'movie' ? 'Movies' : 'Anime'}
                                </h2>
                                <div className="results-badges">
                                    <span className="res-badge">{category}</span>
                                    <span className="res-badge">{action}</span>
                                </div>
                            </div>

                            <div className="traffic-disclaimer glass-panel animate-fade-in">
                                <AlertCircle className="traffic-icon" size={24} />
                                <div className="traffic-text">
                                    <strong>🚀 High Traffic Alert:</strong> Due to extreme demand, some servers may temporarily stop responding or load slowly. 
                                    If a site fails to open, safely return here and try our other premium alternatives below.
                                </div>
                            </div>

                            <AdPlacement id="103" />

                            {filteredSites.length > 0 ? (
                                <div className="sites-grid">
                                    {filteredSites.map((site, index) => (
                                        <div
                                            key={site.id}
                                            className="animate-stagger"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <SiteCard site={site} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-results glass-panel">
                                    <p>No websites found for this combination.</p>
                                    <button className="reset-btn" onClick={resetAll}>Try Again</button>
                                </div>
                            )}
                        </div>
                    )}
                </main>

                <footer className="seo-footer animate-fade-in">
                    <div className="seo-footer-content">
                        <section className="seo-text-block">
                            <h3>About FindMyShow - Your Ultimate Movie & Anime Hub</h3>
                            <p>
                                FindMyShow is India's leading aggregator for **Free Movie Finder** and **Watch Anime Free** services. 
                                We provide a seamless interface to discover the latest releases across official OTT platforms like Netflix, 
                                Crunchyroll, Disney+, and Prime Video. Our mission is to be the best **Movie Aggregator** and **Free OTT Hub**, 
                                ensuring you spend less time searching and more time watching.
                            </p>
                        </section>

                        <section className="seo-faq-grid">
                            <div className="faq-item">
                                <h4>Is FindMyShow free?</h4>
                                <p>Yes, 100% free with no registration required to find streaming links.</p>
                            </div>
                            <div className="faq-item">
                                <h4>Does it have latest movies?</h4>
                                <p>We aggregate links for the newest Bollywood, Hollywood, and South Indian movies daily.</p>
                            </div>
                            <div className="faq-item">
                                <h4>How to watch anime?</h4>
                                <p>Just click on the Anime category to find official Crunchyroll and free streaming links instantly.</p>
                            </div>
                        </section>

                        <div className="footer-bottom">
                            <p>&copy; 2026 FindMyShow. All rights reserved. | Optimized for High Performance & SEO.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
