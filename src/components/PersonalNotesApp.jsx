import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import HomePageWrapper from "../pages/HomePage";
import DetailPageWrapper from "../pages/DetailPage";
import Navigation from "../components/Navigation";
import ArchivePageWrapper from "../pages/ArchivePage";
import AddNotePage from "../pages/AddNotePage";
import NotFoundPage from "../pages/NotFoundPage";
import { getUserLogged, putAccessToken } from "../utils/api";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { FiLogOut } from "react-icons/fi";
import ToggleTheme from "./ToggleTheme";
import { ThemeProvider } from "../contexts/ThemeContext";

class PersonalNotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          };
        })
      }
    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      }
    });
    putAccessToken('');
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={this.state}>
          <div className="app-container">
            <header>
                <h1>
                  <Link to={'/'}>Aplikasi Catatan</Link>
                </h1>
                <ToggleTheme />
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      )
    }

    return (
      <ThemeProvider value={this.state}>
        <div className="app-container">
          <header>
              <h1>
                <Link to={'/'}>Aplikasi Catatan</Link>
              </h1>
              <Navigation />
              <ToggleTheme />
              <button onClick={this.onLogout} className="button-logout"><FiLogOut />{this.state.authedUser.name}</button>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePageWrapper/>}/>
              <Route path="/archives" element={<ArchivePageWrapper/>} />
              <Route path="/notes/:id" element={<DetailPageWrapper/>}/>
              <Route path="/notes/new" element={<AddNotePage />}/>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    )
  }
}

export default PersonalNotesApp