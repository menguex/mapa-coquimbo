/* ==========================================================================
   Coquimbo Icon System v2
   Grilla 24 × 24 · área viva 20 px (2 px de margen) · trazo 2 px
   Extremos y uniones redondeadas · keylines: círculo Ø20, cuadrado 18, rect. 16×20 / 20×16
   Los glifos se dibujan a 24 px nativos dentro del pin → trazos nítidos a 1×.
   ========================================================================== */
window.CATS = {
  pisco:      { color:'#8B3A62', dark:'#6A2649', tint:'#F7EAF0', es:'Tierra del Pisco',     en:'Land of Pisco',      short:{es:'Pisco',en:'Pisco'} },
  naturaleza: { color:'#1A6E7F', dark:'#0F5260', tint:'#E3F1F4', es:'Turismo y Naturaleza', en:'Tourism & Nature',   short:{es:'Naturaleza',en:'Nature'} },
  historia:   { color:'#A0561A', dark:'#7A3F0E', tint:'#F8ECDF', es:'Historia y Tradición', en:'History & Tradition',short:{es:'Historia',en:'History'} },
  flora:      { color:'#527D25', dark:'#3B5C17', tint:'#EDF4E3', es:'Flora y fauna',        en:'Flora & Fauna',      short:{es:'Flora y fauna',en:'Flora & fauna'} },
  poblado:    { color:'#2A2830', dark:'#16151A', tint:'#ECEAE6', es:'Ciudades y pueblos',   en:'Cities & towns',     short:{es:'Ciudades',en:'Towns'} }
};
window.CAT_ORDER = ['pisco','naturaleza','historia','flora','poblado'];
window.GLYPHS = {
  /* — Asentamientos — */
  regional:  { es:'Capital regional', en:'Regional capital', s:'<path d="M12 3.5l2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"/>' },
  provincial:{ es:'Capital provincial', en:'Provincial capital', s:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>' },
  comunal:   { es:'Capital comunal', en:'Municipal capital', s:'<circle cx="12" cy="12" r="6"/>' },
  pueblo:    { es:'Pueblo', en:'Village', s:'<path d="M4 20.5v-9L12 5l8 6.5v9z"/><path d="M10 20.5V16a2 2 0 0 1 4 0v4.5"/>' },
  /* — Tierra del Pisco — */
  pisquera:  { es:'Pisquera', en:'Pisco distillery', s:'<path d="M10 2.5h4"/><path d="M10.5 2.5v4.3c0 .6-.2 1.1-.6 1.5L8.6 9.6c-.4.4-.6.9-.6 1.5V20a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 16 20v-8.9c0-.6-.2-1.1-.6-1.5l-1.3-1.3c-.4-.4-.6-.9-.6-1.5V2.5"/><path d="M8 13.5h8M8 17.5h8"/>' },
  vina:      { es:'Viña', en:'Winery', s:'<circle cx="7.5" cy="10.5" r="2"/><circle cx="12" cy="10.5" r="2"/><circle cx="16.5" cy="10.5" r="2"/><circle cx="9.75" cy="14.75" r="2"/><circle cx="14.25" cy="14.75" r="2"/><circle cx="12" cy="19" r="2"/><path d="M12 8.5V3"/><path d="M12 5c1.4-1.7 3.8-2 5.5-.8-1.5 1.6-3.9 1.8-5.5.8z"/>' },
  cerveceria:{ es:'Cervecería', en:'Brewery', s:'<path d="M5.5 9h10v10.5a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2z"/><path d="M15.5 11.5H17a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2h-1.5"/><path d="M5.5 9.5A2.5 2.5 0 0 1 7.5 5.6a3 3 0 0 1 5.4-.4 2.5 2.5 0 0 1 2.6 4.3"/><path d="M8.5 12.5v6M12.5 12.5v6"/>' },
  planta:    { es:'Planta pisquera', en:'Pisco plant', s:'<path d="M2.5 21h19"/><path d="M4 21v-9.5l5 3v-3l5 3v-3l6 3.5V21"/><path d="M16.5 13.5V3.5h3v11"/><path d="M7.5 18h2M12.5 18h2"/>' },
  alambique: { es:'Alambique y cooperativa', en:'Still & cooperative', s:'<path d="M3.5 21h12"/><path d="M5 21v-6a4.5 4.5 0 0 1 9 0v6"/><path d="M9.5 10.5V7a3 3 0 0 1 3-3h1.5a5 5 0 0 1 5 5v5"/><path d="M17 14h4"/><path d="M19 17.5v1"/>' },
  cepa:      { es:'Cepas y vides', en:'Grape varieties', s:'<path d="M12 18.5 5 14.8l2.6-2.3-4.1-4.2 4.8.2L8 3.5l4 3 4-3-.3 5 4.8-.2-4.1 4.2 2.6 2.3z"/><path d="M12 18.5V10M12 14l-2.5-2.3M12 14l2.5-2.3"/><path d="M12 18.5v3"/>' },
  fiesta:    { es:'Fiesta tradicional', en:'Traditional festival', s:'<path d="M7 3h8l-.6 5.2a3.4 3.4 0 0 1-6.8 0z"/><path d="M11 11.6v8.4M7.5 20.5h7"/><path d="M18.5 4.5l1.5-1.5M19.5 8.5h2M18 12.5l1.2 1.2M2.5 6.5 4 7M3 11.5l1.4-.8"/>' },
  arriero:   { es:'Arrieros y rutas', en:'Muleteers & trails', s:'<path d="M6.8 20.5 5 12.5a7 7 0 0 1 14 0l-1.8 8"/><path d="M9.4 20.5 8.5 13a3.5 3.5 0 0 1 7 0l-.9 7.5"/><path d="M6.8 20.5h2.6M14.6 20.5h2.6"/>' },
  /* — Turismo y Naturaleza — */
  observatorio:{ es:'Observatorio', en:'Observatory', s:'<path d="M3 21h18"/><path d="M5 21v-7h14v7"/><path d="M5 14a7 7 0 0 1 14 0"/><path d="M11 9l5-5 2 2-4.6 5.2"/><path d="M10 17.5h4"/>' },
  montana:   { es:'Montaña y cordillera', en:'Mountains', s:'<path d="M2.5 20.5 9 8.5l4 6.5 2.5-3.5 6 9z"/><path d="M6.6 13 9 14.5l2-1.5"/>' },
  parque:    { es:'Parque nacional', en:'National park', s:'<path d="M12 2.5 7 9.2h2.8L5.5 14.8h3.3L4.5 20.5h15l-4.3-5.7h3.3l-4.3-5.6H17z"/><path d="M12 20.5v2"/>' },
  reserva:   { es:'Reserva y santuario', en:'Reserve & sanctuary', s:'<path d="M4.5 19.5C4.5 11 9.5 5 20 4.5 19.5 15 13.5 19.5 7 19.5z"/><path d="M4.5 19.5l9-9"/><path d="M9.5 14.5h4M12.5 11.5V8"/>' },
  fosil:     { es:'Fósiles y paleontología', en:'Fossils', s:'<path d="M12 20.5a8.5 8.5 0 1 1 8.5-8.5c0 3.3-2.6 5.8-5.8 5.8A4.3 4.3 0 0 1 10.4 13.5a3 3 0 0 1 3-3 1.8 1.8 0 0 1 1.8 1.8"/><path d="M12 3.5v3M18.7 6.5 16.5 8.6M3.5 12h3M5.3 18.6l2.2-2.1"/>' },
  embalse:   { es:'Embalse y agua', en:'Reservoir & water', s:'<path d="M3 5h18"/><path d="M5 5v3.5M19 5v3.5"/><path d="M3 12.5c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0"/><path d="M3 17.5c1.5-1.3 3-1.3 4.5 0s3 1.3 4.5 0 3-1.3 4.5 0 3 1.3 4.5 0"/>' },
  poza:      { es:'Poza y río', en:'Pool & river', s:'<path d="M12 3s6 6.3 6 10.8a6 6 0 0 1-12 0C6 9.3 12 3 12 3z"/><path d="M9.5 14.5A2.5 2.5 0 0 0 12 17"/>' },
  cascada:   { es:'Cascada', en:'Waterfall', s:'<path d="M3.5 4h17"/><path d="M8 4v9.5M12 4v12M16 4v9.5"/><path d="M3.5 19.5c1.4-1.1 2.8-1.1 4.2 0s2.8 1.1 4.3 0 2.8-1.1 4.3 0 2.8 1.1 4.2 0"/>' },
  puente:    { es:'Puente colgante', en:'Suspension bridge', s:'<path d="M2.5 15.5h19"/><path d="M5.5 20.5V4.5M18.5 20.5V4.5"/><path d="M5.5 5.5c2.8 6.5 10.2 6.5 13 0"/><path d="M9 9.5v6M12 10.5v5M15 9.5v6"/>' },
  playa:     { es:'Playa y costa', en:'Beach & coast', s:'<path d="M6.5 13a5.5 5.5 0 0 1 11 0"/><path d="M12 4.5V3M5.6 6.6l-1-1M18.4 6.6l1-1"/><path d="M2.5 17c1.6 0 2.4-1.2 4.8-1.2S10.5 17 12 17s2.3-1.2 4.7-1.2S20.9 17 22 17"/><path d="M5 21c1.3 0 2-.8 3.5-.8s2.2.8 3.5.8 2-.8 3.5-.8 2.2.8 3.5.8"/>' },
  pinguino:  { es:'Pingüinos y fauna marina', en:'Penguins & marine life', s:'<path d="M12 2.8c-2.1 0-3.7 1.7-3.7 3.8v2.6c-1.8 1.5-2.8 3.8-2.8 6.4 0 3.4 2.6 5.4 6.5 5.4s6.5-2 6.5-5.4c0-2.6-1-4.9-2.8-6.4V6.6c0-2.1-1.6-3.8-3.7-3.8z"/><path d="M10.2 11.2c-1.1 1.9-1.1 4.7.1 6.8h3.4c1.2-2.1 1.2-4.9.1-6.8"/><path d="M13.8 6.4 16.5 7l-2.7.8"/><path d="M11 6.2h.01"/>' },
  /* — Historia y Tradición — */
  iglesia:   { es:'Iglesia y santuario', en:'Church & shrine', s:'<path d="M12 2.5v4M10.3 4.2h3.4"/><path d="M8 21V10.2l4-3.6 4 3.6V21"/><path d="M3.5 21v-6.5L8 12M20.5 21v-6.5L16 12"/><path d="M2.5 21h19"/><path d="M10.5 21v-3a1.5 1.5 0 0 1 3 0v3"/>' },
  museo:     { es:'Museo y edificio patrimonial', en:'Museum & heritage building', s:'<path d="M3 21h18"/><path d="M3.5 9 12 4l8.5 5z"/><path d="M6 9.5v8.5M10 9.5v8.5M14 9.5v8.5M18 9.5v8.5"/><path d="M4 18.5h16"/>' },
  mercado:   { es:'Mercado y artesanía local', en:'Market & local crafts', s:'<path d="M3 9l2-5h14l2 5"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 12v8.5h14V12"/><path d="M10 20.5V16a2 2 0 0 1 4 0v4.5"/>' },
  cruz:      { es:'Monumento y mirador', en:'Monument & viewpoint', s:'<path d="M12 2.5v16M7 8h10"/><path d="M6.5 21.5l2.5-3h6l2.5 3z"/>' },
  ancla:     { es:'Puerto y caleta', en:'Port & cove', s:'<circle cx="12" cy="5" r="2"/><path d="M12 7v14"/><path d="M8.5 11h7"/><path d="M4.5 13.5a7.5 7.5 0 0 0 15 0"/><path d="M3 15l1.5-1.5L6 15M18 15l1.5-1.5L21 15"/>' },
  barco:     { es:'Piratas y navegantes', en:'Pirates & seafarers', s:'<path d="M3 16.5h18l-2.5 4.5h-13z"/><path d="M12 16.5V3"/><path d="M12 4l6.5 9.5H12"/><path d="M11 6.5 6 13.5h5"/>' },
  petroglifo:{ es:'Petroglifos y arte rupestre', en:'Petroglyphs & rock art', s:'<circle cx="12" cy="14" r="6.5"/><path d="M9.5 13h.01M14.5 13h.01"/><path d="M9.5 16.5h5"/><path d="M8.2 8.4 6.5 4M12 7.5V3M15.8 8.4 17.5 4"/>' },
  ceramica:  { es:'Cerámica y pueblos originarios', en:'Pottery & native peoples', s:'<path d="M9 3h6"/><path d="M10 3v2.6C6.6 7 5 10 5 13.5 5 18 8 21 12 21s7-3 7-7.5c0-3.5-1.6-6.5-5-7.9V3"/><path d="M5.5 11.5h13"/><path d="M7.5 15.5l2.25-2 2.25 2 2.25-2 2.25 2"/>' },
  mineral:   { es:'Piedras y minerales', en:'Stones & minerals', s:'<path d="M7 4h10l4 5-9 11.5L3 9z"/><path d="M3 9h18"/><path d="M10 4 8.5 9 12 20.5 15.5 9 14 4"/>' },
  mina:      { es:'Minería', en:'Mining', s:'<path d="M9 4.5c4.2-1 8.4 1 10.5 5.8"/><path d="M14.5 7.5 4.5 20"/><path d="M15 20.5h5.5"/>' },
  queso:     { es:'Quesos y productos locales', en:'Cheese & local produce', s:'<path d="M3 10.5 15 5l6 5.5"/><path d="M3 10.5h18V19H3z"/><circle cx="8" cy="14.5" r="1.5"/><circle cx="15.5" cy="13.75" r="1"/><path d="M11.5 19a1.6 1.6 0 0 1 3.2 0"/>' },
  cabra:     { es:'Crianceros y trashumancia', en:'Goat herders', s:'<path d="M8.5 10 10 18.3a2 2 0 0 0 4 0l1.5-8.3z"/><path d="M9 10C8.4 6.5 6.6 4.3 4 4.5"/><path d="M15 10c.6-3.5 2.4-5.7 5-5.5"/><path d="M8.5 11.2 5 12.2M15.5 11.2l3.5 1"/><path d="M11 20.3l1 1.7 1-1.7"/><path d="M10.5 13.5h.01M13.5 13.5h.01"/>' },
  molino:    { es:'Molino de piedra', en:'Stone mill', s:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3.5v6M12 14.5v6M3.5 12h6M14.5 12h6"/>' },
  fruta:     { es:'Frutos del valle', en:'Valley fruit', s:'<path d="M12 3c-2 0-3 1.8-3 4 0 1.5-3 3.5-3 8a6 6 0 0 0 12 0c0-4.5-3-6.5-3-8 0-2.2-1-4-3-4z"/><path d="M12 11c-1.3 0-2 1.6-2 3.5s.7 3.5 2 3.5 2-1.6 2-3.5-.7-3.5-2-3.5z"/>' },
  /* — Flora y fauna — */
  ave:       { es:'Aves', en:'Birds', s:'<path d="M3.5 16.5c3.2 0 5.5-1 7.5-3.3l3-3.6a3 3 0 0 1 5.2 1.3l1.8.6-1.9 1c0 4.1-3.6 7-8.1 7h-6z"/><path d="M9 15c2.1 0 4-1 5.2-3"/><path d="M10.5 19.5v2M13.5 19.2v2.3"/><path d="M16.8 10.3h.01"/>' },
  zorro:     { es:'Zorros', en:'Foxes', s:'<path d="M3.5 4 8.5 9h7l5-5-.5 8L12 20.5 4 12z"/><path d="M9 12.5h.01M15 12.5h.01"/><path d="M11 16.5h2"/>' },
  guanaco:   { es:'Guanaco', en:'Guanaco', s:'<path d="M15 4.5 16.5 3l3.7 2.6-.6 1.2H17V13l-1 1.6V21"/><path d="M15 4.5V12H8.5A2.5 2.5 0 0 0 6 14.5l.5 6.5"/><path d="M9.5 15.5 9 21"/><path d="M6 13l-1.5 1.5"/>' },
  roedor:    { es:'Roedores', en:'Rodents', s:'<path d="M4.5 18c0-4.5 3.4-8 7.6-8 2.8 0 4.7 1.6 6 3.6L21 15l-2.6 1.3c-.9 1.3-2.4 1.7-4 1.7z"/><circle cx="12.5" cy="9.5" r="2"/><path d="M17 13.8h.01"/><path d="M4.5 18c-1.6.2-2 1.8-.8 2.8"/><path d="M9 18v2M13 18v2"/>' },
  camaron:   { es:'Camarón de río', en:'River shrimp', s:'<path d="M7 7c6-3 12.5 0 12.5 6 0 4-3.1 7-7 7-2.3 0-4-1-5-2.5"/><path d="M7.5 17.5 4 19l1.3-3.7"/><path d="M15 8l-2.2 4.5M18.5 11.3 14.2 14M17.5 17l-3.7-2.4"/><path d="M7 7 3.5 4M8.8 6.3 6.3 2.8"/>' },
  lagartija: { es:'Reptiles', en:'Reptiles', s:'<circle cx="12" cy="4.5" r="2"/><path d="M12 6.5v7c0 3 2.4 4.4 3.9 5.5 1.4 1 .6 3.1-1.5 2.6"/><path d="M12 8.5 8.5 7.3 7.5 5.8M12 8.5l3.5-1.2 1-1.5M12 12.8l-3.5 2-1 1.6M12 12.8l3.5 2 1 1.6"/>' },
  cactus:    { es:'Cactus', en:'Cacti', s:'<path d="M10 21V5a2 2 0 0 1 4 0v16"/><path d="M14 13h2.5a2 2 0 0 0 2-2V8"/><path d="M10 15H7.5a2 2 0 0 1-2-2v-3"/><path d="M6 21h12"/>' },
  flor:      { es:'Flores nativas', en:'Native flowers', s:'<path d="M12 21.5V13"/><path d="M12 13.2c-3.2 0-5.6-2.6-5.6-6.6L9 8l3-4.5L15 8l2.6-1.4c0 4-2.4 6.6-5.6 6.6z"/><path d="M12 18c-1.8-2-4.4-2.2-6-1.2 1.6 2 4.2 2.2 6 1.2z"/>' },
  puya:      { es:'Chagual y puyas', en:'Puya plants', s:'<path d="M12 20.5V9"/><path d="M12 9.2 10.6 6.4 12 3l1.4 3.4z"/><path d="M12 20.5 4 13.5M12 20.5l8-7M12 20.5 7.5 11.5M12 20.5l4.5-9"/><path d="M3.5 21h17"/>' },
  arbol:     { es:'Árboles nativos', en:'Native trees', s:'<path d="M12 21.5v-8"/><path d="M12 16 9.2 13.6M12 14.6l2.8-2.4"/><path d="M7.4 16.2a4 4 0 0 1-.8-7.9 5.4 5.4 0 0 1 10.6-.6 4.2 4.2 0 0 1 .4 8.5z"/>' }
};
window.GLYPH_GROUPS = {
  poblado:['regional','provincial','comunal','pueblo'],
  pisco:['pisquera','vina','cerveceria','planta','alambique','cepa','fiesta','arriero'],
  naturaleza:['observatorio','montana','parque','reserva','fosil','embalse','poza','cascada','puente','playa','pinguino'],
  historia:['iglesia','museo','mercado','cruz','ancla','barco','petroglifo','ceramica','mineral','mina','queso','cabra','molino','fruta'],
  flora:['ave','zorro','guanaco','roedor','camaron','lagartija','cactus','flor','puya','arbol']
};
/* Shared SVG defs (gradients) injected once per document */
(function(){
  if (document.getElementById('cq-defs')) return;
  var d = document.createElement('div');
  d.innerHTML = '<svg id="cq-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'+
    '<linearGradient id="cqShine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".10"/></linearGradient>'+
    '<radialGradient id="cqShadow"><stop offset="0" stop-color="#1c140c" stop-opacity=".38"/><stop offset="1" stop-color="#1c140c" stop-opacity="0"/></radialGradient>'+
    '</defs></svg>';
  (document.body || document.documentElement).appendChild(d.firstChild);
})();
window.svgGlyph = function(key, size, opt){
  var g = GLYPHS[key]; if(!g) return '';
  var sw = (opt && opt.sw) || 2;
  return '<svg class="glyph" viewBox="0 0 24 24" width="'+(size||24)+'" height="'+(size||24)+'" fill="none" stroke="currentColor" stroke-width="'+sw+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+g.s+'</svg>';
};
/* Pin v2: insignia circular Ø36 con cola, anillo blanco, brillo sutil y sombra de contacto.
   Glifo a 24 px nativos → trazo nítido. Caja 44 × 56, ancla en (22, 52). */
window.pinSVG = function(cat, key){
  var c = CATS[cat];
  return '<svg class="pin-svg" viewBox="0 0 44 56" width="44" height="56" aria-hidden="true">'+
    '<ellipse class="pin-shadow" cx="22" cy="52" rx="9" ry="3" fill="url(#cqShadow)"/>'+
    '<path class="pin-body" d="M22 49.5 16 37.9A18 18 0 1 1 28 37.9z" fill="'+c.color+'" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>'+
    '<circle cx="22" cy="21" r="16.5" fill="url(#cqShine)" pointer-events="none"/>'+
    '<g transform="translate(10 9)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+GLYPHS[key].s+'</g>'+
  '</svg>';
};
/* Insignias de asentamientos (cartografía clásica) */
window.badgeSVG = function(rank){
  if(rank==='regional') return '<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><circle cx="16" cy="16" r="13.5" fill="#2A2830" stroke="#fff" stroke-width="2.5"/><g transform="translate(7 7) scale(.75)" fill="#F3C969" stroke="#F3C969" stroke-width="1.4" stroke-linejoin="round">'+GLYPHS.regional.s+'</g></svg>';
  if(rank==='provincial') return '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="#fff" stroke="#2A2830" stroke-width="3"/><circle cx="12" cy="12" r="4" fill="#2A2830"/></svg>';
  if(rank==='comunal') return '<svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><circle cx="9" cy="9" r="6.75" fill="#2A2830" stroke="#fff" stroke-width="2.5"/></svg>';
  return '<svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="4.5" fill="#fff" stroke="#2A2830" stroke-width="2"/></svg>';
};
/* Grupo: anillo segmentado (con separaciones) + conteo */
window.clusterHTML = function(counts, total){
  var size = total<10?46:total<25?54:62, r=size/2-4, C=2*Math.PI*r, gap=total>1?2.2:0, off=0, segs='';
  CAT_ORDER.forEach(function(k){ if(!counts[k]) return; var len=C*counts[k]/total;
    segs+='<circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="'+CATS[k].color+'" stroke-width="5" stroke-dasharray="'+Math.max(0.01,len-gap)+' '+(C-len+gap)+'" stroke-dashoffset="'+(-off)+'" transform="rotate(-90 '+size/2+' '+size/2+')"/>'; off+=len; });
  return '<div class="cluster" style="width:'+size+'px;height:'+size+'px"><svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" aria-hidden="true">'+
    '<circle cx="'+size/2+'" cy="'+size/2+'" r="'+(size/2-0.5)+'" fill="#fff"/>'+segs+'</svg><span>'+total+'</span></div>';
};
