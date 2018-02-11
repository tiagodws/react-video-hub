import React, { Component } from "react";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: "" };
    }

    render() {
        const { onSearchTermChange } = this.props;
        return (
            <div className="search-bar">
                <input
                    type="text"
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)}
                />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;
