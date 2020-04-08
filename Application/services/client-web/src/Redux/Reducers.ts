import {combineReducers} from 'redux';
import {ReduxActionTypes, ActionAddPostType, ActionAddProblemType, ActionAddUserType, ActionProblemSolvedType, ActionAddMessageType, ActionMessageReadType} from './Actions';
import State from './State';

const initialState : State = {
    Posts: [
        { title: "post", addres: "addres", sector: 1, general: "generalpost", latitude: 50.962595, longitude: 5.358503 },
        { title: "Parking1", addres: "Visserstraat 27", sector: 1, general: "Parking Controle", latitude: 50.962068, longitude: 5.358836 },
        { title: "Parking2", addres: "Berglaan 5", sector: 1, general: "Parking Controle", latitude: 50.963642, longitude: 5.359328 },
        { title: "Parking3", addres: "Hemelstraat 164", sector: 1, general: "Parking Controle", latitude: 50.963257, longitude: 5.356721 },
        { title: "Parking4", addres: "Pukkelpoplaan 1", sector: 3, general: "Parking Controle", latitude: 50.963902, longitude: 5.355056 },
        { title: "Drank stand 1", addres: "Terein", sector: 2, general: "Dranken Stand", latitude: 50.964240, longitude: 5.360195 },
        { title: "Schoonmaak terein", addres: "Terein", sector: 2, general: "Schoonmaak", latitude: 50.961780, longitude: 5.361407 },
        { title: "Security", addres: "terein", sector: 2, general: "Security", latitude: 50.962595, longitude: 5.358503 },
        { title: "Straat-affzetting1", addres: "Rodeberg - Geraardslaan", sector: 4, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503 },
        { title: "Straat-affzetting2", addres: "Addelbaan - Rodeberg", sector: 4, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503 },
        { title: "Straat-affzetting3", addres: "Visserstraat - Geraardslaan", sector: 1, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503 }
    ],
    Problems: [
        {problemType: "problemtype", priority: 1, discription: "discription", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5.358503},
            {problemType: "Afwezigheid", priority: 1, discription: "Vrijwilliger is afwezig van zijn post", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5.358503},
            {problemType: "problemtype", priority: 1, discription: "discription", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5.358503},
            {problemType: "problemtype", priority: 1, discription: "discription", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5.358503},
            {problemType: "problemtype", priority: 1, discription: "discription", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5.358503}
    ],
    Users: [{name:"naam", lastname:"lastname", gsmNumber:"gsmnummer", email:"email", has_internet: true, permissions:false, association:"vereneging", latitude: 50.965100, longitude: 5.364983},
        {name: "naam2", lastname:"lastname2", gsmNumber:"gsmnummer2", email:"email2", has_internet:false, permissions:true, latitude: 50, longitude: 0 },
        {name: "John", lastname:"verbrugen", gsmNumber:"0478536954", email:"john.verbrugen@hotmail.com", has_internet: true, permissions: false, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {name: "Marie", lastname:"Torfs", gsmNumber:"0475636984", email:"Marie.Torfs@gmail.Com", has_internet: true, permissions: false, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {name: "Arno", lastname:"Timmermans", gsmNumber:"0475633215", email:"TimmermansArno@gmail.com", has_internet: true, permissions: false, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {name: "Quinten", lastname:"Degroote", gsmNumber:"0478521478", email:"DegrooteQ@hotmail.com", has_internet: true, permissions: false, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {name: "Liese", lastname:"Verbeeck", gsmNumber:"0171589632", email:"LizVerbeeck@hotmail.com", has_internet: false, permissions: false, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {name: "Margriet", lastname:"Coene", gsmNumber:"0478526544", email:"CoeneMar@gmail.com", has_internet: true, permissions: true, latitude: 50, longitude: 0},
        {name: "Seba", lastname:"DeMilitair", gsmNumber:"0470310450", email:"SebastiaanMili@hotmail.com,", has_internet: true, permissions: true, latitude: 50, longitude: 0},
        {name: "Marlies", lastname:"VanZelem", gsmNumber:"0478523698", email:"VanZelemMarles@gmail.com", has_internet: false, permissions: false, association:"VZWKiewit", latitude: 50.964938, longitude: 5.363159},
        {name: "Kasper", lastname:"Exspiravit", gsmNumber:"0471258963", email:"Kasper.Exspiravit@gmail.com", has_internet: true, permissions: false, association:"VZWKiewit", latitude: 50, longitude: 0},
        {name: "An", lastname:"Nuits", gsmNumber:"047856321", email:"An.Nuits@gmail.com", has_internet: true, permissions: true, latitude: 50, longitude: 0},
        {name: "Liesbeth", lastname:"Saenen", gsmNumber:"0475896412", email:"Saenen.Liesbeth@gmail.com", has_internet: true, permissions: false, association:"VZWKiewit", latitude: 50, longitude: 0},
        {name: "Sam", lastname:"Coppens", gsmNumber:"0475125699", email:"Sam.Coppens@live.be", has_internet: true, permissions: true, latitude: 50, longitude: 0}
    ],
    Messages: [
        {title:"titel", sender:"verstuurder", content:"bericht"},
        {title:"dronken man", sender:"John Timmermans", content:"Dronken man op parking 1 is verwijderd door de politie"},
        {title:"auto ongeluk", sender: "An Versteen", content:"Door een auto ongeluk is een deel van parking 3 tijdelijk buiten gebruik"},
        {title:"vrijwilliger gevonden", sender:"Marlies Dalemans", content:"De ontbrekende vrijwilliger op post POE_WOE is gevonden"},
        {title:"bier op", sender:"Michiel Delvaux", content:"Het bier bij tab 4 is op"}
    ]
}

type Actions = ActionAddPostType | ActionAddProblemType | ActionAddUserType | ActionProblemSolvedType | ActionAddMessageType | ActionMessageReadType

// ADD_POST = 'ADD_POST',
// ADD_USER = 'ADD_USER',
// ADD_PROBLEM = "ADD_PROBLEM",
// PROBLEM_SOLVED = 'PROBLEM_SOLVED',
// ADD_MESSAGE = 'ADD_MESSAGE',
// MESSAGE_READ = 'MESSAGE_READ'

const reducer =  function(state: State = initialState, action: Actions) : State {
    switch(action.type) {
        case ReduxActionTypes.GET_POSTS : return {...state, Posts: [...action.payload]};
        case ReduxActionTypes.GET_USERS : return {...state, Users : [...action.payload]};
        case ReduxActionTypes.GET_PROBLEMS : return {...state, Problems: [...action.payload]};
        case ReduxActionTypes.GET_MESSAGES : return {...state, Messages: [...action.payload]};
        //TODO other actions
        default : return state;
    }

}


export const rootReducer = combineReducers({
    reducer
});


export type AppState = ReturnType<typeof rootReducer>;