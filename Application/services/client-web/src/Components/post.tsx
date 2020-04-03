import React, {Component} from 'react';
import PostInterface from './Interfaces/postInterface';

interface State {
    data: PostInterface
}

interface Props {
    postdata: PostInterface
}

class Post extends Component<PostInterface, State> {
    //post bevat title, address, sector, generalpostname

    state: State ={
        data: {title: "title", addres: "address", sector: -1, general: "general post"}
    }
    constructor(props: PostInterface) {
        super(props);

        this.state = {
            data: {title: props.title, addres: props.addres, sector: props.sector, general: props.general}
        }
    }

    render() {

        return(
            <div className="Post container card post">
                <h4 className="center">{this.state.data.title}</h4>
                <div className="row">
                    <p className="col">adres:</p>
                    <p className="col">{this.state.data.addres}</p>
                    <p className="col right">{this.state.data.sector}</p>
                    <p className="col right">sector:</p>
                </div>
                <p>{this.state.data.general}</p>
            </div>
        );
    }
}

export default Post