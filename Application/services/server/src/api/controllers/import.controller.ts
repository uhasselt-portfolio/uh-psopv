import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import JWTUtil from "../utils/jwt.util";
import UserModel from "../models/user.model";
import XLSX from 'xlsx';

import AssociationModel from '../models/association.model';
import PermissionTypeModel from '../models/permission_type.model';
import GeneralPostModel from '../models/general_post.model';
import ItemTypeModel from '../models/item_type.model';
import ItemModel from '../models/item.model';
import MessageModel from '../models/message.model';
import PlanningModel from '../models/planning.model';
import PostModel from '../models/post.model';
import ProblemModel from '../models/problem.model';
import SectorModel from '../models/sector.model';
import ShiftModel from '../models/shift.model';



export const importUsers = async (req: Request, res: Response) => {
    console.log('Entering user import');
    const excel = req.file;

    //let parser : Parser = new Parser();
    //parser.parseGebruikers(req.file);
    //let users : User[] = parser.getUsers();

    console.log(req);
    console.log(req.body);
    console.log("fjkslmqe");

    // const workbook : XLSX.WorkBook = XLSX.read(excel.buffer, {type: "buffer"});
    // console.log(workbook)
    // const sheetName = workbook.SheetNames[0];
    // const data = utils.sheet_to_json(workbook.Sheets[sheetName]);

    // // console.log((workbook.Sheets[sheetName]))
    // console.log(data);

    // console.log(workbook);
    // console.log(JSON.stringify(workbook.Sheets.Sheet1.A1));

    //res.status(200).send({data: workbook});
    res.status(200).send();
};

export const importAll = async (req: Request, res: Response) => {
    console.log('Entering all import');

    //if (!checkRequiredParameters(req, res)) console.log("fout");

    console.log(req.body);
    // console.log('everything',req);

    res.status(200).send();
}

const deleteAll = async () => {
    await ProblemModel.destroy({
        truncate: true
    });
    await MessageModel.destroy({
        truncate: true
    });
    await ItemModel.destroy({
        truncate: true
    });
    await ItemTypeModel.truncate({ 
        cascade: true 
    });
    await PlanningModel.truncate({
        cascade: true
    });
    await ShiftModel.truncate({
        cascade: true
    });
    await PostModel.truncate({
        cascade: true
    });
    await SectorModel.destroy({
        truncate: true
    });
    await GeneralPostModel.truncate({
        cascade: true
    });
    await UserModel.truncate({
        cascade: true
    });
    await AssociationModel.truncate({
        cascade: true
    });
    return true;
}

export const importUserAndAssociation = async (req: Request, res: Response) => {
    // let deleted : Promise<boolean> = deleteAll();
    // //console.log('userandassociation',req.body);

    // deleted.then((val : boolean) => {
    //     let correct : Promise<boolean> = insertAssoxiation(req.body.association,res);

    //     correct.then((val : boolean) => {
    //         if (val) res.status(200).send();} );
    // });
    let deleted : boolean = await deleteAll();
    if (deleted) {
        let association = await insertAssoxiation(req.body.association,res);

        if (association) {
            let users = await insertUser(req.body.users,res);

            if (users) {
                const users = await UserModel.findAll();
                console.log('length',users.length);
                res.status(201).send();
            }
        } else {
            console.log('false association');
        }
    }
}
export const importGeneralPostAndPost = async (req: Request, res: Response) => {
    //console.log('post',req.body);
}
export const importShifts = async (req: Request, res: Response) => {
    //console.log('shift',req.body);
}
export const importPlanning = async (req: Request, res: Response) => {
    //console.log('planningg',req.body);
}
export const importItems = async (req: Request, res: Response) => {
    //console.log('items',req.body);
}


const insertAssoxiation = async (associations : any[], res: Response) => {
    try {
        for (let i = 0; i < associations.length; ++i) {
            const associationExists = await AssociationModel.findOne({where: {name: associations[i].name}});

            // const userExists = await UserModel.findOne({where: {phone_number: req.body.phone_number}});
            // const associationExists = await AssociationModel.findByPk(req.body.association_id);
    
            if(associationExists) {
                console.log('association exists');
                res.status(404).send({
                    status: 'fail',
                    data: null,
                    message: 'Association allready exists'
                });
                return false;
            } else {
                const association = await AssociationModel.create({
                    name: associations[i].name
                });
            }
        }
        // const association = await AssociationModel.create({
        //     name: 'CREW'
        // });
    } catch (error) {
        console.log("error");
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    console.log('done');
    return true;
}

/**
 * inserts all the user in the database
 * the permission_type must be initialized
 * the association must be initialized
 */
const insertUser = async (user : any[], res: Response) => {
    try {
        console.log('inserting users real');
        let associations = await AssociationModel.findAll();
        let associationsMap = new Map();
        for (let i = 0; i < associations.length; ++i) 
            associationsMap.set(associations[i].name,associations[i].id);


        let ids : number[] = await getpermissionIds();
        let volunteerId : number = ids[0];
        let responsibleId : number = ids[1];
        let adminId : number = ids[2];

        console.log('ids checking', ids);

        if (volunteerId === -1 || responsibleId === -1 || adminId === -1) {
            console.log('no ids');
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'internal server error'
            });
        } else {
            console.log('ids ok',user.length);
            for (let i = 0; i < user.length; ++i) {
                console.log(user[i]);
                const userExists = await UserModel.findOne({where: {phone_number: user[i].phone_number}});

                console.log('exsists checked');
    
                let permission_id : number = -1;
                if (user[i].permission === 'vrijwilliger') {
                    permission_id = volunteerId
                } else if (user[i].permission === 'verantwoordelijke') {
                    permission_id = responsibleId;
                } else {
                    console.log('permissions fail');
                    return res.status(404).send({
                        status: 'fail',
                        data: null,
                        message: 'permission doesn\'t exist'
                    })
                }

                console.log('permissions checked');
    
                const association_id = associationsMap.get(user[i].association);
                if( association_id === undefined) {
                    console.log('association failed');
                    return res.status(404).send({
                        status: 'fail',
                        data: null,
                        message: 'Association doesn\'t exist'
                    })
                }
                console.log('associations checked');
    
                if (!userExists) {
                    console.log('creating');
                    const newUser = await UserModel.create({
                        first_name: user[i].first_name,
                        last_name: user[i].last_name,
                        password: user[i].password,
                        phone_number: user[i].phone_number,
                        email: user[i].email,
                        permission_type_id: permission_id,
                        association_id: association_id
                    });
                } else {
                    console.log('not craeting');
                }
            }
        }
    
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
        return false;
    }
    return true;
}

const getpermissionIds = async () : Promise<number[]> => {
    let permission_types = await PermissionTypeModel.findAll();

    let volunteerId : number = -1;
    let responsibleId : number = -1;
    let adminId : number = -1;

    for (let i = 0; i < permission_types.length; ++i) {
        if (permission_types[i].name === 'Vrijwilliger')
            volunteerId = permission_types[i].id;
        else if (permission_types[i].name === 'Sectorverantwoordelijke')
            responsibleId = permission_types[i].id;
        else
            adminId = permission_types[i].id;
    }
    return [volunteerId, responsibleId, adminId];
}


interface GeneralPost {
    name: string,
    minimumAge: number,
    discription: string
}
interface Post {
    title: string,
    address: string,
    latitude : number,
    longitude : number,
    radius : number,
    sector : number,
    generalpost : string
}
interface User {
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
interface Item {
    name : string,
    planning : string
}
interface Shift {
    name : string,
    begin : string,
    end : string
}
interface Planning {
    user : string,
    shift : string,
    post : string
}
interface Association {
    name : string
}
interface Sector {
    user: string,
    type : number
}

/**
 * class that parses all the data from the input excel files
 */
 class Parser {
    generalposts : GeneralPost[];
    posts : Post[];
    users : User[];
    items : Item[];
    shifts : Shift[];
    planning : Planning[];
    associations : Association[]
    sectors : Sector[]
    error : boolean;

    test : any;

    constructor() {
        this.generalposts = [];
        this.posts = [];
        this.users = [];
        this.items = [];
        this.shifts = [];
        this.planning = [];
        this.associations = [];
        this.sectors = [];
        this.error = false;
    }



    createGeneralAndPosts = (data: any) => {
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
            if (data[i][discriptionIndex] === undefined)
                this.generalposts.push({
                    name: data[i][headFunctieIndex],
                    minimumAge: data[i][minAgeIndex],
                    discription: data[i][headFunctieIndex]
                });
            else
                this.generalposts.push({
                    name: data[i][headFunctieIndex],
                    minimumAge: data[i][minAgeIndex],
                    discription: data[i][headFunctieIndex] + " " + data[i][discriptionIndex]
                });

            let generalpost : string = data[i][headFunctieIndex];
            let title : string = data[i][postIndex];
            let sector : number = data[i][sectorIndex];
            let address : string;
            if (data[i][addressIndex] === undefined)
                address  = "/"
            else
                address = data[i][addressIndex];
            let latitude : number = 5;
            let longitude : number = 5;
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
    }

    parseGebruikers = (file: any) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
    
        reader.onload = (e) => {
            if (e.target != null) {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, {header:1});
                /* Update state */
                // this.setState({ data: data, cols: make_cols(ws['!ref']) });
                console.log("gebruikers");
                // console.log('wb',wb);
                // console.log("data",data);
                // console.log('length',data.length);

                // this.createuser(data);
                console.log(data);

                // console.log(users);
                // console.log(createAssociation(users));
            }
        };
        
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    }
    createuser = (data : any)=> {
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
    }

    createPlanning = (data: any) => {
        let shiftIndex : number = 0;
        let postIndex : number = 2;
        let userIndex : number = 4;
    
        let shift : string = "";
    
        for (let i = 0; i < data.length; ++i) {
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
    }

    createShift = (data: any) => {
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
    }
    
    createItemtype = (data : any) => {
        let typeIndex : number = -1;
        let planningIndex : number = -1;
        for (let i = 0; i < data[2].length; ++i) {
            if (data[1][i] === 'itemType')
                typeIndex = i;
            else if (data[1][i] === 'shift')
                planningIndex = i;
        }
        if (planningIndex === -1 || typeIndex === -1)
            return [{
                name: 'error', planning: ""
            }];
    
        for (let i = 2; i < data.length; ++i) {
            this.items.push({
                name: data[i][typeIndex],
                planning: data[i][planningIndex]
            })
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
}