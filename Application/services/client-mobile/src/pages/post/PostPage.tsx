import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import './PostPage.css';
import { RouteComponentProps } from 'react-router';
import Shift from '../list/components/Shift';
import { caretDown } from 'ionicons/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchPlanning} from './PostAction'

const checkboxList = [
  { val: 'Fluo Band', isChecked: false },
  { val: 'Plaatje', isChecked: false },
  { val: 'Michiel', isChecked: false },
  { val: 'Wouter', isChecked: false },
];


class PostView extends Component<any> {
  // const [checked, setChecked] = useState(false);
  // const [checkListActive, setcheckListActive] = useState(false);

  state = {
    checkListActive: false
  }
  
  handleToggleCheckList(){
    this.setState({...this.state, checkListActive: !this.state.checkListActive});
  }

  showCheckList = () => {
    if(this.state.checkListActive){
      return(
        <IonCardContent>
        {checkboxList.map(({ val, isChecked }, i) => (
          <IonItem key={i}>
            <IonLabel>{val}</IonLabel>
            <IonCheckbox slot="end" value={val} checked={isChecked} />
          </IonItem>
        ))};
      </IonCardContent>
      )
    } else{
      return <div></div>
    }
  }


  render(){
    console.log(this.props)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sector: {this.props.match.params.post} - Post: {this.props.match.params.sector}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          {/* shift info  */}
          {/* {users.map((data: any, index: number) => {
              return (
                <div> </div>
              // <Shift ... data />)
          )})} */}
  
          {/* Checkbox */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle onClick={() => this.handleToggleCheckList()}>
                CheckList
                <IonIcon class="text_end" icon={caretDown}/>
              </IonCardTitle>
            </IonCardHeader>
          
          </IonCard>
  
          {/* Problemen Log */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                Problemen Log
                <IonIcon/>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Michiel was 4 uur te laat op post
            </IonCardContent>
          
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
}
  

function mapStateToProps(state: any) {
  return({
    arePlanningsFetched: state.contact.arePlanningsFetched,
    errorMessage: state.contact.errorMessage,
    loading: state.contact.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchPlanning
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PostView);