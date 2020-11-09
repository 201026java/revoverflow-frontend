import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FeedContainerComponent from './pages/feed-components/feed-container.component';
import ForumContainerComponent from './pages/forum-components/forum-container.component';
import { LoginComponent } from './pages/login.component/login.component';
import { NavbarComponent } from './navbar.component';
import { RichTextEditorComponent } from './pages/forum-components/rich-text-editor-component/draftjs';


export const MainComponent: React.FC = () => {
    return <div id="main-component">
        <BrowserRouter>
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

                    </Fragment>
                </Switch>
            </main>
        </BrowserRouter>
    </div>
}