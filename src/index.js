import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import _ from "lodash";

import SearchBar from "./components/search-bar";
import VideoList from "./components/video-list";
import VideoDetail from "./components/video-detail";

const YOUTUBE_API_KEY = "AIzaSyB2N3Gtl7LYuzA8QQird2T5czOnbPlwHPE";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: undefined,
        };

        this.onVideoSearch();
    }

    render() {
        const onVideoSearch = _.debounce(term => this.onVideoSearch(term), 400);

        return (
            <div class="container container-fluid">
                <SearchBar onSearchTermChange={term => onVideoSearch(term)} />
                <div class="row">
                    <VideoDetail video={this.state.selectedVideo} />
                    <VideoList
                        onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                        videos={this.state.videos}
                    />
                </div>
            </div>
        );
    }

    onVideoSearch(term) {
        YTSearch({ key: YOUTUBE_API_KEY, term }, videos => {
            this.setState({
                videos,
                selectedVideo: videos[0],
            });
        });
    }
}

ReactDOM.render(<App />, document.querySelector(".container"));
