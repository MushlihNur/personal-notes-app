import React from "react";
import { HOME, ARCHIVES, NOTE_DETAIL, ADD_NOTE, LOGIN, REGISTER } from '../constants/routes';
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
import { LocaleProvider } from "../contexts/LocaleContext";
import ToggleLocale from "./ToggleLocale";

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
      },
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          });
        }
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
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state}>
            <div className="app-container">
              <header>
                <h1>
                  <Link to={HOME}>{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
                </h1>
                <ToggleLocale />
                <ToggleTheme />
              </header>
              <main>
                <Routes>
                  <Route path={LOGIN} element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                  <Route path={REGISTER} element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </LocaleProvider>
      )
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
          <div className="app-container">
            <header>
              <h1>
                <Link to={HOME}>{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
              </h1>
              <Navigation />
              <ToggleLocale />
              <ToggleTheme />
              <button onClick={this.onLogout} className="button-logout"><FiLogOut />{this.state.authedUser.name}</button>
            </header>
            <main>
              <Routes>
                <Route path={HOME} element={<HomePageWrapper/>}/>
                <Route path={ARCHIVES} element={<ArchivePageWrapper/>} />
                <Route path={NOTE_DETAIL} element={<DetailPageWrapper/>}/>
                <Route path={ADD_NOTE} element={<AddNotePage />}/>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    )
  }
}

export default PersonalNotesApp