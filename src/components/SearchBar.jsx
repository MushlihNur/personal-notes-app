import React from "react";
import PropTypes from 'prop-types';
import { LocaleConsumer } from "../contexts/LocaleContext";

function SearchBar({ keyword, keywordChange }) {
  return (
    <LocaleConsumer>
      {({ locale }) => (
        <section className="search-bar">
          <input
            type="text"
            placeholder={locale === 'id' ? 'Cari berdasarkan judul ...' : 'Search by title ...'}
            value={keyword}
            onChange={(event) => keywordChange(event.target.value)}
          />
        </section>
      )}
    </LocaleConsumer>
  )
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired
}

export default SearchBar;