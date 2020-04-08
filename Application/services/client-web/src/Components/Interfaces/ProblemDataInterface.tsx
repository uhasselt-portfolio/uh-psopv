import React from 'react';

interface ProblemInterface {
    problemType: string,
    priority: Number,
    discription: string,
    timeStamp: string,
    shiftName: string,
    post: string,
    user: string,
    sender: string,
    latitude: Number,
    longitude: Number
}

export default ProblemInterface;