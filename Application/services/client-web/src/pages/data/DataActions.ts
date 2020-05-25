import Redux from 'redux';
import Database from '../../Redux/Database';
import XLSX from 'xlsx';



export enum DataActions {
    Data_POST_START = 'Data_POST_START',
    DATA_POST_SUCCES = 'DATA_POST_SUCCES',
    DATA_POST_FAIL = 'DATA_POST_FAIL'
};
interface GeneralPost {
    name: string,
    minimumAge: number,
    discription: string
}

/**
 * lets the database use the file to update its content
 * @param file the file to be uploaded
 * @param isUpdateMode boolean toggle to indicate if the file should update the existing database or override it
 */
export const uploadFile = (functiesfile : File, shiftenFile : File, hoofdFunctiesfile : File,  maxBezettingFile : File, 
        bezettingFile : File, appellijstFile : File, isUpdateMode : boolean) => 
    async (dispatch : Redux.Dispatch) => {
    console.log("in file upload");
    try {
        dispatch({
            type: DataActions.Data_POST_START
        });

        parseAppellijst(appellijstFile);
        parseBezettingen(bezettingFile);
        parseFuncties(functiesfile);
        parseHoofdFuncties(hoofdFunctiesfile);
        parseMaxBezettingen(maxBezettingFile);
        parseShiften(shiftenFile);

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


const parseFuncties = (file: File) => {
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
            console.log("functies");
            console.log('wb',wb);
            console.log("data",data);
            console.log('length',data.length);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
const parseShiften = (file: File) => {
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
            console.log("shiften");
            console.log('wb',wb);
            console.log("data",data);
            console.log('length',data.length);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
const parseHoofdFuncties = (file: File) => {
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
            console.log("hoofdfuncties");
            console.log('wb',wb);
            console.log("data",data);
            console.log('length',data.length);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
const parseMaxBezettingen = (file: File) => {
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
            console.log("maximum bezettingen");
            console.log('wb',wb);
            console.log("data",data);
            console.log('length',data.length);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
const parseBezettingen = (file: File) => {
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
            console.log("bezettingen");
            console.log('wb',wb);
            console.log("data",data);
            console.log('length',data.length);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}
const parseAppellijst = (file: File) => {
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
            console.log('wb',wb);
            console.log("data",data);
            console.log('length',data.length);
        }
    };
    
    if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
}