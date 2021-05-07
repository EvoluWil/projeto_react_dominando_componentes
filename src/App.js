import React, { Component } from 'react';
import './App.css';
import {VideoList} from "./Components/VideoList";
import {VideoPlayer} from "./Components/VideoPlayer";
import {VideoInline} from "./Components/VideoInline";
import {VideoCinema} from "./Components/VideoCinema";
import {VideoService} from "./Services/VideoService";
import { Channel } from './Services/EventService';

class App extends Component{

  constructor(props){
    super(props);

    this.selectVideo = this.selectVideo.bind(this);
    this.selectContainer = this.selectContainer.bind(this);


    this.inlineVideo = React.createRef();
    this.cinemaVideo = React.createRef();


    this.state = {
      videos: [],
      selectedVideo: {},
      videoContainerElement: this.inlineVideo
    }
  }

  async componentDidMount(){
    const videos = await VideoService.list();
    this.setState({videos});
    Channel.on("video:select", this.selectVideo);
    Channel.on("container:select", this.selectContainer);
  }

  componentWillUnmount(){
    Channel.removeListener("videos:select", this.selectVideo);
    Channel.removeListener("container:select", this.selectContainer);
  }

  selectVideo(video){
    this.setState({
      selectedVideo: video
    })
  }
  selectContainer(){
    const currentElement = this.state.videoContainerElement;
    const newContainer = currentElement === this.inlineVideo ? this.cinemaVideo : this.inlineVideo;
    this.setState({
      videoContainerElement: newContainer
    })
  }
  
  render(){
    const {state} = this
    return(
        <div className="App">
          <VideoPlayer video = {state.selectedVideo} container={state.videoContainerElement.current}/>
          
          <VideoList videos={state.videos}/>
          
          <VideoCinema isActive={state.videoContainerElement === this.cinemaVideo}>
              <div ref={this.cinemaVideo}></div>
          </VideoCinema>

          <VideoInline>
              <div ref={this.inlineVideo}></div>
          </VideoInline>
        </div>
    )
  };
}

export default App;
