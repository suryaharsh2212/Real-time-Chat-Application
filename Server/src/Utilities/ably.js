import Ably from 'ably'
const ably=new Ably.Realtime('88tU5Q.cVzWGg:qEj5R0WYvH0fj3tbRb1-ADoQkaxvkFCizBcRdc403cI')

function triggerEvent(channelName, eventName, data) {
    const channel = ably.channels.get(channelName);
    channel.publish(eventName, data, (err) => {
        if (err) {'new-message'
            console.error('Error publishing message:', err);
        } else {
            console.log('Message successfully sent');
        }
    });
}
export {triggerEvent}

