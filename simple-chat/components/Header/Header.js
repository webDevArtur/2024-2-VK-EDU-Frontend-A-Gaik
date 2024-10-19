import './Header.css';

export function Header(showBackArrow = false, searchValue = '') {
  return `
        <header class="chatHeader">
            <div class="chatTitle">
                ${
                  showBackArrow
                    ? `
                    <i class="material-icons backArrowIcon link" data-link="/2024-2-VK-EDU-Frontend-A-Gaik/">
                        arrow_back
                    </i>
                `
                    : ''
                }
                VKchat
                <i class="material-icons chatTitleIcon">send</i>
            </div>

            <div class="searchContainer">
                ${!showBackArrow ? `<input type="text" id="searchInput" placeholder="Поиск" class="searchInput" value="${searchValue}" />` : ''}
                <div class="userInfo">
                    <i class="material-icons userInfoIcon">account_circle</i>
                    <span class="userName">Иван Иванов</span>
                </div>
            </div>
        </header>
    `;
}
