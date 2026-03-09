export const sites = [
    // --- MOVIES ---
    {
        id: 'm1',
        name: 'Vegamovies Actor',
        url: 'https://vegamovies.actor',
        types: ['movie'],
        actions: ['download'],
        description: 'A popular hub for quick movie downloads.',
        recommended: false
    },
    {
        id: 'm2',
        name: 'Veganme XYZ',
        url: 'https://veganme.xyz',
        types: ['movie'],
        actions: ['download'],
        description: 'Clean direct download links for the latest releases.',
        recommended: false
    },
    {
        id: 'm3',
        name: 'Bollyflix Sarl',
        url: 'https://bollyflix.sarl',
        types: ['movie', 'anime'],
        actions: ['download'], // User listed as download, added to both based on description "Movie/ anime download"
        description: 'Extensive library of premium downloads. Fast & reliable.',
        recommended: true
    },
    {
        id: 'm4',
        name: '1Filmyfly',
        url: 'https://1filmyfly.org',
        types: ['movie'],
        actions: ['download'],
        description: 'Excellent resource for quick movie grabbing.',
        recommended: false
    },
    {
        id: 'm5',
        name: '9xflix',
        url: 'https://9xflix.kim',
        types: ['movie'],
        actions: ['download'],
        description: 'Top-tier curated list of pristine quality movies.',
        recommended: true
    },
    {
        id: 'm6',
        name: 'HDHub4u',
        url: 'https://hdhub4u.hn',
        types: ['movie', 'anime'],
        actions: ['download', 'watch'], // Assuming movie/anime general sites have both or download
        description: 'The premier destination for high-def entertainment.',
        recommended: true
    },
    {
        id: 'm7',
        name: 'Movies4u',
        url: 'https://movies4u.sc',
        types: ['movie', 'anime'],
        actions: ['download', 'watch'],
        description: 'Comprehensive hub for browsing what to watch next.',
        recommended: false
    },

    // --- ANIME ---
    {
        id: 'a1',
        name: 'Chia-Anime',
        url: 'https://chia-anime.su',
        types: ['anime'],
        actions: ['watch'],
        description: 'Classic destination to stream airing episodes quickly.',
        recommended: false
    },
    {
        id: 'a2',
        name: 'Deadtoons',
        url: 'https://deadtoons.org',
        types: ['anime'],
        actions: ['download', 'watch'],
        description: 'A legendary archive of retro and modern anime.',
        recommended: true
    },
    {
        id: 'a3',
        name: 'AnimeTM Dubbers',
        url: 'https://www.animetmdubbers.org',
        types: ['anime'],
        actions: ['download', 'watch'],
        description: 'Excellent source for dubbed streams and batches.',
        recommended: false
    },
    {
        id: 'a4',
        name: 'AnimeDekho',
        url: 'https://animedekho.app',
        types: ['anime'],
        actions: ['download', 'watch'],
        description: 'Smooth interface to watch your favorite shows.',
        recommended: false
    },
    {
        id: 'a5',
        name: 'CoolSanime',
        url: 'https://coolsanime.site',
        types: ['anime'],
        actions: ['download', 'watch'],
        description: 'A neat platform covering seasonal and trending anime.',
        recommended: false
    },
    {
        id: 'a6',
        name: 'AnimeDubHindi',
        url: 'https://www.animedubhindi.me',
        types: ['anime'],
        actions: ['download', 'watch'],
        description: 'Specifically curated for Hindi dubbed anime fans.',
        recommended: false
    },
    {
        id: 'a7',
        name: '9Anime',
        url: 'https://9anime.org.lv',
        types: ['anime'],
        actions: ['download', 'watch'],
        description: 'One of the best premium ad-free viewing experiences.',
        recommended: true
    },
    {
        id: 'a8',
        name: 'AniKaizoku',
        url: 'https://anikaizoku.com',
        types: ['anime'],
        actions: ['download'],
        description: 'The definitive source for perfectly encoded batches.',
        recommended: true
    }
];
