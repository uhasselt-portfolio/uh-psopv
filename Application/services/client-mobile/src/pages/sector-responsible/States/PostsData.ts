import React from 'react';
 
interface PostsData {
    id: number,
    title: string,
    address: string,
    latitude: Number,
    longitude: Number,
    radius: Number,
    sector_id: Number,
    problem: boolean
}
 
export default PostsData;