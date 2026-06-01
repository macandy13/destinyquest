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

    const handleActChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const act = parseInt(event.target.value, 10);
        if (selectedBook) {
            onFilterChange({ type: 'act', book: selectedBook, act });
        }
    };

    const currentBookInfo = BOOKS.find(book => book.book === selectedBook);

    return (
        <div className="book-act-selector">
            <select className="filter-dropdown" value={selectedBook === '' ? 'all' : selectedBook} onChange={handleBookChange}>
                <option value="all">All</option>
                {BOOKS.map((bookInfo) => (
                    <option key={bookInfo.book} value={bookInfo.book}>
                        📖 {bookInfo.book}
                    </option>
                ))}
            </select>

            {selectedBook && currentBookInfo && (
                <select className="filter-dropdown" value={selectedAct === '' ? 'all' : selectedAct} onChange={handleActChange}>
                    <option value="all">All Acts</option>
                    {currentBookInfo.acts.map((act) => (
                        <option key={act} value={act}>
                            Akt {act}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default BookActSelector;
