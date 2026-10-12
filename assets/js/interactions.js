/* interactions.js: Project accordion, hero parallax, card tilt, theme toggle.
   Classic script: loaded in order at the end of <body>; shares globals with the other files. */
// accordion
$$('.proj header').forEach(h=>{const b=h.querySelector('.pl');h.onclick=()=>{const o=h.parentElement.classList.toggle('open');if(b)b.setAttribute('aria-expanded',o)}});
// hero parallax
const ph=$('#photo');
addEventListener('pointermove',e=>{const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);
 $$('.blk').forEach(b=>{b.style.transform=`translate(${x*+b.dataset.d}px,${y*+b.dataset.d}px)`})});
// card tilt
$$('.proj').forEach(c=>{c.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=c.getBoundingClientRect();c.style.transform=`perspective(900px) rotateX(${-((e.clientY-r.top)/r.height-.5)*.6}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*.6}deg)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
// theme toggle
$('#tg').onclick=()=>{const r=document.documentElement,d=matchMedia('(prefers-color-scheme:dark)').matches;const cur=r.dataset.theme||(d?'dark':'light');r.dataset.theme=cur==='dark'?'light':'dark'};
