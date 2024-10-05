import './MessageForm.css'

export function MessageForm() {
  return `
        <div class="inputContainer">
            <form class="form">
                <input class="formInput" name="messageText" placeholder="Введите сообщение" type="text">
                <button type="submit" class="sendButton">
                    <i class="material-icons sendButtonIcon">send</i>
                </button>
            </form>
        </div>
    `
}
