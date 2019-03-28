import React from 'react';
import axios from 'axios';
import EnhancedTable from './components/table'

class MgrPortal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employees: null,
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8080/empData')
        .then(response =>{
            this.setState({
                employees: response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    render () {
        return (
            <div>
                <h2>manager portal</h2>
                <EnhancedTable employees={this.state.employees}/>
            </div>
        )
    }
}
export default MgrPortal