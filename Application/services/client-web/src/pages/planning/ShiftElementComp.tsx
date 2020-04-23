import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ItemInterface from '../../interfaces/ItemDataInterface';
import Item from './ItemComp';
import {postShiftChange} from './PlanningAction';

const style= {
    border: 'solid 1px black',
    margin: '2px 2px 2px 2px',
    padding: '4px'
}

interface IProps {
    postId: Number,
    post: string,
    userId: Number,
    user: string,
    shiftId: Number,
    items: ItemInterface[]
}

interface IState {
    changing: boolean,
    dropdown: boolean
}

type Props = LinkDispatchToProps & IProps;

class ShiftElement extends Component<Props> {
    state : IState = {
        changing : false,
        dropdown: false
    }

    handleButtonSwitchChange = () => {
        this.setState({
            changing: ! this.state.changing
        });
    }

    handleButtonSave = () => {
        var inputelement = (document.getElementById("input")) as HTMLInputElement;
        var newUser : string = inputelement.value;
        if (newUser !== this.props.user && newUser !== "") {
            this.props.postShiftChange(this.props.shiftId,newUser);
        }
        this.setState({
            changing: false
        })
    }

    handleDropButton = () => {
        this.setState({
            dropdown: ! this.state.dropdown
        })
    }

    render() {
        let list : Array<JSX.Element> = this.props.items.map(x => (
            <Item name={x.itemType}/>
        ));

        return(
            <Grid container justify="space-evenly" style={style}> {/*TODO als ik er een from rondzet wordt de layout niet meer goed, maar form is wel meerwaarde*/}
                    <Grid item>
                        <p>post: {this.props.post}</p>
                    </Grid>
                    <Grid item>
                        { ! this.state.changing && <p>vrijwilliger: {this.props.user}</p>}
                        { this.state.changing && <input type="text" id="input" placeholder={this.props.user} />}
                    </Grid>
                    <Grid item> 
                            { ! this.state.dropdown && <Button variant="contained" startIcon={<ArrowDropDownIcon />} onClick={this.handleDropButton}>Items</Button>}
                            {this.state.dropdown && <Button variant="contained" startIcon={<ArrowDropUpIcon />} onClick={this.handleDropButton}>Items</Button>}
                        </Grid>
                    <Grid item>
                        { ! this.state.changing && <Button variant="outlined" onClick={this.handleButtonSwitchChange}>change</Button>}
                        { this.state.changing && 
                            <Grid container justify="space-between">
                                <Grid item>
                                    <Button variant="outlined" onClick={this.handleButtonSave}>Save</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" onClick={this.handleButtonSwitchChange}>Discard</Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    <Grid container justify="center">
                        {this.state.dropdown && list}
                    </Grid>
            </Grid>
        );
    }
}

interface LinkDispatchToProps {
    postShiftChange: (changedShiftid: Number, newUser: string) => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        postShiftChange
    }, dispatch);
}

export default connect(
    null,MapDispatchToProps
)(ShiftElement);