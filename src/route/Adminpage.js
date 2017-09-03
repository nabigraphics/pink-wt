import React, { Component } from 'react';
import FileUpload from '../components/FileUpload';
import Content from '../containers/Content';
class Adminpage extends Component {
    render() {
        return (
            <FileUpload className="app-innerlayout">
                <Content/>
            </FileUpload>
        );
    }
}

export default Adminpage;