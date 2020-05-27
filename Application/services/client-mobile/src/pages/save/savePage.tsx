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
        this.props.doDatabase()
      } else{
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
  