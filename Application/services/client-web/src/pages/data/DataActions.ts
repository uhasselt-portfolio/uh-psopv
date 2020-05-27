import Redux from 'redux';
import Database from '../../Redux/Database';
import XLSX from 'xlsx';
import {GeneralPost, Post, User, Item, Shift, Planning, Association, Parser} from './Parser';



export enum DataActions {
    Data_POST_START = 'Data_POST_START',
    DATA_POST_SUCCES = 'DATA_POST_SUCCES',
    DATA_POST_FAIL = 'DATA_POST_FAIL'
};

/**
 * Acepts all the excel files, parses them and sends them to the server to create the database
 * @param functiesfile de file detailing the functies/posts
 * @param appellijstFile de file detailing witch user works when on witch post
 * @param shiftenFile  the file detailing the shifts
 * @param gebruikerFile the file detailing the users
 * @param itemfile the file detailing the items used on differents shifts
 * @param isUpdateMode determends if the new file's override the existing data or add to it
 */
export const uploadFile = (functiesfile : File, appellijstFile : File, 
     shiftenFile : File, gebruikerFile : File, itemfile : File, isUpdateMode : boolean) => 
    async (dispatch : Redux.Dispatch) => {
    console.log("in file upload");
    try {
        dispatch({
            type: DataActions.Data_POST_START
        });

        let parser : Parser = new Parser();

        let deleted : Promise<any> =  parser.deleteAll();
        deleted.then(async (val : any) => {
            await parseGebruikers(gebruikerFile,parser);
            console.log("after parse gebruikers");
            await parseFuncties(functiesfile,parser);
            console.log("afeter parse functies");
            await parseShiften(shiftenFile,parser);
            await parseAppellijst(appellijstFile,parser);
            await parseItems(itemfile,parser);
        });

        
        if (parser.getError()) {
            console.log("error\n\n\n") //TODO
        }

        // console.log("users", parser.getUsers());
        // console.log("posten",parser.getPosts());
        // console.log("shiften",parser.getShifts());
        // console.log("verenegingen",parser.getAssociations());
        // console.log("planning",parser.getPlanning());
        // console.log("items",parser.getItems());
        // console.log("generalPosts",parser.getGeneralPosts());
        // console.log("sectors",parser.getSectors());

        // const response = await new Database().postNewData(
        //     parser.getUsers(), parser.getPosts(), parser.getShifts(), parser.getAssociations(),
        //     parser.getPlanning(), parser.getItems(), parser.getGeneralPosts(), parser.getSectors(), parser
        // );
        //const response2 = await new Database().postFile(gebruikerFile,"",true);

       // console.log(response);

        // await new Database().postFile(file,isUpdateMode);

        // const reader = new FileReader();
		// const rABS = !!reader.readAsBinaryString;

        // reader.onload = (e) => {
        //     if (e.target != null) {
        //         /* Parse data */
        //         const bstr = e.target.result;
        //         const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
        //         /* Get first worksheet */
        //         const wsname = wb.SheetNames[0];
        //         const ws = wb.Sheets[wsname];
        //         /* Convert array of arrays */
        //         const data = XLSX.utils.sheet_to_json(ws, {header:1});
        //         /* Update state */
        //         // this.setState({ data: data, cols: make_cols(ws['!ref']) });
        //         console.log('wb',wb);
        //         console.log("data",data);
        //         console.log('length',data.length);
        //     }
        // };
        
        // if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);

        dispatch({
            type: DataActions.DATA_POST_SUCCES
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DataActions.DATA_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const deleteDatabase = () => async (dispatch : Redux.Dispatch) => {
    try {
        dispatch({
            type: DataActions.Data_POST_START
        });

        await new Parser().deleteAll();

        dispatch({
            type: DataActions.DATA_POST_SUCCES
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DataActions.DATA_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const uploadUsers = (file : File) => async (dispatch : Redux.Dispatch) => {
    console.log("in file upload");
    try {
        dispatch({
            type: DataActions.Data_POST_START
        });

        let parser : Parser = new Parser();

        await parseGebruikers(file,parser);


        
        if (parser.getError()) {
            console.log("error\n\n\n") //TODO
        }

        dispatch({
            type: DataActions.DATA_POST_SUCCES
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DataActions.DATA_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}
export const uploadFuncties = (file : File) => async (dispatch : Redux.Dispatch) => {
    console.log("in file upload");
    try {
        dispatch({
            type: DataActions.Data_POST_START
        });

        let parser : Parser = new Parser();

        await parseFuncties(file,parser);


        
        if (parser.getError()) {
            console.log("error\n\n\n") //TODO
        }

        dispatch({
            type: DataActions.DATA_POST_SUCCES
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DataActions.DATA_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    } 
}
export const uploadAppellijst = (file : File) => async (dispatch : Redux.Dispatch) => {
    console.log("in file upload");
    try {
        dispatch({
            type: DataActions.Data_POST_START
        });

        let parser : Parser = new Parser();

        await parseAppellijst(file,parser);


        
        if (parser.getError()) {
            console.log("error\n\n\n") //TODO
        }

        dispatch({
            type: DataActions.DATA_POST_SUCCES
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DataActions.DATA_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}
export const uploadShifts = (file : File) => async (dispatch : Redux.Dispatch) => {
    console.log("in file upload");
    try {
        dispatch({
            type: DataActions.Data_POST_START
        });

        let parser : Parser = new Parser();

        await parseShiften(file,parser);


        
        if (parser.getError()) {
            console.log("error\n\n\n") //TODO
        }

        dispatch({
            type: DataActions.DATA_POST_SUCCES
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DataActions.DATA_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}
export const uploadItems = (file : File) => async (dispatch : Redux.Dispatch) => {
    console.log("in file upload");
    try {
        dispatch({
            type: DataActions.Data_POST_START
        });

        let parser : Parser = new Parser();

        await parseItems(file,parser);

        if (parser.getError()) {
            console.log("error\n\n\n") //TODO
        }

        dispatch({
            type: DataActions.DATA_POST_SUCCES
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DataActions.DATA_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    } 
}


/**
 * functies that read a specific file and call a parser function to parse that data
 * @param file the file to read
 * @param parser the parser object that contains the parsed data
 */
const parseFuncties = (file: File, parser : Parser) => {
    console.log("in parse gebruikers");
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
        console.log("in parse gebruikers onload");
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
            console.log("functies");
            // console.log('wb',wb);
            // console.log("data",data);
            // console.log('length',data.length);
            parser.createGeneralAndPosts(data);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
const parseShiften = (file: File, parser : Parser) => {
    console.log("in parse shiften");
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
        console.log('in parse shiften onload');
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
            console.log("shiften");
            // console.log('wb',wb);
            // console.log("data",data);
            // console.log('length',data.length);
            parser.createShift(data);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
// const parseHoofdFuncties = (file: File, parser : Parser) => { //niet nodig
//     const reader = new FileReader();
//     const rABS = !!reader.readAsBinaryString;

//     reader.onload = (e) => {
//         if (e.target != null) {
//             /* Parse data */
//             const bstr = e.target.result;
//             const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
//             /* Get first worksheet */
//             const wsname = wb.SheetNames[0];
//             const ws = wb.Sheets[wsname];
//             /* Convert array of arrays */
//             const data = XLSX.utils.sheet_to_json(ws, {header:1});
//             /* Update state */
//             // this.setState({ data: data, cols: make_cols(ws['!ref']) });
//             // console.log("hoofdfuncties");
//             // console.log('wb',wb);
//             // console.log("data",data);
//             // console.log('length',data.length);
//         }
//     };
    
//     if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
// }
// const parseMaxBezettingen = (file: File, parser : Parser) => { //niet nodig
//     const reader = new FileReader(); 
//     const rABS = !!reader.readAsBinaryString;

//     reader.onload = (e) => {
//         if (e.target != null) {
//             /* Parse data */
//             const bstr = e.target.result;
//             const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
//             /* Get first worksheet */
//             const wsname = wb.SheetNames[0];
//             const ws = wb.Sheets[wsname];
//             /* Convert array of arrays */
//             const data = XLSX.utils.sheet_to_json(ws, {header:1});
//             /* Update state */
//             // this.setState({ data: data, cols: make_cols(ws['!ref']) });
//             // console.log("maximum bezettingen");
//             // console.log('wb',wb);
//             // console.log("data",data);
//             // console.log('length',data.length);
//         }
//     };
    
//     if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
// }
// const parseBezettingen = (file: File, parser : Parser) => { // niet nodig
//     const reader = new FileReader();
//     const rABS = !!reader.readAsBinaryString;

//     reader.onload = (e) => {
//         if (e.target != null) {
//             /* Parse data */
//             const bstr = e.target.result;
//             const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
//             /* Get first worksheet */
//             const wsname = wb.SheetNames[0];
//             const ws = wb.Sheets[wsname];
//             /* Convert array of arrays */
//             const data = XLSX.utils.sheet_to_json(ws, {header:1});
//             /* Update state */
//             // this.setState({ data: data, cols: make_cols(ws['!ref']) });
//             // console.log("bezettingen");
//             // console.log('wb',wb);
//             // console.log("data",data);
//             // console.log('length',data.length);
//         }
//     };
    
//     if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
// }
const parseAppellijst = (file: File, parser : Parser) => {
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
            console.log("appellijst");
            // console.log('wb',wb);
            // console.log("data",data);
            // console.log('length',data.length);
            parser.createPlanning(data)
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
const parseGebruikers = (file: File, parser : Parser) => {
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
            parser.createuser(data);
            // console.log(users);
            // console.log(createAssociation(users));
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
const parseItems = (file : File, parser : Parser) => {
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
            console.log("items");
            // console.log('wb',wb);
            // console.log("data",data);
            // console.log('length',data.length);
            parser.createItemtype(data);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}

// const createGeneralPosts = (data: any) : GeneralPost[] => {
//     let headFunctieIndex : number = -1;
//     let minAgeIndex : number = -1;
//     let discriptionIndex : number = -1;
//     for (let i = 0; i < data[2].length; ++i) {
//         if (data[2][i] === 'HOOFDFUNCTIE')
//             headFunctieIndex = i;
//         else if (data[2][i] === 'MINIMUMLEEFTIJD')
//             minAgeIndex = i;
//         else if (data[2][i] === 'OPMERKING')
//             discriptionIndex = i;
//     }
//     if (headFunctieIndex === -1 || minAgeIndex === -1 || discriptionIndex === -1)
//         return [{
//             name: 'error', minimumAge: -1, discription: ""
//         }];

//     let GeneralPosts : GeneralPost[] = [];

//     for (let i = 3; i < data.length; ++i) {
//         if (data[i][discriptionIndex] === undefined)
//             GeneralPosts.push({
//                 name: data[i][headFunctieIndex],
//                 minimumAge: data[i][minAgeIndex],
//                 discription: data[i][headFunctieIndex]
//             });
//         else
//             GeneralPosts.push({
//                 name: data[i][headFunctieIndex],
//                 minimumAge: data[i][minAgeIndex],
//                 discription: data[i][headFunctieIndex] + " " + data[i][discriptionIndex]
//             });
//     }

//     return GeneralPosts;
// }
// const createPost = (data: any) : Post[] => {
//     let headFunctieIndex : number = -1;
//     let postIndex : number = -1;
//     let sectorIndex : number = -1;
//     let addressIndex : number = -1;
//     for (let i = 0; i < data[2].length; ++i) {
//         if (data[2][i] === 'HOOFDFUNCTIE')
//             headFunctieIndex = i;
//         else if (data[2][i] === 'SUBFUNCTIE')
//             postIndex = i;
//         else if (data[2][i] === 'SECTOR')
//             sectorIndex = i;
//         else if (data[2][i] === 'LOCATIE')
//             addressIndex = i;
//     }
//     if (headFunctieIndex === -1 || postIndex === -1 || sectorIndex === -1 || addressIndex === -1)
//         return [{
//             title: 'error', sector: -1, latitude: -1, generalpost: "", longitude: -1, radius: -1, address: ""
//         }];

//     let posts : Post[] = [];

//     for (let i = 3; i < data.length; ++i) {
//         let generalpost : string = data[i][headFunctieIndex];
//         let title : string = data[i][postIndex];
//         let sector : number = data[i][sectorIndex];
//         let address : string;
//         if (data[i][addressIndex] === undefined)
//             address  = "/"
//         else
//             address = data[i][addressIndex];
//         let latitude : number = 5;
//         let longitude : number = 5;
//         let radius : number = 10;

//         posts.push({
//             title, generalpost, sector, address, latitude, longitude, radius
//         });
//     }

//     return posts;
// }
// const createuser = (data : any) : User[] => {
//     let first_nameIndex : number = -1;
//     let last_nameIndex : number = -1;
//     let phone_numberIndex : number = -1;
//     let emailIndex : number = -1;
//     let passwordIndex : number = -1;
//     let permissionIndex : number = -1;
//     let associationIndex : number = -1;
//     for (let i = 0; i < data[1].length; ++i) {
//         if (data[1][i] === 'voornaam')
//             first_nameIndex = i;
//         else if (data[1][i] === 'telefoon nummber')
//             phone_numberIndex = i;
//         else if (data[1][i] === 'email')
//             emailIndex = i;
//         else if (data[1][i] === 'vrijwilliger?')
//             permissionIndex = i;
//         else if (data[1][i] === 'vereneging')
//             associationIndex = i;
//         else if (data[1][i] === 'achternaam')
//             last_nameIndex = i;
//         else if (data[1][i] === 'wachtwoord')
//             passwordIndex = i;
//     }
//     if (first_nameIndex === -1 || last_nameIndex === -1 || phone_numberIndex === -1 || emailIndex === -1 || 
//         passwordIndex === -1 || permissionIndex === -1 || associationIndex === -1)
//         return [{
//             first_name : "error", last_name: '', password :  "", email : '', phone_number: "",current_lat : 0,current_long : 0,
//                 is_connected: true, association: '', permission: '' 
//         }];

//     let users : User[] = [];

//     for (let i = 3; i < data.length; ++i) {
//         let first_name : string = data[i][first_nameIndex];
//         let last_name : string = data[i][last_nameIndex];
//         let phone_number : string = data[i][phone_numberIndex];
//         let password : string = data[i][passwordIndex];
//         let email : string = "";
//         if (data[i][emailIndex] !== undefined)
//             email = data[i][emailIndex];
//         let permission : string = "";
//         if (data[i][permissionIndex] !== undefined)
//             permission = data[i][permissionIndex];
//         let association : string = data[i][associationIndex];
//         let current_lat : number = 0;
//         let current_long : number = 0;
//         let is_connected : boolean = true;

//         users.push({
//             first_name, last_name, phone_number, password, email, permission, association, current_long, current_lat, is_connected
//         });
//     }

//     return users;
// }
// const createItemtype = (data : any) : Item[] => {
//     let typeIndex : number = -1;
//     let planningIndex : number = -1;
//     for (let i = 0; i < data[2].length; ++i) {
//         if (data[1][i] === 'itemType')
//             typeIndex = i;
//         else if (data[1][i] === 'planning')
//             planningIndex = i;
//     }
//     if (planningIndex === -1 || typeIndex === -1)
//         return [{
//             name: 'error', planning: ""
//         }];

//     let items : Item[] = [];

//     for (let i = 2; i < data.length; ++i) {
//         items.push({
//             name: data[i][typeIndex],
//             planning: data[i][planningIndex]
//         })
//     }

//     return items;
// }
// const createShift = (data: any) : Shift[] => {
//     let ShiftIndex : number = -1;
//     let StartIndex : number = -1;
//     let endIndex : number = -1;
//     for (let i = 0; i < data[2].length; ++i) {
//         if (data[2][i] === 'SHIFT')
//             ShiftIndex = i;
//         else if (data[2][i] === 'STARTDTG')
//             StartIndex = i;
//         else if (data[2][i] === 'EINDEDTG')
//             endIndex = i;
//     }
//     if (ShiftIndex === -1 || StartIndex === -1 || endIndex === -1)
//         return [{
//             name: 'error', begin: "", end: ""
//         }];

//     let shifts : Shift[] = [];

//     for (let i = 3; i < data.length; ++i) {
//         let name : string = data[i][ShiftIndex];
//         let begin : string = data[i][StartIndex];
//         let end : string = data[i][endIndex];

//         shifts.push({
//             name, begin, end
//         });
//     }

//     return shifts;
// }
// const createPlanning = (data: any) : Planning[] => {
//     let shiftIndex : number = 0;
//     let postIndex : number = 2;
//     let userIndex : number = 4;


//     let planning : Planning[] = [];
//     let shift : string = "";

//     for (let i = 0; i < data.length; ++i) {
//         if (data[i][shiftIndex] !== undefined)
//             shift = data[i][shiftIndex];
//         else if (data[i] !== " " && data[i][postIndex] !== "FUNCTIE") {
//             planning.push({
//                 user: data[i][userIndex],
//                 shift: shift,
//                 post: data[i][postIndex]
//             });
//         }
    
//     }

//     return planning;
// }
// const createAssociation = (users: User[]) : Association[] => {
//     let associations : Association[] = [];

//     for (let i = 0; i < users.length; ++i) {
//         let inside : boolean = false;
//         for (let j = 0; j < associations.length; ++j) {
//             if (associations[j].name === users[i].association) {
//                 inside = true;
//                 break;
//             }
//         }
//         if ( ! inside)
//             associations.push({
//                 name: users[i].association
//             });
//     }

//     return associations;
// }