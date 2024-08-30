# MemoVault

![Mock Up Image](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/mock-up.png)



MemoVault is a social media app built with the React library, offering a wide range of user actions. Users can create and edit posts, follow or unfollow other profiles, like or unlike posts and comments, and delete content. They can also update their profiles, including username, password, and other details. Additionally, the app allows users to report posts and manage their reports. Admins are provided with tools to efficiently manage and review reported content.


This is the repository for the React frontend of Memovault, a project that integrates with a Django Rest Framework web API. You can find the corresponding backend repository [here](https://github.com/devnickocodes/memovault-api).


Live link for the app can be found [here](https://memovault-app-47c80676a966.herokuapp.com/)

## Table of contents

- [MemoVault](#memovault)
  * [Table of contents](#table-of-contents)
  * [User Stories](#user-stories)
    + [User](#user)
    + [Admin](#admin)
  * [Agile Development](#agile-development)
  * [Color Scheme](#color-scheme)
  * [Typography](#typography)
  * [Wireframes](#wireframes)
  * [Features](#features)
    + [Existing Features](#existing-features)
  * [Re-use of Components](#re-use-of-components)
  * [Future Feautres](#future-feautres)
    + [State Synchronisation](#state-synchronisation)
    + [Notifications](#notifications)
    + [Search and Discovery Enhancements](#search-and-discovery-enhancements)
    + [UI/UX Refinements](#ui-ux-refinements)
    + [Security and Account Management](#security-and-account-management)
    + [Direct Messaging](#direct-messaging)
    + [Username Length Restriction](#username-length-restriction)
    + [Improve Features according to Google DevTools' Lighthouse](#improve-features-according-to-google-devtools--lighthouse)
    + [Display Popular Posts on small screens](#display-popular-posts-on-small-screens)
  * [Frameworks, libraries and dependencies](#frameworks--libraries-and-dependencies)
    + [React-Infinite-Scroll-Component](#react-infinite-scroll-component)
    + [React-Router-DOM](#react-router-dom)
    + [ReactDOM](#reactdom)
    + [Axios](#axios)
    + [React Bootstrap](#react-bootstrap)
    + [JWT-Decode](#jwt-decode)
    + [React-Scroll-To-Top](#react-scroll-to-top)
  * [Hooks](#hooks)
  * [Testing](#testing)
  * [Deployment](#deployment)
    + [How to Fork](#how-to-fork)
    + [How to Clone](#how-to-clone)
    + [Deployment on Heroku](#deployment-on-heroku)
  * [Credits](#credits)
  * [Acknowledgements](#acknowledgements)


Table of contents generated with [markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

## User Stories

### User

- As a New Site User I can sign up to the website so that I can receive all benefits of the website
- As a New Site User I can fill in the registration form so that I can create my account
- As a Site User I can see appropriate error messages if my login attempt fails so that I can take corrective actions
- As a Site User I can see the navbar from each page of the website so that I can navigate through the pages seamlessly
- As a Site User I can see my login status in the navigation bar so that I know if I am logged in or out
- As a Site User I can add a post so that I can contribute to the community
- As a Site User I can delete my own posts so that I can maintain control over my content
- As a Site User I can edit my own posts so that I can fix typos or update outdated posts
- As a Site User I can click on a post so that I can see the full details of the post
- As a Site User I can like or unlike a post so that I can show appreciation for the content or retract my appreciation if I change my mind
- As a Site User I can keep scrolling through the posts that are loaded automatically so that I can have a more seamless transition to older posts
- As a Site User I can click on the 'Feed' tab so that I can see posts by people I am following
- As a Site User I can search for posts using keywords so that I can easily find posts that I am interested in
- As a Site User I can click on the profile image or username of the owner of a post so that I can see their profile and learn more about them
- As a Site User I can comment on a post so that I can share my thoughts and be a part of the conversation
- As a Site User I can delete my own comments so that I can maintain control over my content
- As a Site User I can like comments so that I can show appreciation for the content or retract my appreciation if I change my mind
- As a Site User I can report a post so that I can alert the administrators about inappropriate content
- As a Site User I can see all my reports so that I can keep track of the reported content or in case I want to delete or edit a report
- As a Site User I can delete a report I have created so that I can remove reports that are no longer relevant or were submitted in error
- As a site User I can edit my own reports so that I can correct any information in my reports to ensure they accurately reflect my concerns
- As a Site User I can click on the profile image or username of the owner of a comment so that I can see their profile and learn more about them
- As a Site User I can log out of the website so that I can protect my account from unauthorized access
- As a Site User I can click on the posts title in the report so that I can be redirected to the reported post
- As a Site User I can see other users' profiles so that I can learn more about them
- As a Site User I can see the most followed profiles and profiles with the most posts so that I can see the most popular profiles and the most active profiles
- As a Site User I can see all the posts by a user when I visit their profile so that I can see their contributions
- As a Site User I can follow/unfollow users so that I can receive updates only from users whose content interests me
- As a Site User I can edit my profile so that I can keep my profile information up-to-date
- As a Site User I can change my username and/or password so that I can customize my display name and keep my profile secure
- As a Site User I can read comments under the posts so that I can see other user's opinions on a given post
- As a Site User I can keep scrolling through the comments that are loaded automatically so that I can read all the comments
- As a Site User I can see the top three posts with most likes so that I can see the most popular posts
- As a Site User I can scroll back to the top of the page easily so that I can quickly navigate back to the top
- As a Site User I can choose to log in with my email so that I can use a method that I prefer
- As a New Site User I can verify my email address so that I can activate my account
- As a Site User I can search for profiles based on username and hobbies so that I can quickly find relevant profiles to me



### Admin 

- As a Site Admin I can delete a post so that I can monitor the content of the website
- As a Site Admin I can delete comments so that I can remove inappropriate or spam comments.
- As a Site User I can edit my own comments so that I can fix any potential typos or change of mind
- As a Site Admin I can see all reports so that I can take necessary corrective actions
- As a Site Admin I can delete a report so that I can remove reports that have already been taken care of


## Agile Development 

[GitHub Projects](https://github.com/users/devnickocodes/projects/9/views/1) was used as one of the main Agile tools for the development of this project. The process was tracked using a Kanban board, utilising the "To Do", "In Progress" and "Done" columns.


![Project Board](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/project_board.png)


Another Agile tool that was used in the making of this project is GitHub Issues where I used a custom made user story template to create all of the user stories.

- **Closed Issues**

![Closed Issues 1](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/closed_issues_1.png)

![Closed Issues 2](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/closed_issues_2.png)

- **Open Issues**

![Open Issues](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/open_issues.png) 


## Color Scheme

MemoVault is designed with a vibrant and cohesive color palette that enhances the overall user experience and visual appeal. The selected colors bring a modern and engaging feel to the app, ensuring a consistent and enjoyable interface across features.


I have used [Coolors.co](https://coolors.co/9b22b9-808080-5e35b1-bfcde0-ae4eee-292727-fc3434-6c63ff-6a1b9a-d0f5d8) to create a showcase for the color scheme of the app.


![Color Palette](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/colors.png)


## Typography 

MemoVault utilizes the Nunito font, chosen for its clean and modern appearance. This font provides a friendly and approachable aesthetic, ensuring readability while complementing the app's vibrant design.


The font can be found [here](https://fonts.google.com/specimen/Nunito)


![Typography](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/google_font.png)


## Wireframes


I used [Balsamiq's Website](https://balsamiq.com/) to create the wireframes for the app.


- **Home Page Wireframe (signed out)**

![Home Page Wireframe (signed out)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/homepage_signed_out_wireframe.png)


- **Home Page Wireframe (signed in)**

![Home Page Wireframe (signed in)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/homepage_signed_in_wireframe.png)


- **Sign In Page Wireframe**

![Sign In Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/sign_in_page_wireframe.png)



- **Sign Up Page Wireframe**

![Sign Up Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/sign_up_page_wireframe.png)


- **Feed Page Wireframe**

![Feed Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/feed_page_wireframe.png)


- **Reports Page Wireframe**

![Reports Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/reports_page_wireframe.png)


- **Post Page With Comments Wireframe (includes a create / edit comments form)**

![Post Page With Comments Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/post_page_with_comments_page_wireframe.png)



- **Profile Page Wireframe**

![Profile Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/profile_page_wireframe.png)



- **Post Create Form Page Wireframe**

![Post Create Form Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/post_create_form_page_wireframe.png)


- **Post Edit Form Page Wireframe**

![Post Edit Form Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/post_edit_form_page_wireframe.png)



- **Report Create / Edit Form Page Wireframe**

![Report Create / Edit Form Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/report_create_edit_form_page_wireframe.png)



- **Profile Edit Form Page Wireframe**

![Profile Edit Form Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/profile_edit_form_page_wireframe.png)




- **Change Username Form Page Wireframe**

![Change Username Form Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/change_username_form_page_wireframe.png)



- **Change Password Form Page Wireframe**

![Change UsernPasswordame Form Page Wireframe](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/change_password_form_page_wireframe.png)




## Features 

### Existing Features


- **NavBar (Signed Out)**

    - The navbar can be seen on every page of the website it includes the logo which navigates the user to the homepage as well as links to:
    Home - Navigates the user to the homepage.
    Sign Up - Navigates users to a page with the sign up form 
    Sign In - Navigates users to a page with the sign in form 


![NavBar (Signed Out)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/navbar-signed-out.png)


- **Sign In Page**

    - The user can sign in to the app by providing their username nad password.

![Sign In Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/sign-in-page.png)

- **Sign In Page Link**

    - The user can create an account if they haven't got one by clicking on the sign up link.

![Sign In Page Link](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/sign-in-page-link.png)

- **Sign In Success Message**

    - After successfully signing in, users are presented with a success message indicating that they have been logged in to their account.

![Sign In Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/sign-in-success.png)


- **Sign Up Page**

    - The user can sign up to the app by providing a username, a password and a confirm password after which the user is redirected to the log in page.

![Sign Up Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/sign-up-page.png)



- **Sign Up Page Link**

    - The user can log into their account if they have got one by clicking on the sign in link.

![Sign Up Page Link](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/sign-up-page-link.png)



- **Sign Up Success Message**

    - After successfully signing up, users are presented with a success message indicating that their account has been created.

![Sign Up Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/sign-up-success.png)


- **NavBar (Signed In)**

    - The navbar can be seen on every page of the website it includes the logo which navigates the user to the homepage as well as links to: 
    Home - Navigates the user to the homepage.  
    Add Post - It navigates the user to post creation form page.  
    Feed - Navigates the user to a page with posts created by users that they follow.  
    Reports - The URL for this page changes depending on if the user is admin or not. For non admins it navigates the user to a page with report previews for reports that they have created.  
    For admin users it navigates them to a page with report previews for all reports created. 
    Profile - Navigates the user to their profile page.
    Sign Out - Allows the users to sign out.

![NavBar (Signed In)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/navbar-signed-in.png)


- **Add Post Page**

    - The user can fill out the form so that the post ca be created.

![Add Post Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/add-post-page.png)


- **Add Post Page Success Message**

    - After successful post creation, users are presented with a success message indicating their post has been created.

![Add Post Page Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/add-post-page-success.png)


- **Sign Out Confirmation Modal**

    - When a user attempts to sign out, the modal prompts them to confirm their decision, ensuring that they don't unintentionally leave their session. 


![Sign Out Confirmation Modal](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/sign-out-modal.png)


- **Sign Out Success Message**

    - After successfully signing out, users are presented with a success message indicating that they have been logged out of their account.

![Sign Out Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/sign-out-success.png)


- **Landing Page**

    - The landing page consists of a search bar, list of uploaded posts utilising infinity scroll component, popular profiles, top creators and popular posts. 

 ![Landing Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/homepage.png)


- **Landing Page (No results)**

    - If there are no posts uploaded there is a "No results found" message under the search bar

![Landing Page (No results)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/homepage-no-results.png)


- **Search Bar**

    - The search bar allows the users to search for posts by title or by author's username.


![Search Bar](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/search-bar.png)



- **Search Bar (No Results)**

    - In case nothing is found the user is met with a "No results found" message.

![Search Bar (No results)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/homepage-no-results.png)


- **Post (Not Owner)**

    - The post includes the profile picture of the owner as well as their username, both are clickable and will navigate the user to the profile page of the owner. It also includes the date when it was posted, the image, title, content, number of likes, number of comments and a report flag.

![Post (Not Owner)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/landing-page-post-not-owner.png)


- **Post (Owner)**

    - The post includes all the functionality except the report flag as users cannot report their own posts.


![Post (Owner)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/landing-page-post-owner.png)


- **Post Options Toggle (Owner)**

    - The owner of the post is provided with two options one for edit and one for delete.


![Post Options Toggle (Owner)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/edit-delete-togle.png)


- **Post Options Toggle (Admin)**

    - The admin is provided with the option to delete the post


![Post Options Toggle (Admin)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/delete-togle.png)



- **Delete a Post**


    - When the user clicks on the delete button a modal prompts them to confirm their decision, ensuring that they don't unintentionally delete their post. 



![Delete a Post](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/delete-post-modal.png)




- **Delete a Post Success Message**

    - After successful deletion, users are presented with a success message indicating the post has been deleted.


![Delete a Post Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/post-delete-success.png)


- **Edit a Post**

    - When the user clicks on the edit button they are navigated to the post edit form page.

![Edit a Post](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/edit-post-page.png)



- **Edit a Post Success Message**

    - After a successful edit, users are presented with a success message indicating the post has been updated.


![Edit a Post Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/post-update-success.png)



- **Likes (Signed out)**

    - The user needs to sign in, in order to like posts and an appropriate message is displayed, when the user clicks on the heart icon they are navigated to the sign in page.

![Likes (Signed out)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/log-in-to-like.png)



- **Likes (Signed in, owner)**

    - Users cannot like their own posts and an appropriate message is displayed.

![Likes (Signed in, owner)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/cant-like-own-post.png)



- **Likes (Signed in / Not Active)**

    - When the post hasn't been liked by the user.

![Likes (Signed in / Not Active)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/like-non-active.png)


- **Likes (Signed in / Active)**

    - When the post has been liked by the user

![Likes (Signed in / Active)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/like-active.png)



- **Like Success Message**

    - After successful like, users are presented with a success message indicating they have liked the post


![Like Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/post-like-success.png)


- **Unlike Success Message**

    - After successful unlike, users are presented with a success message indicating they have unliked the post


![Unlike Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/post-unlike-success.png)


- **Comment Icon**

    - When the user clicks on the comment icon they are navigated to the post's individual page.

![Comment Icon](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/like-non-active.png)


- **Report Flag Icon**

    - The user can choose to report a given post by clicking the flag icon, after which the user will be navigated to the report create form page.

![Report Flag Icon](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/report-create.png)



- **Report Create Form Success Message**

    - After a successful completion of the form, users are presented with a success message indicating the report have been submitted and are navigated to the full report card page.


![Report Create Form Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/report-create-success.png)


- **Popular Profiles (Signed Out)**

    - The three most followed profiles are displayed here. Clicking on the profile picture will navigate the user to the profile's page.


![Popular Profiles (Signed Out)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/popular-profiles-logged-out.png)


- **Top Creators (Signed Out)**

    - The three profiles with the most posts are displayed here. Clicking on the profile picture will navigate the user to the profile's page.


![Top Creators (Signed Out)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/top-creators-logged-out.png)


- **Popular Posts**

    - The three posts with most likes are displayed here. Clicking on the profile picture will navigate the user to the profile's page and clicking on the post image will navigate the user to the post's individual page.


![Popular Posts](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/popular-posts.png)



- **Popular Profiles (Signed In)**

    - The three most followed profiles are displayed here. Clicking on the profile picture will navigate the user to the profile's page. Follow and Unfollow functionality is included here in the form of follow / unfollow buttons depending if the user is following the profile.


![Popular Profiles (Signed In)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/popular-profiles-logged-in.png)



- **Top Creators (Signed In)**

    - The three profiles with the most posts are displayed here. Clicking on the profile picture will navigate the user to the profile's page. Follow and Unfollow functionality is included here in the form of follow / unfollow buttons depending if the user is following the profile.

![Top Creators (Signed In)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/top-creators-logged-in.png)



- **Feed Page**


    - The contents for the feed page are similar to the landing page with the difference being the loaded posts are only posts by people who are followed by the requesting user.


![Feed Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/feed-page.png)




- **Feed Page (No Results)**


    - If the user hasn't followed anyone there will be a "Not Found" image and a text saying "No results found. Try following someone!", prompting the user to follow other profiles to start accumulating posts in their Feed page.

![Feed Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/feed-no-posts.png)

- **Reports Page (User)**


    - The contents for the reports page are similar to the landing page with the difference being that the user can see report previews only for the reports that they have created along with a button that will navigate users to the full report card of the report.


![Reports Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/report-page-user.png)


- **Reports Page (Admin)**


    - For admins the design is the same as the users' report page except the report previews are of all reports that are submitted as well as who the yare submitted by.


![Reports Page (Admin)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/report-page-admin.png)



- **Full Report Card Page**

    - On this page the user can find the full details for a specific report with a "Go To Post" button that navigates the user to the reported post.

![Full Report Card Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/full-report-card-page.png)



- **Full Report Card Page Options Toggle (Owner)**

    - The owner of the report is provided with two options one for edit and one for delete.

![Full Report Card Page Options Toggle (Owner)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/edit-delete-togle.png)



- **Full Report Card Page Options Toggle (Admin)**

    - The admin is provided with the option to delete any report.

![Full Report Card Page Options Toggle (Admin)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/delete-togle.png)



- **Delete a Report**

    - When the user clicks on the delete button a modal prompts them to confirm their decision, ensuring that they don't unintentionally delete their report. 


![Delete a Report](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/delete-report-modal.png)



- **Delete a Report Success Message**

    - After successful deletion, users are presented with a success message indicating the report has been deleted.


![Delete a Report Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/report-delete-success.png)




- **Edit a Report**

    - When the user clicks on the edit button they are navigated to the report edit form page.

![Edit a Report](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/edit-report-page.png)



- **Edit a Report Success Message**

    - After a successful edit, users are presented with a success message indicating the report has been updated.


![Edit a Report Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/report-update-success.png)




- **Individual Post Page (Logged Out / No Comments)**

    - The page contains the specific post clicked along with a comments section, for logged out users and when there aren't any comments there is a message saying "No comments yet. Be the first to comment!"


![Individual Post Page (Logged Out / No Comments)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/post-page-logged-out-no-comments.png)



- **Individual Post Page (Logged In / No Comments)**

    - The page contains the specific post clicked along with a comments section, for logged in users and when there aren't any comments there is a message saying "It would be great if you were the first to comment!". A comment create form is also included.

![Individual Post Page (Logged In / No Comments)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/post-page-logged-in-no-comments.png)



- **Individual Post Page (Logged In / With Comments)**

    - The page contains the specific post clicked along with a comments section. A comment create form is also included as well as all the comments for the specific post.


![Individual Post Page (Logged In / With Comments)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/post-page-logged-in-with-comments.png)



- **Comment**

    - For each comment there is a link to the author's profile page when the user clicks on the profile image.

![Comment](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/comment.png)



- **Comment (Owner)**

    - The owners of comments cannot like their own comments, an appropriate message is displayed to let the user know.


![Comment (Owner)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/cant-like-own-comment.png)



- **Comment Options Toggle (Owner)**

    - The owner of the comment is provided with two options one for edit and one for delete.


![Comment Options Toggle (Owner)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/edit-delete-togle.png)


- **Comment Options Toggle (Admin)**

    - The admin is provided with the option to delete the comment


![Comment Options Toggle (Admin)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/delete-togle.png)



- **Delete a Comment**


    - When the user clicks on the delete button a modal prompts them to confirm their decision, ensuring that they don't unintentionally delete their comment. 



![Delete a Comment](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/delete-comment-modal.png)


- **Delete a Comment Success Message**

    - After successful deletion, users are presented with a success message indicating the comment has been deleted.


![Delete a Comment Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/comment-delete-success.png)




- **Edit a Comment**

    - When the user clicks on the edit button the space where the comment content is, turns into a comment edit form.

![Edit a Comment](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/comment-edit-form.png)




- **Edit a Comment Success Message**

    - After a successful edit, users are presented with a success message indicating the comment has been updated.


![Edit a Comment Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/comment-update-success.png)



- **Profile Page (Logged Out)**

    - The profile page contains a profile card and list of posts created by the owner of the profile. The profile card includes, username, name (if present), number of posts, followers, following, hobbies (if present), bio (if present) and the profile image of the profile.


![Profile Page (Logged Out)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/profile-page-logged-out.png)




- **Profile Page (Logged In / Not Owner)**

    - For the logged in user, two additional things will be showing. A button for follow / unfollow depending if the requesting user is following the profile, as well as a "follow you" tag if the owner of the profile is following the currently requesting user.


![Profile Page (Logged In / Not Owner)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/profile-page-logged-in-not-owner.png)



- **Profile Page (No Posts)**


    - There will be a "Not Found" image and a text saying "No results found, {owner of profile's username} hasn't posted yet." if the profile hasn't uploaded any posts.


![Profile Page (No Posts)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/profile-page-no-posts.png)



- **Profile Page (Logged In / Owner)**


    - For the owners of the profiles, they are provided with a toggle that offers different editing functionalities.


![Profile Page (Logged In / Owner)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/profile-page-logged-in-owner.png)


- **Profile Page (Edit Profile)**


    - Clicking on "edit profile" will navigate the user to the profile edit page. Where they can edit any of the fields, with the fields for name, hobbies and bio being optional.


![Profile Page (Edit Profile)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/edit-profile.png)




- **Profile Page (Edit Profile) Success Message**


    - After a successful edit, users are presented with a success message indicating their profile has been updated.

![Profile Page (Edit Profile) Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/edit-profile-success.png)



- **Profile Page (Edit Username)**


    - Clicking on "edit username" will navigate the user to the username edit page. Where they can edit their username


![Profile Page (Edit Username)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/edit-username.png)



- **Profile Page (Edit Username) Success Message**

    - After a successful edit, users are presented with a success message indicating their username has been updated.



![Profile Page (Edit Username) Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/username-success.png)



- **Profile Page (Edit Password)**


    - Clicking on "edit password" will navigate the user to the username edit page. Where they can edit their password by typing the new password and confirming it.


![Profile Page (Edit Password)](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/edit-password.png)



- **Profile Page (Edit Password) Success Message**


    - After a successful edit, users are presented with a success message indicating their password has been updated.


![Profile Page (Edit Password) Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/password-success.png)




- **Follow Button**

    - Clicking on the button the user will follow the profile.



![Follow Button](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/follow-btn.png)


- **Follow Button Success Message**

    - After a successful follow, users are presented with a success message indicating that the user is followed.

![Follow Button Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/user-followed.png)



- **Unfollow Button**

    - Clicking on the button the user will unfollow the profile.

![Unfollow Button](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/unfollow-btn.png)


- **Unfollow Button Success Message**

    - After a successful unfollow, users are presented with a success message indicating that the user is unfollowed.

![Unfollow Button Success Message](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/features/user-unfollowed.png)



## Re-use of Components

### `Asset.js` 

-  Component that displays a loading spinner, an image, and a message, based on the provided props. It's used in situations where content is loading or unavailable or to display images with text.

- **Props**

    - `spinner` - A boolean that, if true, displays a loading spinner.
    - `src` - A string representing the image source URL to be displayed.
    - `message` -  A string containing the text message to be displayed.
    - `height` -  A number or string that defines the height of the image.
    - `width` - A number or string that defines the width of the image.
    - `borderRadius` - A number or string that sets the border radius of the image for rounded corners.

### `Avatar.js` 

- Component that displays an avatar image with optional text. It is used to represent users in various parts of the application, such as profile sections, post sections, comments, or profile lists.

- **Props**

    - `src` - A string representing the image source URL to be displayed.
    - `height` -  A number or string that defines the height (and width). The default value is 45.
    - `text` -  A string containing the text message to be displayed.



### `DropdownOptions.js` 


#### GearToggle

- Component that renders a gear icon used to toggle a dropdown menu. It uses `React.forwardRef` to forward the `ref` to the icon element.

#### `DropdownOptions`

- Component that renders a dropdown menu with options for editing and deleting content.

- **Props**

    - `isAdmin` -  A boolean that determines whether the edit option should be displayed. If `false`, the edit option is shown; if `true`, only the delete option is displayed.
    - `handleEdit` -  A function that is called when the edit option is selected.
    - `handleDelete` - A function that is called when the delete option is selected.

#### `ProfileEditDropdown`

- Component that provides a dropdown menu with options for editing different parts of a user's profile, such as the profile information, username, and password.

- **Props**

    - `id` - Represents the user's profile ID, used to construct the navigation paths for editing various profile aspects.


### `NotFound.js`

- Component that is displayed when a user navigates to a page that cannot be found.

### `Comment.js`

- Component that is responsible for displaying a single comment within the comment section under a post. It provides the ability for users to view, like, unlike, edit, and delete comments.


- **Props**

    - `profile_id`- The ID of the profile that owns the comment.
    - `profile_image`- The URL of the profile image of the comment's owner.
    - `owner`- The username of the comment's owner.
    - `updated_at`- The timestamp when the comment was last updated.
    - `content`- The text content of the comment.
    - `is_owner`- A boolean indicating if the current user is the owner of the comment.
    - `is_admin`- A boolean indicating if the current user has admin privileges.
    - `id`- The ID of the comment.
    - `setPost`- A function to update the state of the parent post.
    - `setComments`- A function to update the list of comments.
    - `comment_likes_count`- The number of likes the comment has received.
    - `comment_like_id`- The ID of the like if the current user has liked the comment.



### `PopularPosts.js` 

- The component uses the `usePopularPostData` hook to fetch and manage popular post data from context. It conditionally renders content based on the mobile prop to adjust visibility on different screen sizes. It passes the post object to the `PopularPost` component and shows up to three popular posts or a loading spinner if no data is available.


### `PopularPost.js`

- Displays a card with details of a popular post, including the post's owner, profile picture, title, content, and number of likes. The card features links to both the individual post page and the owner's profile, and includes an image with a scroll-to-top feature.

- **Props**


    - `id`- The ID for the post.
    - `owner`- The name of the post's owner.
    - `profile_id`- The ID of the post owner's profile.
    - `profile_image`- The URL of the post owner's profile picture.
    - `title`- The title of the post.
    - `content`- The content of the post.
    - `image`- The URL of the post's image.
    - `post_likes_count`- The number of likes the post has received.
    - `updated_at`- The date and time when the post was last updated.



### `PostPage.js`

- Component that fetches and displays a specific post along with its comments. (Individual Post Page)

### `Post.js`

- Component displays a detailed view of a post with owners profile picture and username link that leads to their profile and date, also including options for liking, unliking, editing, deleting, and reporting. It shows the post's title and content, likes count, comments count, and provides feedback through success and error alerts. It also handles user interactions like scrolling to the top of the page and manages a confirmation modal for post deletion.


- **Props**


    - `id` - The ID of the post.
    - `owner` - The name of the post's owner.
    - `is_owner`- Boolean indicating if the current user is the owner of the post.
    - `is_admin`- Boolean indicating if the current user is an admin.
    - `profile_id`- The ID of the post owner's profile.
    - `profile_image`- The URL of the post owner's profile image.
    - `comments_count`- The number of comments on the post.
    - `post_likes_count`- The number of likes on the post.
    - `post_like_id`- The ID of the like relationship if the user has liked the post.
    - `title`- The title of the post.
    - `content`- The content of the post.
    - `image`- The URL of the post's image.
    - `updated_at`- The date and time when the post was last updated.
    - `postPage`- Boolean indicating if the component is rendered on a post page.
    - `setPosts`- Function to update the state of posts in the parent component.


### `PopularProfilesMostPosts.js`

- Component displays two sections: "Popular Profiles" and "Top Creators." It fetches and displays profiles based on their popularity and the number of posts they have. It provides different views for mobile and desktop screens.

- **Props**

    - `mobile` - Boolean indicating whether to render the component for mobile view. It adjusts the layout and styling based on this value.



### `Profile.js`


- Component that displays a profile's avatar and name, and conditionally shows follow/unfollow buttons based on the current user's relationship with the profile, screen size and authentication status.


- **Props**

    - `id`- The ID of the profile.
    - `following_id`- The ID of the follow relationship.
    - `image` - The URL of the profile image.
    - `owner` - The name of the profile's owner.
    - `is_owner`- Boolean indicating if the current user is the owner of the profile.




## Future Feautres

### State Synchronisation 

- Full state synchronisation for posts to allow users to like popular posts directly without the need for page refresh.

### Notifications

- In-App Notifications: Introduce a notification center where users can view likes, comments, follows, and report updates in real-time. This would enhance user engagement and ensure they don't miss any important interactions.

- Push Notifications: Integrate push notifications for key activities such as new followers, likes, and comments. This feature can be expanded to include mobile notifications in a future mobile app version.


### Search and Discovery Enhancements

- Advanced Search Filters: Allow users to filter posts by date, popularity, hashtags, and user-specific tags to enhance content discovery.
- Advanced Search Filters: Allow admins to filter reports by date and reason.



### UI/UX Refinements

- Dark Mode: Implement a dark mode option to improve user experience.

- Profile Customization: Enable users to customize their profile page with themes, and additional profile fields like social media links and location.


### Security and Account Management


- Two-Factor Authentication (2FA): Introduce an option for users to enable 2FA, adding an extra layer of security to their accounts.


- Password Strength Indicator: When signing up or changing a password, display a strength meter that helps users create more secure passwords.


- Implement OAuth2 integration allowing users to sign in using their credentials from third-party providers like Google, Facebook, or Microsoft.


### Direct Messaging

- Implement a direct messaging system where users can privately communicate with each other, including features like group chats and media sharing.

### Username Length Restriction

- When signing up the username field will have a length restriction between 3 and 16 characters


### Improve Features according to Google DevTools' Lighthouse

- Features will be improved as per the report returned by DevTools' Lighthouse

### Display Popular Posts on small screens

- Ensure popular posts are displayed effectively on smaller screens.


## Frameworks, libraries and dependencies

### React-Infinite-Scroll-Component

- [React-Infinite-Scroll-Component](https://www.npmjs.com/package/react-infinite-scroll-component) - Enables automatic loading of more posts as users scroll, enhancing user experience with smooth, endless content flow.

### React-Router-DOM

- [React-Router-DOM](https://www.npmjs.com/package/react-router-dom) - Manages navigation within the app, allowing seamless transitions between pages without full reloads.

### ReactDOM

- [ReactDOM](https://legacy.reactjs.org/docs/react-dom.html) Manages rendering of React components to the DOM, allowing elements like modals and notifications to be displayed effectively and interact with the overall page layout.

### Axios

- [Axios](https://axios-http.com/docs/intro) - Used to handle all the HTTP requests (like fetching data from the server) in the app. It simplifies the process of connecting to the backend, especially when dealing with things like authentication. For instance, if a user’s session expires, axios can automatically request a new session without making the user log in again, making the experience smoother.

### React Bootstrap

- [React Bootstrap](https://react-bootstrap-v4.netlify.app/) - Provides pre-styled, responsive components to ensure the app looks and functions well on all devices.

### JWT-Decode

- [JWT-Decode](https://www.npmjs.com/package/jwt-decode?activeTab=readme) - Utilized to decode Base64URL-encoded JSON Web Tokens (JWTs).


### React-Scroll-To-Top

 - [React-Scroll-To-Top](https://www.npmjs.com/package/react-scroll-to-top) - Adds a button for quick navigation back to the top of the page, improving user navigation.




## Hooks


- `useCurrentUser` - Provides access to the current user context, allowing components to read the current user information such as profile id, profile image and if the user is an admin.

- `useSetCurrentUser` - Provides access to the function for updating the current user context, allowing components to modify the `CurrentUserContext` state.

- `usePopularPostData` -  Retrieves details about popular post data, including the fetched posts and any error messages related to the data retrieval.

- `useProfileData` - Retrieves the profile data, including popular profiles and profiles with the most posts, along with any related error messages.

- `useSetProfileData` - Provides functions to update profile data, and handle follow and unfollow actions.

- `useSuccessAlert` - Provides access to the success alert state and function to set the alert message. This hook allows components to use and update the success alert context.

- `useCheckOwnership` - Verifies whether the current user owns a specific resource or is an admin. If the user does not own the resource and is not an admin, it redirects them to the home page.

- `useClickOutsideToggle` - Manages the state of the navbar menu, including toggling its expansion and automatically closing the menu when a click occurs outside of it, on small screens.

- `useRedirect` - Redirect based on user authentication status. It attempts to refresh the authentication token and redirects to the home page if the user is logged in or if the token refresh fails when the user is logged out.

- `useRedirectIfNotAdmin.js` - Custom hook to redirect non-admin users away from admin pages. It checks if the current user is an admin when accessing an admin route and redirects them to a specified URL if they are not an admin or not logged in.

## Testing


You can find the testing and validation [here](TESTING.md)


## Deployment


### How to Fork


- You can fork the repository, following the steps below.

    - Sign Up or Log In if you have an account to Github.
    - Go to the repository for the MemoVault project - [devnickocodes/MemoVault Project](https://github.com/devnickocodes/memovault-app)
    - Click on the Fork button that is on the right side of the repository name.



### How to Clone

- You can make a local copy of the MemoVault project by writing the following command in your IDE terminal.

    - `git clone https://github.com/devnickocodes/memovault-app.git` 



### Deployment on Heroku

Heroku is used for the deployment of the project, after you create your profile follow the steps bellow:

Add Heroku deployment commands bellow:

- Navigate to `package.json` file.
- Add the `heroku-prebuild` prebuild command to the scripts section of the file like so:

```json
  "scripts": {
    "heroku-prebuild": "npm install -g serve",
  },
```

- Add a Procfile to the root of the repository with the following command:

    - `web: serve -s build`



- Fork or Clone this repository in GitHub

- If you have cloned and deployed your own version of the MemoVault Django Rest Framework API, make sure to update the `axios.defaults.baseURL` in `src/api/axiosDefaults.js` to match the base heroku URL of your deployed API. If you’re using the original MemoVault API, you don't have to adjust this setting.

- Click on 'New' at the top-right corner of your Dashboard, then select 'Create new app'

- Choose a distinct app name (as no two projects can have the same name on Heroku) and choose your region

- Click on 'Create App'

- Navigate to the 'Deploy' tab, which is on the left side of the 'Settings' tab, in the deployment method section click on GitHub

- To connect your GitHub code to Heroku, type in the name of your repository and then click on 'Search'. Once you see your repository show up click on 'Connect'

- Choose a branch from which you wish to deploy.

- You can choose to deploy your app manualy in the 'Manual Deploy' section click on 'Deploy Branch'

- If you prefer you can also choose automatic deploys, in that case navigate to the 'Automatic Deploys' section and click on 'Enable Automatic Deploys', this method keeps the project up to date with your repository.



## Credits

- Some of the code is inspired by Code Institute's Moments Walkthrough project with some adjustments made to accomodate the needs for this app.

- The favicon is from [icons8](https://icons8.com/icon/122835/image)
- [Nunito](https://fonts.google.com/specimen/Nunito) is the font used.
- The feature image is from [unsplash](https://unsplash.com/photos/white-and-black-box-on-black-textile-jIrsEPB4_iU)
- The border for the post component is from [getcssscan](https://getcssscan.com/css-box-shadow-examples) (No 93)
- Profile and post placeholders are from [Pixabay](https://pixabay.com/)
- The code in `scrollToTop.js` can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo)
- Scroll to top component can be found [here](https://www.npmjs.com/package/react-scroll-to-top)
- The use of `!important` in `PostsPage.module.css` is to override styling as the Props table in [the docs](https://www.npmjs.com/package/react-scroll-to-top) says.
- [This page](https://react-bootstrap-v4.netlify.app/components/modal/) helped with the creation of the modal.
- The idea to include `const [showDeleteModal, setShowDeleteModal] = useState(false)` in `Post.js `, `Comment.js` and `NavBar.js` in `finally` block statement is from here because i am using it as a clean up function method to make sure its closed this is the site https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch and this is the sentence 
- The idea to use the setter function from `const [showDeleteModal, setShowDeleteModal] = useState(false)` in the `finally` blocks in `Post.js `, `Comment.js` and `NavBar.js` to close the modal is from [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) because it says:

    - "The finally block will always execute before control flow exits the try...catch...finally construct. It always executes, regardless of whether an exception was thrown or caught."

as I am using it as a cleanup function.
- I learned how to use `async` with `map` method for reports [here](https://stackoverflow.com/questions/40140149/use-async-await-with-array-map)
- For automated testing the [Jest](https://jestjs.io/docs/getting-started) docs were researched
- The [React](https://react.dev/reference/react) docs were also researched and referenced throughout the project.



## Acknowledgements


- I would like to acknowledge and thank the following people.

    - Jubril Akolade - My Code Institute Mentor.
    - The Code Institute Tutor Support - For their awesome and quick technical help.
    - Thank you to everyone who took the time to use the app and give feedback.























