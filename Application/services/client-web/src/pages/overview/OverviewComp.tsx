import React, {Component} from 'react';
import {Tabs, Tab, Typography, Box, Grid, Button, TextField, MenuItem} from '@material-ui/core';
import Message from './MessageComp';
import ProblemPreview from './ProblemPreview';
import ProblemInterface from '../../interfaces/ProblemDataInterface';
import MessageInterface from '../../interfaces/MessageDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import PostDataInterface from '../../interfaces/PostDataInterface';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {fetchMessages, postNewMessage, fetchProblems, fetchPosts} from './OverviewAction';
import {bindActionCreators} from 'redux';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import PostPreview from './PostPreview';

const styleFormElement = {
    margin: '4px'
}
const newMessageStyle = {
    background: 'rgb(242,242,250)',
    padding: '10px',
    borderRadius: '25px',
    width: '50%',
    textAlign: 'center' as 'center'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
    margin: '4px'
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
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
}

interface IState {
    value: number,
    specificReceiver: boolean,
    currentSelected: string
}

type Props = LinkStateProps & LinkDispatchToProps;

class OverviewComp extends Component<Props> {
    state: IState = {
        value: 0,
        specificReceiver: false,
        currentSelected: 'iedereen'
    }

    componentWillMount() {
        this.props.fetchProblems();
    }

    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        if (newValue === 0)
            this.props.fetchProblems();
        else if (newValue === 1)
            this.props.fetchPosts();
        else if (newValue === 2)
            this.props.fetchMessages();
        this.setState({
            ...this.state,
            value: newValue
        });
    };

    handleMessage = () => { //TODO ergens in server moet gecontroleerd worden of de opgegeven user bestaat, zo niet melding geven
                            // zo wel, moeten input velden leeggemaakt worden
        var messageReceiver = this.state.currentSelected;
        let messageTitle = ((document.getElementById("messageTitle")) as HTMLInputElement).value;
        let messageContent = ((document.getElementById("messageContent")) as HTMLTextAreaElement).value;
        let receiver : string = "";
        if (this.state.specificReceiver) {
            receiver = ((document.getElementById("receiver")) as HTMLInputElement).value
        }

        let receiverId : UserDataInterface = this.props.users.filter(user => (user.name === receiver.split(" ")[0] && 
            user.lastname === receiver.split(" ")[1]))[0];

        switch (messageReceiver) {
            case "Verantwoordelijke": {
                this.props.postNewMessage(receiverId.id, messageTitle,messageContent, this.props.admin.id);
                break;
            }
            case "Vrijwilliger" : {
                this.props.postNewMessage(receiverId.id, messageTitle,messageContent, this.props.admin.id);
                break;
            }
            case 'specifiek' : {
                this.props.postNewMessage(receiverId.id,messageTitle,messageContent,this.props.admin.id);
                break;
            }
            //TODO iedereen een bericht sturen
            // case "iedereen" : {
            //     this.props.postNewMessage("EVERYBODY", receiver, messageTitle,messageContent, this.props.admin.id);
            //     break;
            // }
        }
    }
    handleMessageForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleMessage();
    }

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

    render() {
        let Messages : Array<JSX.Element> = this.props.messages.filter(message => ! message.read).map(x => (
            <Message key={Math.random()} id={x.id} title={x.title} sender={x.sender} content={x.content} read={false}/>
        ));

        let Problems : Array<JSX.Element> = this.props.problems.filter(problem => ! problem.solved).map(x => (
            <ProblemPreview key={Math.random()} id={x.id} problemType={x.problemType} priority={x.priority} discription={x.discription} shiftName={x.shiftName} 
            timeStamp={x.timeStamp} post={x.post} postId={x.postId} user={x.user} sender={x.sender} latitude={x.latitude} longitude={x.longitude} solved={x.solved}/>
        ));
        let Posts: Array<JSX.Element> = this.props.posts.map(x => (
            <PostPreview key={Math.random()} id={x.id} title={x.title} addres={x.addres} general={x.general} sector={x.sector} 
                latitude={x.latitude} longitude={x.longitude} shifts={x.shifts} users={x.users} activeProblem={x.activeProblem}/>
        ));


        return(
            <div>
                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example"> 
                    <Tab icon={<ReportProblemOutlinedIcon />} label="problemen"/>
                    <Tab icon={<ListOutlinedIcon />} label="posten" />
                    <Tab icon={<NotificationsOutlinedIcon />} label="Berichten"/>
                    <Tab icon={<SmsOutlinedIcon />} label="Nieuw bericht"/>
                </Tabs>
            <TabPanel value={this.state.value} index={0}>
                {(Problems.length > 0) && Problems}
                {(Problems.length === 0) && <h5>Geen problemen</h5>}
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
                {Posts.length > 0 && Posts}
                {Posts.length === 0 && <h5>Er zijn geen posten</h5>} 
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
                {(Messages.length > 0) && Messages}
                {(Messages.length === 0) && <h5>Geen berichten</h5>}
            </TabPanel>
            <TabPanel value={this.state.value} index={3}>
                <Grid container justify="center">
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
                                <MenuItem value={'specifiek'}>specifiek</MenuItem>
                                </TextField>
                        </Grid>
                        {this.state.specificReceiver && 
                            <Grid item>
                                <TextField variant="outlined" placeholder="ontvanger" id="receiver" style={styleFormElement}/>
                            </Grid>}
                        <Grid item>
                            <TextField variant="outlined" type="text" placeholder="titel" id="messageTitle" style={styleFormElement}/>
                        </Grid>
                        <Grid item>
                            <TextField multiline variant="outlined" placeholder="type hier uw bericht"  id="messageContent" style={styleFormElement}/>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={this.handleMessage} style={ButtonStyle}>verstuur</Button>
                        </Grid>
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
    users: UserDataInterface[]
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        messages: state.OverviewReducer.messages,
        problems: state.OverviewReducer.problems,
        admin: state.OverviewReducer.loggedIn,
        posts: state.OverviewReducer.posts,
        users: state.OverviewReducer.users
    }
}

interface LinkDispatchToProps {
    fetchMessages: () => any,
    postNewMessage: (receiverId: Number, title: string, content: string, adminId: Number) => any,
    fetchProblems: () => any,
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