import React from "react";
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonTitle, IonPage, IonContent, IonSlides, IonSlide, IonGrid, IonCol, IonRow, IonBadge } from "@ionic/react";
import { Route, Redirect } from "react-router";
import { notificationsOutline, paperPlaneOutline, warningOutline, notifications, paperPlane, warning } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Notifications from './message/MessagePage'
import SendNotifications from './send_message/SendMessage'
import './messageGeneralePage.css'
import ProblemsPage from "./problems/ProblemsPage";
import { getListLocalStorage } from "../../save/saveFunction";

let swiper: any = null;

const init = async function(this: any) {
    swiper = await this.getSwiper();
};

class MessageGeneral extends React.Component {

    constructor(props: any) {
      super(props);
      this.setAmountMessage();
  }

    state= {
      selected: 0,
      amount_msg: 0,
      amount_problems: 0
    }
  
    async setAmountMessage(){
      let msg = await getListLocalStorage('messages');
      msg = msg.filter((element: any) => {
        return (element.solved == false)
      })
  
      let problems = await getListLocalStorage('problems');
      problems = problems.filter((element: any) => {
        return (element.solved == false)
      })
      this.setState({...this.state, amount_msg: msg.length, amount_problems: problems.length});
    }

    handleSlideChange(){
      this.setState({selected: swiper.activeIndex});
    }

    setSlideIndex(i: number){
      swiper.slideTo(i)
      this.setState({selected: i});
    }
    

    renderSlides(){
      return(
        <IonSlides  onIonSlidesDidLoad={init} pager={true}onIonSlideDidChange={()=> this.handleSlideChange()}>
          <IonSlide className="fullWidth">
            <Notifications />
          </IonSlide>
          <IonSlide className="fullWidth">
            <ProblemsPage />
          </IonSlide>
          <IonSlide className="fullWidth">
            <SendNotifications />
          </IonSlide>
        </IonSlides>
      )
    }

    renderNavBar(){
      let not_icon, pro_icon, send_icon
        if(this.state.selected == 0){
          not_icon = <IonIcon icon={notifications} />
        } else{
          not_icon = <IonIcon icon={notificationsOutline} />
        }
        if(this.state.selected == 1){
          pro_icon = <IonIcon icon={warning} />
        } else{
          pro_icon = <IonIcon icon={warningOutline} />
        }
        if(this.state.selected == 2){
          send_icon = <IonIcon icon={paperPlane} />
        } else{
          send_icon = <IonIcon icon={paperPlaneOutline} />
        }

      return(
        <IonGrid>
          <IonRow>
          <IonCol size="6" className="center">
              <IonTitle>Berichten</IonTitle>
          </IonCol>
          <IonCol size="2" className="center">
            <IonTabButton className="absolute" onClick={() => this.setSlideIndex(0)}>
              <IonBadge color="primary">{this.state.amount_msg}</IonBadge>
              {not_icon}
            </IonTabButton>
          </IonCol>
          <IonCol size="2" className="center">
          <IonTabButton className="absolute" onClick={() => this.setSlideIndex(1)}>
            <IonBadge color="primary">{this.state.amount_problems}</IonBadge>
            {pro_icon}
            </IonTabButton>
          </IonCol>
          <IonCol size="2" className="center">
          <IonTabButton className="absolute" onClick={() => this.setSlideIndex(2)}>
            {send_icon}
            </IonTabButton>
          </IonCol>
          </IonRow>
      </IonGrid>
      )
      
    }
  
    render(){
      return (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                {this.renderNavBar()}
              </IonToolbar>
            </IonHeader>
            <IonContent>
              {this.renderSlides()}
            </IonContent>
          </IonPage>
      )
    }
  }
  
  export default MessageGeneral;