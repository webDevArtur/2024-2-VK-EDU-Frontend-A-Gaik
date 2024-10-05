(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();function a(i=!1){return`
        <header class="chatHeader">
            <div class="chatTitle">
                ${i?`
                    <i class="material-icons backArrowIcon">
                        <a href="index.html" class="backArrowLink">arrow_back</a>
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
    `}export{a as H};
