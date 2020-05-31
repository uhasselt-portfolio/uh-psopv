import React from 'react';

interface MessageInterface {
    id: number,
    receiver_id: number,
    title: string,
    sender: string,
    content: string,
    time_send: string,
    read: boolean,
}

export default MessageInterface;