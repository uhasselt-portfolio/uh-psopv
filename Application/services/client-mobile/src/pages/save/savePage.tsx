import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {doDatabase} from './saveAction'
import { IonButton } from '@ionic/react';
import {resetActionList, getActionList, addObjectToActionList, setDefaultSector, getDefaultSector, setUserId, getUserId} from './saveFunction'

class Save  extends Component<any> {
    constructor(props: any, storage: Storage) {
        super(props);
        this.handleActions();
        setDefaultSector(1); //TODO USERID
        setUserId(2); //TODO USERID
    }

    


    async handleActions(){
      if(navigator.onLine){
        const list = await getActionList();
        console.log("Handle actions, because we are online", list)
        this.props.doDatabase(list)
      } else{
        console.log("we are offline, so we do nothing")
      }
    }

    render() {
        return (   
          <div>
          </div>
        );
    }
}
 
function mapStateToProps(state: any) {
    return({
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      doDatabase
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Save);
  