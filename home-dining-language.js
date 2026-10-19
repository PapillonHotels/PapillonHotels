/* Localize the small restaurant links using the catalogue's selected language. */
(()=>{'use strict';
const nav=document.querySelector('.home-alacarte');if(!nav)return;
const keys={'kanji.html':'kanji','dolce-vita.html':'fish','italyan.html':'italian'};
function localize(){const l=window.PAPILLON_DINING_I18N[state.lang];if(!l)return;const menuLabel=document.getElementById('alacarteMenuLabel'),filterLabel=document.getElementById('wineFilterPanelLabel');if(menuLabel)menuLabel.textContent=l.ui.restaurantMenus;if(filterLabel)filterLabel.textContent=l.ui.wineFilters;nav.setAttribute('aria-label',[l.ui.kanji,l.ui.fish,l.ui.italian].join(', '));nav.querySelectorAll('a').forEach(a=>{const key=keys[a.getAttribute('href')];if(key)a.textContent=l.ui[key]})}
const oldTranslate=translateUI;translateUI=function(){oldTranslate();localize()};localize();
})();

// Close only the floating restaurant menu on outside click. Filter choices stay open while editing.
(()=>{const dropdown=document.getElementById('alacarteDropdown');document.addEventListener('click',e=>{if(dropdown&&dropdown.open&&!dropdown.contains(e.target))dropdown.open=false});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dropdown&&dropdown.open){dropdown.open=false;dropdown.querySelector('summary').focus()}})})();
