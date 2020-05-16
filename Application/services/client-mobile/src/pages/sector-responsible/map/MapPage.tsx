import * as React from 'react';
import { Component } from 'react';
import { IonButton,  
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonContent, IonSelect, IonSelectOption } from '@ionic/react';

import './MapPage.css';
import GoogleMapReact from 'google-map-react';
import NormalMarker  from './components/NormalMarker';
import ProblemMarker from './components/ProblemMarker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchPosts} from '../list/ListAction'
import Map from './components/Map';


class MapPage extends Component<any> {

  
  constructor(props:any) {
    super(props);
  }

  state={
    selected_sector: -1, //if -1 = selected all sectors
    data_posts: []
  }

  static defaultProps = {
    center: {
      lat: 50.9307,
      lng: 5.3325
    },
    zoom: 11
  };

  componentDidMount(){
    this.props.fetchPosts();
  }

  renderButtons(){
    return(
      <IonButton className="mapButton">
        <IonSelect
          interface="popover"  
          value={this.state.selected_sector} placeholder={"Sector " + this.state.selected_sector} onIonChange={e => this.handleSectorChange(e.detail.value)}>
            {this.props.localStorage.posts_sectors.map((sector: number) => {
                return <IonSelectOption value={sector}>Sector {sector}</IonSelectOption>
            })}
            <IonSelectOption value={-1}>Alle sectors</IonSelectOption>

        </IonSelect>
      </IonButton>
    )
    
  }

  handleSectorChange(sector: number){
    let new_data
    if(sector !== -1){
      new_data = this.props.localStorage.posts_data.filter((element: any) => {
        return element.sector_id === sector
      })     
    }else{
      new_data = this.props.localStorage.posts_data
    }
   
    this.setState({...this.state, selected_sector: sector, data_posts: new_data});
  }

  renderPosts(){
    if(this.state.data_posts.length <= 0){
      this.setState({...this.state, data_posts: this.props.localStorage.posts_data});
      return this.props.localStorage.posts_data.map((data: any, index: number) =>{
        if(data.problem === false){
          return (
            <NormalMarker 
            lat={data.latitude} 
            lng={data.longitude}/>
          )
        } else{
          return (
            <ProblemMarker 
            lat={data.latitude} 
            lng={data.longitude}
            />          )
        }
        
      })
    } else {
      return this.state.data_posts.map((data: any, index: number) =>{
        if(data.problem === false){
          return (
            <NormalMarker 
            lat={data.latitude} 
            lng={data.longitude}
            post_id={data.id}
            sector_id={data.sector_id}
            />
          )
        } else{
          return (
            <ProblemMarker 
            lat={data.latitude} 
            lng={data.longitude}
            post_id={data.id}
            sector_id={data.sector_id}
            />
          )
        }
        
      })
    }  
  }

  showInfo(){
  }

  renderContent(){
    console.log("blabla");
    console.log(this.props);
      if(this.props.localState !== undefined){
        if(this.props.localState.length <= 0){
          return <div> No Posts found. </div>
        } else{
          console.log("jfkls");
          return (
            <div className="GoogleMaps">
            {this.renderButtons()}

            <GoogleMapReact
              bootstrapURLKeys={{ key: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDyMg3eezA_aKnVp1Hvsya23xwxCey32JA' }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >        
              {this.renderPosts()}

            </GoogleMapReact>
            {/* <Map problems={[]} users={[]} posts={[]} isMarkerClickable={false}/> */}
          </div>
          )
          
        }
      } else {
        console.log("eeeee");
      }
  }

  render(){
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Map</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {this.renderContent()}
        </IonContent>
      </IonPage>
    )
  }

};

function mapStateToProps(state: any) {
  return({
    localStorage: state.list.localStorage,
    arePostsFetched: state.map.arePostsFetched,
    errorMessage: state.map.errorMessage,
    loading: state.map.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchPosts
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MapPage);