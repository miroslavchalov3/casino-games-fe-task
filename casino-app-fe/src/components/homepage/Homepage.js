import React, { Component } from 'react';
import './Homepage.css';
import games from '../../games-until/games';
import GameWidget from '../game-widget/GameWidget'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

class HomePage extends Component {

    state = {
        search: '',
        visibleResult: true,
        activeFilters: false,
        filteredTempGames: [],
        data: games,
        text: {
            slots: "Slots",
            search: "Search"
        },
    }

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


    applyFilters = (e) => {
        let currentFilter = e.target.value;
        this.filterItems(currentFilter);
    }

    handleSearch = (e) => {
        this.setState({search: e.target.value});
    }

    search = () => {
        let searchedGames = [];
        
        if(this.state.search != "" && !this.state.activeFilters) {
            this.state.data.filter(item => {
                if(item.name.toLowerCase().startsWith(this.state.search)){
                    searchedGames.push(item);
                }
            });
            this.setState({data: searchedGames});
            return;
        } 
        else if(this.state.activeFilters === true) {
            this.state.filteredTempGames.filter(item => {
                if(item.name.toLowerCase().startsWith(this.state.search)){
                    searchedGames.push(item);
                }
            });
            this.setState({data: searchedGames});

        } else {
            this.setState({data: games});
        }
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.search();
        }
    }

    render(){
        return(
            <div>
                <header>
                    <nav>
                        <div className="title-container">
                            <h1>{this.state.text.slots} </h1>
                        </div>
                        <div className="filters-container">
                            <FontAwesomeIcon icon={faBookmark} />
                            <button onClick={this.applyFilters} value="all">all</button>
                            <button onClick={this.applyFilters} value="new">new</button>
                            <button onClick={this.applyFilters} value="top">top</button>
                        </div>
                        <div className="search-container">
                        <div className="search">
                            <input type="text" className="search" value={this.state.search} onChange={this.handleSearch} onKeyDown={this.handleKeyDown} placeholder={this.state.text.search}></input>
                            <button onClick={this.search}>test</button>
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
