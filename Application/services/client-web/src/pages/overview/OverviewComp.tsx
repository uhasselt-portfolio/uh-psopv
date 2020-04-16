import React, {Component} from 'react';
import {Tabs, Tab, Typography, Box, Grid, Button} from '@material-ui/core';
import Message from './MessageComp';
import Problem from '../../Components/ProblemComp';
import ProblemInterface from '../../interfaces/ProblemDataInterface';
import MessageInterface from '../../interfaces/MessageDataInterface';
import UserInterface from '../../interfaces/UserDataInterface';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {fetchMessages, postNewMessage, fetchProblems} from './OverviewAction';
import {bindActionCreators} from 'redux';

const styletextarea = {
    resize : 'vertical'
} as React.CSSProperties;

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
    specificReceiver: boolean
}

type Props = LinkStateProps & LinkDispatchToProps;

class OverviewComp extends Component<Props> {
    state: IState = {
        value: 0,
        specificReceiver: false
    }

    componentWillMount() {
        this.props.fetchProblems();
    }

    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        if (newValue === 0)
            this.props.fetchProblems();
        else if (newValue === 1)
            this.props.fetchMessages();
        this.setState({
            ...this.state,
            value: newValue
        });
    };

    handleMessage = () => { //TODO ergens in server moet gecontroleerd worden of de opgegeven user bestaat, zo niet melding geven
                            // zo wel, moeten input velden leeggemaakt worden
        let element = (document.getElementById("messageReceiver")) as HTMLSelectElement;
        var index = element.selectedIndex;
        var messageReceiver = element.options[index].value;
        let messageTitle = ((document.getElementById("messageTitle")) as HTMLInputElement).value;
        let messageContent = ((document.getElementById("messageContent")) as HTMLTextAreaElement).value;
        let receiver : string = "";
        if (this.state.specificReceiver) {
            receiver = ((document.getElementById("receiver")) as HTMLInputElement).value
        }

        switch (messageReceiver) {
            case "Verantwoordelijke": {
                this.props.postNewMessage("SECTORMANAGER", receiver, messageTitle,messageContent, this.props.admin.id);
                break;
            }
            case "Vrijwilliger" : {
                this.props.postNewMessage("VOLUNTEER", receiver, messageTitle,messageContent, this.props.admin.id);
                break;
            }
            case "iedereen" : {
                this.props.postNewMessage("EVERYBODY", receiver, messageTitle,messageContent, this.props.admin.id);
                break;
            }
        }
    }
    handleMessageForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleMessage();
    }

    handleFilterChanged = () => {
        let element = (document.getElementById("messageReceiver")) as HTMLSelectElement;
        var Filterindex = element.selectedIndex;
        if (Filterindex > 0)
            this.setState({
                ...this.state,
                specificReceiver: true
            })
        else 
            this.setState({
                ...this.state,
                specificReceiver: false
            })
    }

    render() {
        let Messages : Array<JSX.Element> = this.props.messages.filter(message => ! message.read).map(x => (
            <Message key={Math.random()} id={x.id} title={x.title} sender={x.sender} content={x.content} read={false}/>
        ));

        let Problems : Array<JSX.Element> = this.props.problems.filter(problem => ! problem.solved).map(x => (
            <Problem key={Math.random()} id={x.id} problemType={x.problemType} priority={x.priority} discription={x.discription} shiftName={x.shiftName} 
            timeStamp={x.timeStamp} post={x.post} user={x.user} sender={x.sender} latitude={x.latitude} longitude={x.longitude} solved={x.solved}/>
        ));

        return(
            <div>
                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                    <Tab label="Problemen"/>
                    <Tab label="Berichten"/>
                    <Tab label="Nieuw bericht"/>
                </Tabs>
            <TabPanel value={this.state.value} index={0}>
                {(Problems.length > 0) && Problems}
                {(Problems.length === 0) && <h5>Geen problemen</h5>}
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
                {(Messages.length > 0) && Messages}
                {(Messages.length === 0) && <h5>Geen berichten</h5>}
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
                <Grid container justify="center">
                    <form id="message" onSubmit={this.handleMessageForm}>
                        <Grid item>
                            <select id="messageReceiver" onChange={this.handleFilterChanged}>
                                <option>iedereen</option>
                                <option>Verantwoordelijke</option>
                                <option>Vrijwilliger</option>
                            </select>
                        </Grid>
                        {this.state.specificReceiver && 
                            <Grid item>
                                <input type="text" placeholder="ontvanger" id="receiver" />
                            </Grid>}
                        <Grid item>
                            <input type="text" placeholder="titel" id="messageTitle" />
                        </Grid>
                        <Grid item>
                            <textarea cols={30} form="message" placeholder="typ hier uw bericht" style={styletextarea} id="messageContent"/>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={this.handleMessage}>verstuur</Button>
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
    admin: UserInterface
}

const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        messages: state.OverviewReducer.messages,
        problems: state.OverviewReducer.problems,
        admin: state.OverviewReducer.loggedIn
    }
}

interface LinkDispatchToProps {
    fetchMessages: () => any,
    postNewMessage: (receiver: string, User: string, title: string, content: string, adminId: Number) => any,
    fetchProblems: () => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetchMessages,
        postNewMessage,
        fetchProblems
    }, dispatch);
}

// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProps
)(OverviewComp);