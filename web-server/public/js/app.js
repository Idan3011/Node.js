console.log('Client side javascript loaded!');
var scripts = document.querySelectorAll('script[src*="location.js"]');
scripts.forEach(script => script.remove());