import React from 'react';
import ShiftItem from './ShiftItem'
import ShiftProblem from './ShiftProblem'

 
interface ShiftData {
    sector_id: Number,

    post_id: Number,
    title: String,
    address: String,
    latitude: Number,
    longitude: Number,
    radius: Number,

    shift_id: number,
    shift_begin: Number,
    shift_end: Number,

    users: String[],
    items: ShiftItem[],
    problems: ShiftProblem[]
}
 
export default ShiftData;