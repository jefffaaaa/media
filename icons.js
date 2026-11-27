const ICON_PATHS = {
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20"/>',
  gamepad: '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 10.5v4M5 12.5h4M16 11.5h.01M18.5 14h.01"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  home: '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  cog: '<path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.3a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.5a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.3a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.3a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.5a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.3a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3L21 2M16 7l3 3M14 9l2 2"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  unlock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
  map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  volume: '<path d="M11 5L6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
  'volume-x': '<path d="M11 5L6 9H3v6h3l5 4zM22 9l-6 6M16 9l6 6"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  bolt: '<path d="M13 2L3 14h8l-1 8 10-12h-8z"/>',
  crown: '<path d="M3 7l4 4 5-7 5 7 4-4-2 12H5z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  'circle-check': '<circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/>',
  'circle-x': '<circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V18h6v-1.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  'arrow-up': '<path d="M12 19V5M6 11l6-6 6 6"/>',
  'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6"/>',
  laptop: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  tree: '<path d="M12 22v-5M12 3l-6 8h3l-5 7h16l-5-7h3z"/>',
  door: '<path d="M5 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M3 21h18M14 12h.01"/>',
  rock: '<path d="M3 17l3-8 5-3 6 3 4 7-3 4H6z"/>',
  radio: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
  refresh: '<path d="M21 12a9 9 0 0 0-15-6.7L3 8M3 3v5h5M3 12a9 9 0 0 0 15 6.7L21 16M16 16h5v5"/>',
  warning: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  'chevron-up': '<path d="M18 15l-6-6-6 6"/>',
  'chevron-down': '<path d="M6 9l6 6 6-6"/>',
  infinity: '<path d="M6 8a4 4 0 1 0 0 8c4 0 8-8 12-8a4 4 0 1 1 0 8c-4 0-8-8-12-8z"/>',
  medal: '<circle cx="12" cy="15" r="6"/><path d="M8.5 3L12 9l3.5-6"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
  package: '<path d="M21 8l-9-5-9 5v8l9 5 9-5zM3.3 7.5L12 12.5l8.7-5M12 22V12.5"/>',
  flame: '<path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-3 2-4 5-4 7-1-1-2-2-2-4-2 2-4 5-4 8a7 7 0 0 0 7 6z"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4M9 14h.01M15 14h.01"/>'
};

const EMOJI_ICON = {
  '📖': 'book', '📚': 'book', '🎮': 'gamepad', '🏆': 'trophy', '🏠': 'home', '🧭': 'compass', '🚪': 'door',
  '🔐': 'lock', '🔒': 'lock', '🔓': 'unlock', '🔑': 'key', '🗝': 'key', '⚙': 'cog', '🔥': 'flame', '⚠': 'warning',
  '📦': 'package', '📤': 'upload', '📥': 'download', '🔄': 'refresh', '🔁': 'refresh', '🖼': 'image', '💡': 'bulb',
  '❓': 'help', '❌': ['circle-x', 'bad'], '✅': ['circle-check', 'ok'], '✓': 'check', '🎉': 'sparkles', '✨': 'sparkles',
  '🌟': 'sparkles', '🎯': 'target', '👑': 'crown', '🎭': 'user', '💻': 'laptop', '🖥': 'monitor', '⚡': 'bolt',
  '🌲': 'tree', '⏱': 'clock', '⏰': 'clock', '🔊': 'volume', '🔇': 'volume-x', '➔': 'arrow-right', '➡': 'arrow-right',
  '⬆': 'arrow-up', '⬇': 'arrow-down', '⬅': 'arrow-left', '🗺': 'map', '🔘': 'radio', '⭕': 'radio', '🪨': 'rock',
  '📋': 'clipboard', '💾': 'save', '🗑': 'trash', '🔍': 'search', '➕': 'plus', '✏': 'edit', '🔼': 'chevron-up',
  '🔽': 'chevron-down', '♾': 'infinity', '🥇': ['medal', 'gold'], '🥈': ['medal', 'silver'], '🥉': ['medal', 'bronze'],
  '🚶': 'user', '🤖': 'bot'
};

const EMOJI_PATTERN = new RegExp('(' + Object.keys(EMOJI_ICON).join('|') + ')\\uFE0F?', 'gu');
const EMOJI_SKIP = '.char-avatar-preview, #user-avatar-initial, [data-keep-emoji], script, style, textarea, canvas';

function icon(name, size, tone) {
  const dim = size ? ` width="${size}" height="${size}"` : '';
  return `<svg class="ico${tone ? ' ico-' + tone : ''}"${dim} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]}</svg>`;
}

function emojiToIcon(ch) {
  const m = EMOJI_ICON[ch];
  return Array.isArray(m) ? icon(m[0], 0, m[1]) : icon(m);
}

function iconizeText(node) {
  const parent = node.parentElement;
  if (!parent || parent.closest(EMOJI_SKIP)) return;
  const text = node.nodeValue;
  EMOJI_PATTERN.lastIndex = 0;
  if (!EMOJI_PATTERN.test(text)) return;
  if (parent.tagName === 'OPTION') {
    node.nodeValue = text.replace(EMOJI_PATTERN, '').replace(/\s{2,}/g, ' ').trim();
    return;
  }
  const tpl = document.createElement('template');
  tpl.innerHTML = text.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])).replace(EMOJI_PATTERN, (_, ch) => emojiToIcon(ch));
  node.replaceWith(tpl.content);
}

function iconizeTree(root) {
  if (root.nodeType === 3) return iconizeText(root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(iconizeText);
}

if (typeof document !== 'undefined') {
  iconizeTree(document.body);
  new MutationObserver(list => {
    list.forEach(m => {
      if (m.type === 'characterData') iconizeText(m.target);
      m.addedNodes.forEach(n => (n.nodeType === 1 || n.nodeType === 3) && iconizeTree(n));
    });
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
}

if (typeof module !== 'undefined') module.exports = { ICON_PATHS, EMOJI_ICON, icon };
