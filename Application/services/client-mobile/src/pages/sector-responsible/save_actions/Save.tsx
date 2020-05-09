import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import {doDatabase, OfflineItemToggle} from './saveAction'

  

class Save  extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        console.log("save pagte", this.props)
        return (   
            <div>saveActions</div>
        );
    }
}
 
function mapStateToProps(state: any) {
    console.log(state)
    return({
    //   saveState: state.save,
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
    //   doDatabase,
    //   OfflineItemToggle
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Save);
  