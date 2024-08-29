import React from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from './pages/posts/PostEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from './pages/profiles/UsernameForm';
import UserPasswordForm from './pages/profiles/PasswordChangeForm';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import ReportCreateForm from './pages/reports/ReportCreateForm';
import ReportsPage from './pages/reports/ReportsPage';
import FullReportDetailsCard from './pages/reports/FullReportDetailsCard';
import ReportEditForm from './pages/reports/ReportEditForm';
import NotFound from './components/NotFound';

function App() {
  // Retrieve the current user's profile ID from the context
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PostsPage message="No results found." />}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Try following someone!"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/profiles/:id/" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route exact path="/reports/create/:id" render={() => <ReportCreateForm />} />
          <Route exact path="/reports/:id/edit" render={() => <ReportEditForm />} />
          <Route exact path="/reports/admin/:id" render={() => <FullReportDetailsCard apiEndpoint="/reports/admin" />} />
          <Route exact path="/reports/admin" render={() => <ReportsPage apiEndpoint="/reports/admin" title="Reports" message="No results found." adminOnly />} />
          <Route exact path="/reports/:id" render={() => <FullReportDetailsCard apiEndpoint="/reports" />} />
          <Route exact path="/reports" render={() => <ReportsPage apiEndpoint="/reports" title="Reports" message="No results found." />} />
          <Route exact path="/not-found" render={() => <NotFound />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
