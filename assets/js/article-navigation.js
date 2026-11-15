(() => {
const body=document.body,rail=document.getElementById('article-sidebar'),shell=document.querySelector('.article-shell'),openButton=document.querySelector('.sections-open'),closeButton=document.querySelector('.sections-close'),shade=document.querySelector('.sidebar-shade');
const mobile=matchMedia('(max-width:768px)');const links=[...rail.querySelectorAll('nav a')];let isOpen=false;
function setOpen(next,{focus=false}={}){isOpen=next;body.dataset.sectionsOpen=String(next);openButton.setAttribute('aria-expanded',String(next));rail.inert=!next;shade.hidden=!(next&&mobile.matches);shell.inert=next&&mobile.matches;
if(next&&mobile.matches){rail.setAttribute('role','dialog');rail.setAttribute('aria-modal','true');}else{rail.removeAttribute('role');rail.removeAttribute('aria-modal');}
if(focus)(next?closeButton:openButton).focus();}
openButton.addEventListener('click',()=>setOpen(true,{focus:true}));closeButton.addEventListener('click',()=>setOpen(false,{focus:true}));shade.addEventListener('click',()=>setOpen(false,{focus:true}));
mobile.addEventListener('change',()=>setOpen(!mobile.matches));
document.addEventListener('keydown',event=>{if(!isOpen)return;if(event.key==='Escape'){setOpen(false,{focus:true});return;}if(event.key==='Tab'&&mobile.matches){const items=[...rail.querySelectorAll('button,a[href],summary')].filter(item=>item.getClientRects().length>0);const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
links.forEach(link=>link.addEventListener('click',()=>{if(mobile.matches){setOpen(false);const heading=document.getElementById(link.hash.slice(1));if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}}));
const sections=links.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);let pending=false;
function markSection(){pending=false;let current=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<=150)current=section;else break;}links.forEach(link=>{if(current&&link.hash==='#'+current.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(markSection);}}, {passive:true});
setOpen(!mobile.matches);markSection();
})();
