interface PostInterface {
    id: Number,
    title: string,
    addres: string,
    sector: Number,
    general: string,
    latitude: Number,
    longitude: Number,
    shifts: Number[],
    users: Number[][],
    activeProblem: boolean
}

export default PostInterface;