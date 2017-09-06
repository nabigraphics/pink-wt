import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Masonry from 'react-masonry-component';
import Masonryitem from '../components/Masonryitem';
import axios from 'axios';
class Content extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.MasonryResize = this.MasonryResize.bind(this);
        this.handleLayoutComplete = this.handleLayoutComplete.bind(this);
        this.masonry = null;
        this.state = {
            checked:""
        }
    }
    handleClick() {
        if(this.state.checked == "checked"){
            this.setState({
                checked:""
            })
        }else{
            // this.setState({
            //     checked:"checked"
            // })
        }
    }
    MasonryResize(){
        if(window.innerWidth <= 755 && window.innerWidth > 412){
            this.masonry.options.columnWidth = 180

        }else if(window.innerWidth <= 412 && window.innerWidth > 320){
            this.masonry.options.columnWidth = 170

        }else if(window.innerWidth <= 320){
            this.masonry.options.columnWidth = 140

        }else{
            this.masonry.options.columnWidth = 240
        }
    }
    handleLayoutComplete(dd){
        // console.log(dd);
    }
    componentDidMount(){
        // this.masonry.on('layoutComplete', this.handleLayoutComplete);
        // this.masonry.hide();
        // console.log(this.masonry);
        this.MasonryResize();
        window.addEventListener("resize", this.MasonryResize);
        axios.get('/contents').then((res) => {
            this.props.contentload(res.data);
        })
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.MasonryResize);
    }
    render() {
        const options = {
            columnWidth: 240,
            itemSelector: '.item',
            gutter: 20,
            isFitWidth: true
        }
        return (
            
            <div className="content">
                <Masonry
                ref={ref => this.masonry = this.masonry || ref.masonry}
                className={'content-grid'}
                options={options}
                enableResizableChildren
                updateOnEachImageLoad
                >
                {this.props.content.map((content,i) => { return(
                    <Masonryitem 
                    checked={this.state.checked} 
                    onChecked={this.handleClick} 
                    onDelete={(hash) => {this.props.delete(hash)}}
                    id={i}
                    key={content.hash} 
                    filename={content.filename} 
                    filetype={content.filetype} 
                    hash={content.hash} 
                    thumb={content.thumb} 
                    url={content.url} />
                )})}
                </Masonry>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(typeof(state.files.get('content2')));
    return{
        content:state.files.get('content')
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        contentload:(file) => {dispatch(actions.ContentsManager('load',file))},
        delete:(file) => {dispatch(actions.ContentsManager('delete',file))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Content);