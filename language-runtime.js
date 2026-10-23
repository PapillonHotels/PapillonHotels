/* One language state for catalogue, restaurant menu and open wine detail. */
(()=>{'use strict';
const aliases={fl:'fil',tl:'fil',ph:'fil',ua:'uk',jp:'ja',cn:'zh','zh-CN':'zh',kr:'ko',nl:'nl-BE','nl-be':'nl-BE',pt:'en'};
const normalize=value=>{const raw=String(value||'').trim();const key=aliases[raw]||raw;return I18N[key]?key:'tr'};
const selectors=['language','menuLanguage','detailLanguage'];
const originalTranslate=translateUI;
function syncLabels(){
 const lang=normalize(state.lang),l=window.PAPILLON_DINING_I18N?.[lang];
 document.documentElement.lang=lang;
 selectors.forEach(id=>{const el=document.getElementById(id);if(el){el.value=lang;el.setAttribute('aria-label',I18N[lang].language)}});
 if(l){
  const names={'kanji.html':'kanji','dolce-vita.html':'fish','italyan.html':'italian'};
  document.querySelectorAll('.home-alacarte a').forEach(a=>{const key=names[a.getAttribute('href')?.split('?')[0]];if(key)a.textContent=l.ui[key]});
  const ids={alacarteMenuLabel:'restaurantMenus',wineFilterPanelLabel:'wineFilters'};
  Object.entries(ids).forEach(([id,key])=>{const el=document.getElementById(id);if(el)el.textContent=l.ui[key]});
 }
}
translateUI=function(){originalTranslate();syncLabels()};
setLanguage=function(value){
 state.lang=normalize(value);
 try{localStorage.setItem('papillon-language',state.lang)}catch{}
 syncLabels();renderAll();
 // Catalogue renderAll refreshes an open detail; restaurant renderAll does likewise.
};
selectors.forEach(id=>{const el=document.getElementById(id);if(el)el.onchange=e=>setLanguage(e.target.value)});
// Back/forward navigation restores the same selection on every page.
window.addEventListener('pageshow',()=>{let lang=state.lang;try{lang=localStorage.getItem('papillon-language')||lang}catch{}setLanguage(lang)});
window.addEventListener('storage',event=>{if(event.key==='papillon-language'&&event.newValue)setLanguage(event.newValue)});
let initial=state.lang;try{initial=localStorage.getItem('papillon-language')||initial}catch{}
setLanguage(initial);
})();
