(function(){
'use strict';
/* =========================================================
   i18n
   ========================================================= */
var I18N={
 es:{eyebrow:'Mapa interactivo',title:'Región de Coquimbo',subtitle:'Del mar a la cordillera por los valles del pisco: 119 lugares, 3 rutas temáticas y la naturaleza del norte chico.',
  search:'Buscar lugar, pisquera, valle…',searchM:'Buscar en la Región de Coquimbo',categories:'Categorías',showAll:'Mostrar todo',themRoutes:'Rutas temáticas',places:'Ciudades y pueblos',
  regional:'Capital regional',provincial:'Capital provincial',comunal:'Capital comunal',pueblo:'Pueblo',iconSystem:'Ver sistema de íconos',explore:'Explorar',hidePanel:'Ocultar panel',loading:'Preparando el mapa…',
  credits:'Contenido, textos y fotografías: <a href="https://www.herenciayfuturo.cl/mapa-de-coquimbo" target="_blank" rel="noopener">Fundación Herencia y Futuro</a>. Las ubicaciones de flora y fauna son referenciales.',
  directions:'Cómo llegar',website:'Sitio web',share:'Compartir',copied:'Enlace copiado',readMore:'Leer la ficha completa',readLess:'Mostrar menos',near:'Cerca de aquí',
  approx:'Ubicación referencial',noPhoto:'Sin fotografía disponible',noResults:'Sin resultados',noResultsSub:'Prueba con otra palabra o explora una categoría:',close:'Cerrar',
  imperdibles:'Imperdibles',howto:'Cómo llegar',stops:'paradas',placesN:'lugares',placesSuggest:'Lugares',typesSuggest:'Tipos de lugar',
  tapHint:'Toca un ícono para abrir su ficha',allOff:'Mostrando todas las categorías',creditsT:'Créditos del mapa',km:'km'},
 en:{eyebrow:'Interactive map',title:'Coquimbo Region',subtitle:'From the Pacific to the Andes through the pisco valleys: 119 places, 3 themed routes and the nature of Chile\'s semi-arid north.',
  search:'Search places, valleys…',searchM:'Search the Coquimbo Region',categories:'Categories',showAll:'Show all',themRoutes:'Themed routes',places:'Cities & towns',
  regional:'Regional capital',provincial:'Provincial capital',comunal:'Municipal capital',pueblo:'Village',iconSystem:'See the icon system',explore:'Explore',hidePanel:'Hide panel',loading:'Preparing the map…',
  credits:'Content, texts and photos: <a href="https://www.herenciayfuturo.cl/mapa-de-coquimbo" target="_blank" rel="noopener">Fundación Herencia y Futuro</a>. Flora and fauna locations are indicative.',
  directions:'Directions',website:'Website',share:'Share',copied:'Link copied',readMore:'Read the full entry',readLess:'Show less',near:'Nearby',
  approx:'Indicative location',noPhoto:'No photo available',noResults:'No results',noResultsSub:'Try another word or browse a category:',close:'Close',
  imperdibles:'Must-sees',howto:'Getting there',stops:'stops',placesN:'places',placesSuggest:'Places',typesSuggest:'Place types',
  tapHint:'Tap an icon to open its card',allOff:'Showing all categories',creditsT:'Map credits',km:'km'}
};
var ROUTES=[
 {id:'pisco',cat:'pisco',g:'vina',es:'Ruta del Pisco · Valle del Elqui',en:'Pisco Route · Elqui Valley',
  dEs:'De La Serena al corazón del valle: embalse, observatorio, pisqueras históricas y los pueblos de Paihuano.',dEn:'From La Serena to the heart of the valley: reservoir, observatory, historic distilleries and the villages of Paihuano.',
  stops:[2,5,15,4,24,25,7,9,10,11,26,27,28]},
 {id:'costa',cat:'naturaleza',g:'pinguino',es:'Costa y naturaleza',en:'Coast & nature',
  dEs:'Pingüinos de Humboldt, la bahía de Coquimbo, el bosque relicto de Fray Jorge y la costa de Los Vilos.',dEn:'Humboldt penguins, Coquimbo bay, the relict forest of Fray Jorge and the Los Vilos coast.',
  stops:[201,1,2,3,36,48,88]},
 {id:'historia',cat:'historia',g:'petroglifo',es:'Historia y tradición',en:'History & tradition',
  dEs:'Arte rupestre, pueblos de artesanos y piedras únicas del Limarí al Choapa.',dEn:'Rock art, craft villages and unique stones from Limarí to Choapa.',
  stops:[42,37,45,38,44,43,40,53,71,73,80]}
];
var LABEL_DIR={2:'top',3:'bottom',1:'right',4:'top',9:'right',21:'left',37:'left',38:'right',39:'right',40:'right',41:'left',71:'right',73:'right',88:'left',89:'left',
 6:'bottom',7:'top',10:'right',11:'left',12:'right',23:'right',44:'right',45:'bottom'};
var REDUCED=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var lang=(location.hash.match(/lang=(en|es)/)||[])[1]||'es';
var t=function(k){return I18N[lang][k]||k};
var byId={};PLACES.forEach(function(p){byId[p.id]=p});
var active={pisco:true,naturaleza:true,historia:true,flora:true,poblado:true};
var counts={};PLACES.forEach(function(p){counts[p.cat]=(counts[p.cat]||0)+1});
var selected=null,activeRoute=null;
var mq=window.matchMedia('(max-width:760px)');var isMobile=function(){return mq.matches};
var $=function(id){return document.getElementById(id)};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var ICON={
 pin:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
 web:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/></svg>',
 share:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7.5 7.5 12 3l4.5 4.5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>',
 x:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
 chevD:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
 chevL:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
 chevR:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
 arrow:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 search:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>'
};
function placeGlyph(p){return p.cat==='poblado'?(p.rank==='regional'?'regional':'pueblo'):p.g}
function toast(msg,ms){var el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(function(){el.classList.remove('show')},ms||2600)}

/* =========================================================
   Map
   ========================================================= */
var map=L.map('map',{zoomControl:false,attributionControl:false,minZoom:6,maxZoom:17,zoomSnap:.25,zoomDelta:.5,wheelPxPerZoomLevel:140,wheelDebounceTime:30,
 inertia:true,inertiaDeceleration:2400,inertiaMaxSpeed:2200,easeLinearity:.18,zoomAnimation:!REDUCED,markerZoomAnimation:!REDUCED,fadeAnimation:!REDUCED,bounceAtZoomLimits:false});
map.createPane('hill');map.getPane('hill').classList.add('hill-pane');map.getPane('hill').style.zIndex=250;map.getPane('hill').style.pointerEvents='none';
map.createPane('mask');map.getPane('mask').style.zIndex=300;map.getPane('mask').style.pointerEvents='none';
map.createPane('roads');map.getPane('roads').style.zIndex=310;map.getPane('roads').style.pointerEvents='none';map.getPane('roads').classList.add('roads-pane');
map.createPane('routes');map.getPane('routes').style.zIndex=420;
map.createPane('towns');map.getPane('towns').style.zIndex=590;
var ESRI='https://services.arcgisonline.com/arcgis/rest/services/';
var terrain=L.tileLayer(ESRI+'World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',{maxNativeZoom:9,maxZoom:10.75,className:'tiles-relief',keepBuffer:4}).addTo(map);
L.tileLayer(ESRI+'Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',{pane:'hill',maxNativeZoom:13,maxZoom:10.75,keepBuffer:4}).addTo(map);
L.tileLayer(ESRI+'Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',{pane:'roads',maxNativeZoom:11,maxZoom:10.75}).addTo(map);
L.tileLayer(ESRI+'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{minZoom:11,maxZoom:19,maxNativeZoom:16,className:'tiles-topo',keepBuffer:4}).addTo(map);

// region mask + outline
var polys=REGION.type==='MultiPolygon'?REGION.coordinates:[REGION.coordinates];
var holes=polys.map(function(pg){return pg[0].map(function(c){return [c[1],c[0]]})});
L.polygon([[[-10,-90],[-10,-40],[-50,-40],[-50,-90]]].concat(holes),{pane:'mask',stroke:false,fillColor:'#F6F2EA',fillOpacity:.6,interactive:false}).addTo(map);
L.polygon(holes,{pane:'mask',fill:false,color:'#7E6A50',weight:1.4,opacity:.6,interactive:false}).addTo(map);
var REGION_BOX=L.latLngBounds([-29.05,-71.75],[-32.25,-69.95]);

var geoLabels=[];
function drawGeo(){geoLabels.forEach(function(m){map.removeLayer(m)});geoLabels=[];
 [[[-30.75,-72.08],lang==='es'?'Océano Pacífico':'Pacific Ocean','geo-label',-82],[[-30.55,-69.72],'Argentina','geo-label ar',-80],
  [[-29.86,-70.93],lang==='es'?'Valle del Elqui':'Elqui Valley','valley-label',0],[[-30.47,-70.62],lang==='es'?'Valle del Limarí':'Limarí Valley','valley-label',0],[[-31.55,-70.62],lang==='es'?'Valle del Choapa':'Choapa Valley','valley-label',0]
 ].forEach(function(a){geoLabels.push(L.marker(a[0],{interactive:false,keyboard:false,icon:L.divIcon({className:'',html:'<div class="'+a[2]+'" style="transform:translate(-50%,-50%) rotate('+a[3]+'deg)">'+a[1]+'</div>',iconSize:[0,0]})}).addTo(map))});}

/* Routes */
var routeLayers={};
ROUTES.forEach(function(r){var g=ROUTE_GEO[r.id];if(!g)return;var c=CATS[r.cat].color;r.km=g.km;
 var casing=L.polyline(g.coords,{pane:'routes',color:'#fff',weight:7,opacity:.85,lineCap:'round',lineJoin:'round',interactive:false,smoothFactor:1.5});
 var line=L.polyline(g.coords,{pane:'routes',color:c,weight:3,opacity:.9,lineCap:'round',lineJoin:'round',smoothFactor:1.5});
 line.on('click',function(){toggleRoute(r.id,true)});
 routeLayers[r.id]={g:L.layerGroup([casing,line]).addTo(map),line:line,casing:casing};});
function styleRoutes(){ROUTES.forEach(function(r){var L2=routeLayers[r.id];if(!L2)return;var on=activeRoute===r.id,any=!!activeRoute;
 L2.line.setStyle({weight:on?5:3,opacity:any&&!on?.22:.9});L2.casing.setStyle({weight:on?10:7,opacity:any&&!on?.3:.85});if(on){L2.casing.bringToFront();L2.line.bringToFront()}})}

/* Markers */
var cluster=L.markerClusterGroup({showCoverageOnHover:false,spiderfyOnMaxZoom:true,disableClusteringAtZoom:13,animate:!REDUCED,
 maxClusterRadius:function(z){var mb=isMobile();return z<9?(mb?52:38):z<11?(mb?42:32):28},spiderLegPolylineOptions:{weight:1.5,color:'#5F5A52',opacity:.5},
 iconCreateFunction:function(cl){var cs={};cl.getAllChildMarkers().forEach(function(m){var c=m.options.place.cat;cs[c]=(cs[c]||0)+1});
  var n=cl.getChildCount(),s=n<10?46:n<25?54:62;return L.divIcon({html:clusterHTML(cs,n),className:'marker-cluster',iconSize:[s,s]})}});
var markers={};
function routeStops(){var r=ROUTES.filter(function(x){return x.id===activeRoute})[0];return r?r.stops:[]}
function poiIcon(p){var cls='mk'+(selected===p.id?' selected':'')+(activeRoute&&routeStops().indexOf(p.id)<0?' dim':'');
 return L.divIcon({className:'mk-wrap',html:'<div class="'+cls+'" data-cat="'+p.cat+'" style="color:'+CATS[p.cat].color+';--d:'+CATS[p.cat].dark+'"><span class="halo"></span>'+pinSVG(p.cat,p.g)+'</div>',iconSize:[44,56],iconAnchor:[22,52],tooltipAnchor:[18,-31]})}
function badgeIcon(p){var s={regional:32,provincial:24,comunal:18,pueblo:14}[p.rank];
 return L.divIcon({className:'mk-wrap',html:'<div class="badge-mk '+p.rank+(selected===p.id?' selected':'')+'" style="width:'+s+'px;height:'+s+'px">'+badgeSVG(p.rank)+'</div>',iconSize:[s,s],iconAnchor:[s/2,s/2]})}
var settlementLayer=L.layerGroup().addTo(map);
PLACES.forEach(function(p){var m;
 if(p.cat==='poblado'){var dir=LABEL_DIR[p.id]||'right';
  m=L.marker([p.lat,p.lng],{icon:badgeIcon(p),place:p,pane:'towns',keyboard:true,title:p.n[lang]});
  m.bindTooltip(p.n[lang],{permanent:true,direction:dir,className:'lbl '+p.rank,offset:dir==='left'?[-9,0]:dir==='right'?[9,0]:dir==='top'?[0,-9]:[0,9],opacity:1,interactive:false});
 }else{
  m=L.marker([p.lat,p.lng],{icon:poiIcon(p),place:p,riseOnHover:true,keyboard:true,title:p.n[lang],zIndexOffset:100});
  m.bindTooltip(p.n[lang],{permanent:true,direction:'right',className:'lbl poi',offset:[2,0],opacity:1,interactive:false});
  m.on('mouseover',function(){var e=m.getTooltip()&&m.getTooltip().getElement();if(e){e.classList.add('show');e.style.setProperty('--d',CATS[p.cat].dark)}});
  m.on('mouseout',function(){var e=m.getTooltip()&&m.getTooltip().getElement();if(e)e.classList.remove('show')});
  m.on('tooltipopen',function(){var e=m.getTooltip().getElement();if(e)e.style.setProperty('--d',CATS[p.cat].dark)});
 }
 m.on('click',function(){openPlace(p.id)});
 markers[p.id]=m;});
function refreshLayers(){var addC=[],remC=[],addS=[],remS=[];
 PLACES.forEach(function(p){var m=markers[p.id],town=p.cat==='poblado',on=active[p.cat];
  var has=town?settlementLayer.hasLayer(m):cluster.hasLayer(m);
  if(on&&!has)(town?addS:addC).push(m);if(!on&&has)(town?remS:remC).push(m)});
 if(remC.length)cluster.removeLayers(remC);if(addC.length)cluster.addLayers(addC);
 remS.forEach(function(m){settlementLayer.removeLayer(m)});addS.forEach(function(m){settlementLayer.addLayer(m)});}
function setCat(k,val){if(active[k]===val)return;active[k]=val;
 // fade out icons before removal (transform/opacity only)
 if(!val&&!REDUCED){document.querySelectorAll('.mk[data-cat="'+k+'"]').forEach(function(e){e.classList.add('leaving')});setTimeout(function(){refreshLayers()},190)}else refreshLayers();
 if(!Object.keys(active).some(function(x){return active[x]})){Object.keys(active).forEach(function(x){active[x]=true});refreshLayers();toast(t('allOff'))}
 renderFilters();}
refreshLayers();map.addLayer(cluster);
function refreshIcons(){PLACES.forEach(function(p){markers[p.id].setIcon(p.cat==='poblado'?badgeIcon(p):poiIcon(p))});cluster.refreshClusters()}
function zoomClass(){var z=map.getZoom(),c=map.getContainer();var k=z<8?'z-lo':z<9.5?'z-mid':z<11?'z-near':'z-hi';
 if(c.dataset.z!==k){['z-lo','z-mid','z-near','z-hi'].forEach(function(x){c.classList.remove(x)});c.classList.add(k);c.dataset.z=k}}
map.on('zoomend',zoomClass);
/* Label collision: greedy by priority, hides overlapping labels (opacity only) */
var PRI={regional:0,provincial:1,comunal:2,pueblo:4,poi:3};
function declutter(){var c=map.getContainer();var els=[].slice.call(c.querySelectorAll('.leaflet-tooltip.lbl'));
 els.forEach(function(e){e.classList.remove('clash')});
 var items=els.map(function(e){var k=(e.className.match(/\b(regional|provincial|comunal|pueblo|poi)\b/)||[])[1];var z=c.dataset.z,sh=e.classList.contains('show');
   var vis=sh||!(k==='poi'&&z!=='z-hi'||(k==='comunal'||k==='pueblo')&&z==='z-lo'||k==='pueblo'&&z==='z-mid');
   return {e:e,p:sh?-1:(PRI[k]==null?5:PRI[k]),vis:vis}}).filter(function(i){return i.vis});
 items.sort(function(a,b){return a.p-b.p});var placed=[];
 items.forEach(function(i){var r=i.e.getBoundingClientRect();if(!r.width)return;var pad=3;
  var hit=placed.some(function(q){return r.left-pad<q.right&&r.right+pad>q.left&&r.top-pad<q.bottom&&r.bottom+pad>q.top});
  if(hit)i.e.classList.add('clash');else placed.push(r)})}
var _dc;function scheduleDeclutter(){clearTimeout(_dc);_dc=setTimeout(declutter,REDUCED?0:280)}
map.on('zoomend moveend layeradd',scheduleDeclutter);

/* =========================================================
   Camera helpers (smooth, panel-aware)
   ========================================================= */
function insets(){var w=window.innerWidth,h=window.innerHeight;
 if(isMobile())return {l:0,r:0,t:118,b:selected?h*0.6:150};
 var ex=$('explore').classList.contains('collapsed')?0:(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--panel-w'))||368)+16;
 return {l:ex,r:selected?408+16:0,t:0,b:0};}
function fly(latlng,zoom,opt){var ins=insets(),size=map.getSize();
 var dx=(ins.l-ins.r)/2,dy=(ins.t-ins.b)/2;var tp=map.project(latlng,zoom).subtract(L.point(dx,dy));var c=map.unproject(tp,zoom);
 if(REDUCED||(opt&&opt.instant))map.setView(c,zoom,{animate:false});else map.flyTo(c,zoom,{duration:(opt&&opt.duration)||1.0,easeLinearity:.22});}
function fitBox(b,opt){var ins=insets();var px=(opt&&opt.pad!=null)?opt.pad:72;var o={paddingTopLeft:[ins.l+px,ins.t+px*.9],paddingBottomRight:[ins.r+px+16,ins.b+px*.9]};
 if(REDUCED||(opt&&opt.instant))map.fitBounds(b,Object.assign({animate:false},o));else map.flyToBounds(b,Object.assign({duration:1.1,easeLinearity:.22},o));}
function fitRegion(instant){fitBox(REGION_BOX,{instant:instant,pad:28})}

/* =========================================================
   Explore panel: categories, routes, key
   ========================================================= */
var mini={pisco:'pisquera',naturaleza:'observatorio',historia:'petroglifo',flora:'guanaco'};
function renderFilters(){
 // desktop list
 var h='';CAT_ORDER.forEach(function(k){var c=CATS[k];
  var pin=k==='poblado'?'<span class="pin-mini" style="display:grid;place-items:center">'+badgeSVG('provincial')+'</span>':'<span class="pin-mini">'+pinSVG(k,mini[k])+'</span>';
  var sub=k==='poblado'?(lang==='es'?'Capitales y localidades':'Capitals and villages'):GLYPH_GROUPS[k].slice(0,3).map(function(g){return GLYPHS[g][lang]}).join(' · ');
  h+='<button class="cat-row" data-cat="'+k+'" aria-pressed="'+active[k]+'" style="--c:'+c.color+'">'+pin+'<span class="nm"><b>'+c[lang]+'</b><small>'+esc(sub)+'</small></span><span class="count">'+counts[k]+'</span><span class="switch" aria-hidden="true"></span></button>'});
 $('catList').innerHTML=h;
 $('allCats').classList.toggle('show',!Object.keys(active).every(function(x){return active[x]}));
 // mobile chips
 var ch='';CAT_ORDER.forEach(function(k){var c=CATS[k];var g={pisco:'vina',naturaleza:'observatorio',historia:'petroglifo',flora:'cactus',poblado:'pueblo'}[k];
  ch+='<button class="chip" data-cat="'+k+'" aria-pressed="'+active[k]+'" style="--c:'+c.color+';--d:'+c.dark+';--t:'+c.tint+'"><i>'+svgGlyph(g,15)+'</i>'+c.short[lang]+'<span class="n">'+counts[k]+'</span></button>'});
 $('chips').innerHTML=ch;}
$('catList').addEventListener('click',function(e){var b=e.target.closest('.cat-row');if(!b)return;var k=b.dataset.cat;
 if(e.altKey||e.metaKey){CAT_ORDER.forEach(function(x){setCat(x,x===k)})}else setCat(k,!active[k])});
$('chips').addEventListener('click',function(e){var b=e.target.closest('.chip');if(b)setCat(b.dataset.cat,!active[b.dataset.cat])});
$('allCats').onclick=function(){CAT_ORDER.forEach(function(x){setCat(x,true)})};
function renderRoutes(){var h='';ROUTES.forEach(function(r){var c=CATS[r.cat];
 h+='<div class="route'+(activeRoute===r.id?' on':'')+'" data-route="'+r.id+'" style="--c:'+c.color+';--d:'+c.dark+';--t:'+c.tint+'">'+
  '<button class="route-hd" aria-expanded="'+(activeRoute===r.id)+'"><span class="route-ic">'+svgGlyph(r.g,22)+'</span><span><b>'+r[lang]+'</b><small>'+r.stops.length+' '+t('stops')+(r.km?' · ~'+r.km+' km':'')+'</small></span><span class="chev">'+ICON.chevD+'</span></button>'+
  '<div class="route-body"><div><p>'+r[lang==='es'?'dEs':'dEn']+'</p><ol class="stops">'+r.stops.map(function(id,i){var p=byId[id];return '<li data-id="'+id+'"><span class="n">'+(i+1)+'</span>'+esc(p.n[lang])+'<small>'+esc(p.cat==='poblado'?t(p.rank):GLYPHS[p.g][lang])+'</small></li>'}).join('')+'</ol></div></div></div>'});
 $('routeList').innerHTML=h;}
$('routeList').addEventListener('click',function(e){var li=e.target.closest('li[data-id]');if(li){openPlace(+li.dataset.id);return}
 var hd=e.target.closest('.route-hd');if(hd)toggleRoute(hd.parentNode.dataset.route)});
function toggleRoute(id,force){activeRoute=(activeRoute===id&&!force)?null:id;styleRoutes();refreshIcons();
 document.querySelectorAll('.route').forEach(function(el){var on=el.dataset.route===activeRoute;el.classList.toggle('on',on);el.querySelector('.route-hd').setAttribute('aria-expanded',on)});
 if(activeRoute){if(selected)closeCard(true);if(isMobile())exploreSheet.snap(1);setTimeout(function(){fitBox(routeLayers[id].line.getBounds())},isMobile()?60:0)}}
function renderKey(){$('badgeKey').innerHTML=['regional','provincial','comunal','pueblo'].map(function(r){return '<div><span class="b">'+badgeSVG(r)+'</span>'+t(r)+'</div>'}).join('')}

// collapse panel (desktop)
$('collapse').onclick=function(){$('explore').classList.add('collapsed');var r=$('reopen');r.hidden=false;requestAnimationFrame(function(){r.classList.add('show')})};
$('reopen').onclick=function(){$('explore').classList.remove('collapsed');var r=$('reopen');r.classList.remove('show');setTimeout(function(){r.hidden=true},300)};

/* =========================================================
   Bottom sheets (mobile) — drag with velocity snapping
   ========================================================= */
function Sheet(el,opts){var self=this;this.el=el;this.snaps=opts.snaps;this.idx=opts.start||0;this.onClose=opts.onClose;
 function H(){return el.getBoundingClientRect().height}
 this.y=function(i){var v=self.snaps[i];var vh=window.innerHeight;return Math.max(0,H()-(typeof v==='function'?v():v*vh))};
 this.snap=function(i){self.idx=Math.max(0,Math.min(self.snaps.length-1,i));el.style.setProperty('--y',self.y(self.idx)+'px');if(opts.onSnap)opts.onSnap(self.idx)};
 var y0,start,t0,lastY,lastT,vel=0,drag=false,scroller=el.querySelector('.ex-scroll,.scroller');
 function down(e){if(!isMobile())return;if(e.target.closest('button:not([data-drag]),a,input,li'))return;
  var inScroll=scroller&&scroller.contains(e.target);if(inScroll&&scroller.scrollTop>0)return;
  drag=true;y0=e.clientY;start=self.y(self.idx);t0=lastT=performance.now();lastY=e.clientY;vel=0;self.moved=false;self.inScroll=inScroll}
 function move(e){if(!drag)return;var dy=e.clientY-y0;
  if(self.inScroll&&!self.moved&&dy<0&&self.idx===self.snaps.length-1){drag=false;return}
  if(!self.moved&&Math.abs(dy)<6)return;if(!self.moved){self.moved=true;el.classList.add('dragging');try{el.setPointerCapture(e.pointerId)}catch(_){}}
  var y=start+dy;var min=self.y(self.snaps.length-1);if(y<min)y=min-(min-y)*.25;
  el.style.setProperty('--y',y+'px');var now=performance.now();vel=(e.clientY-lastY)/Math.max(1,now-lastT);lastY=e.clientY;lastT=now;e.preventDefault()}
 function up(){if(!drag)return;drag=false;el.classList.remove('dragging');if(!self.moved)return;
  var cur=parseFloat(el.style.getPropertyValue('--y'));var best=0,bd=1e9;
  self.snaps.forEach(function(_,i){var d=Math.abs(self.y(i)-cur);if(d<bd){bd=d;best=i}});
  if(vel>0.55)best=Math.max(0,self.idx-1);else if(vel<-0.55)best=Math.min(self.snaps.length-1,self.idx+1);
  if(opts.closable&&best===0&&(vel>0.55||cur>self.y(0)-20)&&self.idx===0){self.onClose&&self.onClose();return}
  self.snap(best)}
 el.addEventListener('pointerdown',down);window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',up);window.addEventListener('pointercancel',up);
 var h=el.querySelector('[data-drag]');if(h)h.addEventListener('click',function(){if(!self.moved)self.snap(self.idx<self.snaps.length-1?self.idx+1:0)});
}
var exploreSheet=new Sheet($('explore'),{snaps:[function(){return 92},.5,.9],start:0});
var cardSheet=new Sheet($('card'),{snaps:[.5,.9],start:0,closable:true,onClose:function(){closeCard()}});
function layoutSheets(){if(isMobile()){exploreSheet.snap(exploreSheet.idx);if(selected)cardSheet.snap(cardSheet.idx)}else{$('explore').style.removeProperty('--y');$('card').style.removeProperty('--y')}}

/* =========================================================
   Place card
   ========================================================= */
var card=$('card');
function formatDesc(txt){var lines=txt.split('\n').map(function(s){return s.trim()}).filter(Boolean),html='',inList=false;
 lines=lines.filter(function(l){return !/^(m[aá]s informaci[oó]n|more info)/i.test(l)});
 var lead=lines.shift()||'';
 if(lead.length>300){var m=lead.match(/^(.{110,300}?[.!?])\s/);if(m){lines.unshift(lead.slice(m[1].length).trim());lead=m[1]}}
 lines.forEach(function(l){
  if(/^(imperdibles|must-sees?)\s*:?$/i.test(l)){if(inList)html+='</ul>';html+='<h4>'+t('imperdibles')+'</h4><ul>';inList=true;return}
  var how=l.match(/^(c[oó]mo llegar|getting there)\s*:\s*(.*)$/i);
  if(how){if(inList){html+='</ul>';inList=false}html+='<h4>'+t('howto')+'</h4><p>'+esc(how[2])+'</p>';return}
  var kv=l.match(/^([^:]{2,60}):\s+(.+)$/);
  if(inList&&kv){html+='<li><b>'+esc(kv[1])+'</b> — '+esc(kv[2])+'</li>';return}
  if(inList){html+='</ul>';inList=false}html+='<p>'+esc(l)+'</p>'});
 if(inList)html+='</ul>';return {lead:lead,more:html}}
function dist(a,b){var R=6371,dLat=(b.lat-a.lat)*Math.PI/180,dLng=(b.lng-a.lng)*Math.PI/180;var x=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)*Math.sin(dLng/2);return 2*R*Math.asin(Math.sqrt(x))}
function cardHTML(p){var c=CATS[p.cat],d=formatDesc(p.d[lang]||p.d.es||''),gk=placeGlyph(p);
 var typeLabel=p.cat==='poblado'?t(p.rank):GLYPHS[p.g][lang];
 var tag='<span class="tag"><i>'+svgGlyph(gk,12,{sw:2.4})+'</i>'+esc(typeLabel)+'</span>';
 var hero;
 if(p.ph.length){hero='<div class="hero" style="--t:'+c.tint+'"><div class="skel"></div><img alt="'+esc((p.ph[0].c&&p.ph[0].c[lang])||p.n[lang])+'" src="'+p.ph[0].u+'" decoding="async">'+tag+
  (p.ph.length>1?'<button class="hbtn prev" data-ph="-1" aria-label="Anterior">'+ICON.chevL+'</button><button class="hbtn next" data-ph="1" aria-label="Siguiente">'+ICON.chevR+'</button><span class="counter"><span id="phI">1</span>/'+p.ph.length+'</span>':'')+
  '<button class="hbtn close" aria-label="'+t('close')+'">'+ICON.x+'</button></div>';}
 else{var pin=p.cat==='poblado'?'<span class="ph-pin" style="transform:scale(2.6)">'+badgeSVG(p.rank)+'</span>':'<span class="ph-pin">'+pinSVG(p.cat,p.g)+'</span>';
  hero='<div class="hero noimg" style="--t:'+c.tint+'"><div class="ph">'+pin+'<small>'+t('noPhoto')+'</small></div>'+tag+'<button class="hbtn close" aria-label="'+t('close')+'">'+ICON.x+'</button></div>';}
 var near=PLACES.filter(function(q){return q.id!==p.id&&active[q.cat]}).map(function(q){return [dist(p,q),q]}).sort(function(a,b){return a[0]-b[0]}).slice(0,4);
 var acts='<a class="btn primary" href="https://www.google.com/maps/dir/?api=1&destination='+p.lat+','+p.lng+'" target="_blank" rel="noopener">'+ICON.pin+t('directions')+'</a>';
 if(p.ln&&p.ln[0])acts+='<a class="btn" href="'+esc(p.ln[0])+'" target="_blank" rel="noopener">'+ICON.web+t('website')+'</a>';
 acts+='<button class="btn sq" id="shareBtn" aria-label="'+t('share')+'" title="'+t('share')+'">'+ICON.share+'</button>';
 return '<div class="inner">'+hero+'<div class="cbody">'+
  '<h2>'+esc(p.n[lang])+'</h2><div class="meta"><span>'+esc(c[lang])+'</span>'+(p.v&&p.v[lang]?'<span class="sep"></span><span>'+esc(p.v[lang])+'</span>':'')+(p.approx?'<span class="pill">'+t('approx')+'</span>':'')+'</div>'+
  (d.lead?'<p class="clead">'+esc(d.lead)+'</p>':'')+
  '<div class="actions">'+acts+'</div>'+
  (d.more?'<div class="more" id="more"><div><div class="txt">'+d.more+'</div></div></div><button class="toggle" id="toggleMore" aria-expanded="false"><span>'+t('readMore')+'</span>'+ICON.chevD+'</button>':'')+
  '<div class="near"><h3>'+t('near')+'</h3><div class="near-grid">'+near.map(function(a){var q=a[1];return '<button data-id="'+q.id+'"><span class="dot" style="background:'+CATS[q.cat].color+'">'+svgGlyph(placeGlyph(q),16)+'</span><span><b>'+esc(q.n[lang])+'</b><small>'+(a[0]<10?a[0].toFixed(1):Math.round(a[0]))+' km</small></span></button>'}).join('')+'</div></div>'+
 '</div></div>';}
function bindCard(p){
 card.querySelectorAll('.hbtn.close').forEach(function(b){b.onclick=function(){closeCard()}});
 var img=card.querySelector('.hero img');if(img){var done=function(){img.classList.add('ready');var s=card.querySelector('.skel');if(s)setTimeout(function(){s.remove()},500)};if(img.complete&&img.naturalWidth)done();else{img.onload=done;img.onerror=function(){var h=card.querySelector('.hero');h.classList.add('noimg');img.remove()}}}
 var pi=0;card.querySelectorAll('.hbtn[data-ph]').forEach(function(b){b.onclick=function(){pi=(pi+ +b.dataset.ph+p.ph.length)%p.ph.length;var im=card.querySelector('.hero img');im.classList.remove('ready');
  var n=new Image();n.onload=function(){im.src=n.src;requestAnimationFrame(function(){im.classList.add('ready')})};n.src=p.ph[pi].u;$('phI').textContent=pi+1}});
 var tg=$('toggleMore');if(tg)tg.onclick=function(){var m=$('more');var open=!m.classList.contains('open');m.classList.toggle('open',open);tg.classList.toggle('open',open);tg.setAttribute('aria-expanded',open);tg.querySelector('span').textContent=open?t('readLess'):t('readMore');if(open&&isMobile())cardSheet.snap(1)};
 card.querySelectorAll('.near-grid button').forEach(function(b){b.onclick=function(){openPlace(+b.dataset.id)}});
 $('shareBtn').onclick=function(){var url=location.href;if(navigator.share){navigator.share({title:p.n[lang],url:url}).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(url).then(function(){toast(t('copied'))})}};
}
function renderCard(p,animate){var html=cardHTML(p);
 var sc=card.querySelector('.scroller');
 if(animate&&sc&&!REDUCED){var inner=sc.querySelector('.inner');inner.classList.add('swap');setTimeout(function(){sc.innerHTML=html;sc.scrollTop=0;var ni=sc.querySelector('.inner');ni.classList.add('swap');bindCard(p);requestAnimationFrame(function(){requestAnimationFrame(function(){ni.classList.remove('swap')})})},180)}
 else{card.innerHTML='<div class="grab" data-drag></div><div class="scroller">'+html+'</div>';bindCard(p)}
 card.style.cssText+=';--c:'+CATS[p.cat].color+';--d:'+CATS[p.cat].dark+';--t:'+CATS[p.cat].tint;}
function setSel(id){var prev=selected;selected=id;[prev,id].forEach(function(x){if(x&&markers[x]){var q=byId[x];markers[x].setIcon(q.cat==='poblado'?badgeIcon(q):poiIcon(q))}})}
function openPlace(id,opts){var p=byId[id];if(!p)return;if(!active[p.cat])setCat(p.cat,true);
 var wasOpen=card.classList.contains('open');setSel(id);renderCard(p,wasOpen);
 card.classList.add('open');card.setAttribute('aria-hidden','false');document.body.classList.add('card-open');
 if(isMobile()){cardSheet.snap(0);closeSearch()}
 history.replaceState(null,'','#lugar-'+id+(lang==='en'?'&lang=en':''));
 var z=Math.max(map.getZoom(),p.cat==='poblado'?10:13);
 var go=function(){fly([p.lat,p.lng],z,opts)};
 // if the marker is inside a cluster, the zoom to 13 (≥ disableClusteringAtZoom) reveals it
 go();}
function closeCard(keepSel){card.classList.remove('open');card.setAttribute('aria-hidden','true');document.body.classList.remove('card-open');
 if(isMobile())card.style.removeProperty('--y');
 setSel(null);if(!keepSel)history.replaceState(null,'',location.pathname+(lang==='en'?'#lang=en':''))}

/* =========================================================
   Search (dropdown on desktop, full-screen overlay on mobile)
   ========================================================= */
var q=$('q'),res=$('results'),search=$('search'),hits=[],hi=0;
var norm=function(s){return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')};
function placeSearch(){var slot=isMobile()?$('slotMobile'):$('slotDesktop');if(search.parentNode!==slot)slot.appendChild(search);q.placeholder=isMobile()?t('searchM'):t('search')}
function doSearch(){var s=norm(q.value.trim());search.classList.toggle('has-q',!!s);
 if(!s){if(isMobile()&&document.body.classList.contains('searching'))renderSuggest();else closeResults();return}
 hits=PLACES.map(function(p){var n=norm(p.n[lang])+' | '+norm(p.n.es),score=n.indexOf(s)===0?3:n.indexOf(s)>=0?2:(norm(GLYPHS[p.g].es+' '+GLYPHS[p.g].en+' '+(p.v&&p.v[lang])+' '+CATS[p.cat][lang]).indexOf(s)>=0?1:0);return [score,p]})
  .filter(function(a){return a[0]>0}).sort(function(a,b){return b[0]-a[0]||a[1].n[lang].localeCompare(b[1].n[lang])}).slice(0,14).map(function(a){return a[1]});
 hi=0;renderResults();}
function resRow(p,i,s){var nm=esc(p.n[lang]);if(s){var ix=norm(p.n[lang]).indexOf(norm(s));if(ix>=0)nm=esc(p.n[lang].slice(0,ix))+'<mark>'+esc(p.n[lang].slice(ix,ix+s.length))+'</mark>'+esc(p.n[lang].slice(ix+s.length))}
 return '<div class="res'+(i===hi?' active':'')+'" data-id="'+p.id+'" role="option"><span class="dot" style="background:'+CATS[p.cat].color+'">'+svgGlyph(placeGlyph(p),18)+'</span><span><b>'+nm+'</b><small>'+esc(p.cat==='poblado'?t(p.rank):GLYPHS[p.g][lang])+' · '+esc((p.v&&p.v[lang])||'')+'</small></span><span class="go">'+ICON.arrow+'</span></div>'}
function renderResults(){var s=q.value.trim();
 if(!hits.length){res.innerHTML='<div class="empty"><div class="em-ic">'+ICON.search+'</div><b>'+t('noResults')+' · “'+esc(s)+'”</b><p>'+t('noResultsSub')+'</p><div class="sugg">'+['observatorio','petroglifo','vina','queso','playa'].map(function(g){return '<button data-q="'+esc(GLYPHS[g][lang])+'">'+esc(GLYPHS[g][lang])+'</button>'}).join('')+'</div></div>'}
 else res.innerHTML=hits.map(function(p,i){return resRow(p,i,s)}).join('');
 openResults();}
function renderSuggest(){hits=[2,15,26,42,48,201].map(function(id){return byId[id]});hi=-1;
 res.innerHTML='<div class="res-group">'+t('placesSuggest')+'</div>'+hits.map(function(p,i){return resRow(p,i,'')}).join('');openResults()}
function openResults(){res.classList.add('open');q.setAttribute('aria-expanded','true')}
function closeResults(){res.classList.remove('open');q.setAttribute('aria-expanded','false')}
function closeSearch(){document.body.classList.remove('searching');closeResults();q.blur()}
q.addEventListener('input',doSearch);
q.addEventListener('focus',function(){if(isMobile()){document.body.classList.add('searching');if(!q.value)renderSuggest();else doSearch()}else if(q.value)doSearch()});
q.addEventListener('keydown',function(e){if(e.key==='Escape'){closeSearch();return}if(!res.classList.contains('open')||!hits.length)return;
 if(e.key==='ArrowDown'){hi=Math.min(hi+1,hits.length-1);updActive();e.preventDefault()}else if(e.key==='ArrowUp'){hi=Math.max(hi-1,0);updActive();e.preventDefault()}
 else if(e.key==='Enter'&&hits[Math.max(0,hi)]){openPlace(hits[Math.max(0,hi)].id);closeSearch()}});
function updActive(){res.querySelectorAll('.res').forEach(function(r,i){r.classList.toggle('active',i===hi);if(i===hi)r.scrollIntoView({block:'nearest'})})}
res.addEventListener('mousedown',function(e){e.preventDefault()});
res.addEventListener('click',function(e){var b=e.target.closest('.sugg button');if(b){q.value=b.dataset.q;doSearch();q.focus();return}
 var r=e.target.closest('.res[data-id]');if(r){openPlace(+r.dataset.id);closeSearch()}});
$('qclear').onclick=function(){q.value='';doSearch();q.focus()};
$('sback').onclick=function(){q.value='';search.classList.remove('has-q');closeSearch()};
q.addEventListener('blur',function(){if(!isMobile())setTimeout(closeResults,120)});
document.addEventListener('keydown',function(e){if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus()}
 if(e.key==='Escape'&&document.activeElement!==q){if(selected)closeCard();else if(activeRoute)toggleRoute(activeRoute)}});

/* =========================================================
   Controls, credits, language
   ========================================================= */
$('zin').onclick=function(){map.zoomIn(.75)};$('zout').onclick=function(){map.zoomOut(.75)};$('zreset').onclick=function(){if(selected)closeCard();fitRegion()};
function renderCredits(){$('creditsPop').innerHTML='<b>'+t('creditsT')+'</b><p>'+t('credits')+'</p><p>Relieve y cartografía: Esri, USGS, NOAA, NASA, HERE, Garmin, © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>. Rutas: OSRM. Mapa: <a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>.</p>'}
$('creditsBtn').onclick=function(e){e.stopPropagation();var p=$('creditsPop');var o=!p.classList.contains('open');p.classList.toggle('open',o);this.setAttribute('aria-expanded',o)};
document.addEventListener('click',function(e){if(!e.target.closest('.credits-bar'))$('creditsPop').classList.remove('open')});
function applyLang(){document.documentElement.lang=lang;
 document.querySelectorAll('[data-i18n]').forEach(function(el){el.textContent=t(el.dataset.i18n)});
 document.querySelectorAll('[data-i18n-html]').forEach(function(el){el.innerHTML=t(el.dataset.i18nHtml)});
 document.querySelectorAll('[data-i18n-aria]').forEach(function(el){el.setAttribute('aria-label',t(el.dataset.i18nAria))});
 document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===lang)});
 PLACES.forEach(function(p){markers[p.id].setTooltipContent(p.n[lang])});
 placeSearch();renderFilters();renderRoutes();renderKey();renderCredits();drawGeo();if(selected)renderCard(byId[selected],false);}
document.querySelectorAll('.lang button').forEach(function(b){b.onclick=function(){if(lang===b.dataset.lang)return;lang=b.dataset.lang;applyLang();history.replaceState(null,'',selected?'#lugar-'+selected+(lang==='en'?'&lang=en':''):(lang==='en'?'#lang=en':location.pathname))}});

map.on('click',function(){if(isMobile()&&selected)closeCard();$('creditsPop').classList.remove('open')});
mq.addEventListener('change',function(){placeSearch();layoutSheets();closeSearch()});
window.addEventListener('resize',function(){clearTimeout(window.__rz);window.__rz=setTimeout(layoutSheets,120)});

/* =========================================================
   Boot
   ========================================================= */
applyLang();styleRoutes();zoomClass();layoutSheets();
fitRegion(true);zoomClass();
var booted=false;function boot(){if(booted)return;booted=true;$('loader').classList.add('done');setTimeout(function(){if(!selected)toast(t('tapHint'),3200)},700)}
terrain.once('load',function(){setTimeout(boot,150)});setTimeout(boot,3500);
var m0=location.hash.match(/lugar-(\d+)/);if(m0)openPlace(+m0[1],{instant:true});
window.__map=map;window.__open=openPlace;window.__route=toggleRoute;window.__sheet=exploreSheet;window.__card=cardSheet;
})();
