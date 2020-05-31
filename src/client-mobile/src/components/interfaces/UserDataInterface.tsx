import React from 'react';

interface UserInterface {
    id: number,
    first_name: string,
    last_name: string,
    has_internet: boolean,
    phone_number: string,
    email: string,
    permissions: boolean,
    association?: string
    sector?: string,
    role: string,
    latitude: Number,
    longitude: Number
}

export default UserInterface;