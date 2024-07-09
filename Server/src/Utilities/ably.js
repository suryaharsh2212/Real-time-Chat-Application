import Ably from 'ably'
const ably=new Ably.Realtime('OIeztA.-Emkzw:s2NCD6aseIigtDHSw4Rv-FUtDq_FfL5_1S5naKRAM5A')

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

