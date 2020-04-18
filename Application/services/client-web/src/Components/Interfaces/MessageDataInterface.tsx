interface MessageInterface {
    id: Number,
    title: string,
    sender: string,
    content: string,
    read: boolean
}

export default MessageInterface;