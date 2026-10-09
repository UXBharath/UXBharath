/* core.js: Helpers ($, $$) and the scroll-reveal observer.
   Classic script: loaded in order at the end of <body>; shares globals with the other files. */

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// reveal on scroll
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}}),{threshold:.08});
$$('.rv').forEach(n=>io.observe(n));
