(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();function h(e=!1,t=""){return`
        <header class="chatHeader">
            <div class="chatTitle">
                ${e?`
                    <i class="material-icons backArrowIcon link" data-link="/2024-2-VK-EDU-Frontend-A-Gaik/">
                        arrow_back
                    </i>
                `:""}
                VKchat
                <i class="material-icons chatTitleIcon">send</i>
            </div>

            <div class="searchContainer">
                ${e?"":`<input type="text" id="searchInput" placeholder="Поиск" class="searchInput" value="${t}" />`}
                <div class="userInfo">
                    <i class="material-icons userInfoIcon">account_circle</i>
                    <span class="userName">Иван Иванов</span>
                </div>
            </div>
        </header>
    `}function M(e){return`
    <div class="messages">${e.length?e.map(a=>`
          <div class="${a.source==="user"?"incomingMessage":"outgoingMessage"}">
            <div class="messageWrapper">
              <div class="messageSender">${a.sender}</div>
              <div class="messageText">${a.text}</div>
              <div class="messageTimestamp">${a.timestamp}</div>
            </div>
          </div>
      `).join(""):`
        <div class="noMessages">
          <img src="/2024-2-VK-EDU-Frontend-A-Gaik/noMessage.png" alt="Нет сообщений" class="noMessagesImage" />
          <div class="noMessagesText">Здесь будет выводиться список<br>Ваших сообщений.</div>
        </div>
      `}</div>
  `}function I(){return`
        <div class="inputContainer">
            <form class="form">
                <input class="formInput" name="messageText" placeholder="Введите сообщение" type="text">
                <button type="submit" class="sendButton">
                    <i class="material-icons sendButtonIcon">send</i>
                </button>
            </form>
        </div>
    `}function S(e,t){const a=parseInt(localStorage.getItem(`messageCount_${t}`))||0,n=`message_${t}_${a+1}`;localStorage.setItem(n,JSON.stringify(e)),localStorage.setItem(`messageCount_${t}`,a+1)}function T(e){const t=parseInt(localStorage.getItem(`messageCount_${e}`))||0,a=[];for(let n=1;n<=t;n++){const s=JSON.parse(localStorage.getItem(`message_${e}_${n}`));s&&a.push(s)}return a}const C=[{chatId:"1",text:"Новая встреча в пятницу",sender:"Общество целых бокалов",timestamp:"10:01",source:"user"},{chatId:"4",text:"Серёг, это Ваня. Где бабло моё?",sender:"Серёга (должен 2000Руб.)",timestamp:"10:03",source:"user"}];function E(e){const t=T(e),n=[...C.filter(s=>s.chatId===e),...t];document.querySelector(".app").insertAdjacentHTML("afterbegin",h(!0)),document.querySelector(".app").insertAdjacentHTML("beforeend",M(n)),document.querySelector(".app").insertAdjacentHTML("beforeend",I())}function $(e){E(e);const t=document.querySelector("form"),a=document.querySelector(".formInput"),n=document.querySelector(".messages");t.addEventListener("submit",s),t.addEventListener("keypress",o);function s(i){i.preventDefault();const l=a.value.trim();if(l==="")return;const r={text:l,sender:"Иван Иванов",timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};c(r),S(r,e),a.value="",a.focus()}function o(i){i.key==="Enter"&&(i.preventDefault(),s(i))}function c(i){const l=document.querySelector(".noMessages");l&&l.remove();const r=document.createElement("div");r.classList.add("messageWrapper");const p=document.createElement("div");p.classList.add("messageSender"),p.innerText=i.sender;const g=document.createElement("div");g.classList.add("messageText"),g.innerText=i.text;const f=document.createElement("div");f.classList.add("messageTimestamp"),f.innerText=i.timestamp,r.appendChild(p),r.appendChild(g),r.appendChild(f),n.appendChild(r),n.scrollTop=n.scrollHeight}}function L({id:e,avatar:t,title:a,message:n,time:s,unreadCount:o,isRead:c}){return`
        <div data-link="/2024-2-VK-EDU-Frontend-A-Gaik/chat/${e}" class="chatItem link">
            <img src="${t}" alt="Avatar" class="avatar">
            <div class="chatDetails">
                <h2>${a}</h2>
                <p>${n}</p>
            </div>
            <div class="chatMeta">
                <span class="time">${s}</span>
                ${o>0?`<span class="badge">${o}</span>`:`<icon class="material-icons readIcon">${c?"done":"done_all"}</icon>`}
            </div>
        </div>
    `}function H(e){const t=document.createElement("button");return t.className="fab",t.innerHTML='<i class="material-icons">mode_edit</i>',t.addEventListener("click",()=>{e()}),t}function x(){return`
    <div class="modal-overlay">
      <div class="modal">
        <h2 class="modal-title">Добавить новый контакт</h2>

        <form id="chatForm">
          <div class="modal-field">
            <label class="modal-label" for="name">Имя:</label>

            <input class="modal-input" type="text" id="name" required />
          </div>

          <div class="modal-field">
            <label class="modal-label" for="avatar">URL аватара:</label>

            <input class="modal-input" type="text" id="avatar" required />
          </div>

          <button class="modal-button" type="submit">Добавить</button>
          
          <button class="modal-button modal-button-close" type="button" id="closeModal">Закрыть</button>
        </form>
      </div>
    </div>
  `}const d=[{id:"1",avatar:"https://randomuser.me/api/portraits/women/1.jpg",title:"Общество целых бокалов",message:"Новая встреча в пятницу.",time:"15:52",unreadCount:99,isRead:!1},{id:"2",avatar:"https://randomuser.me/api/portraits/men/2.jpg",title:"Дженнифер Эшли",message:"",time:"14:30",unreadCount:0,isRead:!0},{id:"3",avatar:"https://randomuser.me/api/portraits/women/3.jpg",title:"Антон Иванов",message:"",time:"15:52",unreadCount:0,isRead:!0},{id:"4",avatar:"https://randomuser.me/api/portraits/men/4.jpg",title:"Серёга (должен 2000Руб.)",message:"Вань, это Серёга. Где бабло моё?",time:"14:30",unreadCount:0,isRead:!1}];let m=d,u="";function q(){const e=x();document.querySelector(".app").insertAdjacentHTML("beforeend",e);const a=document.getElementById("chatForm"),n=document.getElementById("closeModal");a.addEventListener("submit",w),n.addEventListener("click",y)}function y(){const e=document.querySelector(".modal-overlay");e&&e.remove()}function w(e){e.preventDefault();const t=document.getElementById("name").value,a=document.getElementById("avatar").value;if(t&&a){const n={id:String(d.length+1),avatar:a,title:t,message:"",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),unreadCount:0,isRead:!0};d.push(n),m=d.filter(s=>s.title.toLowerCase().includes(u.toLowerCase())),b(),y()}}function j(e){u=e.target.value.trim(),m=d.filter(n=>n.title.toLowerCase().includes(u.toLowerCase()));const t=document.querySelector(".chatList"),a=m.map(n=>L(n)).join("");t.innerHTML=a}function b(){const e=document.querySelector(".app");e.innerHTML="",e.insertAdjacentHTML("afterbegin",h());const t=document.getElementById("searchInput");t&&(t.value=u,t.addEventListener("input",j));const n=`<div class="chatList">${m.map(s=>L(s)).join("")}</div>`;e.insertAdjacentHTML("beforeend",n),e.appendChild(H(q))}const A=document.querySelector(".app"),v=()=>{const e=window.location.pathname;A.innerHTML="";const t=e.match(/\/chat\/(\d+)/);t?$(t[1]):b()},k=e=>{history.pushState(null,null,e),v()};document.body.addEventListener("click",e=>{const t=e.target.closest(".link");t&&k(t.getAttribute("data-link"))});window.addEventListener("popstate",v);v();
