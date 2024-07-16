import React from 'react';
import NoteList from '../components/NoteList';
import { getAllNotes } from '../utils/local-data'
import { FiPlus } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

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
      notes: getAllNotes() || [],
      keyword: '',
    }

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
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
      <section className="homepage">
        <h2>Cacatan Aktif</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler}/>
        {notes.length === 0 ? (
          <p>Tidak ada catatan</p>
        ) : (
          <NoteList notes={notes} />
        )}
        <div className="homepage__action">
          <Link to="/notes/new" className='action'><FiPlus /></Link>
        </div>
      </section>
    )
  }
}

export default HomePageWrapper;