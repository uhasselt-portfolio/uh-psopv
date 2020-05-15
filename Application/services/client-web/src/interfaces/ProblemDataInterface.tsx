interface ProblemInterface {
    id: Number,
    problemType: string,
    priority: Number,
    discription: string,
    timeStamp: string,
    shiftName: string,
    post: string,
    postId: Number,
    user: string,
    sender: string,
    latitude: number,
    longitude: number,
    solved: boolean
}

export default ProblemInterface;