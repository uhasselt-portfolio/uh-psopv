import React, { Fragment, useState, Component } from 'react';
import './ListPage.css';
import ListViewItem from './components/ListView_Item';
 
import { IonButton, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonSelect,
  IonSelectOption,
  IonRow,
  IonContent, IonGrid, IonCol, withIonLifeCycle } from '@ionic/react';
import { bindActionCreators } from 'redux';
import {fetchPosts} from './ListAction'
import { connect } from 'react-redux';
import { Plugins } from '@capacitor/core';
 
const { Geolocation } = Plugins;
 
const sort_types = {alfabetisch: "alfabetisch", afstand: "afstand", best_route: "beste route"}
 
 
 /**
  * Created by Maria Hendrikx
  * It generates all the different posts
  */
class ListView extends Component<any> {
  constructor(props: any) {
    super(props);  
  }
   
  state={
    selected_sector: -1, //if -1 = selected all sectors
    selected_sort: sort_types.alfabetisch,
    data_posts: this.props.localStorage.posts_data,
    default_sector: this.props.localStorage.default_sector, // -1 = none
  }
 
  async componentDidMount(){
    this.props.fetchPosts();
    this.handleSectorChange(this.props.localStorage.default_sector)
  }
 
  async getCurrentLocation() {
    const position = await Geolocation.getCurrentPosition();
    return position;
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
      this.sortDataByBestRouteGreedy();
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
  
  async sortDataByBestRouteNearestNeighbour(){
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
      if(this.props.localStorage.default_sector !== -1){
        let new_data = this.props.localStorage.posts_data.filter((element: any) => {
          return element.sector_id === this.props.localStorage.default_sector
        })  
 
        return new_data.map((data: any) =>{
          return (
            <ListViewItem {... data} color={this.getSectorColor(data.sector_id)} />
          )
        })   
      }
       
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
          <IonButton className="floatLeft">
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
        <IonButton className="floatRight">
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
 
  async makeEdgesWithCurrentPosition(){
    let data_list:any[] = this.state.data_posts;

    let currentUserLocation = await this.getCurrentLocation();

    let post: any = {
      post_id: -1,
      latitude: currentUserLocation.coords.latitude,
      longitude: currentUserLocation.coords.longitude
    }
    data_list.push(post);
 
    let result_list: any[] = [];
      for(let i = 0; i < data_list.length; i++){
        for(let j = 0; j < data_list.length; j++){
            if(data_list[i].post_id != data_list[j].post_id){
              let distance =  Math.sqrt(Math.pow( (data_list[i].latitude - data_list[j].latitude) ,2) + Math.pow( (data_list[i].longitude - data_list[j].longitude) ,2));
              result_list.push({start_vertex: data_list[i], end_vertex: data_list[j], distance: distance})
            }
        }
    }
      
    return result_list
  }
 
  getEdge(edges: any[], shortest_to_current: any){
    for(let i = 0; i < edges.length; i++){
      let edge = edges[i];
      if(edge.start_vertex.post_id == shortest_to_current.post_id){
        return edge;
      } else if(edge.end_vertex.post_id == shortest_to_current.post_id){
        return edge;
      }
    }
    return []
  }

  async getCurrent(){
      //  get the post closest to current position and add it as first element to the best_route
      const position = await Geolocation.getCurrentPosition();
      let pos = {latitude: position.coords.latitude, longitude: position.coords.longitude}
      return pos;
  }

  checkIfRouteHasCycle(best_route: any[], candidate: any){
    let counter = 0;
    let vertex_route: any = {}

    for(let edge of best_route){
      // if first exists, check where 2 should be
      if("vertex" + edge.start_vertex.post_id in vertex_route &&
            !("vertex" + edge.end_vertex.post_id in vertex_route)){
        vertex_route["vertex" + edge.end_vertex.post_id] = vertex_route["vertex" + edge.start_vertex.post_id]
      }
      // if 2 exists, check where 1 should be
      else if("vertex" + edge.end_vertex.post_id in vertex_route &&
            !("vertex" + edge.start_vertex.post_id in vertex_route)){
        vertex_route["vertex" + edge.start_vertex.post_id] = vertex_route["vertex" + edge.end_vertex.post_id]
      }
      // if none exists
      else if(!("vertex" + edge.end_vertex.post_id in vertex_route) &&
            !("vertex" + edge.start_vertex.post_id in vertex_route)){
        counter++;
        vertex_route["vertex" + edge.start_vertex.post_id] = counter;
        vertex_route["vertex" + edge.end_vertex.post_id] = counter;
      }
      // if both exists
      else {
        vertex_route["vertex" + edge.start_vertex.post_id] = vertex_route["vertex" + edge.end_vertex.post_id];
        let new_counter = vertex_route["vertex" + edge.start_vertex.post_id];
        let old_counter = vertex_route["vertex" + edge.end_vertex.post_id];
        Object.keys(vertex_route).forEach(function (key) { 
          let value = vertex_route[key]
          if(value === old_counter){
            vertex_route[value] = new_counter;
          }
      })
      }
    }

    counter = 0;
    if("vertex" + candidate.start_vertex.post_id in vertex_route){
        counter += 1
    }
    if("vertex" + candidate.end_vertex.post_id in vertex_route){
        counter += 1
    }

    if(counter == 2 && (vertex_route["vertex" + candidate.start_vertex.post_id] !==
        vertex_route["vertex" + candidate.end_vertex.post_id])){
        return false;
    }
    if(counter < 2){
        return false;
    }

    return true;
  }

  getRouteFromEdges(best_route: any){

    // get current location edge
    let route: any[] = [];
    let edge = best_route.find((edge: any) => {return (edge.start_vertex.post_id == -1 || edge.end_vertex.post_id == -1)})

    // get first post
    let post: any;
    let prev_post: any;
    if (edge.start_vertex.post_id == -1){
      post = edge.end_vertex
      prev_post = edge.start_vertex
    } else{
      post = edge.start_vertex
      prev_post = edge.end_vertex
    }
    route.push(post);

    // get route by findind start_vertex that is the same as the end_vertex of the previous
    let route_length = best_route.length;
    for(let i = 0; i < route_length; i++){
      edge = best_route.find((edge: any) => {return ((edge.start_vertex.post_id === post.post_id && edge.end_vertex.post_id !== prev_post.post_id) ||
                                                    (edge.end_vertex.post_id === post.post_id && edge.start_vertex.post_id !== prev_post.post_id))})
      if (edge.start_vertex.post_id == post.post_id){
        post = edge.end_vertex
        prev_post = edge.start_vertex
      } else{
        post = edge.start_vertex
        prev_post = edge.end_vertex
      }

      if(!route.includes(post)){
        route.push(post);
      }
    }

    route = route.filter((post: any) => {return post.post_id !== -1})
    
    return route

  }
  
  async sortDataByBestRouteGreedy(){
    try{
      let new_data = this.state.data_posts
      // sorting an array below 1 is useless
      if(new_data.length > 1){ 
        let cycle_allowed = new_data.length;
        let edges: any[] = await this.makeEdgesWithCurrentPosition();
        edges.sort(this.funcSortEdges);

        let vertex_degrees: any = {};
        let best_route: any[] = [];

        // make vertex hashmap
        for(let candidate of edges){
          vertex_degrees["vertex" + candidate.start_vertex.post_id] = 0;
          vertex_degrees["vertex" + candidate.end_vertex.post_id] = 0;
        }

        // check for all edges if vertex < 2 and if the new edge doesnt make it a cycle
        for(let candidate of edges){
           if(vertex_degrees["vertex" + candidate.start_vertex.post_id] < 2 &&
                vertex_degrees["vertex" + candidate.end_vertex.post_id] < 2){

              if(!this.checkIfRouteHasCycle(best_route, candidate)){
                vertex_degrees["vertex" + candidate.start_vertex.post_id] += 1
                vertex_degrees["vertex" + candidate.end_vertex.post_id] += 1
                best_route.push(candidate);
                
              } else if(best_route.length == cycle_allowed){
                vertex_degrees["vertex" + candidate.start_vertex.post_id] += 1
                vertex_degrees["vertex" + candidate.end_vertex.post_id] += 1
    
                best_route.push(candidate);
              }
            
          }
        }

        new_data = this.getRouteFromEdges(best_route)

        this.setState((state, props) => ({
          selected_sort: sort_types.best_route, data_posts: new_data
        }));
      }
    } catch(error){
      console.log(error)
    }
  }
 
  render()
  {
    console.log(this.state)
      if(this.props.localStorage != undefined){
        if(this.props.localStorage.posts_sectors <= 0){
          return <div> No posts found </div>
        }
        if(this.props.localStorage.posts_sectors.length > 0){
          return this.renderBasis();
        }
      } else{
        return <div>loading...</div>
      }
  }

  ionViewWillEnter() {
    this.props.fetchPosts();
    this.handleSectorChange(this.props.localStorage.default_sector)
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
 
 
export default connect(mapStateToProps, mapDispatchToProps)(withIonLifeCycle(ListView));