/* effects.js: Hero letters, count-up, scroll progress, cursor glow, magnetic buttons, photo tilt, stagger.
   Classic script: loaded in order at the end of <body>; shares globals with the other files. */

// hero letter split
$$('.split span').forEach((s,si)=>{const t=s.textContent;s.textContent='';[...t].forEach((c,i)=>{const e=document.createElement('span');e.className='ch';e.textContent=c===' '?'\u00a0':c;e.style.animationDelay=(si*.35+i*.05)+'s';s.appendChild(e)})});
// count up
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)$$('[data-n]').forEach(el=>{const n=+el.dataset.n;let i=0;el.textContent=0;const t=setInterval(()=>{el.textContent=++i;if(i>=n)clearInterval(t)},900/n)});
// scroll progress
addEventListener('scroll',()=>{$('#prog').style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%'},{passive:true});
// cursor glow
const g=$('#glow');addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;g.style.opacity=1;g.style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
// magnetic + ripple buttons
$$('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.0375}px ${(e.clientY-r.top-r.height/2)*.0625}px`});b.addEventListener('pointerleave',()=>b.style.translate='');b.addEventListener('click',e=>{const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='rp';s.style.cssText=`width:60px;height:60px;left:${e.clientX-r.left-30}px;top:${e.clientY-r.top-30}px`;b.appendChild(s);setTimeout(()=>s.remove(),600)})});
// photo 3D tilt
const fr=$('#frame');ph.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=fr.getBoundingClientRect();fr.style.transform=`perspective(700px) rotateY(${((e.clientX-r.left)/r.width-.5)*10}deg) rotateX(${-((e.clientY-r.top)/r.height-.5)*10}deg)`});ph.addEventListener('pointerleave',()=>fr.style.transform='');
// stagger children
$$('.grid3>*,.stats>*').forEach((c,i)=>{c.style.transitionDelay=i*.1+'s'});
$$('h2').forEach(x=>io.observe(x));

