(() => {
const logos=[...document.querySelectorAll('.scroll-logo')];if(!logos.length)return;
const reduced=matchMedia('(prefers-reduced-motion:reduce)');let queued=false;
function paint(){queued=false;const angle=reduced.matches?0:Math.max(0,window.scrollY)*.18;logos.forEach(logo=>logo.style.setProperty('--logo-angle',angle+'deg'));}
addEventListener('scroll',()=>{if(!queued&&!reduced.matches){queued=true;requestAnimationFrame(paint);}}, {passive:true});
reduced.addEventListener('change',paint);addEventListener('pageshow',paint);paint();
})();