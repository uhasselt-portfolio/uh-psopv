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


class ListView extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  state={
    selected_sector: "1",
    shifts_added: []
  }

  componentDidMount(){
    this.props.fetchPosts();
  }

  handleSectorChange(sector: string){
    this.setState({...this.state, selected_sector: sector});
  }

  renderComponent(shift_id: number){

  }

  renderListOfItems(){
    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.arePlanningsFetched !== undefined){
        if(this.props.arePlanningsFetched.length <= 0){
          return <div> No messages found. </div>
        } else{
          return this.props.arePlanningsFetched.map((data: any, index: number) =>{
            return (
              <ListViewItem {... data}/>
            )
          })
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
              Filter
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton>
              Sort
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
    arePlanningsFetched: state.list.arePlanningsFetched,
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
