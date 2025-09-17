import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    TextField,
    Button,
} from "@mui/material";

const dummyVideos = [
    { id: 1, title: "Introduction to German Industry", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 2, title: "German Engineering Excellence", src: "https://www.w3schools.com/html/movie.mp4" },
    { id: 3, title: "Future of Manufacturing", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

const VideoPage = () => {
    const [selectedVideo, setSelectedVideo] = useState(dummyVideos[0]);
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");

    const handleComment = () => {
        if (input.trim()) {
            setComments([...comments, input]);
            setInput("");
        }
    };

    return (
       
            <div className="container-fluid pt-3" >
                <div className="row">
                   
                    {/* Main Video Player */}
                    <div className="col-12 col-md-8 mb-4">
                        <div className="mb-3">
                            <video
                                key={selectedVideo.id}
                                src={selectedVideo.src}
                                controls
                                controlsList="nodownload"
                                className="rounded video-player"
                            />
                            <h5 className="mt-2">{selectedVideo.title}</h5>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-3">
                            <h5>Comments</h5>

                            <div className="d-flex gap-2 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Add a comment..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <Button variant="contained" sx={{ textTransform: 'none' }}
                                    color="primary" onClick={handleComment}>
                                    Post
                                </Button>
                            </div>

                            {comments.map((c, i) => (
                                <div
                                    key={i}
                                    className="p-2 mb-2 bg-light rounded"
                                >
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Playlist Section */}
                    <div className="col-12 col-md-4">
                        <h5>Playlist</h5>
                        <ul className="list-group">
                            {dummyVideos.map((video) => (
                                <li key={video.id} className={`list-group-item ${video.id === selectedVideo.id ? "active" : ""} `} >
                                    <button
                                        className={`btn p-0 text-start w-100 border-0 ${video.id === selectedVideo.id ? "text-white" : ""}`}
                                        onClick={() => setSelectedVideo(video)}
                                    >
                                        {video.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
    );
};

export default VideoPage;
