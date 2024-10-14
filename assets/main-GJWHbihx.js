(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();function L(t=!1,e=""){return`
        <header class="chatHeader">
            <div class="chatTitle">
                ${t?`
                    <i class="material-icons backArrowIcon link" data-link="/2024-2-VK-EDU-Frontend-A-Gaik/">
                        arrow_back
                    </i>
                `:""}
                VKchat
                <i class="material-icons chatTitleIcon">send</i>
            </div>

            <div class="searchContainer">
                ${t?"":`<input type="text" id="searchInput" placeholder="Поиск" class="searchInput" value="${e}" />`}
                <div class="userInfo">
                    <i class="material-icons userInfoIcon">account_circle</i>
                    <span class="userName">Иван Иванов</span>
                </div>
            </div>
        </header>
    `}function M(t){return`
    <div class="messages">${t.length?t.map(s=>`
          <div class="${s.source==="user"?"incomingMessage":"outgoingMessage"}">
            <div class="messageWrapper">
              <div class="messageSender">${s.sender}</div>
              <div class="messageText">${s.text}</div>
              <div class="messageTimestamp">${s.timestamp}</div>
            </div>
          </div>
      `).join(""):`
        <div class="noMessages">
          <img src="/2024-2-VK-EDU-Frontend-A-Gaik/noMessage.png" alt="Нет сообщений" class="noMessagesImage" />
          <div class="noMessagesText">Здесь будет выводиться список<br>Ваших сообщений.</div>
        </div>
      `}</div>
  `}function E(){return`
        <div class="inputContainer">
            <form class="form">
                <input class="formInput" name="messageText" placeholder="Введите сообщение" type="text">
                <button type="submit" class="sendButton">
                    <i class="material-icons sendButtonIcon">send</i>
                </button>
            </form>
        </div>
    `}function C(t,e){const s=parseInt(localStorage.getItem(`messageCount_${e}`))||0,n=`message_${e}_${s+1}`;localStorage.setItem(n,JSON.stringify(t)),localStorage.setItem(`messageCount_${e}`,s+1)}function S(t){const e=parseInt(localStorage.getItem(`messageCount_${t}`))||0,s=[];for(let n=1;n<=e;n++){const a=JSON.parse(localStorage.getItem(`message_${t}_${n}`));a&&s.push(a)}return s}const I=[{chatId:"1",text:"Новая встреча в пятницу",sender:"Общество целых бокалов",timestamp:"10:01",source:"user"},{chatId:"4",text:"Серёг, это Ваня. Где бабло моё?",sender:"Серёга (должен 2000Руб.)",timestamp:"10:03",source:"user"}];function T(t){const e=S(t),n=[...I.filter(a=>a.chatId===t),...e];document.querySelector(".app").insertAdjacentHTML("afterbegin",L(!0)),document.querySelector(".app").insertAdjacentHTML("beforeend",M(n)),document.querySelector(".app").insertAdjacentHTML("beforeend",E())}function $(t){T(t);const e=document.querySelector("form"),s=document.querySelector(".formInput"),n=document.querySelector(".messages");e.addEventListener("submit",a),e.addEventListener("keypress",o);function a(i){i.preventDefault();const l=s.value.trim();if(l==="")return;const c={text:l,sender:"Иван Иванов",timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};r(c),C(c,t),s.value="",s.focus()}function o(i){i.key==="Enter"&&(i.preventDefault(),a(i))}function r(i){const l=document.querySelector(".noMessages");l&&l.remove();const c=document.createElement("div");c.classList.add("messageWrapper");const p=document.createElement("div");p.classList.add("messageSender"),p.innerText=i.sender;const g=document.createElement("div");g.classList.add("messageText"),g.innerText=i.text;const f=document.createElement("div");f.classList.add("messageTimestamp"),f.innerText=i.timestamp,c.appendChild(p),c.appendChild(g),c.appendChild(f),n.appendChild(c),n.scrollTop=n.scrollHeight}}function y({id:t,avatar:e,title:s,message:n,time:a,unreadCount:o,isRead:r}){const i=document.createElement("div");return i.dataset.link=`/2024-2-VK-EDU-Frontend-A-Gaik/chat/${t}`,i.className="chatItem link",i.insertAdjacentHTML("beforeend",`
    <img src="${e}" alt="Avatar" class="avatar">
    <div class="chatDetails">
        <h2>${s}</h2>
        <p>${n}</p>
    </div>
    <div class="chatMeta">
        <span class="time">${a}</span>
        ${o>0?`<span class="badge">${o}</span>`:`<icon class="material-icons readIcon">${r?"done":"done_all"}</icon>`}
    </div>
  `),i}function H(t){const e=document.createElement("button");return e.className="fab",e.insertAdjacentHTML("beforeend",'<i class="material-icons">mode_edit</i>'),e.addEventListener("click",()=>{t()}),e}const d=[{id:"1",avatar:"https://randomuser.me/api/portraits/women/1.jpg",title:"Общество целых бокалов",message:"Новая встреча в пятницу.",time:"15:52",unreadCount:99,isRead:!1},{id:"2",avatar:"https://randomuser.me/api/portraits/men/2.jpg",title:"Дженнифер Эшли",message:"",time:"14:30",unreadCount:0,isRead:!0},{id:"3",avatar:"https://randomuser.me/api/portraits/women/3.jpg",title:"Антон Иванов",message:"",time:"15:52",unreadCount:0,isRead:!0},{id:"4",avatar:"https://randomuser.me/api/portraits/men/4.jpg",title:"Серёга (должен 2000Руб.)",message:"Вань, это Серёга. Где бабло моё?",time:"14:30",unreadCount:0,isRead:!1}];function x({title:t,content:e}){return`
    <div class="modal-overlay" onclick="closeModalHandler()">
      <div class="modal" onclick="event.stopPropagation()">
        <button class="modal-close">&times;</button>
        <h2 class="modal-title">${t}</h2>
        <div class="modal-content">${e}</div>
      </div>
    </div>
  `}function k(){const e=x({title:"Добавить новый контакт",content:`
    <form id="chatForm">
      <div class="modal-field">
        <label class="modal-label" for="name">Имя:</label>
        <input class="modal-input" type="text" id="name" required />
      </div>
      <div class="modal-field">
        <label class="modal-label" for="avatarFile">Аватар (загрузка):</label>
        <input type="file" id="avatarFile" accept="image/*" />
      </div>
      <button class="modal-button" type="submit">Добавить</button>
    </form>
  `});document.querySelector(".app").insertAdjacentHTML("beforeend",e)}let u=d,m="";function q(){k();const t=document.getElementById("chatForm"),e=document.getElementById("avatarFile");t.addEventListener("submit",s=>w(s,e)),document.querySelector(".modal-close").addEventListener("click",v),document.querySelector(".modal-overlay").addEventListener("click",v)}function v(){const t=document.querySelector(".modal-overlay");t&&t.remove()}function w(t,e){t.preventDefault();const s=document.getElementById("name").value;if(s){const n=e.files[0],a=n?URL.createObjectURL(n):"/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png",o={id:String(d.length+1),avatar:a,title:s,message:"",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),unreadCount:0,isRead:!0};d.push(o),u=d.filter(r=>r.title.toLowerCase().includes(m.toLowerCase())),b(),v()}}function A(t){const e=t.target.value.trim();if(e===m)return;m=e,u=d.filter(n=>n.title.toLowerCase().includes(m.toLowerCase()));const s=document.querySelector(".chatList");s.innerHTML="",u.forEach(n=>{const a=y(n);s.appendChild(a)})}function b(){const t=document.querySelector(".app");t.innerHTML="",t.insertAdjacentHTML("afterbegin",L());const e=document.getElementById("searchInput");e&&(e.value=m,e.addEventListener("input",A));const s=document.createElement("div");s.className="chatList",u.forEach(n=>{const a=y(n);s.appendChild(a)}),t.appendChild(s),t.appendChild(H(q))}const F=document.querySelector(".app"),h=()=>{const t=window.location.pathname;F.innerHTML="";const e=t.match(/\/chat\/(\d+)/);e?$(e[1]):b()},j=t=>{history.pushState(null,null,t),h()};document.body.addEventListener("click",t=>{const e=t.target.closest(".link");e&&j(e.getAttribute("data-link"))});window.addEventListener("popstate",h);h();
