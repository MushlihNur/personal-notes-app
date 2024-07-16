import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import HomePageWrapper from "../pages/HomePage";
import DetailPageWrapper from "../pages/DetailPage";
import Navigation from "../components/Navigation";
import ArchivePageWrapper from "../pages/ArchivePage";
import AddNotePage from "../pages/AddNotePage";
import NotFoundPage from "../pages/NotFoundPage";

function PersonalNotesApp() {
  return (
    <div className="app-container">
      <header>
          <h1>
            <Link to={'/'}>Aplikasi Catatan</Link>
          </h1>
          <Navigation/>
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
  )
}

export default PersonalNotesApp