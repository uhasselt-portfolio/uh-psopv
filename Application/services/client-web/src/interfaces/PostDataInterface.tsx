interface PostInterface {
    id: Number,
    title: string,
    addres: string,
    sector: Number,
    general: string,
    latitude: number,
    longitude: number,
    shifts: Number[],
    users: Number[][],
    activeProblem: boolean
}

export default PostInterface;