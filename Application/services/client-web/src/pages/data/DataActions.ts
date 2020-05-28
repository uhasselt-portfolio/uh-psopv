import Redux from 'redux';
import XLSX from 'xlsx';
import {Parser} from './Parser';


export enum DataActions {
    Data_POST_START = 'Data_POST_START',
    DATA_POST_SUCCES = 'DATA_POST_SUCCES',
    DATA_POST_FAIL = 'DATA_POST_FAIL'
};
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