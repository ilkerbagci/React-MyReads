import React, { Component } from "react"

class Book extends Component {
    render() {
        const book = this.props.book

        //Control if book's bg image is exist or not
        let isBookImageExist = true
        if (typeof book.imageLinks === 'undefined') {
            isBookImageExist = false
        }    
        return (
            <div>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128, height: 188, backgroundImage: isBookImageExist
                                ? `url(${book.imageLinks.thumbnail})`
                                : null
                        }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select defaultValue={book.shelf} onChange={(event) => this.props.onShelfSelectionChanged(event, book)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors !== undefined ? book.authors : 'No Author'}</div>
                </div>
            </div>
        )
    }
}
export default Book