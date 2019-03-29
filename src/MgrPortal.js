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
            selectedNumbers.forEach(number =>{
                axios.post('/text', {
                    number,
                    smsContent,
                })
            .then(res => {
                return res.status === 200 ? alert('sms sent successfully') : alert('something went wrong')
            })
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