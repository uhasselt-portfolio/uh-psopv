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
  IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonGrid, IonCol } from '@ionic/react';
import { bindActionCreators } from 'redux';
import {fetchPosts} from './ListAction'
import { connect } from 'react-redux';

const sort_types = {alfabetisch: "alfabetisch", afstand: "afstand"}

class ListView extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  state={
    selected_sector: "1",
    selected_sort: sort_types.alfabetisch,
    shifts_added: [],
    data: null
  }

  componentDidMount(){
    this.props.fetchPosts();
  }

  handleSectorChange(sector: string){
    this.setState({...this.state, selected_sector: sector});
  }

  handleSortChange(sort: string){
    if (sort === sort_types.alfabetisch){
      this.sortDataAlphabetical();
    }


    console.log(this.state)
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
    let new_data = this.state.data
    new_data.sort(this.funcSortDataAlphabetical)  
  

    this.setState({...this.state, selected_sort: sort_types.alfabetisch, data: this.props.arePostsFetched});
  }

  renderListOfItems(){
    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.arePostsFetched !== undefined){
        if(this.props.arePostsFetched.length <= 0){
          return <div> No messages found. </div>
        } else{
          if(this.state.data === null){
            this.setState({...this.state, data: this.props.arePostsFetched});
            return this.props.arePostsFetched.map((data: any, index: number) =>{
              return (
                <ListViewItem {... data}/>
              )
            })
          } else {
            return this.state.data.map((data: any, index: number) =>{
              return (
                <ListViewItem {... data}/>
              )
            })
          }

          
        }
      }
    }
  }

  render()
  {
    let plannings = this.props.arePlanningsFetched
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
  
  
      {/*-- Buttons --*/}
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
                value={this.state.selected_sector} placeholder={this.state.selected_sector} onIonChange={e => this.handleSectorChange(e.detail.value)}>
                <IonSelectOption value="1">Sector 1</IonSelectOption>
                <IonSelectOption value="2">Sector 2</IonSelectOption>
              </IonSelect>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
        
        
  
      {/*-- List of Post Items --*/}
      <IonList>
        {this.renderListOfItems()}
      </IonList>
    </IonContent>
          
        </IonContent>
      </IonPage>
    );
  }
  
};

function mapStateToProps(state: any) {
  return({
    arePostsFetched: state.list.arePostsFetched,
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
