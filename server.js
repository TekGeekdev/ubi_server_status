import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import * as cheerio from 'cheerio';

const app = express();
const PORT = process.env.PORT || 3001;

const STATUS_API_URL =
  'https://public-ubiservices.ubi.com/v1/applications/gameStatuses' +
  '?applicationIds=' + (process.env.UBI_STATUS_APP_IDS || '');

const UBI_APP_ID = process.env.UBI_APP_ID || '';

const PLATFORM_MAP = {
  pc: { name: 'PC', icon: 'pc' },
  orbis: { name: 'PlayStation', icon: 'ps4' },
  durango: { name: 'Xbox', icon: 'xbox' },
  stadia: { name: 'Stadia', icon: 'stadia' },
};

// Maps the API status to our internal status keys.
// When isMaintenance=true, Ubisoft shows the maintenance icon regardless of status value.
function resolveStatus(apiStatus, isMaintenance) {
  if (isMaintenance) return 'maintenance';
  const s = (apiStatus || '').toLowerCase();
  if (s === 'online') return 'online';
  if (s === 'degraded' || s === 'degradation') return 'degradation';
  if (s === 'interrupted') return 'interrupted';
  return 'online';
}

async function fetchStatus() {
  const res = await fetch(STATUS_API_URL, {
    headers: { 'ubi-appid': UBI_APP_ID },
  });

  if (!res.ok) throw new Error(`Ubisoft API HTTP ${res.status}`);
  const json = await res.json();

  const platforms = (json.gameStatuses || [])
    .map((gs) => {
      const platform = PLATFORM_MAP[(gs.platformType || '').toLowerCase()];
      if (!platform) return null;

      const status = resolveStatus(gs.status, gs.isMaintenance);
      const impacted = (gs.impactedFeatures || []).map((f) => ({
        name: f.name || f,
        status: resolveStatus(f.status, false),
      }));

      return {
        name: platform.name,
        icon: platform.icon,
        status,
        isMaintenance: !!gs.isMaintenance,
        impactedFeatures: impacted,
        raw: {
          applicationId: gs.applicationId,
          spaceId: gs.spaceId,
          apiStatus: gs.status,
        },
      };
    })
    .filter(Boolean);

  return {
    platforms,
    lastUpdated: json.lastModifiedAt || new Date().toISOString(),
    fetchedAt: new Date().toISOString(),
    source: 'live',
  };
}

function getMockData() {
  return {
    platforms: [
      { name: 'PC', icon: 'pc', status: 'online', isMaintenance: false, impactedFeatures: [] },
      { name: 'PlayStation 4', icon: 'ps4', status: 'online', isMaintenance: false, impactedFeatures: [] },
      { name: 'Xbox One', icon: 'xbox', status: 'online', isMaintenance: false, impactedFeatures: [] },
    ],
    lastUpdated: new Date().toISOString(),
    fetchedAt: new Date().toISOString(),
    source: 'fallback',
  };
}

const NEWS_URL = 'https://www.ubisoft.com/en-us/game/the-division/the-division-2/news-updates';
const NEWS_BASE = 'https://www.ubisoft.com';
const NEWS_CACHE = { data: null, fetchedAt: 0 };
const NEWS_CACHE_TTL = 10 * 60 * 1000; // 10 min

async function fetchNews() {
  const now = Date.now();
  if (NEWS_CACHE.data && now - NEWS_CACHE.fetchedAt < NEWS_CACHE_TTL) {
    return NEWS_CACHE.data;
  }

  const res = await fetch(NEWS_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });

  if (!res.ok) throw new Error(`Ubisoft news HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const articles = [];
  $('a[href*="news-updates"]').each((_, el) => {
    const a = $(el);
    const title = a.find('h2.updatesFeed__item__wrapper__content__title').text().trim();
    if (!title) return;

    const img = a.find('img').attr('src') || '';
    const abstract = a.find('p.updatesFeed__item__wrapper__content__abstract').text().trim();
    const readTime = a.find('.updatesFeed__item__wrapper__content__min').clone().children().remove().end().text().trim()
      + ' ' + a.find('.updatesFeed__item__wrapper__content__min [data-innertext="Min Read"]').text().trim();
    const href = a.attr('href') || '';

    const month = a.find('.date__month').text().trim();
    const day = a.find('.date__day').text().trim();
    const year = a.find('.date__year').text().trim();
    const date = [month, day, year].filter(Boolean).join(' ');

    articles.push({
      title,
      abstract,
      date,
      readTime: readTime.trim(),
      image: img,
      url: href.startsWith('http') ? href : NEWS_BASE + href,
    });
  });

  const data = { articles: articles.slice(0, 6), fetchedAt: new Date().toISOString() };
  NEWS_CACHE.data = data;
  NEWS_CACHE.fetchedAt = now;
  return data;
}

app.get('/api/news', async (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'no-cache');

  try {
    const data = await fetchNews();
    res.json(data);
  } catch (err) {
    console.error('Ubisoft news scrape error:', err.message);
    res.status(502).json({ articles: [], error: err.message });
  }
});

app.get('/api/status', async (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'no-cache');

  try {
    const data = await fetchStatus();
    res.json(data);
  } catch (err) {
    console.error('Ubisoft API error:', err.message);
    res.status(502).json({ ...getMockData(), error: err.message });
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, 'dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => res.sendFile(join(distPath, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`Division 2 Status API → http://localhost:${PORT}/api/status`);
});
