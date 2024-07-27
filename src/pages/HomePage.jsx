import React from 'react';
import NoteList from '../components/NoteList';
import { FiPlus } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/api';
import { LocaleConsumer } from '../contexts/LocaleContext';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }
 
  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: '',
    }

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data
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
          <section className="homepage">
            <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
            <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
            {notes.length === 0 ? (
              <p>{locale === 'id' ? 'Tidak ada catatan' : 'No notes available'}</p>
            ) : (
              <NoteList notes={notes} />
            )}
            <div className="homepage__action">
              <Link to="/notes/new" className='action'><FiPlus /></Link>
            </div>
          </section>
        )}
      </LocaleConsumer>
    )
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;