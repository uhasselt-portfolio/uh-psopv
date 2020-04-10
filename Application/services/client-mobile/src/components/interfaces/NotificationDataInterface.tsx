import React from 'react';

interface NotificationDataInterface {
    id: number,
    from_person: string,
    title: string,
    description: string,
    time_send: string,
    read: boolean,
}

export default NotificationDataInterface;