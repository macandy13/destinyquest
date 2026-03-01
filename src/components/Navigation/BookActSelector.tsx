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

function isActive(
    current: BookFilter,
    candidate: BookFilter
): boolean {
    if (
        current.type === 'all' &&
        candidate.type === 'all'
    ) {
        return true;
    }
    if (
        current.type === 'book' &&
        candidate.type === 'book'
    ) {
        return current.book === candidate.book;
    }
    if (
        current.type === 'act' &&
        candidate.type === 'act'
    ) {
        return (
            current.book === candidate.book &&
            current.act === candidate.act
        );
    }
    return false;
}

const BookActSelector: React.FC<
    BookActSelectorProps
> = ({ filter, onFilterChange }) => {
    return (
        <div className="book-act-selector">
            <button
                className={`filter-pill ${isActive(filter, { type: 'all' })
                        ? 'active'
                        : ''
                    }`}
                onClick={() =>
                    onFilterChange({ type: 'all' })
                }
            >
                All
            </button>

            {BOOKS.map((bookInfo) => (
                <React.Fragment key={bookInfo.book}>
                    <button
                        className={`filter-pill ${isActive(filter, {
                            type: 'book',
                            book: bookInfo.book
                        })
                                ? 'active'
                                : ''
                            }`}
                        onClick={() =>
                            onFilterChange({
                                type: 'book',
                                book: bookInfo.book
                            })
                        }
                    >
                        📖 {bookInfo.book}
                    </button>

                    {bookInfo.acts.map((act) => (
                        <button
                            key={act}
                            className={`filter-pill ${isActive(filter, {
                                type: 'act',
                                book: bookInfo.book,
                                act
                            })
                                    ? 'active'
                                    : ''
                                }`}
                            onClick={() =>
                                onFilterChange({
                                    type: 'act',
                                    book: bookInfo.book,
                                    act
                                })
                            }
                        >
                            Act {act}
                        </button>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default BookActSelector;
