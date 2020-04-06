import React, {Component} from 'react';
import {Tabs, Tab, Typography, Box, Grid, Button} from '@material-ui/core';
import Message from './MessageComp';
import Problem from './ProblemComp';
import ProblemInterface from './Interfaces/ProblemDataInterface';
import MessageInterface from './Interfaces/MessageDataInterface';

const styletextarea = {
    resize : 'vertical'
} as React.CSSProperties;

interface IState {
    value: number,
    messages: MessageInterface[],
    problems: ProblemInterface[]
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

class OverviewCom extends Component {
    state = {
        value: 0,
        messages: [
            {title:"titel", sender:"verstuurder", content:"bericht"},
            {title:"dronken man", sender:"John Timmermans", content:"Dronken man op parking 1 is verwijderd door de politie"},
            {title:"auto ongeluk", sender: "An Versteen", content:"Door een auto ongeluk is een deel van parking 3 tijdelijk buiten gebruik"},
            {title:"vrijwilliger gevonden", sender:"Marlies Dalemans", content:"De ontbrekende vrijwilliger op post POE_WOE is gevonden"},
            {title:"bier op", sender:"Michiel Delvaux", content:"Het bier bij tab 4 is op"}
        ],
        problems: [
            {ProblemType: "problemtype", Priority: 1, Discription: "discription", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503},
                {ProblemType: "Afwezigheid", Priority: 1, Discription: "Vrijwilliger is afwezig van zijn post", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503},
                {ProblemType: "problemtype", Priority: 1, Discription: "discription", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503},
                {ProblemType: "problemtype", Priority: 1, Discription: "discription", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503},
                {ProblemType: "problemtype", Priority: 1, Discription: "discription", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503}
        ]
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

        let MessagesMap : Array<JSX.Element> = this.state.messages.map(x => (
            <Message key={Math.random()} title={x.title} sender={x.sender} content={x.content}/>
        ));
        let ProblemsMap : Array<JSX.Element> = this.state.problems.map(x => (
            <Problem key={Math.random()} ProblemType={x.ProblemType} Priority={x.Priority} Discription={x.Discription} ShiftName={x.ShiftName} 
            TimeStamp={x.TimeStamp} Post={x.Post} User={x.User} Sender={x.Sender} latitude={x.latitude} longitude={x.longitude} />
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

export default OverviewCom;