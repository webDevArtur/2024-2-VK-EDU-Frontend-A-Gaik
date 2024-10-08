(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=n(e);fetch(e.href,a)}})();function g(s=!1){return`
        <header class="chatHeader">
            <div class="chatTitle">
                ${s?`
                    <i class="material-icons backArrowIcon link" data-link="/2024-2-VK-EDU-Frontend-A-Gaik/">
                        arrow_back
                    </i>
                `:""}
                VKchat
                <i class="material-icons chatTitleIcon">send</i>
            </div>
            <div class="userInfo">
                <i class="material-icons userInfoIcon">account_circle</i>
                <span class="userName">Иван Иванов</span>
            </div>
        </header>
    `}function p(s){return`
    <div class="messages">${s.length?s.map(n=>`
        <div class="messageWrapper">
          <div class="messageSender">${n.sender}</div>
          <div class="messageText">${n.text}</div>
          <div class="messageTimestamp">${n.timestamp}</div>
        </div>
      `).join(""):`
        <div class="noMessages">
          <img src="/2024-2-VK-EDU-Frontend-A-Gaik/noMessage.png" alt="Нет сообщений" class="noMessagesImage" />
          <div class="noMessagesText">Здесь будет выводиться список<br>Ваших сообщений.</div>
        </div>
      `}</div>
  `}function f(){return`
        <div class="inputContainer">
            <form class="form">
                <input class="formInput" name="messageText" placeholder="Введите сообщение" type="text">
                <button type="submit" class="sendButton">
                    <i class="material-icons sendButtonIcon">send</i>
                </button>
            </form>
        </div>
    `}function v(s,t){const n=parseInt(localStorage.getItem(`messageCount_${t}`))||0,r=`message_${t}_${n+1}`;localStorage.setItem(r,JSON.stringify(s)),localStorage.setItem(`messageCount_${t}`,n+1)}function y(s){const t=parseInt(localStorage.getItem(`messageCount_${s}`))||0,n=[];for(let r=1;r<=t;r++){const e=JSON.parse(localStorage.getItem(`message_${s}_${r}`));e&&n.push(e)}return n}function L(s){const t=y(s);document.querySelector(".app").insertAdjacentHTML("afterbegin",g(!0)),document.querySelector(".app").insertAdjacentHTML("beforeend",p(t)),document.querySelector(".app").insertAdjacentHTML("beforeend",f())}function h(s){L(s);const t=document.querySelector("form"),n=document.querySelector(".formInput"),r=document.querySelector(".messages");t.addEventListener("submit",e),t.addEventListener("keypress",a);function e(o){o.preventDefault();const l=n.value.trim();if(l==="")return;const i={text:l,sender:"Иван Иванов",timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};c(i),v(i,s),n.value="",n.focus()}function a(o){o.key==="Enter"&&(o.preventDefault(),e(o))}function c(o){const l=document.querySelector(".noMessages");l&&l.remove();const i=document.createElement("div");i.classList.add("messageWrapper");const d=document.createElement("div");d.classList.add("messageSender"),d.innerText=o.sender;const m=document.createElement("div");m.classList.add("messageText"),m.innerText=o.text;const u=document.createElement("div");u.classList.add("messageTimestamp"),u.innerText=o.timestamp,i.appendChild(d),i.appendChild(m),i.appendChild(u),r.appendChild(i),r.scrollTop=r.scrollHeight}}export{h as C,g as H};
