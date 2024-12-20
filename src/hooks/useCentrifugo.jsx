import { useEffect } from 'react';
import { Centrifuge } from 'centrifuge';
import {getProfile} from '../services/profile.jsx';
import {
  getCentrifugoToken,
  getSubscribeToken,
} from '../services/centrifugo.jsx';

const useCentrifuge = (chatId, setMessages) => {
  useEffect(() => {
    let centrifuge;
    let subscription;

    const initializeCentrifuge = async () => {
      try {
        const userData = await getProfile();
        const connectToken = await getCentrifugoToken();
        const subscribeToken = await getSubscribeToken(userData.id);

        if (!userData || !connectToken || !subscribeToken) {
          throw new Error('Не удалось получить необходимые токены');
        }

        centrifuge = new Centrifuge(
          'wss://vkedu-fullstack-div2.ru/connection/websocket/',
          {
            getToken: () => Promise.resolve(connectToken),
          }
        );

        subscription = centrifuge.newSubscription(userData.id, {
          getToken: () => Promise.resolve(subscribeToken),
        });

        subscription.on('publication', (ctx) => {
          const { event, message } = ctx.data;
          const isCurrentChat = message.chat === chatId;

          if (!isCurrentChat) return;

          setMessages((prevMessages) => {
            switch (event) {
              case 'create': {
                const checkDuplication = prevMessages.some((msg) => msg.id === message.id);
                
                if (checkDuplication) return prevMessages;

                const isMyMessage = message.sender.id === userData.id;
              
                const updatedMessage = {
                  ...message,
                  source: isMyMessage ? 'user' : 'other',
                };
              
                return [...prevMessages, updatedMessage];
              }

              case 'update':
                return prevMessages.map((msg) =>
                  msg.id === message.id ? message : msg
                );

              case 'delete':
                return prevMessages.filter((msg) => msg.id !== message.id);

              default:
                return prevMessages;
            }
          });
        });

        subscription.subscribe();
        centrifuge.connect();

        centrifuge.on('error', (error) => {
          console.error('Ошибка при подключении Centrifuge:', error);
        
          setTimeout(() => {
            console.warn('Попытка повторного подключения...');
            centrifuge.connect();
          }, 5000);
        });
        

      } catch (error) {
        console.error('Ошибка при инициализации Centrifuge:', error);
      }

      return () => {
        if (centrifuge) {
          centrifuge.disconnect();
        }
        if (subscription) {
          subscription.removeAllListeners();
          subscription.unsubscribe();
        }
      };
    };

    initializeCentrifuge();
  }, [chatId, setMessages]);
};

export default useCentrifuge;