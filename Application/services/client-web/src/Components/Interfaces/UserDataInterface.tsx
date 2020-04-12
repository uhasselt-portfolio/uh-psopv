interface UserInterface {
    id: Number,
    name: string,
    lastname: string,
    has_internet: boolean,
    gsmNumber: string,
    email: string,
    permissions: boolean,
    association?: string
    latitude: Number,
    longitude: Number
}

export default UserInterface;