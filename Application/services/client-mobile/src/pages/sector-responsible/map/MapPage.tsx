import * as React from 'react';
import { Component } from 'react';
import { IonButton, 
    IonListHeader, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonLabel,
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import { caretDown, call, mail } from 'ionicons/icons';

import './MapPage.css';
import GoogleMapReact from 'google-map-react';
import NormalMarker  from './components/NormalMarker';
import ProblemMarker from './components/ProblemMarker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchProblemsAndPosts} from './MapAction'


class MapPage extends Component<any> {

  constructor(props:any) {
    super(props);
  }

  static defaultProps = {
    center: {
      lat: 50.9307,
      lng: 5.3325
    },
    zoom: 11
  };

  componentDidMount(){
    this.props.fetchProblemsAndPosts();
  }

  renderProblemPosts(){
    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.areProblemsAndPostsFetched !== undefined){
        if(this.props.areProblemsAndPostsFetched.length <= 0){
          return <div> No messages found. </div>
        } else{
          console.log("PROBLEEEMMMM", this.props.areProblemsAndPostsFetched)

          return this.props.areProblemsAndPostsFetched.problem_posts.map((data: any, index: number) =>{
            console.log(data);
            return (
              <ProblemMarker 
              lat={data.latitude} 
              lng={data.longitude} />
            )
          })
        }
      }
    }
  }

  renderGoodPosts(){
    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.areProblemsAndPostsFetched !== undefined){
        if(this.props.areProblemsAndPostsFetched.length <= 0){
          return <div> No messages found. </div>
        } else{
          console.log("PROBLEEEMMMM", this.props.areProblemsAndPostsFetched)

          return this.props.areProblemsAndPostsFetched.good_posts.map((data: any, index: number) =>{
            console.log(data);
            return (
              <NormalMarker 
              lat={data.latitude} 
              lng={data.longitude} />
            )
          })
        }
      }
    }
  }

  render(){
    console.log(this.props)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Map</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <div className="GoogleMaps">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDyMg3eezA_aKnVp1Hvsya23xwxCey32JA' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

        {this.renderProblemPosts()}
        {this.renderGoodPosts()}


        

        </GoogleMapReact>
        </div>
        </IonContent>
      </IonPage>
    )
  }

};

function mapStateToProps(state: any) {
  console.log(state)

  return({
    areProblemsAndPostsFetched: state.map.areProblemsAndPostsFetched,
    errorMessage: state.map.errorMessage,
    loading: state.map.loading,
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchProblemsAndPosts,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
