import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class SearchBar extends Component {
    render(){
        return(
            <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input className='search-contacts' type="text" placeholder="Search by title or author" onChange={(event) => this.props.searchBooks(event.target.value)}/> 
                </div>
            </div>
        );
    }
}
export default SearchBar