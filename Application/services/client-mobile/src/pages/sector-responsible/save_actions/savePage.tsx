import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {doDatabase, OfflineItemToggle} from './saveAction'
import { IonButton } from '@ionic/react';

  

class Save  extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    handleActions(){
      if(navigator.onLine){
        console.log("Handle actions, because we are online")
        this.props.doDatabase(this.props.saveState)
      } else{
        console.log("we are offline, so we do nothing")
      }
    }

    render() {
        console.log("save pagte", this.props)
        // {this.handleActions()}
        return (   
          <div>
            <IonButton onClick={() => this.handleActions()}>saveActions</IonButton>
          </div>
        );
    }
}
 
function mapStateToProps(state: any) {
  console.log(state)
    return({
      saveState: state.save,
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      doDatabase,
      OfflineItemToggle
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Save);
  