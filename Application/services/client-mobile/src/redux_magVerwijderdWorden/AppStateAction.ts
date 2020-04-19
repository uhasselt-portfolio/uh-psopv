import Redux from 'redux';
import { Component } from 'react';
import axios from 'axios';



export const GET_USER_ID = 'GET_USER_ID'



export function getUserId() {
    return { type: GET_USER_ID }
}

