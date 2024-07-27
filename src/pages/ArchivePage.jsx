import React from "react";
import NoteList from "../components/NoteList";
import { useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';
import SearchBar from "../components/SearchBar";
import { getArchivedNotes } from "../utils/api";
import { LocaleConsumer } from "../contexts/LocaleContext";

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }
 
  return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />  
}

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: '',
    }

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();

    this.setState(() => {
      return {
        notes: data,
      }
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      }
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(
        this.state.keyword.toLowerCase()
      );
    });

    return (
      <LocaleConsumer>
        {({ locale }) => (
          <section className="archives-page">
            <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
            <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
            {notes.length === 0 ? (
              <p>{locale === 'id' ? 'Arsip kosong' : 'No archived notes'}</p>
            ) : (
              <NoteList notes={notes} />
            )}
          </section>
        )}
      </LocaleConsumer>
    )
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
}

export default ArchivePageWrapper;