import Ably from 'ably'
const ably=new Ably.Realtime('Wrp4JA.eNrmQg:qGwpM2cfNIO0U1CeUD_P2NMjdIl0sV8v8DYd0IIFbSY')
// Example function to publish an event
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


// triggerEvent('abcdef234q', , { text: 'hello sir ia m ready' }); 