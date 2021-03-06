import axios from 'axios';
import React, { Component } from 'react';
import DoughnutChart from './chart/DoughnutChart';
import { Form, Row, Col } from 'react-bootstrap';

class WithdrawReasonChart extends Component {
    state = {
        title: '년 탈퇴 사유',
        data: [],
        selected:'',
        label:[]
    }

    handleChange = (e) => {
        this.setState({
            selected:e.target.value
        })
    }

    getData = async () => {
        const {selected}=this.state;
        try {

            const response = await axios.get(`/usersAnalysis/user/withdrawReasons/${selected}`);
            
            const data=response.data.withdrawReasons.map(d=>d[1]);
            
            this.setState({
                data
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        const reasons=this.props.code.map(c=>c.content);
        const size=Object.keys(reasons).length;
        const data=this.props.data.map(d=>d[1]);
        console.log(data);
        this.setState({
            data,
            selected:this.props.select[0],
            label:reasons,
            size:size
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected && prevState.selected !== this.state.selected) {
            this.getData();
        }
    }

    render() {
        const {selected,data,title,label}=this.state;
        const yearOp=this.props.select.map(y=>(<option key={y} value={y}>{y}</option>));
        return (
            <div>
                <Form.Group as={Row} className="ml-4">
                    <Col sm="3">
                        <Form.Control as="select"value={selected} onChange={this.handleChange}>
                        {yearOp}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}></Form.Group>
                {data.length > 0 && <DoughnutChart data={data} title={title} label={label} selected={selected} />}
            </div>
        );
    }
}



export default WithdrawReasonChart;
