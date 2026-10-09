/* accessibility.js: Theme state for assistive tech and the pause/play control.
   Classic script: loaded in order at the end of <body>; shares globals with the other files. */
// theme toggle state for assistive tech
(()=>{const r=document.documentElement,tg=$('#tg'),mq=matchMedia('(prefers-color-scheme:dark)');
 const sync=()=>tg.setAttribute('aria-pressed',String((r.dataset.theme||(mq.matches?'dark':'light'))==='dark'));
 sync();tg.addEventListener('click',sync);mq.addEventListener('change',sync)})();
// pause / play moving content (ticker + floating blocks)
(()=>{const r=document.documentElement,b=$('#mo');
 b.addEventListener('click',()=>{const p=r.getAttribute('data-motion')!=='paused';if(p)r.setAttribute('data-motion','paused');else r.removeAttribute('data-motion');b.setAttribute('aria-label',p?'Play animations':'Pause animations')})})();

