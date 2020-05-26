import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {doDatabase} from './saveAction'
import { IonButton } from '@ionic/react';
import {resetActionList, getActionList, addObjectToActionList, setDefaultSector, getDefaultSector} from './saveFunction'
import Auth from '../../utils/Auth';

class Save  extends Component<any> {
    async handleActions(){
      if(navigator.onLine){
        console.log("Handle actions, because we are online")
        this.props.doDatabase()
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
  