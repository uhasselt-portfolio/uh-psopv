import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './PostView.css';
import { RouteComponentProps } from 'react-router';
import Shift from '../components/Shift';
import { caretDown } from 'ionicons/icons';

const checkboxList = [
  { val: 'Fluo Band', isChecked: false },
  { val: 'Plaatje', isChecked: false },
  { val: 'Michiel', isChecked: false },
  { val: 'Wouter', isChecked: false },
];


const users: UserProps[] = [
  {sector: "1", post: "1", person: "Wouter en Michiel", shift_start:"10:00", shift_end:"23:59", function:"Straat afzetten", street:"Yolostraat 4, 3500 Hasselt"}
]


type UserProps = {
  sector: string,
  post: string,
  person: string,
  shift_start: string,
  shift_end: string,
  function: string,
  street: string
};

interface postProps extends RouteComponentProps<{
  post: string,
  sector: string
}> {}


const PostView: React.FC<postProps> = ({match}) => {
  const [checked, setChecked] = useState(false);
  const [checkListActive, setcheckListActive] = useState(false);

  
  function toggleCheckList(){
    setcheckListActive(!checkListActive);
    console.log(checkListActive);
  }

   const showCheckList = () => {
    if(checkListActive){
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



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sector: {match.params.post} - Post: {match.params.sector}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* shift info  */}
        {users.map((data: UserProps, index: number) => {
            return (
            <Shift
            sector={data.sector}
            post={data.post}
            person={data.person}
            shift_start={data.shift_start}
            shift_end={data.shift_end}
            function={data.function}
            street={data.street}/>)
        })}

        {/* Checkbox */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle onClick={toggleCheckList}>
              CheckList
              <IonIcon class="text_end" icon={caretDown}/>
            </IonCardTitle>
          </IonCardHeader>
          {showCheckList()}
        
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

export default PostView;
