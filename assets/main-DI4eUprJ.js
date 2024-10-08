import{H as c,C as d}from"./chat-DWiP7KWm.js";function l({id:t,avatar:a,title:e,message:n,time:o,unreadCount:i,isRead:r}){return`
        <div data-link="/2024-2-VK-EDU-Frontend-A-Gaik/chat/${t}" class="chatItem link">
            <img src="${a}" alt="Avatar" class="avatar">
            <div class="chatDetails">
                <h2>${e}</h2>
                <p>${n}</p>
            </div>
            <div class="chatMeta">
                <span class="time">${o}</span>
                ${i>0?`<span class="badge">${i}</span>`:`<icon class="material-icons readIcon">${r?"done":"done_all"}</icon>`}
            </div>
        </div>
    `}function m(){return`
        <button class="fab">
            <i class="material-icons">mode_edit</i>
        </button>
    `}const p=[{id:"1",avatar:"https://randomuser.me/api/portraits/women/1.jpg",title:"Дженнифер Эшли",message:"Ты куда пропал?",time:"15:52",unreadCount:99,isRead:!1},{id:"2",avatar:"https://randomuser.me/api/portraits/men/2.jpg",title:"Общество целых бокалов",message:"Новая встреча в пятницу.",time:"14:30",unreadCount:0,isRead:!0},{id:"3",avatar:"https://randomuser.me/api/portraits/women/3.jpg",title:"Антон Иванов",message:"Тоха, ты где?",time:"15:52",unreadCount:0,isRead:!0},{id:"4",avatar:"https://randomuser.me/api/portraits/men/4.jpg",title:"Серёга (должен 2000Руб.)",message:"Серёг, это Ваня. Где бабло моё?",time:"14:30",unreadCount:0,isRead:!1}];function u(){const t=document.querySelector(".app");t.insertAdjacentHTML("afterbegin",c());const e=`<div class="chatList">${p.map(n=>l(n)).join("")}</div>`;t.insertAdjacentHTML("beforeend",e),t.insertAdjacentHTML("beforeend",m())}const h=document.querySelector(".app"),s=()=>{const t=window.location.pathname;h.innerHTML="";const a=t.match(/\/chat\/(\d+)/);a?d(a[1]):u()},v=t=>{history.pushState(null,null,t),s()};document.body.addEventListener("click",t=>{const a=t.target.closest(".link");a&&v(a.getAttribute("data-link"))});window.addEventListener("popstate",s);s();
