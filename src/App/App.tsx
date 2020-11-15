import React from 'react';
import Header from '../Header';
import Footer from "../Footer";
import Faq from "../Faq";
import './App.scss';
import Contacts from "../Contacts";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import QuestList from "../QuestList";
import NotFound from "../NotFound";
import {Routes} from "./Routes";

export default function App() {
  return (
    <>
      {/* @TODO: maybe we can get rid of this `wrapper` and/or `container`? */}
      <div id="wrapper">
        <div className="container">
          <BrowserRouter>
            <Header/>
            <section>
              <Switch>
                <Route exact path={Routes.Home} component={QuestList}/>
                <Route exact path={Routes.Faq} component={Faq}/>
                <Route exact path={Routes.Contacts} component={Contacts}/>
                <Route component={NotFound}/>
              </Switch>
            </section>
          </BrowserRouter>
        </div>
      </div>
      <Footer/>
    </>
  );
}
