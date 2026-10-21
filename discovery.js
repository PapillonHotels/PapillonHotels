(function(root){'use strict';
const texts={
tr:['Ruh halini seç','Bugün nasıl bir kadeh istersin?','Ferah & Canlı','Kadife & Yumuşak','Güçlü & Karakterli','Tatlı Kaçamak','Canlı beyazlar, hafif kırmızılar, rosé ve köpüklüler','İpeksi kırmızılar ve kremamsı, yumuşak beyazlar','Dolgun kırmızılar ve yoğun, yapılı beyazlar','Tatlı ve yarı tatlı seçenekler','Uyumlu Lezzetler','Filtreyi temizle','Açıklama için dokun','Özel seçki'],
en:['Choose your mood','What kind of glass are you in the mood for?','Fresh & Lively','Velvety & Smooth','Bold & Characterful','Sweet Escape','Lively whites, lighter reds, rosé and sparkling','Silky reds and creamy, smooth whites','Full-bodied reds and rich, structured whites','Sweet and semi-sweet selections','Perfect Pairings','Clear filters','Tap for details','Curated selection'],
de:['Wählen Sie Ihre Stimmung','Worauf haben Sie heute Lust?','Frisch & Lebendig','Samtig & Weich','Kräftig & Charaktervoll','Süße Auszeit','Frische Weißweine, leichte Rotweine, Rosé und Schaumwein','Seidige Rotweine und cremige, weiche Weißweine','Vollmundige Rotweine und kräftige, strukturierte Weißweine','Süße und halbsüße Weine','Passende Speisen','Filter zurücksetzen','Für Details antippen','Auswahl'],
ru:['Выберите настроение','Какое вино вам хочется сегодня?','Свежее и живое','Бархатистое и мягкое','Мощное и яркое','Сладкое удовольствие','Свежие белые, лёгкие красные, розовые и игристые','Шелковистые красные и мягкие, сливочные белые','Полнотелые красные и насыщенные, структурные белые','Сладкие и полусладкие вина','Сочетания с блюдами','Сбросить фильтры','Нажмите для описания','Избранное'],
es:['Elija su estado de ánimo','¿Qué copa le apetece hoy?','Fresco y Vivo','Aterciopelado y Suave','Potente y con Carácter','Escapada Dulce','Blancos vivos, tintos ligeros, rosados y espumosos','Tintos sedosos y blancos cremosos y suaves','Tintos con cuerpo y blancos intensos y estructurados','Vinos dulces y semidulces','Sabores en Armonía','Limpiar filtros','Toque para ver detalles','Selección'],
fr:['Choisissez votre humeur','Quelle envie pour votre verre ?','Frais et Vif','Velouté et Souple','Puissant et Structuré','Parenthèse Sucrée','Blancs vifs, rouges légers, rosés et effervescents','Rouges soyeux et blancs crémeux et souples','Rouges corsés et blancs riches et structurés','Vins doux et demi-doux','Accords Gourmands','Effacer les filtres','Touchez pour les détails','Sélection'],
ro:['Alegeți-vă starea de spirit','Ce vin vă doriți astăzi?','Proaspăt și Viu','Catifelat și Fin','Puternic și Expresiv','Răsfăț Dulce','Albe vii, roșii ușoare, rosé și spumante','Roșii mătăsoase și albe cremoase, fine','Roșii corpolente și albe intense, structurate','Vinuri dulci și demidulci','Asocieri Culinare','Resetează filtrele','Atingeți pentru detalii','Selecție'],
sk:['Vyberte si náladu','Na aký pohár máte dnes chuť?','Svieže a Živé','Zamatové a Jemné','Silné a Výrazné','Sladký Únik','Svieže biele, ľahké červené, ružové a šumivé','Hodvábne červené a krémové, jemné biele','Plné červené a bohaté, štruktúrované biele','Sladké a polosladké vína','Vhodné Jedlá','Vymazať filtre','Ťuknite pre podrobnosti','Výber'],
uk:['Оберіть свій настрій','Якого вина хочеться сьогодні?','Свіже та Жваве','Оксамитове та М’яке','Потужне та Виразне','Солодка Насолода','Свіжі білі, легкі червоні, рожеві та ігристі','Шовковисті червоні та м’які, вершкові білі','Повнотілі червоні та насичені, структурні білі','Солодкі та напівсолодкі вина','Поєднання зі Стравами','Скинути фільтри','Натисніть для опису','Добірка'],
it:['Scegli il tuo stato d’animo','Che calice desideri oggi?','Fresco e Vivace','Vellutato e Morbido','Intenso e Strutturato','Dolce Evasione','Bianchi vivaci, rossi leggeri, rosati e spumanti','Rossi setosi e bianchi cremosi e morbidi','Rossi corposi e bianchi ricchi e strutturati','Vini dolci e semidolci','Abbinamenti Perfetti','Cancella filtri','Tocca per i dettagli','Selezione'],
pl:['Wybierz swój nastrój','Na jakie wino masz dziś ochotę?','Świeże i Żywe','Aksamitne i Łagodne','Mocne i Wyraziste','Słodka Przyjemność','Rześkie białe, lekkie czerwone, różowe i musujące','Jedwabiste czerwone i kremowe, łagodne białe','Pełne czerwone i bogate, strukturalne białe','Wina słodkie i półsłodkie','Pasujące Smaki','Wyczyść filtry','Dotknij, aby zobaczyć opis','Wybór'],
'nl-BE':['Kies uw stemming','Waar heeft u vandaag zin in?','Fris & Levendig','Fluweelzacht & Soepel','Krachtig & Karaktervol','Zoete Verleiding','Frisse witte, lichte rode, rosé en mousserende','Zijdezachte rode en romige, soepele witte','Volle rode en rijke, gestructureerde witte wijnen','Zoete en halfzoete wijnen','Passende Gerechten','Filters wissen','Tik voor meer informatie','Selectie'],
fil:['Piliin ang iyong mood','Anong alak ang gusto mo ngayon?','Presko at Masigla','Malambot at Makinis','Matapang at Malasa','Matamis na Sandali','Preskong puti, magagaang pula, rosé at sparkling','Malasutlang pula at makrema, malambot na puti','Mabibigat na pula at mayaman, matatag na puti','Matamis at medyo matamis','Kaakibat na Pagkain','I-clear ang mga filter','Pindutin para sa detalye','Piling koleksiyon'],
zh:['选择心情','今天想喝哪种风格？','清新活泼','柔顺丝滑','浓郁有力','甜蜜时刻','清新白葡萄酒、轻盈红葡萄酒、桃红与起泡酒','丝滑红葡萄酒与柔顺、奶油质感的白葡萄酒','饱满红葡萄酒与浓郁、有结构的白葡萄酒','甜型与半甜型葡萄酒','美食搭配','清除筛选','点击查看详情','精选'],
ja:['気分を選ぶ','今日はどんな一杯にしますか？','爽やかで軽快','なめらかで柔らか','力強く豊か','甘いひととき','爽やかな白、軽やかな赤、ロゼ、スパークリング','シルキーな赤とクリーミーで柔らかな白','フルボディの赤と濃厚で骨格のある白','甘口・やや甘口のワイン','おすすめの料理','フィルターをクリア','タップで詳細','セレクション'],
ko:['기분을 선택하세요','오늘은 어떤 한 잔을 원하시나요?','상큼하고 생기 있게','부드럽고 매끄럽게','진하고 개성 있게','달콤한 순간','상큼한 화이트, 가벼운 레드, 로제, 스파클링','실키한 레드와 크리미하고 부드러운 화이트','풀 바디 레드와 진하고 구조감 있는 화이트','스위트 및 세미 스위트 와인','어울리는 음식','필터 초기화','눌러서 설명 보기','엄선 컬렉션'],
hi:['अपना मूड चुनें','आज किस तरह की वाइन पसंद करेंगे?','ताज़ा और जीवंत','मखमली और मुलायम','भरपूर और दमदार','मीठा आनंद','ताज़गी भरी व्हाइट, हल्की रेड, रोज़े और स्पार्कलिंग','रेशमी रेड और क्रीमी, मुलायम व्हाइट','भरपूर रेड और समृद्ध, संरचित व्हाइट','मीठी और अर्ध-मीठी वाइन','अनुकूल व्यंजन','फ़िल्टर साफ़ करें','विवरण के लिए टैप करें','चुनिंदा संग्रह']};
const keys=['fresh','soft','bold','sweet'];
const art={
fresh:'<path d="M10 6C6 5 3 8 4 13s8 9 13 5 3-10-2-11l-3-3-2 2Z"/><path d="m8 9 9 6M12 6c0-3 3-4 6-3-1 3-3 4-6 3Z"/>',
soft:'<path d="M12 6c0-3 2-4 5-4M12 5C8 2 5 4 5 6c3 2 5 2 7-1Z"/><circle cx="9" cy="10" r="3"/><circle cx="15" cy="10" r="3"/><circle cx="12" cy="15" r="3"/><circle cx="12" cy="20" r="2"/>',
bold:'<path d="M5 7c3-4 9-4 13-1 4 4 3 10-1 13-4 2-10 0-13-4-2-3-1-6 1-8Z"/><path d="M8 8c2-2 5-2 7 0s2 5 0 7-5 1-7-1-2-4 0-6Z"/><path d="m16 5 4-2m-1 5 3-1"/>',
sweet:'<path d="M6 8c-4 4 1 13 6 14 5-1 10-10 6-14-3-2-4 0-6 0s-3-2-6 0Z"/><path d="m6 5 6 3 6-3-3 5m-3-2V2M9 12h.01m6 0h.01m-3 4h.01"/>',
fish:'<path d="M3 12c4-8 11-8 16 0-5 8-12 8-16 0Zm16 0 4-5v10l-4-5Z"/><circle cx="8" cy="11" r=".7"/><path d="m11 5 3 4m-3 10 3-4"/>',
sea:'<path d="M6 14c-4-7 2-12 8-9 5 2 5 8 2 11-3 3-7 2-8-1l-5 4 1-5 2 0Z"/><path d="m9 5-1 5m5-5-2 6m5-4-3 6m4-2-3 4M17 5l4-3m-3 5h4"/>',
poultry:'<path d="M9 5c4-4 11 0 11 5 0 4-4 7-8 5l-5 5-3-3 5-5c-2-2-2-5 0-7Z"/><path d="M6 18c-3 1-5-1-3-3M7 19c0 3-3 3-4 1"/>',
veg:'<path d="M20 3C8 2 2 8 5 15s15 6 15-12Z"/><path d="M3 22 17 7M8 17l-1-6m5 2h5"/>',
cheese:'<path d="m3 11 12-7 6 7v9H3v-9Zm0 0h18"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="17" r="1.5"/><path d="m12 8 3 1"/>',
plate:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="4"/><path d="M2 3v6m2-6v6M3 9v12M22 3v18m-1-18v7"/>'};
let iconSerial=0;
function iconSvg(key,bright=false){const id='papillon-gold-'+(++iconSerial);return `<svg class="luxury-icon" viewBox="0 0 24 24" fill="none" stroke="${bright?'url(#'+id+')':'currentColor'}" stroke-width="${bright?'1.9':'1.2'}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${bright?`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8820d"/><stop offset=".3" stop-color="#f6ce49"/><stop offset=".48" stop-color="#fff2a3"/><stop offset=".65" stop-color="#e9b923"/><stop offset="1" stop-color="#bd880f"/></linearGradient></defs>`:''}${art[key]||art.plate}</svg>`}
const tx=lang=>texts[lang]||texts.en;
// A mode is a supported sensory match, not a grape-name shortcut.
function classify(w){
 const body=CatalogCore.bodyKeys(w),p=w.character_profile||{},out=[];
 const light=body.every(x=>['light','light_medium','medium'].includes(x));
 const rich=body.some(x=>['medium_full','full'].includes(x));
 const freshAcid=['fresh','lively','crisp','high','medium_high'].includes(p.acidity);
 const palate=p.palate||[];
 const gentleTannin=['soft','fine'].includes(p.tannin);
 const smoothWhite=palate.some(x=>['creamy','silky','soft'].includes(x))||(palate.includes('round')&&['balanced','medium','soft','rather_low'].includes(p.acidity));
 const sweet=w.id===1||w.category==='sweet';
 if(sweet)return ['sweet'];
 if(w.category==='sparkling'&&light&&!['soft','rather_low'].includes(p.acidity))out.push('fresh');
 if(w.category==='rose'&&light&&!['soft','rather_low'].includes(p.acidity))out.push('fresh');
 if(w.category==='white'&&light&&(freshAcid||body.every(x=>['light','light_medium'].includes(x))))out.push('fresh');
 // Colour alone does not define freshness or texture. Unknown tannin is not softness evidence.
 if(w.category==='red'&&light&&freshAcid&&gentleTannin&&!palate.includes('concentrated')&&!palate.includes('structured'))out.push('fresh');
 if(w.category==='white'&&smoothWhite)out.push('soft');
 if(w.category==='red'&&light&&['soft','fine'].includes(p.tannin))out.push('soft');
 if(w.category==='red'&&(rich||p.tannin==='firm'))out.push('bold');
 // White-wine intensity comes from supported body and texture, not red-wine tannin.
 const intenseWhite=palate.some(x=>['structured','concentrated','complex','creamy'].includes(x))||(body.includes('full')&&w.body_basis==='external_direct');
 if(w.category==='white'&&rich&&intenseWhite)out.push('bold');
 return out;
}
function moods(w){return classify(w)}
const original=CatalogCore.filter;CatalogCore.filter=(w,s)=>original(w,s).filter(x=>!s.mood||moods(x).includes(s.mood));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(wines,state,onSelect){let el=document.getElementById('discovery');if(!el){el=document.createElement('section');el.id='discovery';el.className='discovery';document.querySelector('.catalog-tools').before(el)}const a=tx(state.lang);el.innerHTML=`<div class="discovery-heading"><div><span class="discovery-kicker">PAPILLON HOTELS · EXCLUSIVE WINE LIST</span><h2>${esc(a[0])}</h2><p>${esc(a[1])}</p></div><button class="mood-reset category-button body-button" type="button">${esc(a[11])} ↗</button></div><div class="mood-options" role="group" aria-label="${esc(a[0])}">${keys.map((k,i)=>`<button type="button" class="mood-option mood-${k}" data-mood="${k}" aria-pressed="${state.mood===k}"><span class="mood-icon" aria-hidden="true">${iconSvg(k)}</span><span class="mood-name">${esc(a[i+2])}</span><span class="mood-note">${esc(a[i+6])}</span><span class="mood-count">${new Intl.NumberFormat(state.lang).format(wines.filter(w=>moods(w).includes(k)).length)} <span aria-hidden="true">↗</span></span></button>`).join('')}</div>`;el.querySelectorAll('[data-mood]').forEach(b=>b.onclick=()=>onSelect(state.mood===b.dataset.mood?'':b.dataset.mood));el.querySelector('.mood-reset').onclick=()=>{onSelect('');document.getElementById('discovery')?.querySelector('.mood-reset')?.focus({preventScroll:true});};}
function pairings(w,lang){const a=w.local[lang]||w.local.en;const groups=a.food_groups||[];const tr=w.local.tr?.food_groups||[];let list=[];for(let i=0;i<groups.length;i++){const h=CatalogCore.normalize(tr[i]?.[0]||'');if(/neden|sos|uyum/.test(h))continue;let icon=/balik/.test(h)?'🐟':/deniz/.test(h)?'🦐':/dana|kuzu|kirmizi/.test(h)?'🥩':/beyaz|tavuk|ordek/.test(h)?'🍗':/sebze|salata/.test(h)?'🥬':/tatli|meyve/.test(h)?'🍓':'🍽️';list.push([icon,groups[i][0],groups[i][1]]);if(list.length===3)break;}if(a.cheese)list.push(['🧀',a.cheese,a.cheese_reason||a.cheese]);return list.slice(0,4);}
function cards(w,lang){const a=tx(lang);return `<section class="pairing-icons" aria-label="${esc(a[10])}"><div class="pairing-heading">${esc(a[10])}<small>${esc(a[12])}</small></div><div class="pairing-row">${pairings(w,lang).map(([icon,label,description],i)=>`<div class="pairing-item"><button class="pairing-trigger" type="button" aria-expanded="false" aria-describedby="pair-${w.id}-${i}" aria-label="${esc(label)}"><span aria-hidden="true">${iconSvg(({'🐟':'fish','🦐':'sea','🥩':'bold','🍗':'poultry','🥬':'veg','🍓':'sweet','🧀':'cheese'})[icon]||'plate',true)}</span></button><div class="pairing-tooltip" id="pair-${w.id}-${i}" role="tooltip"><b>${esc(label)}</b><span>${esc(description)}</span></div></div>`).join('')}</div></section>`;}
function bind(){document.querySelectorAll('.pairing-trigger').forEach(b=>{b.onblur=close;b.onclick=e=>{e.stopPropagation();const was=b.getAttribute('aria-expanded')==='true';close();b.setAttribute('aria-expanded',String(!was));b.closest('.pairing-item').classList.toggle('is-open',!was)}});}
function close(){document.querySelectorAll('.pairing-item.is-open').forEach(e=>{e.classList.remove('is-open');e.querySelector('button').setAttribute('aria-expanded','false')})}document.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
root.WineDiscovery={render,cards,bind,moods,pairings,texts};
})(window);
