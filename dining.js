/* Three restaurant buttons lead to separate menu views; wine names open the existing detail dialog. */
(()=>{'use strict';
const routes={kanji:{key:'Kanji',name:'Kanji Restaurant'},fish:{key:'Balık',name:'Dolce Vita Fish Restaurant'},italian:{key:'İtalyan',name:'İtalyan Restaurant'}};
const page=document.getElementById('restaurantPage');if(!page)return;
const columns=document.getElementById('restaurantMenuColumns');
const sections=window.PAPILLON_DISH_SECTIONS;
function renderDining(){
 const slug=document.body.dataset?.restaurant||location.hash.slice(1),r=routes[slug];
 const l=window.PAPILLON_DINING_I18N[state.lang];
 document.body.classList.toggle('menu-open',!!r);page.hidden=!r;
 document.getElementById('menuLanguage').value=state.lang;
 document.querySelectorAll('.alacarte-nav a').forEach(a=>a.setAttribute('aria-current',a.hash==='#'+slug?'page':'false'));
 if(!r){columns.innerHTML='';document.title='Papillon Hotels · À La Carte';return}
 document.getElementById('restaurantMenuTitle').textContent=l.ui[slug];
 document.getElementById('backToRestaurants').textContent='← '+l.ui.back;
 document.getElementById('menuLanguage').setAttribute('aria-label',l.ui.language);
 const languageLabel=document.querySelector('.dining-language > span');if(languageLabel)languageLabel.textContent=l.ui.language;
 document.title=l.ui[slug]+' · Papillon Hotels';
 const meals=window.PAPILLON_MEALS.filter(m=>m.restaurant===r.key);
 if(!wines.length){columns.textContent=l.ui.loading;return}
 const order=r.key==='İtalyan'?['Masada','Başlangıçlar & Salatalar','Çorbalar','Makarna & Risotto','Pizzalar','Ana Yemekler','Tatlılar']:r.key==='Kanji'?['Masada','Sushi & Sashimi','Başlangıçlar & Salatalar','Çorbalar','Ana Yemekler','Tatlılar']:['Mezeler','Salatalar','Ara Sıcaklar','Balıklar','Tatlılar'];
 // Split only between sections, so each column follows the order of the printed menu.
 const leftKeys=r.key==='İtalyan'?order.slice(0,4):r.key==='Kanji'?order.slice(0,4):order.slice(0,3);
 function section(key){const items=meals.filter(m=>sections[m.id]===key);if(!items.length)return '';return `<section class="printed-section"><h2>${esc(l.sections[key])}</h2>${r.key==='Balık'&&key==='Mezeler'?`<figure class="meze-overview"><img src="${esc(window.PAPILLON_MEZE_OVERVIEW)}" alt="${esc(l.sections[key])}" loading="lazy" width="1536" height="1024"></figure>`:''}${r.key==='Balık'&&key==='Balıklar'?`<figure class="fish-overview"><img src="${esc(window.PAPILLON_FISH_OVERVIEW)}" alt="${esc(l.sections[key])}" loading="lazy"></figure>`:''}${items.map(m=>`<article class="menu-dish ${m.id==='57'?'menu-dish-wide':''}" data-menu-dish="${esc(m.id)}"><div class="menu-dish-content">${m.id==='57'?'':`<h3>${esc(l.dishes[m.id])}</h3>`}${m.id==='57'?`<p class="meze-list">${esc(l.mezeList)}</p>`:''}<div class="name-buttons">${m.wines.map(id=>wines.find(w=>w.id===id)).filter(Boolean).map(w=>`<button type="button" data-dish="${esc(m.id)}" data-pair-wine="${w.id}">${esc(w.name)}</button>`).join('')}</div></div>${m.id==='57'?'':`<figure class="menu-dish-picture">${window.PAPILLON_FISH_PHOTO_CELLS?.[m.id]?`<div class="fish-plate-photo" role="img" aria-label="${esc(l.dishes[m.id])}" style="background-image:url('${esc(window.PAPILLON_FISH_SINGLE_PLATES)}');background-position:${window.PAPILLON_FISH_PHOTO_CELLS[m.id][0]}% ${window.PAPILLON_FISH_PHOTO_CELLS[m.id][1]}%"></div>`:window.PAPILLON_DISH_GALLERIES?.[m.id]?`<div class="dish-photo-gallery">${window.PAPILLON_DISH_GALLERIES[m.id].map(src=>`<img src="${esc(src)}" data-real-photo="true" alt="${esc(l.dishes[m.id])}" width="240" height="240" loading="lazy">`).join('')}</div>`:`<img src="${esc(window.PAPILLON_REAL_DISH_IMAGES?.[m.id]||`assets/dishes/dish-${m.id}.webp`)}" ${window.PAPILLON_REAL_DISH_IMAGES?.[m.id]?'data-real-photo="true"':''} alt="${esc(l.dishes[m.id])}" width="240" height="240" loading="lazy" decoding="async">`}</figure>`}</article>`).join('')}</section>`}
 columns.innerHTML=`<div class="printed-column">${leftKeys.map(section).join('')}</div><div class="printed-column">${order.filter(k=>!leftKeys.includes(k)).map(section).join('')}</div>`;
 columns.querySelectorAll('[data-pair-wine]').forEach(b=>b.onclick=()=>{const m=window.PAPILLON_MEALS.find(x=>x.id===b.dataset.dish);if(!m)return;state.meal=m.id;filtered=wines.filter(w=>m.wines.includes(w.id));openWine(Number(b.dataset.pairWine))});
}
renderAll=function(){translateUI();const meal=window.PAPILLON_MEALS.find(m=>m.id===state.meal);filtered=meal?wines.filter(w=>meal.wines.includes(w.id)):wines;renderDining();if(selected!==null&&document.getElementById('detail').open)renderDetail()};
document.getElementById('menuLanguage').onchange=e=>setLanguage(e.target.value);
window.addEventListener('hashchange',()=>{const dialog=document.getElementById('detail');if(dialog.open)dialog.close();renderDining();window.scrollTo(0,0)});
renderDining();
const observer=new MutationObserver(()=>{if(!wines.length&&document.getElementById('grid').textContent===t('error'))columns.textContent=window.PAPILLON_DINING_I18N[state.lang].ui.error});observer.observe(document.getElementById('grid'),{childList:true,subtree:true});
})();
