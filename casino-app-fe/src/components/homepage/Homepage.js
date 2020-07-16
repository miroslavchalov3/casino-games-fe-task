import React, { Component } from 'react';
import './Homepage.css';
import games from '../../games-until/games';
import GameWidget from '../game-widget/GameWidget'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTh } from "@fortawesome/free-solid-svg-icons";

class HomePage extends Component {

    // Setting state of component
    state = {
        search: '',
        visibleResult: true,
        activeFilters: false,
        selectedFilter: '',
        filteredTempGames: [],
        activeIndex: null,
        data: games,
        text: {
            slots: "Slots",
            search: "Search",
            new: "New",
            top: "Top",
            all: "All"
        },
    }

    // Filter items by type
    filterItems = (filter) => {
        let filteredGames = [];
        if(filter === "all") {
            this.setState({activeFilters: false})
            this.setState({data: games});
            return;
        }
        games.forEach(item => {
            if(item.type === filter){
                filteredGames.push(item);
            }
        });
        this.setState({activeFilters: true})
        this.setState({data: filteredGames});
        this.setState({filteredTempGames: filteredGames});
    }

    // Apply the search filters on click
    applyFilters = (value) => {
        let currentFilter = value;
        this.search();
        this.filterItems(currentFilter);
    }

    // Setting the search on input change
    handleSearch = (e) => {
        this.setState({search: e.target.value});
    }

    // Search functionality
    search = () => {

        let searchedGames = [];
        this.setState({ data: games }, () => {
            if(this.state.search !== "" && !this.state.activeFilters) {
                this.state.data.filter(item => {
                    if(item.name.toLowerCase().startsWith(this.state.search)){
                        searchedGames.push(item);
                    }
                });
                this.setState({data: searchedGames});
            } 
            else if(this.state.activeFilters) {
                this.state.filteredTempGames.filter(item => {
                    if(item.name.toLowerCase().startsWith(this.state.search)){
                        searchedGames.push(item);
                    }
                });
                this.setState({data: searchedGames});
    
            } else {
                this.setState({data: games});
            }
        }); 
        
    }

    // Searching when you press enter
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.setState({data: games});
          this.search();
       
        }
    }

    // Load default all items by applying filtter
    componentDidMount= () => {
        this.applyFilters("all");
        this.setState({activeIndex: 0});
    }

    render(){
        return(
            <div>
                <header>
                    <nav className="navigation">
                        <div className="title-container">
                            <h1 className="title">{this.state.text.slots} </h1>
                        </div>
                        <div className="filters-container">
                            <div className="icon-container" onClick={() => (this.applyFilters('all'))}>
                                <FontAwesomeIcon className="icons" index={0} icon={faTh} /><span className="icon-text"> {this.state.text.all} </span>
                            </div>
                            <div className="icon-container" onClick={() => (this.applyFilters('new'))}>
                                <FontAwesomeIcon  className="icons" icon={faBookmark}/><span className="icon-text"> {this.state.text.new} </span>
                            </div>
                            <div className="icon-container" onClick={() => (this.applyFilters('top'))}>
                                <FontAwesomeIcon className="icons"  icon={faStar} /><span className="icon-text"> {this.state.text.top} </span>
                            </div>
                        </div>
                        <div className="search-container">
                        <div className="search">
                            <div className="search-input-container">
                                <input type="text" className="search-input"  maxLength="15" value={this.state.search} onChange={this.handleSearch} onKeyDown={this.handleKeyDown} placeholder={this.state.text.search}></input>
                                <FontAwesomeIcon className="search-button" icon={faSearch} onClick={this.search}/>
                            </div>
                        </div>
                        </div>
                    </nav>
                </header>
                <main className="grid">
                {this.state.data ? this.state.data.map(item => {
                return <GameWidget url={item.url} name={item.name} styleClass={item.styleClass} key={item.id}></GameWidget>}) : ""}
                </main>
            </div>
        );
    }
}

export default HomePage;
