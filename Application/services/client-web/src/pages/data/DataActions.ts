import Redux from 'redux';
import Database from '../../Redux/Database';
import XLSX from 'xlsx';
import {GeneralPost, Post, User, Item, Shift, Planning, Association, Parser} from './Parser';
import Axios from 'axios';



export enum DataActions {
    Data_POST_START = 'Data_POST_START',
    DATA_POST_SUCCES = 'DATA_POST_SUCCES',
    DATA_POST_FAIL = 'DATA_POST_FAIL'
};

// /**
//  * Acepts all the excel files, parses them and sends them to the server to create the database
//  * @param functiesfile de file detailing the functies/posts
//  * @param appellijstFile de file detailing witch user works when on witch post
//  * @param shiftenFile  the file detailing the shifts
//  * @param gebruikerFile the file detailing the users
//  * @param itemfile the file detailing the items used on differents shifts
//  * @param isUpdateMode determends if the new file's override the existing data or add to it
//  */
// export const uploadFile = (functiesfile : File, appellijstFile : File, 
//      shiftenFile : File, gebruikerFile : File, itemfile : File, isUpdateMode : boolean) => 
//     async (dispatch : Redux.Dispatch) => {
//     console.log("in file upload");
//     try {
//         dispatch({
//             type: DataActions.Data_POST_START
//         });

//         let parser : Parser = new Parser();

//         let deleted : Promise<any> =  parser.deleteAll();
//         deleted.then(async (val : any) => {
//             await parseGebruikers(gebruikerFile,parser);
//             console.log("after parse gebruikers");
//             await parseFuncties(functiesfile,parser);
//             console.log("afeter parse functies");
//             await parseShiften(shiftenFile,parser);
//             await parseAppellijst(appellijstFile,parser);
//             await parseItems(itemfile,parser);
//         });

        
//         if (parser.getError()) {
//             console.log("error\n\n\n") //TODO
//         }

//         // console.log("users", parser.getUsers());
//         // console.log("posten",parser.getPosts());
//         // console.log("shiften",parser.getShifts());
//         // console.log("verenegingen",parser.getAssociations());
//         // console.log("planning",parser.getPlanning());
//         // console.log("items",parser.getItems());
//         // console.log("generalPosts",parser.getGeneralPosts());
//         // console.log("sectors",parser.getSectors());

//         // const response = await new Database().postNewData(
//         //     parser.getUsers(), parser.getPosts(), parser.getShifts(), parser.getAssociations(),
//         //     parser.getPlanning(), parser.getItems(), parser.getGeneralPosts(), parser.getSectors(), parser
//         // );
//         //const response2 = await new Database().postFile(gebruikerFile,"",true);

//        // console.log(response);

//         // await new Database().postFile(file,isUpdateMode);

//         // const reader = new FileReader();
// 		// const rABS = !!reader.readAsBinaryString;

//         // reader.onload = (e) => {
//         //     if (e.target != null) {
//         //         /* Parse data */
//         //         const bstr = e.target.result;
//         //         const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
//         //         /* Get first worksheet */
//         //         const wsname = wb.SheetNames[0];
//         //         const ws = wb.Sheets[wsname];
//         //         /* Convert array of arrays */
//         //         const data = XLSX.utils.sheet_to_json(ws, {header:1});
//         //         /* Update state */
//         //         // this.setState({ data: data, cols: make_cols(ws['!ref']) });
//         //         console.log('wb',wb);
//         //         console.log("data",data);
//         //         console.log('length',data.length);
//         //     }
//         // };
        
//         // if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);

//         dispatch({
//             type: DataActions.DATA_POST_SUCCES
//         });
//     } catch(error) {
//         if (error.response) {
//             // Server responded with a code high than 2xx
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);

//             dispatch({type: DataActions.DATA_POST_FAIL, payload: error.response.data.message});
//         } else if (error.request) {
//             // No response was received from the server
//             console.log(error.request);
//         } else {
//             // Request couldn't get send
//             console.log('Error', error.message);
//         }   
//     }
// }

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
        
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
    
        reader.onload = async (e) => {
            if (e.target != null) {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, {header:1});

                await parser.createuser(data);

                if (parser.getError()) {
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: 'ParseError'
                    });
                } else if (parser.getResponse().data.status === 'fail') {
                    console.log("server error");
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: parser.getResponse().data.message
                    });
                } else {
                    dispatch({
                        type: DataActions.DATA_POST_SUCCES
                    });
                }

            }
        };
        
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
        
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

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = async (e) => {
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

                await parser.createGeneralAndPosts(data);

                console.log('res',parser.getResponse());

                if (parser.getError()) {
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: 'ParseError'
                    });
                } else if (parser.getResponse().data.status === 'fail') {
                    console.log("server error");
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: parser.getResponse().data.message
                    });
                } else {
                    dispatch({
                        type: DataActions.DATA_POST_SUCCES
                    });
                }
            }
        };
        
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);

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

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
    
        reader.onload = async (e) => {
            if (e.target != null) {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, {header:1});

                await parser.createPlanning(data);

                if (parser.getError()) {
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: 'ParseError'
                    });
                } else if (parser.getResponse().data.status === 'fail') {
                    console.log("server error");
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: parser.getResponse().data.message
                    });
                } else {
                    dispatch({
                        type: DataActions.DATA_POST_SUCCES
                    });
                }
            }
        };
        
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);

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

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = async (e) => {
            if (e.target != null) {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, {header:1});

                await parser.createShift(data);

                if (parser.getError()) {
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: 'ParseError'
                    });
                } else if (parser.getResponse().data.status === 'fail') {
                    console.log("server error");
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: parser.getResponse().data.message
                    });
                } else {
                    dispatch({
                        type: DataActions.DATA_POST_SUCCES
                    });
                }
            }
        };
        
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);

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

        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = async (e) => {
            if (e.target != null) {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, {header:1});

                await parser.createItemtype(data);

                if (parser.getError()) {
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: 'ParseError'
                    });
                } else if (parser.getResponse().data.status === 'fail') {
                    console.log("server error");
                    dispatch({
                        type: DataActions.DATA_POST_FAIL,
                        payload: parser.getResponse().data.message
                    });
                } else {
                    dispatch({
                        type: DataActions.DATA_POST_SUCCES
                    });
                }
            }
        };
        
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);

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
            parser.createShift(data);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
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
            parser.createPlanning(data)
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
const parseGebruikers = (file: File, parser : Parser) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = async (e) => {
        if (e.target != null) {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
            await parser.createuser(data);
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
            parser.createItemtype(data);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}