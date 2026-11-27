const cities = {
  jakarta:{name:'Jakarta',latitude:-6.21,longitude:106.85,timezone:'Asia/Jakarta'},
  incheon:{name:'Incheon',latitude:37.46,longitude:126.71,timezone:'Asia/Seoul'},
  pocheon:{name:'Pocheon',latitude:38.08,longitude:127.22,timezone:'Asia/Seoul'},
  nami:{name:'Nami Island',latitude:37.79,longitude:127.53,timezone:'Asia/Seoul'},
  sorak:{name:'Seoraksan / Sokcho',latitude:38.16,longitude:128.47,timezone:'Asia/Seoul'},
  seoul:{name:'Seoul',latitude:37.57,longitude:126.98,timezone:'Asia/Seoul'}
};
const schedule = [
  ['2026-11-29',['jakarta']],
  ['2026-11-30',['incheon','pocheon','nami','sorak']],
  ['2026-12-01',['sorak','seoul']],
  ['2026-12-02',['seoul']],
  ['2026-12-03',['seoul']],
  ['2026-12-04',['seoul']],
  ['2026-12-05',['seoul','incheon','jakarta']]
];
const forecasts = new Map();
let loading;

function condition(code) {
  if (code === 0) return ['☀️','Cerah'];
  if ([1,2].includes(code)) return ['🌤️','Cerah berawan'];
  if (code === 3) return ['☁️','Berawan'];
  if ([45,48].includes(code)) return ['🌫️','Berkabut'];
  if ([51,53,55,56,57].includes(code)) return ['🌦️','Gerimis'];
  if ([61,63,65,66,67,80,81,82].includes(code)) return ['🌧️','Hujan'];
  if ([71,73,75,77,85,86].includes(code)) return ['🌨️','Salju'];
  if ([95,96,99].includes(code)) return ['⛈️','Badai petir'];
  return ['🌡️','Cuaca'];
}

async function loadCity(id,city) {
  const key = `k-trip-weather-${id}`;
  try {
    const cached = JSON.parse(localStorage.getItem(key));
    if (cached?.daily?.time && cached.updated) forecasts.set(id,cached);
  } catch {}
  const cached = forecasts.get(id);
  if (cached && Date.now() - cached.updated < 30 * 60 * 1000) return;
  const params = new URLSearchParams({
    latitude:city.latitude, longitude:city.longitude, timezone:city.timezone, forecast_days:16,
    daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max'
  });
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`,{signal:AbortSignal.timeout(12000)});
    if (!response.ok) throw new Error('Forecast unavailable');
    const data = await response.json();
    if (!Array.isArray(data.daily?.time)) throw new Error('Invalid forecast');
    const result = {daily:data.daily,updated:Date.now()};
    forecasts.set(id,result);
    try { localStorage.setItem(key,JSON.stringify(result)); } catch {}
  } catch {}
}

function row(id,date) {
  const city = cities[id];
  const forecast = forecasts.get(id);
  const daily = forecast?.daily;
  const i = daily?.time.indexOf(date) ?? -1;
  const valid = i >= 0 && [daily.weather_code?.[i],daily.temperature_2m_min?.[i],daily.temperature_2m_max?.[i]].every(Number.isFinite);
  const link = document.createElement('a');
  link.className = 'weather-row';
  link.href = `https://weather.com/weather/tenday/l/${city.latitude},${city.longitude}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  const title = document.createElement('strong');
  title.textContent = city.name;
  link.append(title);
  const detail = document.createElement('span');
  if (valid) {
    const [emoji,label] = condition(daily.weather_code[i]);
    const rain = daily.precipitation_probability_max?.[i];
    detail.textContent = `${emoji} ${label} · ${Math.round(daily.temperature_2m_min[i])}–${Math.round(daily.temperature_2m_max[i])}°C${Number.isFinite(rain) ? ` · Peluang hujan ${rain}%` : ''}`;
    const updated = document.createElement('small');
    updated.textContent = `Data ${new Intl.DateTimeFormat('id-ID',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Jakarta'}).format(forecast.updated)} WIB`;
    link.append(detail,updated);
  } else {
    detail.textContent = 'Prakiraan tanggal ini belum tersedia. Lihat Weather.com ↗';
    link.append(detail);
  }
  return link;
}

export async function updateWeather() {
  if (!document.querySelector('[data-weather]')) return;
  loading ??= Promise.all(Object.entries(cities).map(([id,city]) => loadCity(id,city)));
  await loading;
  document.querySelectorAll('[data-weather]').forEach(container => {
    const [date,locations] = schedule[Number(container.dataset.weather)];
    const label = document.createElement('p');
    label.className = 'weather-caption';
    label.textContent = 'Data Open-Meteo · Ketuk kota untuk prakiraan di Weather.com ↗';
    container.replaceChildren(label,...locations.map(id => row(id,date)));
  });
}
