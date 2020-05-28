import axios from 'axios';

export interface GeneralPost {
    name: string,
    minimumAge: number,
    discription: string
}
export interface Post {
    title: string,
    address: string,
    latitude : number,
    longitude : number,
    radius : number,
    sector : number,
    generalpost : string
}
export interface User {
    first_name : string,
    last_name : string,
    password : string,
    phone_number : string,
    email : string,
    current_lat : number,
    current_long : number,
    is_connected : boolean,
    association : string,
    permission : string
}
export interface Item {
    name : string,
    planning : string,
    functie : string,
    naam : string
}
export interface Shift {
    name : string,
    begin : string,
    end : string
}
export interface Planning {
    user : string,
    shift : string,
    post : string
}
export interface Association {
    name : string
}
export interface Sector {
    user: string,
    type : number
}

/**
 * class that parses all the data from the input excel files
 */
export class Parser {
    generalposts : GeneralPost[];
    posts : Post[];
    users : User[];
    items : Item[];
    shifts : Shift[];
    planning : Planning[];
    associations : Association[]
    sectors : Sector[]
    itemTypes : string[]
    error : boolean;
    serverResponse : any;

    constructor() {
        this.generalposts = [];
        this.posts = [];
        this.users = [];
        this.items = [];
        this.shifts = [];
        this.planning = [];
        this.associations = [];
        this.sectors = [];
        this.itemTypes = [];
        this.error = false;
    }



    createGeneralAndPosts = async (data: any) => {
        let headFunctieIndex : number = -1;
        let minAgeIndex : number = -1;
        let discriptionIndex : number = -1;
        let postIndex : number = -1;
        let sectorIndex : number = -1;
        let addressIndex : number = -1;
        for (let i = 0; i < data[2].length; ++i) {
            if (data[2][i] === 'HOOFDFUNCTIE')
                headFunctieIndex = i;
            else if (data[2][i] === 'MINIMUMLEEFTIJD')
                minAgeIndex = i;
            else if (data[2][i] === 'OPMERKING')
                discriptionIndex = i;
            else if (data[2][i] === 'SUBFUNCTIE')
                postIndex = i;
            else if (data[2][i] === 'SECTOR')
                sectorIndex = i;
            else if (data[2][i] === 'LOCATIE')
                addressIndex = i;
        }
        if (headFunctieIndex === -1 || minAgeIndex === -1 || discriptionIndex === -1 || postIndex === -1 
            || sectorIndex === -1 || addressIndex === -1) {
                this.error = true;
                return ;
            }
    
        for (let i = 3; i < data.length; ++i) {
            if (data[i][discriptionIndex] === undefined) {
                let temp : GeneralPost = {
                    name: data[i][headFunctieIndex],
                    minimumAge: data[i][minAgeIndex],
                    discription: data[i][headFunctieIndex]
                }
                if ( ! this.checkGeneralPostInside(temp,this.generalposts))
                    this.generalposts.push(temp);
            } else {
                let temp : GeneralPost = {
                    name: data[i][headFunctieIndex],
                    minimumAge: data[i][minAgeIndex],
                    discription: data[i][headFunctieIndex] + " " + data[i][discriptionIndex]
                }
                if ( ! this.checkGeneralPostInside(temp,this.generalposts))
                    this.generalposts.push(temp);
            }

            let generalpost : string = data[i][headFunctieIndex];
            let discription : string = data[i][discriptionIndex];
            if (discription !== undefined)
                generalpost = generalpost + " " + discription;
            let title : string = data[i][postIndex];
            let sector : number = data[i][sectorIndex];

            let latitude : number = 5;
            let longitude : number = 5;
            let address : string;
            if (data[i][addressIndex] === undefined)
                address  = "/"
            else {
                address = data[i][addressIndex];
                const response  = await axios.get("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=" + address + "&outFields=Match_addr,Addr_type");

                console.log("locatie",response.data.candidates);
                console.log('address',data[i]);

                if (response.data.candidates.length > 0) {
                    latitude = response.data.candidates[0].location.x;
                    longitude = response.data.candidates[0].location.y;
                }
            }
                

            let radius : number = 10;
    
            this.posts.push({
                title, generalpost, sector, address, latitude, longitude, radius
            });

            let inside : boolean = false;
            for (let j = 0; j < this.sectors.length ; ++j) {
                if (this.sectors[j].type === sector) {
                    inside = true;
                    break;
                }
            }
            if (! inside)
                this.sectors.push({
                    user: "", //TODO
                    type: sector
                });
        }
        try {
            this.serverResponse = await axios.post('http://localhost/api/import/createGeneralAndPost', {
                sector : this.sectors,
                post: this.posts,
                generalpost: this.generalposts
            });
        } catch(error) {
            this.serverResponse = error.response;
        }

    }
    checkGeneralPostInside = (newpost : GeneralPost, array : GeneralPost[]) : boolean => {
        for (let i = 0; i < array.length; ++i) {
            if (newpost.name === array[i].name && newpost.discription === array[i].discription)
                return true;
        }
        return false;
    }

    createuser = async (data : any)=> {
        let first_nameIndex : number = -1;
        let last_nameIndex : number = -1;
        let phone_numberIndex : number = -1;
        let emailIndex : number = -1;
        let passwordIndex : number = -1;
        let permissionIndex : number = -1;
        let associationIndex : number = -1;
        for (let i = 0; i < data[1].length; ++i) {
            if (data[1][i] === 'voornaam')
                first_nameIndex = i;
            else if (data[1][i] === 'telefoon nummber')
                phone_numberIndex = i;
            else if (data[1][i] === 'email')
                emailIndex = i;
            else if (data[1][i] === 'vrijwilliger?')
                permissionIndex = i;
            else if (data[1][i] === 'vereneging')
                associationIndex = i;
            else if (data[1][i] === 'achternaam')
                last_nameIndex = i;
            else if (data[1][i] === 'wachtwoord')
                passwordIndex = i;
        }
        if (first_nameIndex === -1 || last_nameIndex === -1 || phone_numberIndex === -1 || emailIndex === -1 || 
            passwordIndex === -1 || permissionIndex === -1 || associationIndex === -1)
            return [{
                first_name : "error", last_name: '', password :  "", email : '', phone_number: "",current_lat : 0,current_long : 0,
                    is_connected: true, association: '', permission: '' 
            }];

    
        for (let i = 2; i < data.length; ++i) {
            let first_name : string = data[i][first_nameIndex];
            let last_name : string = data[i][last_nameIndex];
            let phone_number : string = data[i][phone_numberIndex];
            let password : string = data[i][passwordIndex];
            let email : string = "";
            if (data[i][emailIndex] !== undefined)
                email = data[i][emailIndex];
            let permission : string = "";
            if (data[i][permissionIndex] !== undefined)
                permission = data[i][permissionIndex];
            let association : string = data[i][associationIndex];
            let current_lat : number = 0;
            let current_long : number = 0;
            let is_connected : boolean = true;
    
            this.users.push({
                first_name, last_name, phone_number, password, email, permission, association, current_long, current_lat, is_connected
            });

            let inside : boolean = false;
            for (let j = 0; j < this.associations.length; ++j) {
                if (this.associations[j].name === association) {
                    inside = true;
                    break;
                }
            }
            if ( ! inside)
            this.associations.push({
                    name: association
                });
        }
        try {
            this.serverResponse = await axios.post('http://localhost/api/import/createUser', {
                users : this.users,
                association: this.associations
            });
        } catch(error) {
            this.serverResponse = error.response;
        }
    }

    createPlanning = async (data: any) => {
        console.log('creating planning');
        let shiftIndex : number = 0;
        let postIndex : number = 2;
        let userIndex : number = 4;
    
        let shift : string = "";
    
        for (let i = 0; i < data.length; ++i) {
            console.log('i');
            if (data[i][shiftIndex] !== undefined)
                shift = data[i][shiftIndex];
            else if (data[i] !== " " && data[i][postIndex] !== "FUNCTIE") {
                this.planning.push({
                    user: data[i][userIndex],
                    shift: shift,
                    post: data[i][postIndex]
                });
            }
        
        }

        try {
            let count = 0;
            while (count < this.planning.length) {
                if (count + 500 < this.planning.length)
                    this.serverResponse = await axios.post('http://localhost/api/import/createPlanning', {
                        planning : this.planning.slice(count, count + 500)
                    });
                else
                    this.serverResponse = await axios.post('http://localhost/api/import/createPlanning', {
                        planning : this.planning.slice(count)
                    });
                count += 500;
            }
        } catch(error) {
            this.serverResponse = error.response;
            
        }
    }

    createShift = async (data: any) => {
        let ShiftIndex : number = -1;
        let StartIndex : number = -1;
        let endIndex : number = -1;
        for (let i = 0; i < data[2].length; ++i) {
            if (data[2][i] === 'SHIFT')
                ShiftIndex = i;
            else if (data[2][i] === 'STARTDTG')
                StartIndex = i;
            else if (data[2][i] === 'EINDEDTG')
                endIndex = i;
        }
        if (ShiftIndex === -1 || StartIndex === -1 || endIndex === -1)
            return [{
                name: 'error', begin: "", end: ""
            }];
    
        for (let i = 3; i < data.length; ++i) {
            let name : string = data[i][ShiftIndex];
            let begin : string = data[i][StartIndex];
            let end : string = data[i][endIndex];
    
            this.shifts.push({
                name, begin, end
            });
        }
        try {
            this.serverResponse = await axios.post('http://localhost/api/import/createShift', {
                shifts : this.shifts
            });
        } catch(error) {
            this.serverResponse = error.response; 
        }
    }
    
    createItemtype = async (data : any) => {
        console.log("crating items");
        let typeIndex : number = -1;
        let planningIndex : number = -1;
        let functieIndex : number = -1;
        let naamIndex : number = -1;
        for (let i = 0; i < data[1].length; ++i) {
            if (data[1][i] === 'itemType')
                typeIndex = i;
            else if (data[1][i] === 'shift')
                planningIndex = i;
            else if (data[1][i] === 'functie')
            functieIndex = i;
            else if (data[1][i] === 'naam(tel)')
                naamIndex = i;
        }

        if (planningIndex === -1 || typeIndex === -1 || functieIndex === -1 || naamIndex === -1)
            return [{
                name: 'error', planning: ""
            }];
    
        for (let i = 2; i < data.length; ++i) {
            this.items.push({
                name: data[i][typeIndex],
                planning: data[i][planningIndex],
                functie : data[i][functieIndex],
                naam : data[i][naamIndex]
            })

            let inside : boolean = false;
            for (let j = 0; j < this.itemTypes.length; ++j)
                if (this.itemTypes[j] === data[i][typeIndex]) {
                    inside = true;
                    break;
                }
            if (! inside)
                this.itemTypes.push(data[i][typeIndex]);
        }

        try {

            this.serverResponse = await axios.post('http://localhost/api/import/createItemType', {
                items : this.items,
                itemType: this.itemTypes
            });
        } catch(error) {
            this.serverResponse = error.response;
            
        }
    }

    deleteAll = async () => {
        try {
            this.serverResponse = await axios.post('http://localhost/api/import/deleteAll', {
                users : this.users,
                association: this.associations
            });
                    } catch(error) {
            this.serverResponse = error.response;
            
        }
    }

    getGeneralPosts = () : GeneralPost[] => {return this.generalposts;}
    getPosts = () : Post[] => {return this.posts;}
    getUsers = () : User[] => {return this.users;}
    getItems = () : Item[] => {return this.items;}
    getShifts = () : Shift[] => {return this.shifts;}
    getPlanning = () : Planning[] => {return this.planning;}
    getAssociations = () : Association[] => {return this.associations;}
    getSectors = () : Sector[] => {return this.sectors;}
    getError = () : boolean => {return this.error;}
    getResponse = () => {return this.serverResponse;}
}