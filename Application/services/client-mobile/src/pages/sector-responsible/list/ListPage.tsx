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

const sort_types = {alfabetisch: "alfa", afstand: "afstand"}

class ListView extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  state={
    selected_sector: -1, //if -1 = selected all sectors
    selected_sort: sort_types.alfabetisch,
    data_posts: []
  }

  componentDidMount(){
    this.props.fetchPosts();
  }

  handleSectorChange(sector: number){
    let new_data
    if(sector !== -1){
      new_data = this.props.arePostsFetched.posts_data.filter((element: any) => {
        return element.sector_id === sector
      })     
    }else{
      new_data = this.props.arePostsFetched.posts_data
    }
   
    this.setState({...this.state, selected_sector: sector, data_posts: new_data});
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
      this.setState({...this.state, data_posts: this.props.localState.posts_data});
      return this.props.localState.posts_data.map((data: any, index: number) =>{
        return (
          <ListViewItem {... data}/>
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
                {this.props.localState.posts_sectors.map((sector: number) => {
                    return <IonSelectOption value={sector}>Sector {sector}</IonSelectOption>
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
    console.log(this.props)
    // if(this.props.localState.posts_sectors.length > 0){
      if(this.props.localState.posts_sectors.length <= 0){
        return <div>No interconnection found</div>
      }
      if(this.props.localState.posts_sectors.length > 0){
        return this.renderBasis();
      }

    // } else{
    //   if(this.props.loading == true){
    //     return <div>Loading...</div>
    //   } else {
    //     if(this.props.arePostsFetched !== undefined){
    //       if(this.props.localState.posts_data.length <= 0){
    //         return <div> No messages found. </div>
    //       } else{
    //         return this.renderBasis();
    //       }
    //     } else{
    //       return <div></div>
    //     }
    //   }
    // }
  }
  
};

function mapStateToProps(state: any) {
  console.log(state)
  return({
    localState: state.list.localState,
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
