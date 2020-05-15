// TODO: Wouter permission changed
interface UserInterface {
    id: Number,
    name: string,
    lastname: string,
    has_internet: boolean,
    gsmNumber: string,
    email: string,
    permission: Number,
    association?: string
    latitude: number,
    longitude: number
}

export default UserInterface;