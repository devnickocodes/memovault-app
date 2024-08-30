# Testing and Validation

## CSS Validation

[W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/) was used to validate the CSS code with all css files passing the check.


## ESLint JavaScript Validator


- [ESLint](https://eslint.org/) was utilized by running the command `npx eslint` followed by the path to the specific file or directory you wish to check. For instance, running `npx eslint src/api` would analyze all files within the `api` folder. After conducting an initial check, you can apply automatic fixes by appending the `--fix` flag to the command. For example: `npx eslint src/api --fix`. This flag helps to quickly resolve straightforward issues, such as missing semicolons or ensuring that `<span>` elements are on their own lines, among other common corrections.


- The JavaScript files were validated using the ESLint JavaScript validator. Certain rules that triggered irrelevant warnings have been temporarily disabled in the .eslintrc.js configuration. These warnings will be addressed in future updates, as some code requires refactoring and adjustments. Additionally, some of the flagged issues are not actual problems, and applying some of the suggested fixes at this stage could interfere with the app's current functionality.

- You can find the remaining issues bellow:

    - Missing React import statements.
    - The object passed as the value prop to the Context provider changes every render. To fix this consider wrapping it in a useMemo hook.
    - Long lines
    - Unexpected console statements


## Manual Testing


- Testing was continuously conducted throughout the website's development. I utilized Google Developer Tools for troubleshooting and performed early deployments to ensure that all app functionality operated as expected.


| Page | Feature | Expected Outcome | PASS/FAIL |
| --- | --- | --- | --- |
| Homepage | Logo | When the user clicks on the logo they are redirected to the homepage | PASS |
| Homepage | Home tab | When the user clicks on the Home tab they are redirected to the homepage | PASS |
| Homepage | Sign In tab | When the user clicks on the Sign In tab they are redirected to the sign in page | PASS |
| Homepage | Sign Up tab | When the user clicks on the Sign Up tab they are redirected to the Sign Up page | PASS |
| Sign Up Page | Username Field Validation| The username field is mandatory and is validated for presence, uniqueness, length, and allowed characters. If there is an issue an appropriate alert is shown. | PASS |
| Sign Up Page | Password Field Validation | The password field is mandatory and is validated for presence, strength, and length. If there is an issue an appropriate alert is shown. | PASS |
| Sign Up Page | Confirm Password Field Validation | The confirm password field is mandatory and is validated validated for presence and matching with the password field. If there is an issue an appropriate alert is shown. | PASS |
| Sign Up Page | Sign Up Button | After successful completion of all fields and passing validation, the user's account is created and they are greeted with an appropriate message. | PASS |
| Sign Up Page | Sign Up Success | After a successful sign up the user is redirected to the sign in page | PASS |
| Sign Up Page | "Have an account" Link | When the user clicks on "Already have an account? Sign In" link they are redirected to the sign in page | PASS |
| Sign In Page | Login Attempt Validation | If login fails due to incorrect or missing credentials, an appropriate alert is shown.| PASS |
| Sign In Page | Sign In Button | After successful entry of username and password, the user is logged into their account and redirected to the home page | PASS |
| Sign In Page | Sign In Success | After successful sign in the user is greeted with an appropriate message. | PASS |
| Sign In Page | "Don't have an account" Link | When the user clicks on "Don't have an account? Sign Up Here" link they are redirected to the sign up page | PASS |
| Sign Up and Sign In Pages | Sign In/Up pages for logged in users | A logged in user trying to access these pages will be redirected to the homepage | PASS |
| (Across Pages) | Sign Out Modal | Clicking on the tab a modal appears so that the user can confirm the sign out. | PASS |
| (Across Pages) | Sign Out Modal (Cancel) | Clicking on the cancel button the modal closes | PASS |
| (Across Pages) | Sign Out Modal (confirm) | Upon successful sign out, display an appropriate confirmation message. | PASS |
| (Across Pages) | Sign Out Modal (confirm) Issues | Upon unsuccessful sign out display an appropriate error message | PASS |
| Add Post Page | Image Field | The image field is optional. If the user does not select an image, a placeholder image will be assigned to the post. If the user fails to pass the validation, an appropriate error alert will be displayed. | PASS |
| Add Post Page | Title Field | The title field is mandatory. If the user fails to pass the validation, an appropriate error alert will be displayed. | PASS |
| Add Post Page | Content Field | The content field is mandatory. If the user fails to pass the validation, an appropriate error alert will be displayed. | PASS |
| Add Post Page | Issues | For any other issues the user is made aware through alerts. | PASS |
| Add Post Page | Cancel Button | The user is navigated to the page they visited last. | PASS |
| Add Post Page | Create Button | The post is created and the user is navigated to the individual post page. | PASS |
| Add Post Page | Post Creation Success | Upon successful creation of the post, the user is redirected to the individual post page and receives a confirmation message | PASS |
| Add Post Page | Logged Out Users | Logged out users are redirected to the homepage if they try to access this page. | PASS |
| (Across Pages) | Search Bar | Users can search for posts based on the post title and post's owner's username. | PASS |
| (Across Pages) | Search Bar | In case of no found posts a message with a not found message is displayed. | PASS |
| (Across Pages) | Search Bar Issues | For any other issues the user is made aware through alerts. | PASS |
| Homepage | Posts Display | All posts are displayed utilising infinity scroll | PASS |
| Homepage | Posts Display | If there are no posts uploaded there is a "No results found" message under the search bar | PASS |
| Homepage | Posts Display Error | For any other issues the user is made aware through alerts. | PASS |
| Homepage | Post's Owner's Profile Image and Username | Clicking on the image or the username the user is navigated to the owner's profile page | PASS |
| (Across Pages) | Post's Heart Icon Like | Number of likes is displayed next to the icon | PASS |
| (Across Pages) | Post's Heart Icon Like (Non Owners / Logged In) | Users who haven't liked the post can like the post and a confirmation message is shown. | PASS |
| (Across Pages) | Post's Heart Icon Like (Non Owners) Issues | For any other issues the user is made aware through alerts. | PASS |
| (Across Pages) | Post's Heart Icon Unlike (Non Owners) | Users who have liked the post can unlike the post and a confirmation message is shown. | PASS |
| (Across Pages) | Post's Heart Icon UnLike (Non Owners) Issues | For any other issues the user is made aware through alerts | PASS |
| (Across Pages) | Post's Heart Icon (Owners) | Users cannot like their own posts and an appropriate message is shown letting them know. | PASS |
| (Across Pages) | Post's Heart Icon (Non Logged In Users) | Non logged in users cannot like posts and an appropriate message is shown letting them know. If they click on it users are navigated to the sign in page. | PASS |
| (Across Pages) | Post's Comment Icon | Number of comments is displayed next to the icon. | PASS |
| (Across Pages) | Post's Comment Icon | Clicking on it users are navigated to the individual post's page. | PASS |
| (Across Pages) | Post's Comment Icon | If the URL link in the comment icon is broken for some reason, users are navigated to a 404 Not Found page. | PASS |
| (Across Pages) | Post's Flag Icon (Owners) | Owner of a post cannot report their own report so the flag is not visible. | PASS |
| (Across Pages) | Post's Flag Icon (Owners) | Users trying to access the report create page with the id of one of their posts will be redirected to the homepage. | PASS |
| (Across Pages) | Post's Flag Icon (Non Logged In) | Non logged in users trying to access the report create page will be redirected to the homepage. | PASS |
| (Across Pages) | Post's Flag Icon (Non Logged In Users) | Non logged in users cannot report posts and an appropriate message is shown letting them know. If they click on it users are navigated to the sign in page. | PASS |
| (Across Pages) | Post's Flag Icon (Non Owners / Logged In) | User is navigated to the report create page. | PASS |
| (Across Pages) | Post's Flag Icon (Non Owners / Logged In) | User is navigated to the report create page. | PASS |
| Report Create Page | Reason Field Validation | When no reason is selected the user is made aware with an alert message as the field is mandatory. | PASS |
| Report Create Page | Custom Reason Field Display | When any reason from the dropdown is selected except "Other" the field for custom reason is hidden. | PASS |
| Report Create Page | Custom Reason Field Display | When the user chooses "Other" from the dropdown the field for custom reason is shown.  | PASS |
| Report Create Page | Custom Reason Field Validation | The field is mandatory and if it doesn't pass the validation the user is made aware with alerts. | PASS |
| Report Create Page | Submit Report Button | Upon successful report creation an appropriate message and the user is navigated to the Full Report Card Page | PASS |
| (Across Pages) | Popular Profiles | Three profiles with the most followers are displayed. | PASS |
| (Across Pages) | Popular Profiles Issues | If the profiles fail to load an appropriate message is displayed. | PASS |
| (Across Pages) | Popular Profiles Profile Picture | User is navigated to the profile page when clicked. | PASS |
| (Across Pages) | Top Creators | Three profiles with the most post are displayed. | PASS |
| (Across Pages) | Top Creators Issues | If the profiles fail to load an appropriate message is displayed. | PASS |
| (Across Pages) | Top Creators Profile Picture | User is navigated to the profile page when clicked. | PASS |
| (Across Pages) | Popular Posts | Three posts with the most likes are displayed. | PASS |
| (Across Pages) | Popular Posts Issues | If the posts fail to load an appropriate message is displayed. | PASS |
| (Across Pages) | Popular Posts Profile Picture and Username | Clicking on the image or the username the user is navigated to the profile's page. | PASS |
| (Across Pages) | Popular Posts Image | Clicking on the image the user is navigated to the post's individual page. | PASS |
| (Across Pages) | Follow / Unfollow Buttons | Buttons are not visible to owners looking at their profile and logged out users. | PASS |
| (Across Pages) | Follow Button | Users can follow other users. | PASS |
| (Across Pages) | Follow Button Success | Upon successful follow, an appropriate message is displayed. | PASS |
| (Across Pages) | Follow Button Issues | Upon unsuccessful follow, an appropriate error message is displayed. | PASS |
| (Across Pages) | Unfollow Button | Users can unfollow other users. | PASS |
| (Across Pages) | Unfollow Button Success | Upon successful unfollow, an appropriate message is displayed. | PASS |
| (Across Pages) | Unfollow Button Issues | Upon unsuccessful unfollow, an appropriate error message is displayed. | PASS |
| Feed Page | Posts Display | Posts by people who the currently requesting user is following are displayed utilising infitinty scroll| PASS |
| Feed Page | Access | Logged out users will be redirected to the sign in page. | PASS |
| Individual Post Page | Post Menu Toggle (Logged Out / Non Owner / Non Admin Users) | The toggle is not shown. | PASS |
| Individual Post Page | Post Menu Toggle (Logged In / Owner / Non Admin Users) | The toggle displays edit and delete options. | PASS |
| Individual Post Page | Post Menu Toggle (Logged In / Non Owner / Admin Users) | The toggle displays a delete option. | PASS |
| Individual Post Page | Post Menu Delete Option (Logged In / Owner / Admin Users) | Choosing the delete option, a modal appears so that the user can confirm the deletion. | PASS |
| Individual Post Page | Delete Post Modal (cancel) | Clicking on the cancel button the modal closes. | PASS |
| Individual Post Page | Delete Post Modal  (confirm) | Upon successful deletion, display an appropriate confirmation message. | PASS |
| Individual Post Page | Delete Post Modal  (confirm) Issues | Upon unsuccessful deletion, display an appropriate error message. | PASS |
| Individual Post Page | Post Menu Edit Option (Logged In / Owner / Non Admin Users) | Choosing the edit option will navigate the user to a post edit page | PASS |
| Edit Post Page | Image Field | If the user doesn't choose an image, the image that is already assigned will remain | PASS |
| Edit Post Page | Title Field | The title field is mandatory. If the user fails to pass the validation, an appropriate error alert will be displayed. | PASS |
| Edit Post Page | Content Field | The content field is mandatory. If the user fails to pass the validation, an appropriate error alert will be displayed. | PASS |
| Edit Post Page | Issues | For any other issues the user is made aware through alerts. | PASS |
| Edit Post Page | Cancel Button | The user is navigated to the page they visited last. | PASS |
| Edit Post Page | Save Button | The post is updated and the user is navigated to the individual post page. | PASS |
| Edit Post Page | Post Edit Success | Upon successful update of the post, the user is redirected to the individual post page and receives a confirmation message | PASS |
| Edit Post Page | Logged Out Users | A logged out user trying to acess the URL will be redirected to the homepage | PASS |
| Edit Post Page | Non Owners | A user trying to acess the URL who is not the owner of the post to be edited will be redirected to the homepage | PASS |
| Edit Post Page | Non Existent Post | A user trying to access the URL with an id of a post that doesn't exist will be redirected to a 404 not found page | PASS |
| Individual Post Page | Comment Section | Display comments utilising infitiy scroll. | PASS |
| Individual Post Page | Comment Profile Picture | Clicking on the profile image the user is navigated to the owner of the comment's profile page | PASS |
| Individual Post Page | Comment Menu Toggle (Logged Out / Non Owner / Non Admin Users) | The toggle is not shown. | PASS |
| Individual Post Page | Comment Menu Toggle (Logged In / Owner / Non Admin Users) | The toggle displays edit and delete options. | PASS |
| Individual Post Page | Comment Menu Toggle (Logged In / Non Owner / Admin Users) | The toggle displays a delete option. | PASS |
| Individual Post Page | Comment Menu Edit Option (Logged In / Owner / Non Admin Users) | Choosing the edit option, a comment edit form is shown prepopulated with the comment's content | PASS |
| Individual Post Page | Comment Edit Form (Logged In / Owner ) | If the field is empty including whitespaces the "save" button is inactive and "cancel" button closes the edit form. | PASS |
| Individual Post Page | Comment Edit Form (Logged In / Owner ) Issues | Upon unsuccessful edit, display an appropriate error message | PASS |
| Individual Post Page | Comment Menu Edit Option (Logged In / Owner / Admin Users) | Choosing the delete option, a modal appears so that the user can confirm the deletion. | PASS |
| Individual Post Page | Delete Comment Modal (cancel) | Clicking on the cancel button the modal closes. | PASS |
| Individual Post Page | Delete Comment Modal  (confirm) | Upon successful deletion, display an appropriate confirmation message. | PASS |
| Individual Post Page | Delete Comment Modal  (confirm) Issues | Upon unsuccessful deletion, display an appropriate error message. | PASS |
| Individual Post Page (Logged Out Users) | Comment Create Form | The form is not shown for logged out users | PASS |
| Individual Post Page (Logged In Users) | Comment Create Form | If the field is empty including whitespaces the button is inactive.  | PASS |
| Individual Post Page (Logged In Users) | Comment Create Form Profile Image | Clicking on the image inside the comment create form will navigate the user to the profile page  | PASS |
| Individual Post Page (Logged In Users) | Comment Create Form Comment Button | Upon successful creation of the comment, display an appropriate confirmation message. | PASS |
| Individual Post Page (Logged In Users) | Comment Create Form Comment Button | Upon unsuccessful creation of the comment, display an appropriate error message. | PASS |
| Individual Post Page Not Found | Post Doesn't Exist | Users are navigated to a 404 not found page if they try to access an individual post page of a post that doesn't exist | PASS |
| Reports Page (User / Admin / Logged Out) | Access | Any users that are logged out will be redirected to the homescreen. | PASS |
| Reports Page (User / Owner / Logged In) | Access | Users see report previews displayed for reports that they have created, utilising infinity scroll feature. | PASS |
| Reports Page (User / Owner/ Logged In) | No Report Previews | Display a 404 image and text when user hasn't created any reports. | PASS |
| Reports Page (User / Owner) | Report Preview | Users can see short previews of the reason for the report as well as the reported post title and content. | PASS |
| Reports Page (User / Logged In / Owner) | View Full Report Button | User is navigated to the full report card page. | PASS |
| Reports Page (Admin / Logged In ) | Access Reports Page For Users | Admins trying to access "/reports" URL will be redirected to the admins' report page. | PASS |
| Full Report Card Page (Logged Out) | Access | Any logged out user trying to access this URL is redirected to the homepage. | PASS |
| Full Report Card Page (Logged In / Non Owner) | Access | A logged in user trying to access another user's full report card is navigated to a 404 not found page | PASS |
| Full Report Card Page (Logged In / Doesn't Exist) | Access | User trying to access a report card that doesn't exist is navigated to a 404 not found page | PASS |
| Full Report Card Page (Logged In / Owner) | Go To Post Button | User is navigated to the reported post. | PASS |
| Full Report Card Page (User / Logged In / Owner) | Report Menu Toggle | The toggle displays edit and delete options. | PASS |
| Full Report Card Page (User / Logged In / Owner) | Report Menu Delete Option | Choosing the delete option, a modal appears so that the user can confirm the deletion. | PASS |
| Full Report Card Page (User / Logged In / Owner) | Delete Comment Modal (cancel) | Clicking on the cancel button the modal closes. | PASS |
| Full Report Card Page (User / Logged In / Owner) | Delete Comment Modal  (confirm) | Upon successful deletion, display an appropriate confirmation message. | PASS |
| Full Report Card Page (User / Logged In / Owner) | Delete Comment Modal  (confirm) Issues | Upon unsuccessful deletion, display an appropriate error message. | PASS |
| Full Report Card Page (User / Logged In / Owner) | Report Menu Edit Option | Choosing the edit option, the user is navigated to the report edit page. | PASS |
| Report Edit Page | Reason Field Validation | When no reason is selected the user is made aware with an alert message as the field is mandatory. | PASS |
| Report Edit Page | Custom Reason Field Display | When any reason from the dropdown is selected except "Other" the field for custom reason is hidden. | PASS |
| Report Edit Page | Custom Reason Field Display | When the user chooses "Other" from the dropdown the field for custom reason is shown.  | PASS |
| Report Edit Page | Custom Reason Field Validation | The field is mandatory and if it doesn't pass the validation the user is made aware with alerts. | PASS |
| Report Edit Page | Submit Report Button | Upon successful report creation an appropriate message and the user is navigated to the Full Report Card Page | PASS |
| Reports Page (Admin / Logged In) | User Access | Logged in users trying to access the URL are redirected to the homepage | PASS |
| Reports Page (Admin / Logged In) | Access | Admins see report previews displayed for all reports created, utilising infinity scroll feature. | PASS |
| Reports Page (Admin / Logged In) | No Report Previews | Display a 404 image and text when no report previews exist. | PASS |
| Reports Page (Admin / Logged In) | Report Preview | Admins can see short previews of the reason for the report as well as the reported post title and content, they also can see who the report was submitted by. | PASS |
| Reports Page (Admin / Logged In) | View Full Report Button | Admins are navigated to the full report card page. | PASS |
| Full Report Card Page (Admin) | Go To Post Button | Admins are navigated to the reported post. | PASS |
| Full Report Card Page (Logged In / Doesn't Exist) | Access | Users trying to access a report card that doesn't exist are navigated to a 404 not found page | PASS |
| Full Report Card Page (Admin / Logged In) | Report Menu Toggle | The toggle displays a delete option. | PASS |
| Full Report Card Page (Admin / Logged In) | Report Menu Delete Option | Choosing the delete option, a modal appears so that the user can confirm the deletion. | PASS |
| Full Report Card Page (Admin / Logged In) | Delete Comment Modal (cancel) | Clicking on the cancel button the modal closes. | PASS |
| Full Report Card Page (Admin / Logged In) | Delete Comment Modal  (confirm) | Upon successful deletion, display an appropriate confirmation message. | PASS |
| Full Report Card Page (Admin / Logged In) | Delete Comment Modal  (confirm) Issues | Upon unsuccessful deletion, display an appropriate error message. | PASS |
| Profile Page | Profile Posts Section | Display posts created by the owner of the profile, utilising infinity scroll. | PASS |
| Profile Page | Profile Posts Section (No Posts) | Display a 404 image and a message. | PASS |
| Profile Page (Non Owner) | Profile Card | Display profile image, numbers of posts, followers, following, username. The name, hobbies and bio are optional so they are displayed if they exist. | PASS |
| Profile Page (Owner) | Profile Menu Toggle | The toggle displays three edit options (edit profile, change username and change password). | PASS |
| Profile Page (Owner) | Profile Menu Edit Option | Navigate the user to the profile edit page. | PASS |
| Profile Edit Page (Owner) | Image Field | The image field is optional. If the user does not select an image, the default placeholder image will remain. If the user fails to pass the validation, an appropriate error alert will be displayed. | PASS |
| Profile Edit Page (Owner) | Profile Menu Edit Option Success | After a successful edit, an appropriate message is shown. | PASS |
| Profile Edit Page (Logged Out) | Profile Menu Edit Option | Logged out users will be redirected to the homepage when trying to access the profile edit URL | PASS |
| Profile Page Edit (Logged In / Non Owner) | Profile Menu Edit Option | Logged in users will be redirected to the homepage when trying to access the profile edit URL for another profile | PASS |
| Profile Page Edit (Logged In / Doesn't Exist) | Profile Menu Edit Option | Logged in users will be redirected to the homepage when trying to access the profile edit URL with an id that doesn't exist | PASS |
| Username Edit Page (Owner) | Change Username Edit Option | Navigate the user to the username edit page. | PASS |
| Username Edit Page (Owner) | Username Field | If the user fails to pass the validation, an appropriate error alert will be displayed. | PASS |
| Username Edit Page (Owner) | Change Username Edit Option Success | After a successful edit, an appropriate message is shown. | PASS |
| Username Edit Page (Logged Out) |Change Username Edit Option | Logged out users will be redirected to the homepage when trying to access the username edit URL | PASS |
| Username Edit Page (Logged In / Non Owner) | Change Username Edit Option | Logged in users will be redirected to the homepage when trying to access the username edit URL for another profile | PASS |
| Username Edit Page (Logged In / Doesn't Exist) | Change Username Edit Option | Logged in users will be redirected to the homepage when trying to access the username edit URL with an id that doesn't exist | PASS |
| Password Edit Page (Owner) | Change Password Edit Option | Navigate the user to the password edit page. | PASS |
| Password Edit Page (Owner) | Password Field | If the user fails to pass the validation, an appropriate error alert will be displayed. | PASS |
| Password Edit Page (Owner) | Confirm Password Field | If the user fails to pass the validation, an appropriate error alert will be displayed. | PASS |
| Password Edit Page (Owner) | Change Password Edit Option Success | After a successful edit, an appropriate message is shown. | PASS |
| Password Edit Page (Logged Out) |Change Password Edit Option | Logged out users will be redirected to the homepage when trying to access the password edit URL | PASS |
| Password Edit Page (Logged In / Non Owner) | Change Password Edit Option | Logged in users will be redirected to the homepage when trying to access the password edit URL for another profile | PASS |
| Password Edit Page (Logged In / Doesn't Exist) | Change Password Edit Option | Logged in users will be redirected to the homepage when trying to access the password edit URL with an id that doesn't exist | PASS |







## Lighthouse Validation


| Page | Screenshot | PASS/FAIL |
| --- | --- | --- |
| Homepage (Logged Out)| ![Homepage](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/homepage-logged-out-lighthouse.png) | PASS |
| Homepage (Logged In)| ![Homepage](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/homepage-logged-in-lighthouse.png) | PASS |
| Sign In | ![Sign In](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/signin-lighthouse.png) | PASS |
| Sign Up | ![Sign Up](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/signup-lighthouse.png) | PASS |
| Individual Post Page | ![Individual Post Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/individual-post-page-lighthouse.png) | PASS |
| Feed Page | ![Feed Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/feed-page-lighthouse.png) | PASS |
| Reports Page | ![Reports Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/reports-page-lighthouse.png) | PASS |
| Full Report Card Page | ![Full Report Card Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/full-report-card-page-lighthouse.png) | PASS |
| Post Create Page | ![Post Create Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/post-create-page-lighthouse.png) | PASS |
| Post Edit Page | ![Post Edit Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/post-edit-page-lighthouse.png) | PASS |
| Report Create Page | ![Report Create Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/report-create-page-lighthouse.png) | PASS |
| Report Edit Page | ![Report Edit Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/report-edit-page-lighthouse.png) | PASS |
| Profile Page | ![Profile Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/profile-page-lighthouse.png) | PASS |
| Profile Edit Page | ![Profile Edit Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/profile-edit-page-lighthouse.png) | PASS |
| Username Edit Page | ![Username Edit Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/username-edit-page-lighthouse.png) | PASS |
| Password Edit Page | ![Password Edit Page](https://github.com/devnickocodes/memovault-app/blob/main/readme_docs/testing/password-edit-page-lighthouse.png) | PASS |



