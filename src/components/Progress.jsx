import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';
import shortid from 'shortid';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // key:null,
            width: 0,
        }
    }
    componentDidMount() {
        const { id } = this.props
        let width = document.getElementById(id).clientWidth;
        this.setState({ width });
        window.addEventListener('resize', () => this.handleResize());
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }
    handleResize() {
        const { id } = this.props
        let width = document.getElementById(id).clientWidth;
        this.setState({ width })
    }
    render() {
        const { progress, id } = this.props;
        const { width } = this.state;
        let percent = progress ? progress * width : 0
        return (
            <div id={id} className="progress-bg" >
                <Motion defaultStyle={{ width: 0, height: 5 }} style={{ width: spring(percent), height: 5 }}>
                    {interpolatingStyle => <div className="progress" style={interpolatingStyle} />}
                </Motion>
            </ div>
        );
    }
}

export default Progress;