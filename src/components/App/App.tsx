import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Faq from 'pages/Faq';
import styles from './App.module.scss';
import Contacts from 'pages/Contacts';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import QuestList from 'pages/QuestList';
import NotFound from 'pages/NotFound';
import {Routes} from 'enums/Routes';
import Rules from 'pages/Rules';
import Quest from 'pages/Quest';
import {QueryParamProvider} from 'use-query-params';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import appConfig from 'config/appConfig';

export default function App(): JSX.Element {
  return (
    <>
      <div className={styles.wrapper}>
        <BrowserRouter>
          <GoogleReCaptchaProvider reCaptchaKey={appConfig.reCaptchaKey}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Header/>
              <section>
                <Switch>
                  <Route exact path={Routes.Home} component={QuestList}/>
                  <Route exact path={Routes.Faq} component={Faq}/>
                  <Route exact path={Routes.Contacts} component={Contacts}/>
                  <Route exact path={Routes.Rules} component={Rules}/>
                  <Route exact path={Routes.Quest} component={Quest}/>
                  <Route component={NotFound}/>
                </Switch>
              </section>
            </QueryParamProvider>
          </GoogleReCaptchaProvider>
        </BrowserRouter>
      </div>
      <Footer/>
    </>
  );
}
