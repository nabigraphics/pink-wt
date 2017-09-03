import React, { Component } from 'react';

class Checkbox extends Component {
    render() {
        return (
            <div className="checkboxcomponent">
                <input checked={this.props.checked} id={this.props.target} type="checkbox" className={this.props.className} />
                <label onClick={this.props.onClick} htmlFor={this.props.target} ></label>
            </div>
        );
    }
}

export default Checkbox;