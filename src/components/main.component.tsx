import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FeedContainerComponent from './pages/feed-components/feed-container.component';
import ForumContainerComponent from './pages/forum-components/forum-container.component';
import RevatureQuestions from './pages/revature-questions/revature-questions.component';
import LocationQuestions from './pages/location-questions/location-questions.component';
import { LoginComponent } from './pages/login.component/login.component';
import { NavbarComponent } from './navbar.component';
import { RichTextEditorComponent } from './pages/forum-components/rich-text-editor-component/draftjs';

export const MainComponent: React.FC = () => {
    return <div id="main-component">
        <BrowserRouter basename="/revoverflow">
            <main>
                <Switch>
                    <Route exact path="/">
                        <LoginComponent />
                    </Route>
                    <Fragment>
                        <NavbarComponent />
                        <Route exact path="/feed">
                            <FeedContainerComponent />
                        </Route>
                        <Route exact path="/forum">
                            <ForumContainerComponent />
                        </Route>
                        <Route exact path="/question">
                            <RichTextEditorComponent />
                        </Route>
                        <Route exact path="/revature">
                            <RevatureQuestions />
                        </Route>
                        <Route exact path="/location">
                            <LocationQuestions />
                        </Route>
                    </Fragment>
                </Switch>
            </main>
        </BrowserRouter>
    </div>
}