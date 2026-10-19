/* Supplemental educational catalogue. Regional geology is not a parcel analysis. */
(()=>{'use strict';
if(!window.PAPILLON_GUIDE)return;
const G=window.PAPILLON_GUIDE,guideMode=document.body.dataset.catalog==='guide-wines.json';
const lx=()=>G.lexicon[state.lang],tag=(name,text,cls='')=>`<${name}${cls?` class="${cls}"`:''}>${esc(text)}</${name}>`;
const oldTranslate=translateUI;
translateUI=function(){oldTranslate();const l=lx();const nav=document.getElementById('guideLink');if(nav){nav.textContent=guideMode?I18N[state.lang].catalog:l.labels.newBatch;nav.href=guideMode?'index.html':'rehber.html';}
 const title=document.getElementById('appellationTitle');if(title)title.textContent=l.labels.appellation;
 const body=document.getElementById('appellationBody');if(body)body.innerHTML=G.appellations.terms.map(x=>`<div>${tag('h3',x.labels[state.lang])}${tag('p',x.descriptions[state.lang])}</div>`).join('');
 if(guideMode){const title=document.querySelector('[data-i18n="catalog"]');if(title)title.textContent=l.labels.guide;}
};
const oldDetail=renderDetail;
renderDetail=function(){oldDetail();const w=wines.find(x=>x.id===selected),e=w&&w.education;if(!e)return;const l=lx(),content=document.querySelector('.detail-content'),grid=content&&content.querySelector('.details-grid');if(!grid)return;
 const block=(label,value,note='')=>`<section class="education-block">${tag('h3',label)}${tag('p',value)}${note?tag('p',note,'education-note'):''}</section>`;
 let html='';
 html+=block(l.labels.climate,e.climate_keys&&e.climate_keys.length?e.climate_keys.map(k=>l.climate[k]).filter(Boolean).join(' · '):l.labels.climateUnknown,l.labels.regionalScope);
 html+=block(l.labels.soil,e.soil_keys&&e.soil_keys.length?e.soil_keys.map(k=>l.soil[k]).filter(Boolean).join(' · '):l.labels.soilUnknown,e.soil_keys&&e.soil_keys.length?(e.terroir_scope==='estate'?l.labels.estateScope:l.labels.regionalScope):'');
 html+=block(l.labels.production,e.production_keys&&e.production_keys.length?e.production_keys.map(k=>(l.production||{})[k]).filter(Boolean).join(' · '):l.labels.productionUnknown);
 if(e.grape_keys&&e.grape_keys.length)html+=block(l.labels.blendRoles,e.grape_keys.filter(k=>l.role[k]).map(k=>l.role[k]).join(' · '),l.labels.grapeRoleNote);
 const term=G.appellations.terms.find(x=>x.key===e.appellation_key);if(term)html+=block(term.labels[state.lang],term.descriptions[state.lang]);
 if(e.profile_inferred)html+=tag('p',l.labels.profileInferred||l.labels.regionalScope,'education-note');
 if(e.representative_image){const aside=document.querySelector('.detail-aside');if(aside)aside.insertAdjacentHTML('beforeend',tag('p',l.labels.representativeImage,'education-note'));}
 const ratingLabel=Array.from(grid.querySelectorAll('.info-label')).find(x=>x.textContent===t('vivino'));
 if(ratingLabel){const note=ratingLabel.parentNode.querySelector('.info-note');if(note){const exact=String(w.rating.scope||'').startsWith('vintage')||w.rating.scope==='exact_vintage';note.textContent=w.rating.status==='found'?(exact?l.labels.vintageRating:l.labels.generalRating)+' '+(w.rating.count?number(Number(w.rating.count))+' '+t('ratings')+'. ':'')+(w.rating.checked?l.labels.checked:t('checked')):t('checked');}}
 if(!aCheese(w)){const sections=content.querySelectorAll('section.detail-section');for(const section of sections)if(section.querySelector('.cheese-reason'))section.remove();}
 if(html){const section=document.createElement('div');section.className='education-grid';section.innerHTML=html;grid.insertAdjacentElement('afterend',section);}
};
translateUI();
function aCheese(w){return w.local[state.lang].cheese;}
})();
