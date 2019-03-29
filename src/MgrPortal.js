import React from 'react';
import axios from 'axios';
import EnhancedTable from './components/table'

class MgrPortal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employees: null,
            selectedNumbers: [],
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
    setNumbers(nums){
        this.setState({
            selectedNumbers: nums
        })
    }
    render () {
        const { employees } = this.state;
        return (
            <div>
                <h2>manager portal</h2>
                <EnhancedTable setNumbers={this.setNumbers.bind(this)} employees={employees}/>
            </div>
        )
    }
}
export default MgrPortal