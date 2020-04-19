import PostDataInterface from '../interfaces/PostDataInterface';
import ProblemDataInterface from '../interfaces/ProblemDataInterface';
import MessageDataInterface from '../interfaces/MessageDataInterface';
import UserDataInterface from '../interfaces/UserDataInterface';
import ShiftDataInterface from '../interfaces/ShiftDataInterface';
import ItemDataInterface from '../interfaces/ItemDataInterface';

export default interface State {
    posts: PostDataInterface[],
    problems: ProblemDataInterface[],
    messages: MessageDataInterface[],
    users: UserDataInterface[],
    planning: ShiftDataInterface[],
    items: ItemDataInterface[],
    pdfGenerated: boolean,
    positionDelay: Number,

    loading: boolean,
    errorMessage: string,
    isProblemFetched: boolean,
    isMapFetched: boolean,
    isOverviewFetched: boolean,
    isPlanningFetched: boolean,
    isPostFetched: boolean,
    isSettingsFetched: boolean,
    isUsersFetched: boolean,
    isProblemSolvedPosted: boolean,
    isUserConnectionChanged: boolean,
    loggedIn: UserDataInterface
}

export const initialState : State = {
    loggedIn: {
        id:0, name:"naam", lastname:"lastname", gsmNumber:"gsmnummer", email:"email", has_internet: true, permission: 0, association:"vereneging", latitude: 50.965100, longitude: 5.364983
    },
    posts: [
        { id: 0, title: "post", addres: "addres", sector: 1, general: "generalpost", latitude: 50.962595, longitude: 5.358503, shifts: [] , users: [], activeProblem: false},
        { id: 1,title: "Parking1", addres: "Visserstraat 27", sector: 1, general: "Parking Controle", latitude: 50.962068, longitude: 5.358836, shifts: [], users: [], activeProblem: false },
        { id: 2,title: "Parking2", addres: "Berglaan 5", sector: 1, general: "Parking Controle", latitude: 50.963642, longitude: 5.359328, shifts: [], users: [], activeProblem: false },
        { id: 3,title: "Parking3", addres: "Hemelstraat 164", sector: 1, general: "Parking Controle", latitude: 50.963257, longitude: 5.356721, shifts: [], users: [], activeProblem: false },
        { id: 4,title: "Parking4", addres: "Pukkelpoplaan 1", sector: 3, general: "Parking Controle", latitude: 50.963902, longitude: 5.355056, shifts: [], users: [], activeProblem: false },
        { id: 5,title: "Drank stand 1", addres: "Terein", sector: 2, general: "Dranken Stand", latitude: 50.964240, longitude: 5.360195, shifts: [], users: [], activeProblem: false },
        { id: 6,title: "Schoonmaak terein", addres: "Terein", sector: 2, general: "Schoonmaak", latitude: 50.961780, longitude: 5.361407, shifts: [], users: [], activeProblem: false },
        { id: 7,title: "Security", addres: "terein", sector: 2, general: "Security", latitude: 50.962595, longitude: 5.358503, shifts: [], users: [], activeProblem: false },
        { id: 9,title: "Straat-affzetting1", addres: "Rodeberg - Geraardslaan", sector: 4, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503, shifts: [], users: [], activeProblem: false },
        { id: 8,title: "Straat-affzetting2", addres: "Addelbaan - Rodeberg", sector: 4, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503, shifts: [], users: [], activeProblem: false },
        { id: 10,title: "Straat-affzetting3", addres: "Visserstraat - Geraardslaan", sector: 1, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503, shifts: [], users: [], activeProblem: false }
    ],
    problems: [
        {problemType: "problemtype", priority: 1, discription: "discription", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5.358503, solved:false, id:0},
            {problemType: "Afwezigheid", priority: 1, discription: "Vrijwilliger is afwezig van zijn post", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5.358503, solved:false, id:1},
            {problemType: "problemtype", priority: 1, discription: "discription", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5., solved:false, id: 2},
            {problemType: "problemtype", priority: 1, discription: "discription", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5.358503, solved:false, id: 3},
            {problemType: "problemtype", priority: 1, discription: "discription", timeStamp: "04/04/2020 15:22", shiftName: "shiftname", 
                post: "post", user: "gaat over User", sender: "sender", latitude: 50.962595, longitude: 5.358503, solved:false, id: 4}
    ],
    users: [{id:0, name:"naam", lastname:"lastname", gsmNumber:"gsmnummer", email:"email", has_internet: true, permission: 0, association:"vereneging", latitude: 50.965100, longitude: 5.364983},
        {id:1, name: "naam2", lastname:"lastname2", gsmNumber:"gsmnummer2", email:"email2", has_internet:false, permission: 1, latitude: 50, longitude: 0 },
        {id:2, name: "John", lastname:"verbrugen", gsmNumber:"0478536954", email:"john.verbrugen@hotmail.com", has_internet: true, permission:  0, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {id:3, name: "Marie", lastname:"Torfs", gsmNumber:"0475636984", email:"Marie.Torfs@gmail.Com", has_internet: true, permission:  0, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {id:4, name: "Arno", lastname:"Timmermans", gsmNumber:"0475633215", email:"TimmermansArno@gmail.com", has_internet: true, permission:  0, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {id:5, name: "Quinten", lastname:"Degroote", gsmNumber:"0478521478", email:"DegrooteQ@hotmail.com", has_internet: true, permission:  0, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {id:6, name: "Liese", lastname:"Verbeeck", gsmNumber:"0171589632", email:"LizVerbeeck@hotmail.com", has_internet: false, permission:  0, association:"scouts Kiewit", latitude: 50, longitude: 0},
        {id:7, name: "Margriet", lastname:"Coene", gsmNumber:"0478526544", email:"CoeneMar@gmail.com", has_internet: true, permission:  1, latitude: 50, longitude: 0},
        {id:8, name: "Seba", lastname:"DeMilitair", gsmNumber:"0470310450", email:"SebastiaanMili@hotmail.com,", has_internet: true, permission:  1, latitude: 50, longitude: 0},
        {id:9, name: "Marlies", lastname:"VanZelem", gsmNumber:"0478523698", email:"VanZelemMarles@gmail.com", has_internet: false, permission:  0, association:"VZWKiewit", latitude: 50.964938, longitude: 5.363159},
        {id:10, name: "Kasper", lastname:"Exspiravit", gsmNumber:"0471258963", email:"Kasper.Exspiravit@gmail.com", has_internet: true, permission:  0, association:"VZWKiewit", latitude: 50, longitude: 0},
        {id:11, name: "An", lastname:"Nuits", gsmNumber:"047856321", email:"An.Nuits@gmail.com", has_internet: true, permission:  1, latitude: 50, longitude: 0},
        {id:12, name: "Liesbeth", lastname:"Saenen", gsmNumber:"0475896412", email:"Saenen.Liesbeth@gmail.com", has_internet: true, permission:  0, association:"VZWKiewit", latitude: 50, longitude: 0},
        {id:13, name: "Sam", lastname:"Coppens", gsmNumber:"0475125699", email:"Sam.Coppens@live.be", has_internet: true, permission:  1, latitude: 50, longitude: 0}
    ],
    messages: [
        {id: 0,title:"titel", sender:"verstuurder", content:"bericht", read: false},
        {id: 1,title:"dronken man", sender:"John Timmermans", content:"Dronken man op parking 1 is verwijderd door de politie", read: false},
        {id: 2,title:"auto ongeluk", sender: "An Versteen", content:"Door een auto ongeluk is een deel van parking 3 tijdelijk buiten gebruik", read: false},
        {id: 3,title:"vrijwilliger gevonden", sender:"Marlies Dalemans", content:"De ontbrekende vrijwilliger op post POE_WOE is gevonden", read: false},
        {id: 4,title:"bier op", sender:"Michiel Delvaux", content:"Het bier bij tab 4 is op", read: false}
    ],
    planning: [ //eigenlijk heeft elke shift met dezelfde naam dezelfde uren
        {    id: 0, shiftName: "shift", shiftId: 1,beginDate: '9/04/2020 15:00', endDate: '9/04/2020 15:00', post_id: 0, post: 'post', User_id: 0, user: 'user', sector: 1},
        {    id: 1, shiftName: "shift2",shiftId: 2, beginDate: '9/04/2020 16:00', endDate: '9/04/2020 15:00', post_id: 1, post: 'post', User_id: 0, user: 'user', sector: 1},
        {    id: 2, shiftName: "shift", shiftId: 1,beginDate: '9/04/2020 17:00', endDate: '9/04/2020 15:00', post_id: 2, post: 'post', User_id: 0, user: 'user', sector: 1},
        {    id: 3, shiftName: "shift", shiftId: 1,beginDate: '9/04/2020 18:00', endDate: '9/04/2020 15:00', post_id: 3, post: 'post', User_id: 0, user: 'user', sector: 1},
        {    id: 4, shiftName: "shift3",shiftId: 3, beginDate: '9/04/2020 15:00', endDate: '9/04/2020 15:00', post_id: 4, post: 'test', User_id: 0, user: 'user', sector: 1},
        {    id: 5, shiftName: "shift2",shiftId: 2, beginDate: '9/04/2020 20:00', endDate: '9/04/2020 15:00', post_id: 5, post: 'post', User_id: 0, user: 'test', sector: 1},
        {    id: 6, shiftName: "shift2",shiftId: 2, beginDate: '9/04/2020 20:00', endDate: '9/04/2020 15:00', post_id: 6, post: 'post', User_id: 0, user: 'user', sector: 1},
        {    id: 7, shiftName: "shift3",shiftId: 3, beginDate: '10/04/2020 15:00', endDate: '9/04/2020 15:00', post_id: 7, post: 'post', User_id: 0, user: 'user', sector: 1},
        {    id: 8, shiftName: "shift2",shiftId: 2, beginDate: '10/04/2020 15:00', endDate: '9/04/2020 15:00', post_id: 8, post: 'post', User_id: 0, user: 'user', sector: 0},
        {    id: 9, shiftName: "shift3",shiftId: 3, beginDate: '10/04/2020 20:00', endDate: '9/04/2020 15:00', post_id: 9, post: 'post', User_id: 0, user: 'user', sector: 0},
        {    id: 10, shiftName: "shift", shiftId: 1,beginDate: '10/04/2020 20:00', endDate: '9/04/2020 15:00', post_id: 10, post: 'post', User_id: 0, user: 'user', sector: 0},
        {    id: 11, shiftName: "shift", shiftId: 1,beginDate: '10/04/2020 20:00', endDate: '9/04/2020 15:00', post_id: 11, post: 'post', User_id: 0, user: 'user', sector: 0},
        {    id: 12, shiftName: "shift2",shiftId: 2, beginDate: '11/04/2020 15:00', endDate: '9/04/2020 15:00', post_id: 12, post: 'post', User_id: 0, user: 'user', sector: 0},
        {    id: 13, shiftName: "shift3",shiftId: 3, beginDate: '11/04/2020 5:00', endDate: '9/04/2020 15:00', post_id: 13, post: 'post', User_id: 0, user: 'user', sector: 0},
        {    id: 14, shiftName: "shift", shiftId: 1,beginDate: '11/04/2020 15:00', endDate: '9/04/2020 15:00', post_id: 14, post: 'post', User_id: 0, user: 'user', sector: 0}
    ],
    items: [
        {id: 0, shiftId: 0, itemType: "Fluo hesje"},
        {id: 1, shiftId: 1, itemType: "Fluo hesje"},
        {id: 2, shiftId: 2, itemType: "Fluo hesje"},
        {id: 3, shiftId: 3, itemType: "Fluo hesje"},
        {id: 4, shiftId: 4, itemType: "Fluo hesje"},
        {id: 5, shiftId: 5, itemType: "Fluo hesje"},
        {id: 6, shiftId: 6, itemType: "Fluo hesje"},
        {id: 7, shiftId: 7, itemType: "Fluo hesje"},
        {id: 8, shiftId: 8, itemType: "Fluo hesje"},
        {id: 9, shiftId: 9, itemType: "Fluo hesje"},
        {id: 10, shiftId: 10, itemType: "Fluo hesje"},
        {id: 11, shiftId: 11, itemType: "Fluo hesje"},
        {id: 12, shiftId: 12, itemType: "Fluo hesje"},
        {id: 13, shiftId: 13, itemType: "Fluo hesje"},
        {id: 14, shiftId: 14, itemType: "Fluo hesje"}
    ],
    pdfGenerated: false,
    positionDelay: 15,
    isProblemFetched : false,
    loading: false,
    isMapFetched: false,
    errorMessage: '',
    isOverviewFetched: false,
    isPlanningFetched: false,
    isPostFetched: false,
    isSettingsFetched: false,
    isUsersFetched: false,
    isProblemSolvedPosted: false,
    isUserConnectionChanged: false
}