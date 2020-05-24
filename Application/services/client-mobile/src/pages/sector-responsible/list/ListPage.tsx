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
      new_data = this.props.localStorage.posts_data
    }
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

    let distance = Math.sqrt(Math.pow( (list[0].latitude - pos.lat) ,2) + Math.pow( (list[0].longitude - pos.lng) ,2));;
    let selected_element = list[0];
    for(let i = 0; i<list.length; i++){
      let element = list[i];
      let lat = element.latitude;
      let lng = element.longitude;

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
    return selected_element;
  }
 
  async sortDataByBestRoute(){
    const position = await Geolocation.getCurrentPosition();
    let pos = {lat: position.coords.latitude, lng: position.coords.longitude}

    let new_data = this.state.data_posts
    let loop_data_length = this.state.data_posts.length;
    let best_route: any[] = [];


    for(let i = 0; i < loop_data_length; i++){
      let new_shortest = this.getShortest(pos, new_data);
      new_data = new_data.filter((element: any) => {
                    return (element.post_id != new_shortest.post_id)
                  })
      best_route.push(new_shortest);
    }

    this.setState((state, props) => ({
      selected_sort: sort_types.best_route, data_posts: best_route
    }));
  }

  funcSortDataAlphabetical(a: any, b: any){
    if(a.sector_id < b.sector_id){
      if(a.post_id < b.post_id){
        return -1
      } else if(a.post_id > b.post_id){
        return 1
      } else{
        return 0
      }
    
    } else if(a.sector_id > b.sector_id){
      if(a.post_id < b.post_id){
        return -1
      } else if(a.post_id > b.post_id){
        return 1
      } else{
        return 0
      }
    } else{
      if(a.post_id < b.post_id){
        return -1
      } else if(a.post_id > b.post_id){
        return 1
      } else{
        return 0
      }
    }
  }

  sortDataAlphabetical(){
    let new_data = this.state.data_posts
    new_data.sort(this.funcSortDataAlphabetical) 
    this.setState((state, props) => ({
      selected_sort: sort_types.alfabetisch, data_posts: new_data
    }));
  }

  funcSortDistance(currentUserLocation:any) {
    return function(o1: any, o2: any){
      let distance1 = Math.sqrt(Math.pow( (o1.latitude - currentUserLocation.coords.latitude) ,2) +
      Math.pow( (o1.longitude - currentUserLocation.coords.longitude) ,2));
      let distance2 = Math.sqrt(Math.pow( (o2.latitude - currentUserLocation.coords.latitude) ,2) +
      Math.pow( (o2.longitude - currentUserLocation.coords.longitude) ,2));
  
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
    this.setState((state, props) => ({
      selected_sort: sort_types.afstand, data_posts: new_data
    }));
  }

  getSectorColor(sector_id: number){
    let sector_info = this.props.localStorage.posts_sectors.find((element: any) =>{
        return (element.sector_id == sector_id);
    })
    return sector_info.color
}

  renderListOfItems(){
    if(this.state.data_posts.length <= 0){
      let data_default = this.props.localStorage.posts_data.filter((data: any) =>{
        return (data.sector_id == this.props.localStorage.default_sector)
      })
      this.setState({...this.state, data_posts: data_default, default_sector: this.props.localStorage.default_sector, selected_sector: this.props.localStorage.default_sector});
      return data_default.map((data: any, index: number) =>{
        return (
          <ListViewItem {...data} color={this.getSectorColor(data.sector_id)}/>
        )
      })
    } else {
      return this.state.data_posts.map((data: any) =>{
        return (
          <ListViewItem {... data} color={this.getSectorColor(data.sector_id)} />
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

          </IonSelect> 
          </IonButton>
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

  funcSortEdges(a: any, b: any){
    if (a.distance < b.distance)
        return -1;
    if (b.distance < a.distance)
        return 1;
    return 0;
  }

  makeEdges(){
    let data_list:any[] = this.state.data_posts;
    console.log("datalist", data_list);

    let result_list: any[] = [];
      for(let i = 0; i < data_list.length; i++){
        for(let j = i+1; j < data_list.length; j++){
            if(data_list[i] != data_list[j]){
              let distance =  Math.sqrt(Math.pow( (data_list[i].latitude - data_list[j].latitude) ,2) + Math.pow( (data_list[i].longitude - data_list[j].longitude) ,2));
              result_list.push({pos_1: data_list[i], pos_2: data_list[j], distance: distance})
            }
        }
    }
    
    console.log("result_list", result_list);

    result_list.sort(this.funcSortEdges);
    return result_list
  }

  getEdge(edges: any[], shortest_to_current: any){
    for(let i = 0; i < edges.length; i++){
      let edge = edges[i];
      console.log(edge)
      if(edge.pos_1.post_id == shortest_to_current.post_id){
        return edge;
      } else if(edge.pos_2.post_id == shortest_to_current.post_id){
        return edge;
      }
    }
    return []
  }

  addFirstEdgeToRoute(start_post: any, best_route: any[], new_edge: any){
    let post1 = new_edge.pos_1;
    let post2 = new_edge.pos_2;

    if(post1.post_id != start_post.post_id){
      best_route.push(post1)
    }
    if(post2.post_id != start_post.post_id){
      best_route.push(post2)
    }

    return best_route;
  }

  addEdgeToRoute(best_route: any[], new_edge: any){
    let start_post = best_route[0];
    let post1 = new_edge.pos_1;
    let post2 = new_edge.pos_2;

    console.log("post 1 adn 2",post1, post2)

    // to not make a circle: post can't be the first post
    // it also can't be a post already enclosed by two other posts
    if(post1.post_id != start_post.post_id && post2.post_id != start_post.post_id){
      for(let i = 1; i < best_route.length-1; i++){ // check if the post is already enclosed.
        if(post1.post_id == best_route[i].post_id || post2.post_id == best_route[i].post_id){
          return best_route // return without adding it
        }
      }
      // if it's not already enclosed, check if one of the posts is the last one, else you can add them both
      if(post1.post_id == best_route[best_route.length-1].post_id){
        best_route.push(post2)
      } else if(post2.post_id == best_route[best_route.length-1].post_id){
        best_route.push(post1)
      } else{
        best_route.push(post1)
        best_route.push(post2)
      }
    }

    return best_route;
  }



  async getShortestGreedy(){
    try{
      let new_data = this.state.data_posts

      // sorting an array below 1 is useless
      if(new_data.length > 1){ 
        let edges: any[] = this.makeEdges();
        let best_route: any[] = [];

        //  get the post closest to current position
        const position = await Geolocation.getCurrentPosition();
        let pos = {lat: position.coords.latitude, lng: position.coords.longitude}
        let shortest_to_current = this.getShortest(pos, new_data);
        best_route.push(shortest_to_current);

        //get shortest edge including this post, this will be our starting edge
        let start_edge = this.getEdge(edges, shortest_to_current);
        this.addFirstEdgeToRoute(shortest_to_current, best_route, start_edge);
        edges = edges.filter((element: any) =>{return (element.pos_1 != start_edge.pos_1 || element.pos_2 != start_edge.pos_2)}); // remove the edge
        let edges_length: number = edges.length;

        console.log(edges)

        //loop over all the edges, add them one by one, beginning from the shortest
        for(let i = 0; i < edges_length; i++){
          console.log(edges[i])
          this.addEdgeToRoute(best_route, edges[i]) // add the shortest route (if it doesnt make a circle, else it just gets ignored)
          // edges = edges.filter((element: any) =>{return (element.pos_1 == edges[i].pos_1)}); // remove the edge
        }

        console.log("best_route", best_route)
      }
    } catch(error){
      console.log(error)
    }
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
          {this.getShortestGreedy()}
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
