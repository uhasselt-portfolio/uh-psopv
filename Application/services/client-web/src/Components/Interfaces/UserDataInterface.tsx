import React from 'react';

interface UserInterface {
    name: string,
    lastname: string,
    has_internet: boolean,
    gsmNumber: string,
    email: string,
    permissions: boolean,
    association?: string
}

export default UserInterface;