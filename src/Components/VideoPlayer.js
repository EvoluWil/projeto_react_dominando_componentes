import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Channel } from "../Services/EventService";

export class VideoPlayer extends Component{

    constructor(props){
        super(props);

        this.currentTime = 0;

        this.videoElemente = React.createRef();
   
        this.SelectContainer = this.SelectContainer.bind(this)
    
        this.onPlay = this.onPlay.bind(this);
        this.onStop = this.onStop.bind(this);
    }

    SelectContainer(){
        this.onStop();
        Channel.emit("container:select");
    }
    onPlay(){
        this.videoElemente.current.currentTime = this.currentTime
    }
    onStop(){
        this.currentTime = this.videoElemente.current.currentTime;
    }

    componentDidUpdate(prevProps){
        if(this.props.video.url !== prevProps.video.url){
            this.currentTime = 0;
        }
    }

    render(){
        const {video, container} = this.props;
        if(!video.url){
            return "";
        }else if(!container){
            return "carregando";
        }else{
        const element = (
            <div className="video-player">
                <video 
                    src={video.url} 
                    controls
                    autoPlay
                    loop
                    onPlay = {this.onPlay}
                    onPause = {this.onStop}
                    ref={this.videoElemente}
                />
                <button onClick={this.SelectContainer}>[ ]</button>

            </div>
        );
        return ReactDOM.createPortal(element, container)
        }
    }
}