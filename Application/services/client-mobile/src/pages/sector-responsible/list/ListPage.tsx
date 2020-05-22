import React, { Fragment, useState, Component } from 'react';
import './ListPage.css';
import ListViewItem from './components/ListView_Item';

import { IonButton, 
  IonListHeader, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel,
  IonText,
  IonSelect,
  IonSelectOption,
  IonRow,
  IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonGrid, IonCol, IonRadioGroup } from '@ionic/react';
import { bindActionCreators } from 'redux';
import {fetchPosts} from './ListAction'
import { connect } from 'react-redux';
import { getDefaultSector, ConcatListToActionList } from '../../save/saveFunction';
import CustomDropdown from './components/CustomDropdown';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

const sort_types = {alfabetisch: "alfabetisch", afstand: "afstand", best_route: "beste route"}



class ListView extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  addALotMessage(){
    let function_list: any[] = [];
    for( let i = 0; i < 10; i++){
      let params = {
          title: "double",
          message: "message",
          created_by_id: 1,
          send_to_id: 2,
          priority: 5,
      }
  
      function_list = [...function_list, {url: 'https://psopv.herokuapp.com/api/message/add', params: params}]
    }
  ConcatListToActionList(function_list);

  }
  
  state={
    selected_sector: -1, //if -1 = selected all sectors
    selected_sort: sort_types.alfabetisch,
    data_posts: [],
    default_sector: -1, // -1 = none
  }

  async componentDidMount(){
    this.props.fetchPosts();
  }

  async getCurrentLocation() {
    const position = await Geolocation.getCurrentPosition();
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    return position;
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
    })
  }

  handleSectorChange(sector: number){
    let new_data: any;
    if(sector !== -1){
      new_data = this.props.localStorage.posts_data.filter((element: any) => {
        return element.sector_id === sector
      })     
    }else{
      console.log(this.props.localStorage.posts_data)
      new_data = this.props.localStorage.posts_data
    }
    // this.setState({selected_sector: sector, data_posts: new_data});
    // // Correct
    this.setState((state, props) => ({
      selected_sector: sector, data_posts: new_data
    }));
  }

  handleSortChange(sort: string){
    if (sort === sort_types.alfabetisch){
      this.sortDataAlphabetical();
    }
    if (sort === sort_types.afstand){
      this.sortDataByDistance();
    }
    if (sort === sort_types.best_route){
      this.sortDataByBestRoute();
    }
  }

  getShortest(pos: {lat: number, lng: number}, list: any[]){

    let distance = Math.sqrt(Math.pow( (list[0].loc_lat - pos.lat) ,2) + Math.pow( (list[0].loc_lng - pos.lng) ,2));;
    let selected_element = list[0];
    for(let i = 0; i<list.length; i++){
      let element = list[i];
      let lat = element.loc_lat;
      let lng = element.loc_lng;

      let new_distance = Math.sqrt(Math.pow( (lat - pos.lat) ,2) + 
                                        Math.pow( (lng - pos.lng) ,2));

      if(distance == 0){
        distance = new_distance;
        selected_element = element
      }
      if(new_distance < distance){
        distance = new_distance
        selected_element = element;
      }
    }
    console.log(distance)
    return selected_element;
  }

 
  async sortDataByBestRoute(){
    const position = await Geolocation.getCurrentPosition();
    let pos = {lat: position.coords.latitude, lng: position.coords.longitude}

    let new_data = this.state.data_posts
    let loop_data_length = this.state.data_posts.length;
    let best_route = [];


    for(let i = 0; i < loop_data_length; i++){
      let new_shortest = this.getShortest(pos, new_data);
      new_data = new_data.filter((element: any) => {
                    return (element.post_id != new_shortest.post_id)
                  })
      best_route.push(new_shortest);
    }

    console.log(best_route);
  }

  funcSortDataAlphabetical(a: any, b: any){
    if(a.sector_id < b.sector_id){
      if(a.id < b.id){
        return -1
      } else if(a.id > b.id){
        return 1
      } else{
        return 0
      }
    
    } else if(a.sector_id > b.sector_id){
      if(a.id < b.id){
        return -1
      } else if(a.id > b.id){
        return 1
      } else{
        return 0
      }
    } else{
      if(a.id < b.id){
        return -1
      } else if(a.id > b.id){
        return 1
      } else{
        return 0
      }
    }
  }

  sortDataAlphabetical(){
    let new_data = this.state.data_posts
    new_data.sort(this.funcSortDataAlphabetical)  
    this.setState({...this.state, selected_sort: sort_types.alfabetisch, data_posts: new_data});
  }

  funcSortDistance(currentUserLocation:any) {
    return function(o1: any, o2: any){
      let distance1 = Math.sqrt(Math.pow( (o1.loc_lat - currentUserLocation.coords.latitude) ,2) +
      Math.pow( (o1.loc_lng - currentUserLocation.coords.longitude) ,2));
      let distance2 = Math.sqrt(Math.pow( (o2.loc_lat - currentUserLocation.coords.latitude) ,2) +
      Math.pow( (o2.loc_lng - currentUserLocation.coords.longitude) ,2));
      console.log("distance1", distance1, "distance2", distance2)
  
      if (distance1 < distance2)
          return -1;
      if (distance2 < distance1)
          return 1;
      return 0;
    }
  }

  async sortDataByDistance(){
    let new_data = this.state.data_posts
    let currentUserLocation = await this.getCurrentLocation();


    new_data.sort(this.funcSortDistance(currentUserLocation))
    this.setState({...this.state, selected_sort: sort_types.afstand, data_posts: new_data});
  }

  renderListOfItems(){
    if(this.state.data_posts.length <= 0){
      let data_default = this.props.localStorage.posts_data.filter((data: any) =>{
        return (data.sector_id == this.props.localStorage.default_sector)
      })
      let sector = 0;
      let colorIndex = -1;
      this.setState({...this.state, data_posts: data_default, default_sector: this.props.localStorage.default_sector, selected_sector: this.props.localStorage.default_sector});
      return data_default.map((data: any, index: number) =>{
        if(data.sector_id != sector){
          colorIndex++;
          sector = data.sector_id
        }
        return (
          <ListViewItem {...data} color={this.props.localStorage.sector_colors[colorIndex].color}/>
        )
      })
    } else {
      let sector = 0;
      let colorIndex = -1;
      return this.state.data_posts.map((data: any) =>{
        if(data.sector_id != sector){
          colorIndex++;
          sector = data.sector_id;
        }
        console.log(this.props.localStorage.sector_colors[colorIndex].color)
        return (
          <ListViewItem {... data} color={this.props.localStorage.sector_colors[colorIndex].color} />
        )
      })
    }  
  }

  
  

   renderButtons(){
    let list: { title: string; subinfo: string; }[] = [];
    this.props.localStorage.posts_sectors.map((element: any) => {
        let item = {title: "Sector " + element.sector_id, subinfo: ""}
        if(element == this.props.localStorage.default_sector){
           item = {title: "Sector " + element.sector_id, subinfo: "default"}
        } 
        list.push(item)
    })

    return(
      <IonGrid>
      <IonRow>
        <IonCol>
          <IonButton>
            <IonSelect
              interface="popover"  
              value={this.state.selected_sort} placeholder={this.state.selected_sort} onIonChange={e => this.handleSortChange(e.detail.value)}>
                <IonSelectOption value={sort_types.alfabetisch}> {sort_types.alfabetisch}</IonSelectOption>
                <IonSelectOption value={sort_types.afstand}> {sort_types.afstand}</IonSelectOption>
                <IonSelectOption value={sort_types.best_route}> {sort_types.best_route}</IonSelectOption>
            </IonSelect>
          </IonButton>
        </IonCol>
        <IonCol>
        <IonButton>
        <IonSelect
          interface="popover"  
          value={this.state.selected_sector} placeholder={"Sector " + this.state.selected_sector} onIonChange={e => this.handleSectorChange(e.detail.value)}>
            {this.props.localStorage.posts_sectors.map((sector: any) => {
              if(this.state.default_sector === sector){
                return <IonSelectOption  value={sector.sector_id}>Sector {sector.sector_id}(D) </IonSelectOption>
              } else{
                return <IonSelectOption value={sector.sector_id}>Sector {sector.sector_id}</IonSelectOption>
              }
            })}
            <IonSelectOption value={-1}>Alle sectors</IonSelectOption>
            {/* <IonSelectOption value={this.state.default_sector}>Default sector</IonSelectOption> */}

          </IonSelect> 
          </IonButton>
          {/* <CustomDropdown list={list} title="Sectors"></CustomDropdown> */}
        </IonCol>
      </IonRow>
      </IonGrid>
    ) 
  }

  renderBasis(){
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Lijst van posten</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            {this.renderButtons()}
          <IonList>
            {this.renderListOfItems()}
          </IonList>
        </IonContent>
      </IonPage>
    );   
  }

  render()
  {
      if(this.props.localStorage != undefined){
        if(this.props.localStorage.posts_sectors <= 0){
          return <div>No interconnection found</div>
        }
        if(this.props.localStorage.posts_sectors.length > 0){
          // return <div>
          //   <IonButton onClick={() => this.addALotMessage()}></IonButton>
          // </div>
          
          return this.renderBasis();
        }
      } else{
        return <div>loading</div>
      }
      
  }
  
};

function mapStateToProps(state: any) {
  return({
    localStorage: state.list.localStorage,
    errorMessage: state.list.errorMessage,
    loading: state.list.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchPosts
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListView);
