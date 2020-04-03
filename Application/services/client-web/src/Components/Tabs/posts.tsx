import React, {Component, FormEvent} from 'react';
import DataNavBar from '../NavBars/dataNavBar';
import Post from '../post';



class Posts extends Component {

    filter = (e: FormEvent) => {
        e.preventDefault();
        //TODO filter huidige lijst van getoonde posts
    }

    render() {
        return(
            <div>
                <DataNavBar />
                <div className="row">
                    <form className="col s12" onSubmit={this.filter}>
                        <input className="col s2 " type="number" placeholder="sector"></input>
                        <button className="col">filter</button>
                    </form>
                </div>

                <h4>Posten</h4>

                <div className="row s12">
                    <div className="col s6">
                    <Post title={"post"} addres={"addres"} sector={1} general={"generalpost"}/>
                    <Post title={"Parking1"} addres={"Visserstraat 27"} sector={1} general={"Parking Controle"}/>
                    <Post title={"Parking2"} addres={"Berglaan 5"} sector={1} general={"Parking Controle"}/>
                    <Post title={"Parking3"} addres={"Hemelstraat 164"} sector={1} general={"Parking Controle"}/>
                    <Post title={"Parking4"} addres={"Pukkelpoplaan 1"} sector={3} general={"Parking Controle"}/>
                    <Post title={"Drank stand 1"} addres={"Terein"} sector={2} general={"Dranken Stand"}/>
                    <Post title={"Schoonmaak terein"} addres={"Terein"} sector={2} general={"Schoonmaak"}/>
                    <Post title={"Security"} addres={"terein"} sector={2} general={"Security"}/>
                    <Post title={"Straat-affzetting1"} addres={"Rodeberg - Geraardslaan"} sector={4} general={"Straatafzetting"}/>
                    <Post title={"Straat-affzetting2"} addres={"Addelbaan - Rodeberg"} sector={4} general={"Straatafzetting"}/>
                    <Post title={"Straat-affzetting3"} addres={"Visserstraat - Geraardslaan"} sector={1} general={"Straatafzetting"}/>
                    </div>
                    <div className="col s8">
                        
                    </div>
                </div>

            </div>
        );
    }
}

export default Posts;