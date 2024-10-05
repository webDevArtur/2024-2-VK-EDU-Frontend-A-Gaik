import { Header } from '../components/Header/Header.js'
import { ChatItem } from '../components/ChatItem/ChatItem.js'
import { FloatingActionButton } from '../components/FloatingActionButton/FloatingActionButton.js'

document.addEventListener('DOMContentLoaded', function () {
  const chats = [
    {
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      title: 'Дженнифер Эшли',
      message: 'Ты куда пропал?',
      time: '15:52',
      unreadCount: 99,
      isRead: false,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      title: 'Общество целых бокалов',
      message: 'Новая встреча в пятницу.',
      time: '14:30',
      unreadCount: 0,
      isRead: true,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      title: 'Антон Иванов',
      message: 'Тоха, ты где?',
      time: '15:52',
      unreadCount: 0,
      isRead: true,
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      title: 'Серёга (должен 2000Руб.)',
      message: 'Серёг, это Ваня. Где бабло моё?',
      time: '14:30',
      unreadCount: 0,
      isRead: false,
    },
  ]

  const chatList = document.querySelector('.chatList')

  document.body.insertAdjacentHTML('afterbegin', Header())

  chats.forEach((chat) => {
    chatList.insertAdjacentHTML('beforeend', ChatItem(chat))
  })

  document.body.insertAdjacentHTML('beforeend', FloatingActionButton())
})
