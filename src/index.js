import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";
import { PopularPostDataProvider } from "./contexts/PopularPostDataContext";
import { SuccessAlertProvider } from "./contexts/SuccessAlertContext";

ReactDOM.render(
    <Router>
      <CurrentUserProvider>
        {/* CurrentUserProvider provides current user context to child elements */}
        <ProfileDataProvider>
           {/* ProfileDataProvider provides the profile data context to its children */}
          <PopularPostDataProvider>
            {/* PopularPostDataProvider provides popular post data context to its children */}
            <SuccessAlertProvider>
              {/* SuccessAlertProvider provides success alert context to its children */}
              <App />
            </SuccessAlertProvider>
          </PopularPostDataProvider>
        </ProfileDataProvider>
      </CurrentUserProvider>
    </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
