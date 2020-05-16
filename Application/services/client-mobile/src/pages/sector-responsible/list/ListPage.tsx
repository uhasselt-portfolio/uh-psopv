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
import { getDefaultSector } from '../../save/saveFunction';
import CustomDropdown from './components/CustomDropdown';

const sort_types = {alfabetisch: "alfabetisch", afstand: "afstand"}

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

  renderListOfItems(){
    if(this.state.data_posts.length <= 0){
      let data_default = this.props.localStorage.posts_data.filter((data: any) =>{
        return (data.sector_id == this.props.localStorage.default_sector)
      })
      this.setState({...this.state, data_posts: data_default, default_sector: this.props.localStorage.default_sector, selected_sector: this.props.localStorage.default_sector});
      return data_default.map((data: any, index: number) =>{
        return (
          <ListViewItem {...data}/>
        )
      })
    } else {
      return this.state.data_posts.map((data: any, index: number) =>{
        return (
          <ListViewItem {... data}/>
        )
      })
    }  
  }

  
  

   renderButtons(){
    let list: { title: string; subinfo: string; }[] = [];
    this.props.localStorage.posts_sectors.map((element: any) => {
        let item = {title: "Sector " + element, subinfo: ""}
        if(element == this.props.localStorage.default_sector){
           item = {title: "Sector " + element, subinfo: "default"}
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
            </IonSelect>
          </IonButton>
        </IonCol>
        <IonCol>
        <IonButton>
        <IonSelect
          interface="popover"  
          value={this.state.selected_sector} placeholder={"Sector " + this.state.selected_sector} onIonChange={e => this.handleSectorChange(e.detail.value)}>
            {this.props.localStorage.posts_sectors.map((sector: number) => {
              if(this.state.default_sector === sector){
                return <IonSelectOption  value={sector}>Sector {sector}</IonSelectOption>
              } else{
                return <IonSelectOption value={sector}>Sector {sector}</IonSelectOption>

              }
            })}
            <IonSelectOption value={-1}>Alle sectors</IonSelectOption>
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
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {this.renderButtons()}
          <IonList>
            {this.renderListOfItems()}
          </IonList>
        </IonContent>
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
