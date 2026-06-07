import React from 'react';
import {
    BookFilter,
    BOOKS
} from '../../hooks/useBookFilter';
import './BookActSelector.css';

interface BookActSelectorProps {
    filter: BookFilter;
    onFilterChange: (filter: BookFilter) => void;
}

const BookActSelector: React.FC<
    BookActSelectorProps
> = ({ filter, onFilterChange }) => {
    const selectedBook = filter.type === 'book' || filter.type === 'act' ? filter.book : '';
    const selectedAct = filter.type === 'act' ? filter.act : '';

    const handleBookChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const book = event.target.value;
        if (book === 'all') {
            onFilterChange({ type: 'all' });
        } else {
            onFilterChange({ type: 'book', book });
        }
    };

    const handleActClick = (act: number | 'all') => {
        if (!selectedBook) return;
        if (act === 'all') {
            onFilterChange({ type: 'book', book: selectedBook });
        } else {
            onFilterChange({ type: 'act', book: selectedBook, act });
        }
    };

    const currentBookInfo = BOOKS.find(book => book.book === selectedBook);

    return (
        <div className="book-act-selector">
            <div className="book-selector-wrapper">
                <select className="filter-dropdown" value={selectedBook === '' ? 'all' : selectedBook} onChange={handleBookChange}>
                    <option value="all">All Books</option>
                    {BOOKS.map((bookInfo) => (
                        <option key={bookInfo.book} value={bookInfo.book}>
                            📖 {bookInfo.book}
                        </option>
                    ))}
                </select>
            </div>

            {selectedBook && currentBookInfo && (
                <div className="act-buttons-group">
                    <button
                        type="button"
                        className={`act-btn ${selectedAct === '' ? 'active' : ''}`}
                        onClick={() => handleActClick('all')}
                    >
                        All Acts
                    </button>
                    {currentBookInfo.acts.map((act) => (
                        <button
                            key={act}
                            type="button"
                            className={`act-btn ${selectedAct === act ? 'active' : ''}`}
                            onClick={() => handleActClick(act)}
                        >
                            Act {act}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookActSelector;

