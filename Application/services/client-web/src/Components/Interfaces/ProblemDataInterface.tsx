import React from 'react';

interface ProblemInterface {
    ProblemType: string,
    Priority: Number,
    Discription: string,
    TimeStamp?: string,
    ShiftName?: string,
    Post?: string,
    User?: string,
    Sender?: string
}

export default ProblemInterface;