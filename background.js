// Initialize the background script
console.log('Background script initialized');

// Enhanced category definitions with more comprehensive rules
const CATEGORY_RULES = {
  Work: {
    domains: [
      // Productivity & Office
      'docs.google.com', 'sheets.google.com', 'slides.google.com', 'drive.google.com',
      'office.com', 'office365.com', 'live.com', 'sharepoint.com', 'onedrive.com',
      'onenote.com', 'outlook.com', 'teams.microsoft.com', 'microsoftonline.com',
      
      // Project Management
      'trello.com', 'asana.com', 'monday.com', 'clickup.com', 'notion.so', 
      'airtable.com', 'basecamp.com', 'jira.com', 'atlassian.net', 'confluence.com',
      'smartsheet.com', 'wrike.com', 'teamwork.com', 'podio.com', 'workfront.com',
      
      // Communication
      'slack.com', 'zoom.us', 'meet.google.com', 'webex.com', 'gotomeeting.com',
      'miro.com', 'figma.com', 'lucidchart.com', 'draw.io', 'calendar.google.com',
      
      // Business Tools
      'salesforce.com', 'hubspot.com', 'zendesk.com', 'freshdesk.com', 'docusign.com',
      'dropbox.com', 'box.com', 'evernote.com', 'quip.com', 'adobe.com'
    ],
    domainScore: 10,
    keywords: [
      // Document Types
      'report', 'presentation', 'spreadsheet', 'document', 'analysis', 'proposal',
      'contract', 'invoice', 'budget', 'forecast', 'timeline', 'roadmap', 'plan',
      
      // Work Activities
      'meeting', 'project', 'task', 'deadline', 'milestone', 'sprint', 'backlog',
      'agenda', 'minutes', 'review', 'status', 'update', 'sync', 'standup',
      
      // Business Terms
      'client', 'customer', 'vendor', 'stakeholder', 'employee', 'department',
      'quarterly', 'fiscal', 'revenue', 'metric', 'kpi', 'okr', 'goal',
      
      // Common Work Phrases
      'action item', 'follow up', 'deliverable', 'priority', 'workflow', 'process',
      'strategy', 'initiative', 'objective', 'resource', 'schedule', 'timeline'
    ],
    keywordScore: 5,
    patterns: [
      // Date Patterns
      /\b(?:q[1-4]|quarterly)\s+(?:report|review|planning)\b/i,
      /\b(?:20\d{2}|'\d{2})\s*(?:forecast|planning|review)\b/i,
      /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(?:report|review)\b/i,
      
      // Meeting Patterns
      /\b(?:team|project|client|status|weekly|daily|monthly)\s+(?:meeting|sync|review|call)\b/i,
      /\b(?:1:1|one-on-one|all-hands|standup)\b/i,
      
      // Document Patterns
      /\b(?:v\d+|\d+\.\d+)\s*(?:draft|proposal|doc)\b/i,
      /\b(?:final|draft|internal|external)\s+(?:report|presentation|document)\b/i,
      
      // Project Patterns
      /\b(?:project|sprint|phase)\s*(?:#|\d+)\b/i,
      /\b(?:high|medium|low)\s+priority\b/i,
      /\b(?:in progress|completed|pending|blocked)\b/i
    ],
    patternScore: 8,
    fileExtensions: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf'],
    fileExtensionScore: 6
  },

  Development: {
    domains: [
      // Code Repositories & Version Control
      'github.com', 'gitlab.com', 'bitbucket.org', 'dev.azure.com', 'gist.github.com',
      
      // Documentation & Learning
      'stackoverflow.com', 'stackexchange.com', 'developer.mozilla.org', 'w3schools.com',
      'docs.microsoft.com', 'learn.microsoft.com', 'developers.google.com', 'reactjs.org',
      'vuejs.org', 'angular.io', 'nodejs.org', 'python.org', 'php.net', 'rust-lang.org',
      
      // Cloud & DevOps
      'aws.amazon.com', 'console.aws.amazon.com', 'cloud.google.com', 'azure.microsoft.com',
      'heroku.com', 'digitalocean.com', 'netlify.com', 'vercel.com', 'cloudflare.com',
      'docker.com', 'kubernetes.io', 'terraform.io',
      
      // Package Managers & Tools
      'npmjs.com', 'yarnpkg.com', 'pip.pypa.io', 'maven.apache.org', 'gradle.org',
      'nuget.org', 'packagist.org', 'rubygems.org', 'cocoapods.org',
      
      // IDEs & Development Tools
      'code.visualstudio.com', 'jetbrains.com', 'codepen.io', 'jsfiddle.net',
      'codesandbox.io', 'replit.com', 'glitch.com', 'codeshare.io'
    ],
    domainScore: 10,
    keywords: [
      // Programming Concepts
      'function', 'class', 'method', 'variable', 'array', 'object', 'string',
      'integer', 'boolean', 'null', 'undefined', 'async', 'await', 'promise',
      
      // Development Activities
      'code', 'debug', 'test', 'implement', 'refactor', 'optimize', 'deploy',
      'build', 'compile', 'execute', 'run', 'install', 'update', 'migrate',
      
      // Tools & Technologies
      'api', 'rest', 'graphql', 'sql', 'database', 'server', 'client', 'frontend',
      'backend', 'fullstack', 'framework', 'library', 'package', 'module',
      
      // Common Development Terms
      'repository', 'branch', 'commit', 'merge', 'pull request', 'issue', 'bug',
      'feature', 'release', 'version', 'dependency', 'documentation', 'sdk', 'api'
    ],
    keywordScore: 5,
    patterns: [
      // Version Patterns
      /\bv?\d+\.\d+(?:\.\d+)?(?:-[a-z]+(?:\.\d+)?)?\b/i,
      /\b(?:alpha|beta|rc|snapshot|release)\b/i,
      
      // Issue/PR Patterns
      /\b(?:PR|MR)[\s-]?#?\d+\b/i,
      /\b(?:issue|bug|ticket|story)[\s-]?#?\d+\b/i,
      
      // Branch Patterns
      /\b(?:feature|bugfix|hotfix|release)\/[\w-]+\b/i,
      /\b(?:main|master|develop|staging|production)\b/i,
      
      // Technical Patterns
      /\b(?:api|sdk|cli)\/[\w-]+\b/i,
      /\b(?:unit|integration|e2e)\s+tests?\b/i,
      /\b(?:dev|development|staging|prod|production)\b/i
    ],
    patternScore: 8,
    fileExtensions: [
      // Web Development
      '.html', '.css', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte',
      // Backend
      '.py', '.java', '.rb', '.php', '.go', '.rs', '.cs', '.cpp', '.c',
      // Config & Data
      '.json', '.yml', '.yaml', '.xml', '.env', '.config', '.lock', '.md'
    ],
    fileExtensionScore: 7,
    urlPatterns: [
      // Repository URLs
      /\/(?:blob|tree|commit|pull|issues|releases)\/[\w-]+/i,
      // Documentation URLs
      /\/(?:docs|api|reference|guide|tutorial|examples?)\//i,
      // Package URLs
      /\/(?:package|project|repository)\/[\w-]+/i
    ],
    urlPatternScore: 6
  },
// Add these category rules after Work and Development in CATEGORY_RULES
Shopping: {
  domains: [
    // Major E-commerce
    'amazon.com', 'ebay.com', 'walmart.com', 'target.com', 'bestbuy.com',
    'etsy.com', 'aliexpress.com', 'shopify.com', 'wayfair.com', 'newegg.com',
    
    // Fashion & Apparel
    'nike.com', 'adidas.com', 'nordstrom.com', 'macys.com', 'zara.com',
    'asos.com', 'hm.com', 'uniqlo.com', 'gap.com', 'forever21.com',
    
    // Specialty Retail
    'homedepot.com', 'ikea.com', 'chewy.com', 'sephora.com', 'ulta.com',
    'michaels.com', 'dickssportinggoods.com', 'rei.com', 'petco.com',
    
    // Digital Marketplaces
    'wish.com', 'overstock.com', 'groupon.com', 'mercari.com', 'poshmark.com',
    'reverb.com', 'cratejoy.com', 'stockx.com', 'goat.com'
  ],
  domainScore: 10,
  keywords: [
    // Shopping Actions
    'cart', 'checkout', 'buy', 'purchase', 'order', 'shop', 'deal', 'sale',
    'discount', 'coupon', 'promo', 'shipping', 'delivery', 'tracking',
    
    // Product Terms
    'product', 'item', 'price', 'review', 'rating', 'stock', 'inventory',
    'size', 'color', 'quantity', 'availability', 'in stock', 'out of stock',
    
    // Shopping Categories
    'electronics', 'clothing', 'shoes', 'furniture', 'accessories', 'jewelry',
    'books', 'toys', 'games', 'home', 'garden', 'beauty', 'sports', 'outdoor'
  ],
  keywordScore: 5,
  patterns: [
    // Price Patterns
    /\$\d+(?:\.\d{2})?/,
    /(?:price|cost):?\s*\$?\d+/i,
    
    // Product Patterns
    /\b(?:new|used)\s+(?:item|product)\b/i,
    /\b(?:free|fast|express)\s+shipping\b/i,
    
    // Order Patterns
    /order\s+#?\d+/i,
    /tracking\s+#?\d+/i,
    
    // Review Patterns
    /\d+(?:\.\d+)?\s*\/\s*5(?:\s+stars)?/i,
    /\b(?:verified|customer)\s+review/i
  ],
  patternScore: 8,
  urlPatterns: [
    /\/product\//i,
    /\/item\//i,
    /\/cart\b/i,
    /\/checkout\b/i,
    /\/order-status\//i,
    /\/wishlist\b/i
  ],
  urlPatternScore: 6
},

Social: {
  domains: [
    // Social Networks
    'facebook.com', 'instagram.com', 'twitter.com', 'linkedin.com', 'tiktok.com',
    'snapchat.com', 'pinterest.com', 'reddit.com', 'tumblr.com', 'vk.com',
    
    // Messaging & Communication
    'messenger.com', 'whatsapp.com', 'telegram.org', 'discord.com', 'slack.com',
    'teams.microsoft.com', 'signal.org', 'line.me', 'viber.com',
    
    // Community & Forums
    'quora.com', 'medium.com', 'discord.gg', 'twitch.tv', 'meetup.com',
    'nextdoor.com', 'strava.com', 'goodreads.com',
    
    // Dating
    'tinder.com', 'bumble.com', 'okcupid.com', 'match.com', 'hinge.co'
  ],
  domainScore: 10,
  keywords: [
    // Social Actions
    'post', 'share', 'like', 'comment', 'follow', 'friend', 'message', 'chat',
    'profile', 'status', 'update', 'feed', 'timeline', 'stream',
    
    // Social Content
    'photo', 'video', 'story', 'reel', 'tweet', 'thread', 'discussion',
    'group', 'community', 'event', 'meetup', 'hashtag', 'trending',
    
    // Engagement Terms
    'notification', 'mention', 'tag', 'react', 'reply', 'dm', 'pm',
    'connection', 'network', 'follower', 'following', 'subscriber'
  ],
  keywordScore: 5,
  patterns: [
    // Username Patterns
    /[@＠]\w+/,
    /\b(?:u|user)\/[\w-]+/i,
    
    // Hashtag Patterns
    /[#＃]\w+/,
    
    // Social Metrics
    /\b\d+\s*(?:likes?|comments?|shares?|views?|followers?)\b/i,
    
    // Common Social Patterns
    /\b(?:live|trending|viral)\b/i,
    /\b(?:dm|pm)\s+(?:me|you|them)\b/i
  ],
  patternScore: 8,
  urlPatterns: [
    /\/profile\//i,
    /\/messages?\//i,
    /\/notifications?\b/i,
    /\/feed\b/i,
    /\/stories?\b/i
  ],
  urlPatternScore: 6
},

Entertainment: {
  domains: [
    // Video Streaming
    'youtube.com', 'netflix.com', 'hulu.com', 'disney.com', 'primevideo.com',
    'hbomax.com', 'peacocktv.com', 'paramount.com', 'crunchyroll.com',
    'twitch.tv', 'vimeo.com', 'dailymotion.com',
    
    // Music
    'spotify.com', 'apple.music.com', 'pandora.com', 'soundcloud.com',
    'tidal.com', 'deezer.com', 'last.fm', 'bandcamp.com', 'genius.com',
    
    // Gaming
    'steam.com', 'epicgames.com', 'twitch.tv', 'xbox.com', 'playstation.com',
    'nintendo.com', 'roblox.com', 'minecraft.net', 'ea.com', 'ubisoft.com',
    
    // Entertainment News
    'imdb.com', 'rottentomatoes.com', 'metacritic.com', 'ign.com',
    'gamespot.com', 'polygon.com', 'variety.com', 'billboard.com'
  ],
  domainScore: 10,
  keywords: [
    // Media Types
    'video', 'movie', 'show', 'series', 'episode', 'season', 'trailer',
    'stream', 'watch', 'listen', 'play', 'game', 'gaming', 'playlist',
    
    // Entertainment Terms
    'entertainment', 'streaming', 'channel', 'subscribe', 'premium',
    'live', 'broadcast', 'performance', 'concert', 'festival',
    
    // Content Descriptors
    'popular', 'trending', 'featured', 'recommended', 'new release',
    'exclusive', 'original', 'premiere', 'launch', 'debut'
  ],
  keywordScore: 5,
  patterns: [
    // Media Patterns
    /s\d+e\d+/i, // Season/Episode
    /\b(?:full|complete)\s+(?:season|series)\b/i,
    /\b(?:official|extended|exclusive)\s+(?:trailer|video)\b/i,
    
    // Gaming Patterns
    /\b(?:gameplay|walkthrough|playthrough)\b/i,
    /\b(?:multiplayer|co-op|versus)\b/i,
    
    // Rating Patterns
    /\b(?:pg|pg-13|r|nc-17)\b/i,
    /\b(?:metacritic|imdb):\s*\d+/i
  ],
  patternScore: 8,
  urlPatterns: [
    /\/watch\//i,
    /\/player\//i,
    /\/episode\//i,
    /\/game\//i,
    /\/stream\//i
  ],
  urlPatternScore: 6
},

News: {
  domains: [
    // Major News Networks
    'cnn.com', 'bbc.com', 'reuters.com', 'apnews.com', 'bloomberg.com',
    'nytimes.com', 'wsj.com', 'washingtonpost.com', 'theguardian.com',
    'foxnews.com', 'nbcnews.com', 'abcnews.go.com', 'cbsnews.com',
    
    // News Aggregators
    'news.google.com', 'news.yahoo.com', 'msn.com', 'huffpost.com',
    'buzzfeed.com', 'vice.com', 'vox.com', 'axios.com', 'thehill.com',
    
    // Business News
    'forbes.com', 'businessinsider.com', 'cnbc.com', 'marketwatch.com',
    'ft.com', 'economist.com', 'barrons.com',
    
    // Tech News
    'techcrunch.com', 'theverge.com', 'wired.com', 'engadget.com',
    'arstechnica.com', 'zdnet.com', 'cnet.com'
  ],
  domainScore: 10,
  keywords: [
    // News Terms
    'news', 'breaking', 'latest', 'update', 'report', 'coverage',
    'headline', 'article', 'story', 'press', 'media', 'journalist',
    
    // Content Types
    'analysis', 'opinion', 'editorial', 'commentary', 'investigation',
    'exclusive', 'feature', 'interview', 'live blog', 'fact check',
    
    // Topics
    'politics', 'business', 'technology', 'science', 'health',
    'sports', 'entertainment', 'world', 'local', 'national'
  ],
  keywordScore: 5,
  patterns: [
    // Date Patterns
    /\b(?:breaking|developing|live):\s/i,
    /\b(?:minutes?|hours?)\s+ago\b/i,
    
    // News Patterns
    /\b(?:exclusive|breaking|developing)\b/i,
    /\b(?:report|source|official)\s+(?:says|confirms|denies)\b/i,
    
    // Citation Patterns
    /\b(?:according to|sources say)\b/i,
    /\b(?:reuters|ap|afp)\b/i
  ],
  patternScore: 8,
  urlPatterns: [
    /\/news\//i,
    /\/article\//i,
    /\/story\//i,
    /\/breaking\//i,
    /\/\d{4}\/\d{2}\/\d{2}\//i // Date-based URLs
  ],
  urlPatternScore: 6
},

Research: {
  domains: [
    // Academic Resources
    'scholar.google.com', 'academia.edu', 'researchgate.net', 'jstor.org',
    'sciencedirect.com', 'springer.com', 'wiley.com', 'nature.com',
    'science.org', 'ieee.org',
    
    // Educational Institutions
    'edu', 'ac.uk', 'ac.jp', 'uni-', '.university', 'college.edu',
    'oxford.ac.uk', 'cambridge.org', 'mit.edu', 'stanford.edu',
    
    // Research Organizations
    'nih.gov', 'who.int', 'cdc.gov', 'nasa.gov', 'nsf.gov',
    'worldbank.org', 'un.org', 'europa.eu', 'oecd.org',
    
    // Reference & Learning
    'arxiv.org', 'pubmed.ncbi.nlm.nih.gov', 'coursera.org', 'edx.org',
    'khan-academy.org', 'britannica.com', 'mendeley.com'
  ],
  domainScore: 10,
  keywords: [
    // Academic Terms
    'research', 'study', 'paper', 'journal', 'article', 'publication',
    'thesis', 'dissertation', 'abstract', 'methodology', 'analysis',
    
    // Scientific Terms
    'hypothesis', 'experiment', 'theory', 'data', 'results', 'findings',
    'conclusion', 'evidence', 'peer review', 'citation', 'reference',
    
    // Educational Terms
    'course', 'lecture', 'seminar', 'workshop', 'conference', 'symposium',
    'curriculum', 'education', 'learning', 'teaching', 'academic'
  ],
  keywordScore: 5,
  patterns: [
    // Citation Patterns
    /doi:\s*10\.\d{4,}/i,
    /\[\d+\]|\(\d{4}\)/,
    
    // Volume/Issue Patterns
    /vol\.\s*\d+/i,
    /issue\s*\d+/i,
    
    // Academic Patterns
    /\b(?:phd|md|ms|ba|bs|ma)\b/i,
    /\b(?:professor|dr|prof)\.\s+\w+/i
  ],
  patternScore: 8,
  fileExtensions: [
    '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.csv', '.xlsx',
    '.tex', '.bib', '.epub'
  ],
  fileExtensionScore: 7,
  urlPatterns: [
    /\/publication\//i,
    /\/research\//i,
    /\/journal\//i,
    /\/paper\//i,
    /\/abstract\//i
  ],
  urlPatternScore: 6
},

Travel: {
  domains: [
    // Travel Booking
    'booking.com', 'expedia.com', 'hotels.com', 'airbnb.com', 'vrbo.com',
    'kayak.com', 'priceline.com', 'tripadvisor.com', 'orbitz.com',
    
    // Airlines
    'united.com', 'aa.com', 'delta.com', 'southwest.com', 'ryanair.com',
    'easyjet.com', 'britishairways.com', 'lufthansa.com', 'emirates.com',
    
    // Transportation
    'uber.com', 'lyft.com', 'rentalcars.com', 'avis.com', 'hertz.com',
    'amtrak.com', 'eurail.com', 'rome2rio.com',
    
    // Travel Planning
    'maps.google.com', 'viator.com', 'lonelyplanet.com', 'roadtrippers.com',
    'visitacity.com', 'atlasobscura.com', 'seatguru.com'
  ],
  domainScore: 10,
  keywords: [
    // Travel Actions
    'book', 'reserve', 'travel', 'flight', 'hotel', 'vacation', 'trip',
    'tour', 'visit', 'explore', 'adventure', 'journey', 'destination',
    
    // Accommodation
    'hotel', 'resort', 'hostel', 'apartment', 'villa', 'cottage',
    'room', 'suite', 'accommodation', 'lodging', 'stay',
    
    // Transportation
    'flight', 'train', 'bus', 'car rental', 'taxi', 'transfer',
    'departure', 'arrival', 'terminal', 'airport', 'station'
  ],
  keywordScore: 5,
  patterns: [
    // Flight Patterns
    /\b[A-Z]{2}\d{3,4}\b/, // Flight numbers
    /\b(?:departure|arrival):\s*\d{1,2}:\d{2}\b/i,
    
    // Booking Patterns
    /\b(?:check-in|checkout):\s*\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    /\b\d+\s+nights?\b/i,
    
    // Location Patterns
    /\b(?:near|in|to)\s+(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
    /\b[A-Z]{3}-[A-Z]{3}\b/ // Airport codes
  ],
  patternScore: 8,
  urlPatterns: [
    /\/flights?\//i,
    /\/hotels?\//i,
    /\/booking\//i,
    /\/destination\//i,
    /\/places?\//i
  ],
  urlPatternScore: 6
},

Finance: {
  domains: [
    // Banking
    'chase.com', 'bankofamerica.com', 'wellsfargo.com', 'citibank.com',
    'capitalone.com', 'usbank.com', 'discover.com', 'ally.com',
    
    // Investment & Trading
    'robinhood.com', 'schwab.com', 'fidelity.com', 'vanguard.com',
    'etrade.com', 'tdameritrade.com', 'merrilledge.com', 'webull.com',
    
    // Crypto & Fintech
    'coinbase.com', 'binance.com', 'kraken.com', 'paypal.com', 'venmo.com',
    'cashapp.com', 'wise.com', 'revolut.com',
    
    // Financial News & Tools
    'finance.yahoo.com', 'marketwatch.com', 'investing.com', 'seekingalpha.com',
    'fool.com', 'mint.com', 'creditkarma.com', 'nerdwallet.com'
  ],
  domainScore: 10,
  keywords: [
    // Financial Terms
    'bank', 'account', 'balance', 'transfer', 'payment', 'transaction',
    'deposit', 'withdrawal', 'statement', 'budget', 'credit', 'debit',
    
    // Investment Terms
    'invest', 'stock', 'bond', 'fund', 'etf', 'portfolio', 'dividend',
    'trading', 'market', 'crypto', 'bitcoin', 'cryptocurrency',
    
    // Money Management
    'finance', 'money', 'savings', 'checking', 'loan', 'mortgage',
    'insurance', 'tax', 'retirement', 'ira', '401k', 'pension'
  ],
  keywordScore: 5,
  patterns: [
    // Money Patterns
    /\$\d+(?:,\d{3})*(?:\.\d{2})?/,
    /\b\d+(?:\.\d{1,2})?\s*(?:usd|eur|gbp|jpy|btc|eth)\b/i,
    
    // Account Patterns
    /\baccount\s+(?:ending|#)\s*\d{4}\b/i,
    /\b(?:routing|swift|iban)\s+(?:number|code)\b/i,
    
    // Market Patterns
    /\b(?:bull|bear)\s+market\b/i,
    /\b(?:up|down)\s+\d+(?:\.\d+)?%\b/
  ],
  patternScore: 8,
  urlPatterns: [
    /\/banking\//i,
    /\/invest(?:ing)?\//i,
    /\/trade\//i,
    /\/account\//i,
    /\/market\//i
  ],
  urlPatternScore: 6
}};

// Enhanced scoring system
const SCORING = {
  STRONG_MATCH: 20,
  GOOD_MATCH: 15,
  MEDIUM_MATCH: 10,
  WEAK_MATCH: 5,
  BONUS: {
    EXACT_DOMAIN_MATCH: 5,
    KEYWORD_IN_TITLE_START: 3,
    MULTIPLE_KEYWORDS: 2,
    PATTERN_MATCH: 4,
    URL_PATTERN_MATCH: 3,
    FILE_EXTENSION: 3,
    COMPOUND_MATCH: 5,
    CONTEXTUAL_MATCH: 4
  },
  PENALTIES: {
    WRONG_CONTEXT: -3,
    COMPETING_CATEGORY: -2,
    WEAK_MATCH: -1
  },
  THRESHOLDS: {
    CONFIDENT: 25,
    LIKELY: 15,
    POSSIBLE: 8
  }
};

// Add this near the top of background.js with other constants
const categoryColors = {
  'Work': 'grey',
  'Development': 'blue',
  'Shopping': 'green',
  'Social': 'pink',
  'Entertainment': 'purple',
  'News': 'red',
  'Research': 'yellow',
  'Travel': 'cyan',
  'Finance': 'orange',
  'Other': 'grey'
};

// Helper function to extract domain from URL
function getDomainFromUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch (e) {
    return '';
  }
}

// Helper function to extract file extension from URL
function getFileExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const extension = pathname.substring(pathname.lastIndexOf('.'));
    return extension.length <= 5 ? extension.toLowerCase() : '';
  } catch (e) {
    return '';
  }
}

// Add this helper function for compound patterns
function checkCompoundPattern(title, url, patterns) {
  let matches = 0;
  patterns.forEach(pattern => {
    if (pattern.test(title) || pattern.test(url)) {
      matches++;
    }
  });
  return matches >= 2; // Return true if multiple patterns match
}

// Enhanced categorization function
function categorizeTab(tab) {
  const domain = getDomainFromUrl(tab.url);
  const title = tab.title.toLowerCase();
  const extension = getFileExtension(tab.url);
  const scores = {};
  const debugInfo = {};
  const matchTypes = {}; // Track different types of matches

  // Initialize tracking
  Object.keys(CATEGORY_RULES).forEach(category => {
    scores[category] = 0;
    debugInfo[category] = [];
    matchTypes[category] = new Set();
  });

  // Calculate scores for each category
  Object.entries(CATEGORY_RULES).forEach(([category, rules]) => {
    let categoryScore = 0;
    const reasons = [];

    // Domain matching with improved context
    if (rules.domains?.some(d => {
      const isExactMatch = domain === d;
      const isPartialMatch = domain.includes(d);
      if (isExactMatch) {
        categoryScore += rules.domainScore + SCORING.BONUS.EXACT_DOMAIN_MATCH;
        reasons.push(`Exact domain match: ${d}`);
        matchTypes[category].add('domain');
        return true;
      } else if (isPartialMatch) {
        // Check if this is a subdomain of a known domain
        const domainParts = domain.split('.');
        const matchParts = d.split('.');
        if (domainParts.slice(-matchParts.length).join('.') === d) {
          categoryScore += rules.domainScore;
          reasons.push(`Subdomain match: ${d}`);
          matchTypes[category].add('domain');
          return true;
        }
        // Partial match with less confidence
        categoryScore += rules.domainScore * 0.7;
        reasons.push(`Partial domain match: ${d}`);
        matchTypes[category].add('domain');
        return true;
      }
      return false;
    })) {
      scores[category] += categoryScore;
    }

    // Keyword matching with context and proximity
    let keywordMatches = 0;
    let keywordProximity = false;
    let previousMatchIndex = -1;

    rules.keywords?.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      const titleWords = title.split(/\s+/);
      const keywordIndex = titleWords.findIndex(word => word.includes(keywordLower));

      if (keywordIndex !== -1) {
        keywordMatches++;
        let keywordScore = rules.keywordScore;

        // Check for keyword proximity
        if (previousMatchIndex !== -1 && Math.abs(keywordIndex - previousMatchIndex) <= 3) {
          keywordProximity = true;
        }
        previousMatchIndex = keywordIndex;

        // Bonus for keywords at start of title
        if (keywordIndex === 0) {
          keywordScore += SCORING.BONUS.KEYWORD_IN_TITLE_START;
          reasons.push(`Keyword "${keyword}" at title start`);
        }

        // Bonus for exact word match vs partial match
        if (titleWords[keywordIndex] === keywordLower) {
          keywordScore *= 1.2;
        }

        scores[category] += keywordScore;
        matchTypes[category].add('keyword');
        reasons.push(`Keyword match: ${keyword}`);
      }
    });

    // Bonus for keyword proximity
    if (keywordProximity) {
      scores[category] += SCORING.BONUS.CONTEXTUAL_MATCH;
      reasons.push('Keywords in close proximity');
    }

    // Bonus for multiple keyword matches
    if (keywordMatches > 1) {
      scores[category] += SCORING.BONUS.MULTIPLE_KEYWORDS * (keywordMatches - 1);
      reasons.push(`Multiple keyword bonus: ${keywordMatches} matches`);
    }

    // Pattern matching with compound patterns
    let patternMatches = 0;
    rules.patterns?.forEach(pattern => {
      if (pattern.test(title) || pattern.test(domain)) {
        patternMatches++;
        scores[category] += rules.patternScore;
        matchTypes[category].add('pattern');
        reasons.push(`Pattern match: ${pattern}`);
      }
    });

    // Compound pattern bonus
    if (patternMatches > 1) {
      scores[category] += SCORING.BONUS.COMPOUND_MATCH;
      reasons.push('Multiple pattern matches');
    }

    // URL pattern matching
    rules.urlPatterns?.forEach(pattern => {
      if (pattern.test(tab.url)) {
        scores[category] += rules.urlPatternScore;
        matchTypes[category].add('url');
        reasons.push(`URL pattern match: ${pattern}`);
      }
    });

    // File extension matching
    if (rules.fileExtensions?.includes(extension)) {
      scores[category] += rules.fileExtensionScore;
      matchTypes[category].add('extension');
      reasons.push(`File extension match: ${extension}`);
    }

    // Apply compound match bonus
    if (matchTypes[category].size >= 3) {
      scores[category] += SCORING.BONUS.COMPOUND_MATCH;
      reasons.push('Multiple match types bonus');
    }

    debugInfo[category] = reasons;
  });

  // Apply penalties for competing categories
  Object.entries(scores).forEach(([category, score]) => {
    if (score > 0) {
      // Check for competing categories
      Object.entries(scores).forEach(([otherCategory, otherScore]) => {
        if (otherCategory !== category && otherScore > 0) {
          // If two categories are close in score, apply penalty
          if (Math.abs(score - otherScore) < 5) {
            scores[category] += SCORING.PENALTIES.COMPETING_CATEGORY;
            debugInfo[category].push(`Competing category penalty: ${otherCategory}`);
          }
        }
      });
    }
  });

  // Find the best category
  let bestCategory = 'Other';
  let highestScore = 0;
  let confidence = 'low';

  Object.entries(scores).forEach(([category, score]) => {
    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
      
      if (score >= SCORING.THRESHOLDS.CONFIDENT) confidence = 'high';
      else if (score >= SCORING.THRESHOLDS.LIKELY) confidence = 'medium';
      else if (score >= SCORING.THRESHOLDS.POSSIBLE) confidence = 'low';
    }
  });

  // Log detailed categorization info for debugging
  console.debug('Tab Categorization:', {
    url: tab.url,
    title: tab.title,
    scores,
    bestCategory,
    confidence,
    reasons: debugInfo[bestCategory],
    matchTypes: matchTypes[bestCategory]
  });

  return highestScore >= SCORING.THRESHOLDS.POSSIBLE ? bestCategory : 'Other';
}

// Enhanced similar tabs detection with better matching
function findSimilarTabs(tabs) {
  const similarGroups = {};
  const domains = {};
  const urlPatterns = {};

  // Helper function to normalize text for comparison
  const normalize = text => text.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Helper function to calculate similarity between two strings
  function calculateSimilarity(str1, str2) {
    const a = normalize(str1);
    const b = normalize(str2);
    if (a === b) return 1;
    if (a.includes(b) || b.includes(a)) return 0.8;
    
    // Calculate Levenshtein distance for strings that are close in length
    if (Math.abs(a.length - b.length) <= 5) {
      const distance = levenshteinDistance(a, b);
      const maxLength = Math.max(a.length, b.length);
      const similarity = 1 - (distance / maxLength);
      return similarity;
    }
    return 0;
  }

  // Group tabs by domain first
  tabs.forEach(tab => {
    const domain = getDomainFromUrl(tab.url);
    if (!domains[domain]) {
      domains[domain] = [];
    }
    domains[domain].push(tab);

    // Extract URL pattern (path structure)
    try {
      const url = new URL(tab.url);
      const pathPattern = url.pathname.split('/').filter(Boolean).length;
      const key = `${domain}-${pathPattern}`;
      if (!urlPatterns[key]) {
        urlPatterns[key] = [];
      }
      urlPatterns[key].push(tab);
    } catch (e) {
      console.error('Error parsing URL:', e);
    }
  });

  // Find similar tabs within each domain group
  Object.entries(domains).forEach(([domain, domainTabs]) => {
    if (domainTabs.length > 1) {
      domainTabs.forEach(tab => {
        const similar = domainTabs.filter(t => {
          if (t.id === tab.id) return false;
          
          const titleSimilarity = calculateSimilarity(t.title, tab.title);
          const urlSimilarity = calculateSimilarity(t.url, tab.url);
          
          return titleSimilarity > 0.7 || urlSimilarity > 0.8;
        });

        if (similar.length > 0) {
          similarGroups[tab.id] = {
            tab,
            similar,
            similarity: Math.max(...similar.map(s => 
              calculateSimilarity(s.title, tab.title)
            ))
          };
        }
      });
    }
  });

  return similarGroups;
}

// Levenshtein distance calculation for string similarity
function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1,
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1
        );
      }
    }
  }

  return dp[m][n];
}

// Add this function to handle tab analysis
async function analyzeTabs(tabs) {
  try {
    const categorizedTabs = {};
    const createdGroupIds = [];
    
    // Initialize categories
    Object.keys(CATEGORY_RULES).forEach(category => {
      categorizedTabs[category] = [];
    });
    categorizedTabs['Other'] = [];
    
    // Categorize each tab
    tabs.forEach(tab => {
      const category = categorizeTab(tab);
      categorizedTabs[category].push(tab.id);
    });
    
    // Track successful and failed groups
    const results = {
      success: [],
      failed: []
    };
    
    // Create groups for non-empty categories
    for (const [category, tabIds] of Object.entries(categorizedTabs)) {
      if (tabIds.length > 0) {
        try {
          const groupId = await chrome.tabs.group({ tabIds });
          await chrome.tabGroups.update(groupId, {
            title: category,
            color: categoryColors[category] || 'grey'
          });
          createdGroupIds.push(groupId); // Track the group ID for auto-collapse
          results.success.push({
            category,
            count: tabIds.length
          });
        } catch (error) {
          console.error(`Error creating group for ${category}:`, error);
          results.failed.push({
            category,
            count: tabIds.length,
            error: error.message
          });
        }
      }
    }

    // Auto-collapse all created groups after 1 second
    if (createdGroupIds.length > 0) {
      autoCollapseGroups(createdGroupIds);
    }
    
    // Generate result HTML
    const resultHtml = `
      <div class="grouping-results">
        ${results.success.length > 0 ? `
          <div class="success-message">
            <i class="material-icons">check_circle</i>
            <div class="message-content">
              <p>Successfully created ${results.success.length} groups:</p>
              <ul>
                ${results.success.map(result => 
                  `<li>${result.category}: ${result.count} tabs</li>`
                ).join('')}
              </ul>
            </div>
          </div>
        ` : ''}
        
        ${results.failed.length > 0 ? `
          <div class="error-message">
            <i class="material-icons">error</i>
            <div class="message-content">
              <p>Failed to create ${results.failed.length} groups:</p>
              <ul>
                ${results.failed.map(result => 
                  `<li>${result.category}: ${result.count} tabs - ${result.error}</li>`
                ).join('')}
              </ul>
            </div>
          </div>
        ` : ''}
      </div>
    `;
    
    return resultHtml;
  } catch (error) {
    console.error('Error in analyzeTabs:', error);
    throw error;
  }
}

// Update the message handler to properly handle async operations
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background script received message:', request.action);
  
  if (request.action === 'analyzeTabs') {
    analyzeTabs(request.tabs)
      .then(result => {
        sendResponse({ result });
      })
      .catch(error => {
        sendResponse({ 
          result: `
            <div class="error-message">
              <i class="material-icons">error</i>
              <p>Failed to group tabs: ${error.message}</p>
            </div>
          `
        });
      });
    return true; // Keep message port open for async response
  }
  
  if (request.action === 'suggestClosures') {
    const similarTabs = findSimilarTabs(request.tabs);
    const suggestions = Object.values(similarTabs)
      .sort((a, b) => b.similarity - a.similarity)
      .map(({ tab, similar, similarity }) => ({
        title: tab.title,
        reason: `${Math.round(similarity * 100)}% similar to ${similar.length} other tab${similar.length > 1 ? 's' : ''} from ${getDomainFromUrl(tab.url)}`
      }));
    
    // Format the suggestions as HTML
    const suggestionsHtml = suggestions.length > 0 ? `
      <div class="suggestions">
        <h3>Suggested tabs to close (${suggestions.length} found):</h3>
        ${suggestions.map(suggestion => `
          <div class="tab-suggestion">
            <div class="tab-info">
              <p class="tab-title">${suggestion.title}</p>
              <p class="tab-reason">${suggestion.reason}</p>
            </div>
            <button class="close-tab-btn" data-tab-title="${suggestion.title.replace(/"/g, '&quot;')}">
              <i class="material-icons">close</i>
            </button>
          </div>
        `).join('')}
      </div>
    ` : `
      <div class="info-message">
        <i class="material-icons">info</i>
        <p>No duplicate or similar tabs found. Your tabs are well organized!</p>
      </div>
    `;
    
    sendResponse({ result: suggestionsHtml });
    return true;
  }
  
  if (request.action === 'ungroupTabs') {
    ungroupAllTabs()
      .then(result => {
        sendResponse({ result });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
    return true;
  }

  if (request.action === 'getAnalytics') {
    // Implement local analytics
    const tabs = request.tabs;
    const analytics = {
      totalTabs: tabs.length,
      byDomain: {},
      categories: {}
    };

    tabs.forEach(tab => {
      // Count by domain
      const domain = getDomainFromUrl(tab.url);
      analytics.byDomain[domain] = (analytics.byDomain[domain] || 0) + 1;

      // Count by category
      const category = categorizeTab(tab);
      analytics.categories[category] = (analytics.categories[category] || 0) + 1;
    });

    const analyticsHtml = `
      <div class="analytics-container">
        <div class="analytics-section">
          <h4><i class="material-icons">dashboard</i>Overview</h4>
          <div class="analytics-grid">
            <div class="analytics-card">
              <div class="analytics-number">${tabs.length}</div>
              <div class="analytics-label">Total Tabs</div>
            </div>
            <div class="analytics-card">
              <div class="analytics-number">${Object.keys(analytics.byDomain).length}</div>
              <div class="analytics-label">Unique Domains</div>
            </div>
          </div>
        </div>

        <div class="analytics-section">
          <h4><i class="material-icons">category</i>Categories</h4>
          ${Object.entries(analytics.categories)
            .filter(([_, count]) => count > 0)
            .map(([category, count]) => `
              <div class="domain-item">
                <div class="domain-info">
                  <span class="domain-name">${category}</span>
                  <span class="domain-count">${count} tabs (${Math.round(count/tabs.length*100)}%)</span>
                </div>
                <div class="domain-bar">
                  <div class="domain-bar-fill" style="width: ${(count/tabs.length)*100}%"></div>
                </div>
              </div>
            `).join('')}
        </div>

        <div class="analytics-section">
          <h4><i class="material-icons">domain</i>Top Domains</h4>
          ${Object.entries(analytics.byDomain)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([domain, count]) => `
              <div class="domain-item">
                <div class="domain-info">
                  <span class="domain-name">${domain}</span>
                  <span class="domain-count">${count} tabs (${Math.round(count/tabs.length*100)}%)</span>
                </div>
                <div class="domain-bar">
                  <div class="domain-bar-fill" style="width: ${(count/tabs.length)*100}%"></div>
                </div>
              </div>
            `).join('')}
        </div>
      </div>
    `;

    sendResponse({ result: analyticsHtml });
    return true;
  }
});

async function ungroupAllTabs() {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    for (const tab of tabs) {
      if (tab.groupId !== chrome.tabs.TAB_ID_NONE) {
        await chrome.tabs.ungroup(tab.id);
      }
    }
    return "All tabs have been ungrouped successfully!";
  } catch (error) {
    throw new Error("Failed to ungroup tabs: " + error.message);
  }
}

async function analyzeTabUsage(tabs) {
  try {
    const domainStats = new Map();
    const protocols = new Map();
    const now = Date.now();
    const timeCategories = {
      recent: 0,    // < 1 hour
      today: 0,     // < 24 hours
      older: 0      // > 24 hours
    };

    // New metrics
    const urlPatterns = {
      searchEngines: 0,
      socialMedia: 0,
      productivity: 0,
      multimedia: 0
    };

    const duplicateDomains = new Map();
    let totalMemoryEstimate = 0;
    let httpsCount = 0;

    tabs.forEach(tab => {
      try {
        const url = new URL(tab.url);
        const domain = url.hostname;
        
        // Domain stats
        domainStats.set(domain, (domainStats.get(domain) || 0) + 1);
        if (domainStats.get(domain) > 1) {
          duplicateDomains.set(domain, domainStats.get(domain));
        }
        
        // Protocol stats
        protocols.set(url.protocol, (protocols.get(url.protocol) || 0) + 1);
        if (url.protocol === 'https:') httpsCount++;
        
        // Time categories
        const age = now - (tab.lastAccessed || now);
        if (age < 3600000) timeCategories.recent++;
        else if (age < 86400000) timeCategories.today++;
        else timeCategories.older++;

        // URL pattern analysis
        if (url.hostname.includes('google') || url.hostname.includes('bing') || url.hostname.includes('duckduckgo')) {
          urlPatterns.searchEngines++;
        }
        if (url.hostname.includes('facebook') || url.hostname.includes('twitter') || url.hostname.includes('linkedin') || url.hostname.includes('instagram')) {
          urlPatterns.socialMedia++;
        }
        if (url.hostname.includes('docs.') || url.hostname.includes('sheets.') || url.hostname.includes('notion.') || url.hostname.includes('atlassian.')) {
          urlPatterns.productivity++;
        }
        if (url.hostname.includes('youtube') || url.hostname.includes('netflix') || url.hostname.includes('spotify')) {
          urlPatterns.multimedia++;
        }

        // Memory estimation (based on tab type)
        let tabMemory = 50; // Base memory usage in MB
        if (urlPatterns.multimedia) tabMemory += 100;
        if (url.hostname.includes('mail.')) tabMemory += 50;
        totalMemoryEstimate += tabMemory;

      } catch (e) {
        console.error('Error processing tab:', e);
      }
    });

    return generateAnalyticsHTML(
      tabs, 
      domainStats, 
      timeCategories, 
      {
        urlPatterns,
        duplicateDomains,
        totalMemoryEstimate,
        httpsCount,
        protocols
      }
    );
  } catch (error) {
    throw new Error("Failed to analyze tabs: " + error.message);
  }
}

function generateAnalyticsHTML(tabs, domainStats, timeCategories, additionalMetrics) {
  const { urlPatterns, duplicateDomains, totalMemoryEstimate, httpsCount, protocols } = additionalMetrics;
  const topDomains = Array.from(domainStats.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalTabs = tabs.length;
  
  return `
    <div class="analytics-container">
      <div class="analytics-section">
        <h4><i class="material-icons">dashboard</i>Overview</h4>
        <div class="analytics-grid">
          <div class="analytics-card">
            <div class="analytics-number">${totalTabs}</div>
            <div class="analytics-label">Total Tabs</div>
          </div>
          <div class="analytics-card">
            <div class="analytics-number">${domainStats.size}</div>
            <div class="analytics-label">Unique Domains</div>
          </div>
          <div class="analytics-card">
            <div class="analytics-number">${Math.round(totalMemoryEstimate)}</div>
            <div class="analytics-label">Est. Memory (MB)</div>
          </div>
          <div class="analytics-card">
            <div class="analytics-number">${httpsCount}</div>
            <div class="analytics-label">Secure (HTTPS)</div>
          </div>
        </div>
      </div>

      <div class="analytics-section">
        <h4><i class="material-icons">category</i>Tab Categories</h4>
        <div class="analytics-grid">
          <div class="analytics-card">
            <div class="analytics-number">${urlPatterns.searchEngines}</div>
            <div class="analytics-label">Search Engines</div>
          </div>
          <div class="analytics-card">
            <div class="analytics-number">${urlPatterns.socialMedia}</div>
            <div class="analytics-label">Social Media</div>
          </div>
          <div class="analytics-card">
            <div class="analytics-number">${urlPatterns.productivity}</div>
            <div class="analytics-label">Productivity</div>
          </div>
          <div class="analytics-card">
            <div class="analytics-number">${urlPatterns.multimedia}</div>
            <div class="analytics-label">Multimedia</div>
          </div>
        </div>
      </div>

      <div class="analytics-section">
        <h4><i class="material-icons">schedule</i>Tab Age Distribution</h4>
        <div class="time-breakdown">
          <div class="time-bar">
            ${Object.entries(timeCategories).map(([category, count]) => `
              <div class="time-segment ${category}" 
                   style="width: ${(count/totalTabs)*100}%"
                   title="${count} tabs">
                ${count}
              </div>
            `).join('')}
          </div>
          <div class="time-legend">
            <span>Last Hour (${timeCategories.recent})</span>
            <span>Today (${timeCategories.today})</span>
            <span>Older (${timeCategories.older})</span>
          </div>
        </div>
      </div>

      <div class="analytics-section">
        <h4><i class="material-icons">domain</i>Top Domains</h4>
        ${topDomains.map(([domain, count]) => `
          <div class="domain-item">
            <div class="domain-info">
              <span class="domain-name">${domain}</span>
              <span class="domain-count">${count} tabs (${Math.round(count/totalTabs*100)}%)</span>
            </div>
            <div class="domain-bar">
              <div class="domain-bar-fill" style="width: ${(count/totalTabs)*100}%"></div>
            </div>
          </div>
        `).join('')}
      </div>

      ${duplicateDomains.size > 0 ? `
        <div class="analytics-section">
          <h4><i class="material-icons">content_copy</i>Duplicate Domains</h4>
          ${Array.from(duplicateDomains.entries()).map(([domain, count]) => `
            <div class="domain-item">
              <div class="domain-info">
                <span class="domain-name">${domain}</span>
                <span class="domain-count">${count} duplicate tabs</span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="analytics-section">
        <h4><i class="material-icons">lightbulb</i>Insights</h4>
        <div class="insights-list">
          ${generateInsights(tabs, domainStats, timeCategories, additionalMetrics)}
        </div>
      </div>
    </div>
  `;
}

function generateInsights(tabs, domainStats, timeCategories, additionalMetrics) {
  const insights = [];
  const totalTabs = tabs.length;
  const { urlPatterns, duplicateDomains, totalMemoryEstimate, httpsCount } = additionalMetrics;
  
  // Performance insights
  if (totalTabs > 20) {
    insights.push({
      icon: 'memory',
      message: `High tab count (${totalTabs}) may impact browser performance`
    });
  }

  if (totalMemoryEstimate > 1000) {
    insights.push({
      icon: 'warning',
      message: `Estimated memory usage is high (${Math.round(totalMemoryEstimate/1000)}GB)`
    });
  }

  // Security insights
  if (httpsCount < totalTabs) {
    insights.push({
      icon: 'security',
      message: `${totalTabs - httpsCount} tabs are not using secure HTTPS connections`
    });
  }

  // Duplicate insights
  if (duplicateDomains.size > 0) {
    insights.push({
      icon: 'content_copy',
      message: `Found ${duplicateDomains.size} domains with multiple tabs open`
    });
  }

  // Time-based insights
  if (timeCategories.older > totalTabs * 0.5) {
    insights.push({
      icon: 'schedule',
      message: `${timeCategories.older} tabs (${Math.round(timeCategories.older/totalTabs*100)}%) are more than a day old`
    });
  }

  // Usage pattern insights
  if (urlPatterns.socialMedia > 5) {
    insights.push({
      icon: 'public',
      message: `High number of social media tabs (${urlPatterns.socialMedia}) may affect productivity`
    });
  }

  return insights.map(insight => `
    <div class="insight-item">
      <i class="material-icons">${insight.icon}</i>
      <span>${insight.message}</span>
    </div>
  `).join('');
}

// Add these event listeners at the bottom of background.js
chrome.tabs.onCreated.addListener((tab) => {
  console.log('New tab created:', tab.id);
  
  // We'll track this tab for URL changes
  chrome.tabs.onUpdated.addListener(function urlChangeListener(tabId, changeInfo, updatedTab) {
    // Only proceed if this is our tab and it has a new URL
    if (tabId === tab.id && changeInfo.url) {
      console.log('Tab URL changed:', tabId, changeInfo.url);
      
      // Ignore chrome:// URLs and new tab page
      if (!changeInfo.url.startsWith('chrome://') && changeInfo.url !== 'chrome://newtab/') {
        // Remove this listener since we only need it once per tab
        chrome.tabs.onUpdated.removeListener(urlChangeListener);
        // Wait a bit for the page to load and get its title
        setTimeout(() => handleNewTab(updatedTab), 1000);
      }
    }
  });
});

async function handleNewTab(tab) {
  try {
    console.log('Processing tab for auto-grouping:', tab);
    
    // Double check the URL is valid
    if (!tab.url || tab.url === 'chrome://newtab/' || tab.url.startsWith('chrome://')) {
      console.log('Skipping special tab:', tab.url);
      return;
    }

    // Check if there are any existing groups in the window
    const existingTabs = await chrome.tabs.query({ windowId: tab.windowId });
    const hasGroups = existingTabs.some(t => t.groupId !== -1);
    
    console.log('Has existing groups:', hasGroups);
    
    // Only proceed if there are existing groups
    if (hasGroups) {
      console.log('Attempting to auto-group tab:', tab.title);
      
      // Categorize the tab
      const category = categorizeTab(tab);
      console.log('Categorized as:', category);

      // Find existing group with this category
      const groups = await chrome.tabGroups.query({ windowId: tab.windowId });
      console.log('Existing groups:', groups);
      const matchingGroup = groups.find(g => g.title === category);

      if (matchingGroup) {
        console.log('Adding to existing group:', category);
        await chrome.tabs.group({
          groupId: matchingGroup.id,
          tabIds: [tab.id]
        });
      } else {
        console.log('Creating new group:', category);
        const groupId = await chrome.tabs.group({
          tabIds: [tab.id]
        });
        await chrome.tabGroups.update(groupId, {
          title: category,
          color: categoryColors[category] || 'grey'
        });
        // Auto-collapse the new group after 1 second
        autoCollapseGroups([groupId]);
      }
    }
  } catch (error) {
    console.error('Error in handleNewTab:', error);
  }
}

// Add this function to handle auto-collapsing groups
async function autoCollapseGroups(groupIds) {
  // Wait 1 second before collapsing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  for (const groupId of groupIds) {
    try {
      await chrome.tabGroups.update(groupId, { collapsed: true });
    } catch (error) {
      console.error('Error collapsing group:', error);
    }
  }
}

// Add this near the bottom of background.js
chrome.commands.onCommand.addListener(async (command) => {
  console.log('Command received:', command);
  
  try {
    switch (command) {
      case 'group-tabs':
        const tabs = await chrome.tabs.query({ currentWindow: true });
        const result = await analyzeTabs(tabs);
        console.log('Grouping result:', result);
        break;
        
      case 'ungroup-tabs':
        const ungroupResult = await ungroupAllTabs();
        console.log('Ungrouping result:', ungroupResult);
        break;
    }
  } catch (error) {
    console.error('Error handling command:', error);
  }
});
