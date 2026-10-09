/* navigation.js: In-page link focus helper and the mobile menu.
   Classic script: loaded in order at the end of <body>; shares globals with the other files. */
// Accessible helpers + Apple-style mobile menu
const go=h=>{const t=h&&h.length>1&&document.getElementById(h.slice(1));if(!t)return;if(!t.hasAttribute('tabindex'))t.setAttribute('tabindex','-1');t.focus({preventScroll:true})};
$$('a[href^="#"]').forEach(a=>{if(!a.closest('.mnav'))a.addEventListener('click',()=>go(a.getAttribute('href')))});
(()=>{const root=document.documentElement,btn=$('#mb'),menu=$('#mnav'),mq=matchMedia('(max-width:820px)'),bg=[$('main'),$('footer'),$('.ticker')];
 const isOpen=()=>root.classList.contains('menu-open');
 const set=(o,refocus)=>{root.classList.toggle('menu-open',o);btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Close menu':'Open menu');bg.forEach(n=>{if(n)n.inert=o});
  if(o){const a=menu.querySelector('a');if(a)setTimeout(()=>a.focus(),60)}else if(refocus)btn.focus()};
 btn.onclick=()=>set(!isOpen(),true);
 menu.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;set(false,false);go(a.getAttribute('href'))});
 addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen())set(false,true)});
 mq.addEventListener('change',e=>{if(!e.matches&&isOpen())set(false,false)});
})();
