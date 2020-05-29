interface UserInterface {
    id: number,
    name: string,
    lastname: string,
    has_internet: boolean,
    gsmNumber: string,
    email: string,
    permission: number,
    association?: string
    latitude: number,
    longitude: number
}

export default UserInterface;