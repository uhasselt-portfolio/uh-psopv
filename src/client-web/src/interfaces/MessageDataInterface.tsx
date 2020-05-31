interface MessageInterface {
    id: number,
    title: string,
    sender: string,
    content: string,
    read: boolean
}

export default MessageInterface;