import React from 'react';
import Header from '../Header';
import Footer from "../Footer";
import Faq from "../Faq";
import './App.scss';

export default function App() {
  return (
    <>
      {/* @TODO: maybe we can get rid of this `overlay`? */}
      <div id="overlay"/>

      {/* @TODO: maybe we can get rid of this `wrapper` and/or `container`? */}
      <div id="wrapper">
        <div className="container">
          <Header/>
          <section>
            {/*  Here should be the router */}
            <Faq/>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}
