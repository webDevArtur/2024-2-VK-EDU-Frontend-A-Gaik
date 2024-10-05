import{H as r}from"./Header-BXUx_0k7.js";function o({avatar:t,title:a,message:e,time:n,unreadCount:s,isRead:i}){return`
        <a href="chat.html" class="chatItem">
            <img src="${t}" alt="Avatar" class="avatar">
            <div class="chatDetails">
                <h2>${a}</h2>
                <p>${e}</p>
            </div>
            <div class="chatMeta">
                <span class="time">${n}</span>
                ${s>0?`<span class="badge">${s}</span>`:`<icon class="material-icons readIcon">${i?"done":"done_all"}</icon>`}
            </div>
        </a>
    `}function c(){return`
        <button class="fab">
            <i class="material-icons">mode_edit</i>
        </button>
    `}document.addEventListener("DOMContentLoaded",function(){const t=[{avatar:"https://randomuser.me/api/portraits/women/1.jpg",title:"Дженнифер Эшли",message:"Ты куда пропал?",time:"15:52",unreadCount:99,isRead:!1},{avatar:"https://randomuser.me/api/portraits/men/2.jpg",title:"Общество целых бокалов",message:"Новая встреча в пятницу.",time:"14:30",unreadCount:0,isRead:!0},{avatar:"https://randomuser.me/api/portraits/women/3.jpg",title:"Антон Иванов",message:"Тоха, ты где?",time:"15:52",unreadCount:0,isRead:!0},{avatar:"https://randomuser.me/api/portraits/men/4.jpg",title:"Серёга (должен 2000Руб.)",message:"Серёг, это Ваня. Где бабло моё?",time:"14:30",unreadCount:0,isRead:!1}],a=document.querySelector(".chatList");document.body.insertAdjacentHTML("afterbegin",r()),t.forEach(e=>{a.insertAdjacentHTML("beforeend",o(e))}),document.body.insertAdjacentHTML("beforeend",c())});
