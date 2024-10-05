import{H as u}from"./Header-BXUx_0k7.js";function g(s){return`
    <div class="messages">${s.length?s.map(e=>`
        <div class="messageWrapper">
          <div class="messageSender">${e.sender}</div>
          <div class="messageText">${e.text}</div>
          <div class="messageTimestamp">${e.timestamp}</div>
        </div>
      `).join(""):`
        <div class="noMessages">
          <img src="/noMessage.png" alt="Нет сообщений" class="noMessagesImage" />
          <div class="noMessagesText">Здесь будет выводиться список<br>Ваших сообщений.</div>
        </div>
      `}</div>
  `}function p(){return`
        <div class="inputContainer">
            <form class="form">
                <input class="formInput" name="messageText" placeholder="Введите сообщение" type="text">
                <button type="submit" class="sendButton">
                    <i class="material-icons sendButtonIcon">send</i>
                </button>
            </form>
        </div>
    `}function f(s){const t=parseInt(localStorage.getItem("messageCount"))||0,e=`message_${t+1}`;localStorage.setItem(e,JSON.stringify(s)),localStorage.setItem("messageCount",t+1)}function v(){const s=parseInt(localStorage.getItem("messageCount"))||0,t=[];for(let e=1;e<=s;e++){const o=JSON.parse(localStorage.getItem(`message_${e}`));o&&t.push(o)}return t}window.addEventListener("DOMContentLoaded",()=>{M();const s=document.querySelector("form"),t=document.querySelector(".formInput"),e=document.querySelector(".messages");s.addEventListener("submit",o),s.addEventListener("keypress",d);function o(n){n.preventDefault();const r=t.value.trim();if(r==="")return;const a={text:r,sender:"Иван Иванов",timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};l(a),f(a),t.value="",t.focus()}function d(n){n.key==="Enter"&&(n.preventDefault(),o(n))}function l(n){const r=document.querySelector(".noMessages");r&&r.remove();const a=document.createElement("div");a.classList.add("messageWrapper");const i=document.createElement("div");i.classList.add("messageSender"),i.innerText=n.sender;const c=document.createElement("div");c.classList.add("messageText"),c.innerText=n.text;const m=document.createElement("div");m.classList.add("messageTimestamp"),m.innerText=n.timestamp,a.appendChild(i),a.appendChild(c),a.appendChild(m),e.appendChild(a),e.scrollTop=e.scrollHeight}});function M(){const s=v();document.querySelector(".chatContainer").insertAdjacentHTML("afterbegin",u(!0)),document.querySelector(".chatContainer").insertAdjacentHTML("beforeend",g(s)),document.querySelector(".chatContainer").insertAdjacentHTML("beforeend",p())}
