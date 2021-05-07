import { Channel } from "../Services/EventService";


export function VideoList(props){
    const videos = props.videos || [];

    function handleClick(video){
        Channel.emit("video:select", video)
    }

    return (
        <ul className="video-list">
            {
                videos.map(video =>  (
                    <li onClick={handleClick.bind(this, video)} key={video.id} className="video">
                        <img src={video.img} alt={video.name}/>
                        <div>{video.name}</div>
                    </li>))
            }
        </ul>
    )
}