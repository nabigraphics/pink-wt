import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Dropzone from 'react-dropzone';
import Header from '../containers/Header';
import Uploadbar from '../containers/Uploadbar';
import { Notipoix3, notipoi } from './react-notipoix3';
import axios from 'axios';

class FileUpload extends Component {
    constructor(props){
        super(props);
        this.dropzoneDrag = this.dropzoneDrag.bind(this);
        this.DropzoneCacheClear = this.DropzoneCacheClear.bind(this);
        this.fileInfoChange = this.fileInfoChange.bind(this);
        this.onDropzone = this.onDropzone.bind(this);
        this.upload = this.upload.bind(this);
        this.upload_percent = this.upload_percent.bind(this);
        this.openDropzone = this.openDropzone.bind(this);
        this.state = {
            isUploading:false,
            isOver:false,
            files:[],
            upload_percent:0
        }
    }
    openDropzone(){
        this.refs.dropzone.open();
    }
    dropzoneDrag(e,status){
        // console.log(e.dataTransfer.types[0]);
        switch(status){
            case "Enter":
                if(e.dataTransfer.types[0] == "Files") this.setState({isOver:true});
            break;
            case "Leave":
                this.setState({isOver:false});
            break;
        }
    }
    onDropzone(accept){
        this.setState({isOver:false});
        if(accept.length > 0){
            if(this.state.isUploading) return;
            this.setState({isUploading:true,upload_percent:0});
            let temp_files = Array();
            Promise.all(accept.map((file,i) => {
                temp_files[i] = new Object();
                temp_files[i].name = file.name;
                temp_files[i].preview = file.preview;
                temp_files[i].progress = 0;
                const file_len = file.name.length;
                const lastdot = file.name.lastIndexOf(".");
                const file_dotcut = file.name.substring(0,lastdot);
                const file_typename = file.name.substring(lastdot,file_len).replace('.',"").toUpperCase();
                temp_files[i].type = file.type.split("/")[0];
                temp_files[i].typename = file_typename;
                if(file_dotcut.length >= 20){
                    temp_files[i].alertname = file_dotcut.substring(0,20) + "..."
                }else{
                    temp_files[i].alertname = file_dotcut;
                }
            })).then(() => {
                this.setState({isUploading:true,files:temp_files});
            }).catch(err => console.log(err));

            //upload notification.
            const upload_queue = "upload_notification_" + new Date();
            const upload_objs = accept.length;
            // notipoi.add('blue',upload_queue, accept.length + "개의 파일 업로드중...");
            Promise.all(accept.map((file,i) => {
                return this.upload(file,i).then((res) => {
                    // console.log(res.data.hash);
                    this.props.contentadd(res.data.hash);
                })
            })).then(() => {
                // notipoi.remove(upload_queue);
                this.setState({isUploading:false});
                notipoi.add('success',upload_queue + "_ok", upload_objs + "개의 파일 업로드 완료!");
            }).catch( err => console.log(err));
        }
    }
    upload(file,i){
        return new Promise((resolve,reject) => {
            // console.log(file);
            const notiobjname = 'fileupload_'+i+file.name + file.size;
            const fdata = new FormData();
            fdata.append("file",file,file.name);
            axios.post('/upload',fdata,{
                onUploadProgress:(progressEvent) => {
                    let percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
                    let temp_files = this.state.files;
                    temp_files[i].progress = percentCompleted;
                    this.setState({files:temp_files});
                    this.upload_percent();
                }
            }).then((res) => {
                resolve({key:notiobjname,data:res.data});
            }).catch( (err) =>{
                reject(err);
            });
        })
    }
    upload_percent(){
        const temp_queue = this.state.files;
        const queuesize = this.state.files.length;
        let size = 0;
        for (let i=0; i<queuesize; i++){
            size += temp_queue[i].progress;
        }
        this.setState({upload_percent:size/queuesize})
    }
    DropzoneCacheClear(){
        this.state.files.map((file,i) => {
            // window.URL.revokeObjectURL(file.preview);
        })
        this.setState({isUploading:false,files:[]});
    }
    fileInfoChange(e,i){
        let temp_files = this.state.files;
        temp_files[i].name = e.target.value;
        this.setState({
            files:temp_files
        })
    }
    componentDidMount(){
    }
    render() {
        return (
            <div className="app-layout">
                <Dropzone
                className="dropzone"
                disableClick
                disablePreview
                onDragEnter={(e) => {this.dropzoneDrag(e,"Enter")}}
                onDragLeave={(e) => {this.dropzoneDrag(e,"Leave")}}
                onDrop={(accept) => {this.onDropzone(accept)}}
                ref="dropzone"
                >
                <div className={"dndzone_bg " + (this.state.isOver ? "active" : "hidden")}>
                    <div className="dndzone">
                        <h1>drag and drop files here.</h1>
                    </div>
                </div>
                <div className={this.props.className} >
                    <Header dropzone={this.openDropzone} />
                    {/* <Notipoix3 position="top-right"/> */}
                    {/* <Notipoix3 position="top-left"/> */}
                    <Notipoix3 position="bottom-left"/>
                    {/* <Notipoix3 position="bottom-right"/> */}
                    {this.props.children}
                    <Uploadbar isUploading={this.state.isUploading} percent={this.state.upload_percent} />
                </div>
                </Dropzone>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        content:state.files.get('content')
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        contentadd:(file) => {dispatch(actions.ContentsManager('add',file))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FileUpload);

