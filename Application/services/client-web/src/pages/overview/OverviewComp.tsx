import React, {Component} from 'react';
import {Tabs, Tab, Typography, Grid, Button, TextField, MenuItem, List} from '@material-ui/core';
import Message from './MessageComp';
import ProblemPreview from './ProblemPreview';
import ProblemInterface from '../../interfaces/ProblemDataInterface';
import MessageInterface from '../../interfaces/MessageDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import PostDataInterface from '../../interfaces/PostDataInterface';
import ShiftDataInterface from '../../interfaces/ShiftDataInterface';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {fetchMessages, postNewMessage, fetchProblems, fetchPosts} from './OverviewAction';
import {bindActionCreators} from 'redux';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import PostPreview from './PostPreview';
import Notification from './NotificationComp';

const styleFormElement = {
    margin: '4px'
}

const styleMarginTop = {
    margin: '2vh 0 0 0',

}
const newMessageStyle = {
    padding: '10px',
    width: '100%',
    textAlign: 'center' as 'center'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
    margin: '4px'
}

const fullWidth = {
    width: '100%'
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </Typography>
    );
}

interface IState {
    value: number,
    specificReceiver: boolean,
    currentSelected: string,
    currentPost: string,
    messageSend: boolean,
    wrongUser: boolean,
    templateSelected: string,
    costumMessage: boolean,
    template: string
}

type Props = LinkStateProps & LinkDispatchToProps;

class OverviewComp extends Component<Props> {
    state: IState = {
        value: 0,
        specificReceiver: false,
        currentSelected: 'iedereen',
        messageSend: false,
        wrongUser: false,
        templateSelected: 'vrij bericht',
        costumMessage: true,
        template: "",
        currentPost: ""
    }

    /**
     * gets called before the componend is mounted
     * gets all the problems from the database
     */
    componentWillMount() {
        this.props.fetchProblems(5);
    }

    /**
     * gets an extra 5 problems from the database to show
     */
    fetchMoreProblems = () => {
        this.props.fetchProblems(this.props.problems.length + 5);
    }

    /**
     * gets the relevant data from the database when the user changes tabs
     * fetches the problems
     * fetches the post
     * fetches the messages
     */
    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log("ee");
        if (newValue === 0)
            this.props.fetchProblems(this.props.problems.length);
        else if (newValue === 1)
            this.props.fetchPosts();
        else if (newValue === 2)
            this.props.fetchMessages();
        this.setState({
            ...this.state,
            value: newValue
        });
    };

    /**
     * checks if the message is valid
     * sends the message to the database(server)
     */
    handleMessage = () => {
        this.setState({
            ...this.state,
            wrongUser: false,
            messageSend: false
        })

        var messageReceiver = this.state.currentSelected;
        let messageTitle = ((document.getElementById("messageTitle")) as HTMLInputElement).value;
        let messageContent = ((document.getElementById("messageContent")) as HTMLTextAreaElement).value;
        let receiver : string = "";

        switch (messageReceiver) {
            case "Verantwoordelijke": {
                this.sendMessageToVerantwoordelijke(messageTitle,messageContent);
                break;
            }
            case "Vrijwilliger" : {
                this.sendMessageToVrijwilligers(messageTitle,messageContent);
                break;
            }
            case 'specifiek' : {
                if (this.state.specificReceiver) {
                    receiver = ((document.getElementById("receiver")) as HTMLInputElement).value
                    let receiverId : UserDataInterface[] = this.props.users.filter(user => (user.name === receiver.split(" ")[0] && 
                        user.lastname === receiver.split(" ")[1]));
                    if (receiverId.length > 0) {
                        this.props.postNewMessage(receiverId[0].id,messageTitle,messageContent,this.props.admin.id);
                        this.setState({
                            ...this.state,
                            messageSend: true,
                            wrongUser: false
                        });
                        ((document.getElementById("messageTitle")) as HTMLInputElement).value = "";
                        ((document.getElementById("messageContent")) as HTMLTextAreaElement).value = "";
                    } else {
                        this.setState({
                            ...this.state,
                            wrongUser: true
                        })
                    }
                }
                
                break;
            }
            case "iedereen" : {
                this.sendMessageToAll(messageTitle,messageContent);
                break;
            }
            case "post": {
                this.sendMessageToPost(messageTitle,messageContent);
                break;
            }
        }          
    }
    /**
     * handles the form submit of the message
     * prevents the default page reload on html form submit
     */
    handleMessageForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleMessage();
    }

    /**
     * updates the state the the new receiver of the message
     */
    handleFilterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === 'specifiek')
            this.setState({
                ...this.state,
                specificReceiver: true,
                currentSelected: event.target.value
            })
        else 
            this.setState({
                ...this.state,
                specificReceiver: false,
                currentSelected: event.target.value
            })
    }
    /**
     * sends a message to all users
     */
    sendMessageToAll = (title: string, content: string) => { //TODO niet in loop
        for (let i = 0; i < this.props.users.length; ++i) {
            this.props.postNewMessage(this.props.users[i].id,title,content,this.props.admin.id);
        }
        this.setState({
            ...this.state,
            messageSend: true,
            wrongUser: false
        });
        ((document.getElementById("messageTitle")) as HTMLInputElement).value = "";
        ((document.getElementById("messageContent")) as HTMLTextAreaElement).value = "";
    }
    /**
     * sends a message to only the volunteers
     */
    sendMessageToVrijwilligers = (title: string, content: string) =>{
        for (let i = 0; i < this.props.users.length; ++i) {
            if (this.props.users[i].permission === 1)
                this.props.postNewMessage(this.props.users[i].id,title,content,this.props.admin.id);
        }
        this.setState({
            ...this.state,
            messageSend: true,
            wrongUser:false
        });
        ((document.getElementById("messageTitle")) as HTMLInputElement).value = "";
        ((document.getElementById("messageContent")) as HTMLTextAreaElement).value = "";
    }
    /**
     * sends a message to only the sector-responsible
     */
    sendMessageToVerantwoordelijke = (title: string, content: string) => {
        for (let i = 0; i < this.props.users.length; ++i) {
            if (this.props.users[i].permission === 2)
                this.props.postNewMessage(this.props.users[i].id,title,content,this.props.admin.id);
        }
        this.setState({
            ...this.state,
            messageSend: true,
            wrongUser: false
        });
        ((document.getElementById("messageTitle")) as HTMLInputElement).value = "";
        ((document.getElementById("messageContent")) as HTMLTextAreaElement).value = "";
    } 

    sendMessageToPost = (title: string, content: string) => { //TODO
        console.log(this.state.currentPost);
        let postId : number = parseInt(this.state.currentPost.split(" ")[0]);
    }

    /**
     * function to create an array of all the problems from props mapped to a problemViewComponent
     */
    renderProblems = () : Array<JSX.Element> => {
        return this.props.problems.filter(problem => ! problem.solved).map(x => (
            <ProblemPreview key={Math.random()} id={x.id} problemType={x.problemType} priority={x.priority} discription={x.discription} shiftName={x.shiftName} 
            timeStamp={x.timeStamp} post={x.post} postId={x.postId} user={x.user} sender={x.sender} latitude={x.latitude} longitude={x.longitude} solved={x.solved}/>
        ));
    }

    /**
     * changes the internal state corresponding to the user selection
     * show the corresponding message to the user
     */
    handleTemplateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        let value : string  = event.target.value;
        if (value === "Geen pauze") {
            this.setState({
                ...this.state,
                costumMessage: false,
                template: "Uw pauze valt vandaag weg",
                templateSelected: value
            });
        } else if(value === "vrij bericht") {
            this.setState({
                ...this.state,
                costumMessage: true,
                templateSelected: value
            });
        } else if (value === "Naar post") {
            this.setState({
                ...this.state,
                costumMessage: false,
                template: "Gelieve naar uw post te gaan",
                templateSelected: value
            });
        } else if (value === "wat probleem") {
            this.setState({
                ...this.state,
                costumMessage: false,
                template: "Wat is uw probleem",
                templateSelected: value
            });
        }
    }

    /**
     * maps the messages from this.props to Message components to show them to the user
     */
    renderMessages = () : Array<JSX.Element> => {
        return this.props.messages.filter(message => ! message.read).map(x => (
            <Message key={Math.random()} id={x.id} title={x.title} sender={x.sender} content={x.content} read={false}/>
        ));
    }

    /**
     * updates the state to the new post the user has selected
     */
    handleMessagePostChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            currentPost: event.target.value
        });
    }

    /**
     * maps the post from this.posts to PostPreview components to show them
     * alse keeps track of all the posts to display them in message post selection menu
     * @param postChoices 
     */
    renderPosts(postChoices : Array<JSX.Element>){
        return this.props.posts.map(x => {
            postChoices.push(<MenuItem value={x.id + " " + x.title}>{x.title}</MenuItem>)
            return <PostPreview key={Math.random()} id={x.id} title={x.title} addres={x.addres} general={x.general} sector={x.sector} 
                latitude={x.latitude} longitude={x.longitude} shifts={x.shifts} users={x.users} activeProblem={x.activeProblem}/>
        });
        // return this.props.posts.map(x => (
        //     <PostPreview key={Math.random()} id={x.id} title={x.title} addres={x.addres} general={x.general} sector={x.sector} 
        //         latitude={x.latitude} longitude={x.longitude} shifts={x.shifts} users={x.users} activeProblem={x.activeProblem}/>
        // ));
    }

    render() {
        let Messages = <List style={styleMarginTop}>{this.renderMessages()}</List> 

        let Problems = <List style={styleMarginTop}>{this.renderProblems()}</List> 
        
        let postChoices : Array<JSX.Element> = [];
        let Posts = <List style={styleMarginTop}>{this.renderPosts(postChoices)}</List> 

        let LocalTime : Date = new Date();
        let LocalHourString : string = LocalTime.toLocaleTimeString();
        let LocalHour : number = Number(LocalHourString.split(":")[0]);
        let LocalMinute : number = Number(LocalHourString.split(":")[1]);
        let StartedShifts: ShiftDataInterface[] = [];
        for (let i = 0; i < this.props.planning.length; ++i) {
            let BeginDate : Date = new Date(this.props.planning[i].beginDate);
            let BeginHourString : string = BeginDate.toLocaleTimeString();
            let BeginHour : number = Number(BeginHourString.split(":")[0]) - 2; //TODO opletten of altijd -2 moet blijven
            let BeginMinute : number = Number(BeginHourString.split(":")[1]);
            if (BeginHour === LocalHour && (LocalMinute - BeginMinute) <= 5 && (LocalMinute - BeginMinute) >= 0)
                StartedShifts.push(this.props.planning[i]);
            else if (BeginHour + 1 === LocalHour && (LocalMinute - BeginMinute + 60) <= 5 && (LocalMinute - BeginMinute + 60) >= 0)
                StartedShifts.push(this.props.planning[i]);
        }

        let Notifications : Array<JSX.Element> = StartedShifts.map(x => (
            <Notification title="Shift begonnen" content={"de shift " + x.shiftName + " is begonnen, deze loopt van " 
                + new Date(x.beginDate).toLocaleString() + " tot " + new Date(x.endDate).toLocaleString()}/>
        ));

        return(
            <div>
                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor={'primary'}> 
                    <Tab icon={<ReportProblemOutlinedIcon />} label="problemen"/>
                    <Tab icon={<ListOutlinedIcon />} label="posten" />
                    <Tab icon={<NotificationsOutlinedIcon />} label="Berichten"/>
                    <Tab icon={<SmsOutlinedIcon />} label="Nieuw bericht"/>
                </Tabs>
            <TabPanel value={this.state.value} index={0}>
                <Grid container direction='row' justify='space-between'>
                    <Grid item>
                        {Problems}
                        {/* {(Problems === 0) && <h5>Geen problemen</h5>} */}
                    </Grid>
                    <Grid container direction="column" justify="center">
                        <Button variant="outlined" onClick={this.fetchMoreProblems}>Toon meer problemen</Button>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
                {Posts}
                {/* {Posts.length === 0 && <h5>Er zijn geen posten</h5>}  */}
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
                {(Notifications.length > 0) && Notifications}
                {Messages}
                {/* {(Messages.length === 0) && <h5>Geen berichten</h5>} */}
            </TabPanel>
            <TabPanel value={this.state.value} index={3}>
                <Grid container style={fullWidth}>
                    <form id="message" onSubmit={this.handleMessageForm} style={newMessageStyle}>
                        <Grid item>
                            <TextField
                                id="messageReceiver"
                                select
                                label="Ontvanger"
                                value={this.state.currentSelected}
                                onChange={this.handleFilterChanged}
                                helperText="Selecteer de ontvanger/ontvangers"
                                variant="outlined"
                                style={styleFormElement}
                                >
                                <MenuItem value={'iedereen'}>iedereen</MenuItem>
                                <MenuItem value={'vrijwilligers'}>Alle vrijwilligers</MenuItem>
                                <MenuItem value={'verantwoordelijken'}>Alle verantwoordelijken</MenuItem>
                                <MenuItem value={'post'}>Specifieke post</MenuItem>
                                <MenuItem value={'specifiek'}>specifiek</MenuItem>
                                </TextField>
                        </Grid>
                        {this.state.specificReceiver && 
                        <Grid item>
                            <TextField variant="outlined" placeholder="ontvanger" id="receiver" style={styleFormElement}/>
                        </Grid>
                        }
                        {this.state.currentSelected === 'post' &&
                        <Grid item>
                            <TextField
                                id="postSelector"
                                select
                                label="Post"
                                helperText="Selecteer de ontvanger/ontvangers"
                                variant="outlined"
                                style={styleFormElement}
                                value={this.state.currentPost}
                                onChange={this.handleMessagePostChanged}
                            >
                                {postChoices}
                            </TextField>
                        </Grid>
                        }
                        <Grid item xs={12}>
                            <TextField variant="outlined" type="text" placeholder="titel" id="messageTitle" style={styleFormElement}/>
                        </Grid>
                        <Grid item>
                            <TextField 
                                id="templates"
                                select
                                label="bericht"
                                value={this.state.templateSelected}
                                onChange={this.handleTemplateChanged}
                                helperText="Kies een template"
                                variant="outlined"
                                style={styleFormElement}
                            >
                                <MenuItem value={'vrij bericht'}>vrij bericht</MenuItem>
                                <MenuItem value={'Geen pauze'}>Geen pauze</MenuItem>  {/*TODO meer templates*/}
                                <MenuItem value={"Naar post"}>Ga naar post</MenuItem>
                                <MenuItem value={"wat probleem"}>Wat is het probleem</MenuItem>
                            </TextField>
                        </Grid>
                        { this.state.costumMessage && 
                        <Grid item>
                            <TextField multiline variant="outlined" placeholder="type hier uw bericht"  id="messageContent" style={styleFormElement}/>
                        </Grid>
                        }
                        { ! this.state.costumMessage &&
                        <Grid item>
                            <TextField multiline variant="outlined" id="messageContent" value={this.state.template} disabled style={styleFormElement}/>
                        </Grid>
                        }
                        <Grid item>
                            <Button variant="outlined" onClick={this.handleMessage} style={ButtonStyle}>verstuur</Button>
                        </Grid>
                        {this.state.messageSend && this.props.isPostNewMessage && ! this.props.loading && this.props.errorMessage === "" &&
                            <Grid item>
                                <h4>Het bericht is verstuurt</h4>
                            </Grid>
                        }
                        {this.state.messageSend && ! this.props.isPostNewMessage && this.props.loading && this.props.errorMessage === "" &&
                            <Grid item>
                                <h4>Het bericht is aan het verzenden</h4>
                            </Grid>
                        }
                        {this.state.messageSend && ! this.props.isPostNewMessage && ! this.props.loading && this.props.errorMessage !== "" &&
                            <Grid item>
                                <h4>Er trad een probleem op tijdens het versturen van het bericht: {this.props.errorMessage}</h4>
                            </Grid>
                        }
                        {this.state.wrongUser &&
                            <Grid item>
                                <h4>Deze gebruiker bestaat niet</h4>
                            </Grid>
                        }
                    </form>
                </Grid>
            </TabPanel>
            </div>
        );
    }
}

interface LinkStateProps {
    messages: MessageInterface[],
    problems: ProblemInterface[],
    admin: UserDataInterface,
    posts: PostDataInterface[],
    users: UserDataInterface[],
    planning: ShiftDataInterface[],
    loading: boolean,
    isPostNewMessage: boolean,
    errorMessage: string
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        messages: state.OverviewReducer.messages,
        problems: state.OverviewReducer.problemsSubset,
        admin: state.OverviewReducer.loggedIn,
        posts: state.OverviewReducer.posts,
        users: state.OverviewReducer.users,
        planning: state.OverviewReducer.planning,
        loading: state.OverviewReducer.loading,
        isPostNewMessage: state.OverviewReducer.isPostNewMessage,
        errorMessage: state.OverviewReducer.errorMessage
    }
}

interface LinkDispatchToProps {
    fetchMessages: () => any,
    postNewMessage: (receiverId: Number, title: string, content: string, adminId: Number) => any,
    fetchProblems: (amount: number) => any,
    fetchPosts: () => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetchMessages,
        postNewMessage,
        fetchProblems,
        fetchPosts
    }, dispatch);
}

export default connect(
    MapStateToProps, MapDispatchToProps
)(OverviewComp);