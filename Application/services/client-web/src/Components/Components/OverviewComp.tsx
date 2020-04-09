import React, {Component} from 'react';
import {Tabs, Tab, Typography, Box, Grid, Button} from '@material-ui/core';
import Message from './MessageComp';
import Problem from './ProblemComp';
import ProblemInterface from '../Interfaces/ProblemDataInterface';
import MessageInterface from '../Interfaces/MessageDataInterface';
import { AppState } from '../../Redux/Reducers';
import {connect} from 'react-redux';


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
}

type Props = LinkStateProps // & LinkDispatchProps;

class OverviewCom extends Component<Props> {
    state: IState = {
        value: 0
    }

    componentWillMount() {
        console.log(this.props);
        this.setState({
            ...this.state
        })
    }

    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            value: newValue
        });
    };

    handleMessage = () => {
        let element = (document.getElementById("messageReceiver")) as HTMLSelectElement;
        var index = element.selectedIndex;
        var messageReceiver = element.options[index].value;
        let messageTitle = ((document.getElementById("messageTitle")) as HTMLInputElement).value;
        let messageContent = ((document.getElementById("messageContent")) as HTMLTextAreaElement).value;

        console.log(messageReceiver);
        console.log(messageTitle);
        console.log(messageContent);
    }
    handleMessageForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleMessage();
    }

    render() {

        let MessagesMap : Array<JSX.Element> = this.props.messages.map(x => (
            <Message key={Math.random()} title={x.title} sender={x.sender} content={x.content}/>
        ));
        let ProblemsMap : Array<JSX.Element> = this.props.problems.map(x => (
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
                {ProblemsMap}
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
                {MessagesMap}
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
                <Grid container justify="center">
                    <form id="message" onSubmit={this.handleMessageForm}>
                        <Grid item>
                            <select id="messageReceiver">
                                <option>iedereen</option>
                                <option>Verantwoordelijke</option>
                                <option>Vrijwilliger</option>
                            </select>
                        </Grid>
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
    messages: MessageInterface[]
    problems: ProblemInterface[]
}

const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        messages: state.Problemreducer.Messages,
        problems: state.Problemreducer.Problems
    }
}

// export default Overview
export default connect(
    MapStateToProps,
)(OverviewCom);