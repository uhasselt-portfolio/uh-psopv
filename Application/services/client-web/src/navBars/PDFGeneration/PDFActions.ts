import Redux from 'redux';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import Database from '../../Redux/Database';
import jsPDF from 'jspdf';

export enum PDFActions {
    PDF_FETCH_START = 'PDF_FETCH_START',
    PDF_FETCH_SUCCES = 'PDF_FETCH__SUCCES',
    PDF_FETCH_FAIL = 'PDF_FETCH_FAIL'
};

export const generatepdf = () => async (dispatch : Redux.Dispatch) => {
    console.log("in generationg pdf");
    try {
        dispatch({type: PDFActions.PDF_FETCH_START});

        let problems: ProblemDataInterface[] = await new Database().fetchAllProblems();

        generatepdfDocument(problems);

        dispatch({type: PDFActions.PDF_FETCH_SUCCES});

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PDFActions.PDF_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

const generatepdfDocument = (problems : ProblemDataInterface[]) => {
    let sortedproblems : ProblemDataInterface[][] = sortPerUser(problems);
    var doc = new jsPDF();
    let title: String = 'problemen ' + (new Date()).getFullYear();
    doc.text(title, 80,10);
    doc.setFontSize(11);
    let height: number = 20;
    let counter : number = 0;
    for (let i = 0; i < sortedproblems.length; ++i) {
        for (let j = 0; j < sortedproblems[i].length; ++j) {
            let problem: ProblemDataInterface = sortedproblems[i][j];
            doc.text(problem.problemType,10,height);
            doc.text(problem.discription,10,height + 5);
            let date: Date = new Date(problem.timeStamp);
            let parsedDate: string = date.toLocaleString();
            let shift : string = "Shift: " + problem.shiftName + "    " + parsedDate;
            doc.text(shift,10,height + 10);
            doc.text("post: " + problem.post,10,height + 15);
            doc.text("vrijwilliger: " + problem.user,10,height + 20);
            if (problem.solved) {
                doc.setTextColor(0,128,0);
                doc.text("het probleem is opgelost",15,height + 25);
            } else {
                doc.setTextColor(255,0,0);
                doc.text("het probleem is niet opgelost",15,height + 25);
            }
            doc.setTextColor(0,0,0);
            doc.text("________________________________________________________________",10,height + 28);
            height += 35;
            if ((counter % 7) == 0 && counter > 0) {
                doc.addPage();
                height = 20;
            }
            ++counter;
        }
         
    }
    window.open(doc.output('bloburl'), '_blank');
}

const sortPerUser = (Problems : ProblemDataInterface[]) : ProblemDataInterface[][] => {
    let sorted : ProblemDataInterface[][] = [];
    for (let i = 0; i < Problems.length; ++i) {
        let cur : ProblemDataInterface = Problems[i];
        let inside : boolean = false;
        for (let j = 0; j < sorted.length; ++j) {
            if (sorted[j][0].user === cur.user) {
                sorted[j].push(cur);
                inside = true;
                break;
            }
        }
        if (! inside) {
            sorted.push([cur]);
        }
    }
    return sorted;
}