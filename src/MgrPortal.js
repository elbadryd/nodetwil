import React from 'react';
import axios from 'axios';
import EnhancedTable from './components/table'

class MgrPortal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        axios.get('/empData')
        .then(response =>{
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
    }
    render () {
        return (
            <div>
                <h2>this is the manager portal</h2>
                <EnhancedTable />
            </div>
        )
    }
}
export default MgrPortal