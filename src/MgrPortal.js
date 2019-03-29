import React from 'react';
import axios from 'axios';
import EnhancedTable from './components/table';
import Inputs from './components/smsinput';
import FloatingActionButton from './components/submit';

class MgrPortal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employees: null,
            selectedNumbers: [],
            message: ''
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
    handleChange() {
        //eslint-disable-next-line
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSendSms() {
        const { selectedNumbers, smsContent } = this.state
        if (selectedNumbers.length) {
            let funcs = selectedNumbers.map(number =>{
                return axios.post('/text', {
                    number,
                    smsContent,
                })
            })
            axios.all(funcs)
            .then(res => {
                alert('sms sent successfully')
            })
            .catch(err => {
                alert('something went terribly wrong :(')
                console.log(err)
            })
    }
}
    render () {
        const { employees } = this.state;
        return (
          <div>
            <h2>manager portal</h2>
            <EnhancedTable
              setNumbers={this.setNumbers.bind(this)}
              employees={employees}
            />
            <Inputs handleChange={this.handleChange.bind(this)} />
            <FloatingActionButton
              handleSendSms={this.handleSendSms.bind(this)}
            />
          </div>
        );
    }
}
export default MgrPortal