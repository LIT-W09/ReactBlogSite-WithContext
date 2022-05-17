import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import ViewBlogPage from "./Pages/ViewBlogPage";
import MostRecent from "./Pages/MostRecent";
import { CommentsContextComponent } from './CommentsContext';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <CommentsContextComponent>
                <Layout>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/page/:page?' component={HomePage} />
                    <Route exact path='/mostrecent' component={MostRecent} />
                    <Route exact path='/admin' component={AdminPage} />
                    <Route exact path='/viewblog/:id' component={ViewBlogPage} />
                </Layout>
            </CommentsContextComponent>
        );
    }
}
