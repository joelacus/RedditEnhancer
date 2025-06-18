# Reddit Enhancer

A browser extension to tweak the user interface on Reddit.

Supports Version 1 (Old) and Version 3 (New New) of Reddit. Version 2 (Old New) has been discontinued, but features will still be supported for the time being while workarounds to get Old New UI back are still working.<br>Not all features support all versions.

Feel free to suggest new features and report any bugs on the Issues page.

Some features may stop working due to website updates. Please let me know if you find any issues.

I welcome any help if you would like to improve or contribute new language translations. [Completion List](#localisation)

# Download
|Firefox|Chrome|Edge|Opera|Vivaldi|
|---|---|---|---|---|
|<p align="center"><a href="https://addons.mozilla.org/en-GB/firefox/addon/reddit-enhancer/" ><img src="/icons/firefox_64x64.png"></a></p>|<p align="center"><a href="https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa"><img src="/icons/chrome_64x64.png"></a></p>|<p align="center"><a href="https://microsoftedge.microsoft.com/addons/detail/reddit-enhancer/cghbjpnahcbdbjokkcfibagpjdjhpdlk"><img src="/icons/edge_64x64.png"></a></p>|<p align="center"><a href="https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa" ><img src="/icons/opera_64x64.png"></a></p>|<p align="center"><a href="https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa" ><img src="/icons/vivaldi_64x64.png"></a></p>|
|[Download](https://addons.mozilla.org/en-GB/firefox/addon/reddit-enhancer/)|[Download](https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa)|[Download](https://microsoftedge.microsoft.com/addons/detail/reddit-enhancer/cghbjpnahcbdbjokkcfibagpjdjhpdlk)|[Download](https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa)|[Download](https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa)|

# Features

[Redirect](#redirect) |[Block](#block) | [Resize Feed](#resize-feed-and-posts) | [Background](#background) | [Hide Elements](#hide-elements) | [Productivity](#productivity) | [Font](#font) | [Style](#style) | [Accessibility](#accessibility) | [Other](#other)

## Version Info
|Reddit Version|Common Name|Official Name|
|:---:|:---:|:---:|
|3|New New UI|Mobile Web UI|
|2|Old New UI|New|
|1|Old UI|Old|

## Redirect
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Auto Redirect To Preferred Reddit Version/UI|Automatically redirect any reddit page to the old or latest version of Reddit (2/Version 2 of Reddit is no longer supported).|3<br>1|

## Block
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Hide Post with Blocked Keywords|Hide all posts that contain a specified keyword(s).|3<br>1|

## Resize Feed and Posts
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Resize Feed/Post|This makes the feed/post wider so you can see more content and make more use of your screen.|All|
|Adjust Feed/Post Width|Individually change how wide/narrow the 'Resize Feed' feature makes the home feed, subreddit feed, user profile, post page etc.|All|
|Auto Expand|This will automatically expand the feed/post to 100%, overriding the 'Adjust Feed/Post Width' option if the screen/window is less than the set value (default 1000px).|All|
|Offset Feeds|Individually adjust the horizontal offset for each feed to position it where you want.|3|
|Resize Main Container|Resize the entire content container instead of just the feeds.|3|
|Center Feed/Post|Centers the feed/post to the middle of the screen.|2<br />1|

## Background

|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Custom Background|Add a custom background to the webpage. You can paste and store multiple image links.|All|
|Blur Background|Adds a blur filter to the custom background image.|All|

## Media
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Add fade effect to text post previews|Adds a fade effect to the bottom of long text posts.|3|
|Add Scrollbars To Images|Add a scrollbar to tall images so you can see the full width of the image, but scroll on the image to see more.|3<br />2|
|Compact Post Link Previews|Makes the website image preview of link posts smaller and more compact.|3|
|Hide Background Blur Behind Image Previews|Hides the blurred background on image posts.|3|
|Just Open The Image|This will open just the image in a new tab when you click on it and not be embedded in a page. Only works on Firefox.|All|
|Max Image Post Height|Sets the maximum height of the post content. Note: This may set the image width to less than the "Limit Image Width" value to keep the correct aspect ratio if "Scale Post To Fit Image" is enabled.|3|
|Max Image Width|Limits the maximum post image content width relative to the post.|3|
|Max Video Post Height|Sets the maximum height of the post content. Note: This may set the video width to less than the "Limit Video Width" value to keep the correct aspect ratio if "Scale Post To Fit Video" is enabled.|3|
|Max Video Width|Limits the maximum post video content width relative to the post.|3|
|Replace Images with Links on Feeds|Hide post images and show text links instead on feeds. (Currently doesn't work with NSFW images).|3|
|Replace Videos with Links on Feeds|Hide post videos and show text links instead on feeds. (Only works with .mp4 and .gif videos, .m3u8 links may be unplayable in other players).|3|
|Scale Post To Fit Image|Dynamically scale the post vertically to fit the maximum height of the image.|3|
|Scale Post To Fit Video|Dynamically scale the post vertically to fit the maximum height of the video.|3|
|Add Scrollbar To Long Text Posts|This adds a scrollbar to long text posts on the feed so you can read a bit more. There is a limit.|2|

## Hide Elements
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Hide Blank Thumbnails In Compact View|Hides the blank thumbnails on text posts in "compact view" feeds.|All|
|Hide Blocked Keyword Posts|Hides any post that contains keywords of your choosing.|3<br />1|
|Hide Comment Karma|Hide the karma on comments.|All|
|Hide Community Highlights|Hide the "Community Highlights" section at the top of some subreddits.|3|
|Hide Community Status|Hide the community status icons next to the subreddit name in feeds and the sidebar.|3|
|Hide Home Feed|Hides the home feed entirely.|All|
|Hide NSFW in the Search Results|Hide the type-a-head NSFW search results in the search bar.|3|
|Hide NSFW Posts|Hide any posts marked as NSFW.|All|
|Hide NSFW Users in the Search Page Sidebar|Hide the found NSFW users in the search results page sidebar.|3|
|Hide Post Karma|Hides the karma on posts.|All|
|Hide Post Separators|Hides the line between posts in feeds.|3|
|Hide Promoted Links|Hides the promoted links/posts in the main feed.|All|
|Hide Recent Posts|Hide the recent posts section in the sidebar.|3|
|Hide "Trending Today" in the Search Results|Hide the "Trending Today" section in the search bar.|3|
|Hide the Favourite Buttons|Hide the favourite buttons (star icons) on subreddits in the side menu.|3|
|Hide The Home Sidebar|Hides the sidebar on the reddit home page.|All|
|Hide The Post Back Button|Hides the back button on posts.|3|
|Hide Vote Buttons|Hide the vote buttons on posts and comments.|All|
|Hide Thumbnails in Compact View|Hides the thumbnails on posts when viewing a feed in compact view.|3<br />1|
|Hide Buttons In The Header|This allows you to individually hide the buttons in the header you don't use to clean up the interface.|3<br />2|
|Hide profile pictures in the comments|Simply hides the user profile pictures in the comments of a post.|3<br />2|
|Hide Recommended Posts|Hides recommended/suggested posts, as well as recommended sub reddits in the sidebar.|3<br />2|
|Hide The "Post Hidden" Message|Hides the "Post Hidden" message when you hide a post|3<br />2|
|Hide the Header Bar|Hide the header bar/panel at the top.|3<br />2|
|Hide The Join Button On Posts|Hides the 'Join' button on posts on r/all and r/popular.|3<br />2|
|Hide The Post Sidebar|Hides the sidebar on post pages.|3<br />2|
|Hide The Sub Reddit Sidebar|Hides the sidebar on sub reddit pages.|3<br />2|
|Hide The User Sidebar|Hides the sidebar on profile/user pages.|3<br />2|
|Hide Side Menu|This hides the side menu on the old reddit feed.|3<br />1|
|Auto hide cookie prompt|Automatically hides the cookie popup if you haven't already accepted/dismissed it.|2|
|Hide "See Full Image"|Hides the "See Full Image" button on tall image posts.|2|
|Hide Create Post|You can hide the 'Create Post' bar at the top of your feed if you don't use or want to see it.|2|
|Hide Policies Section|Hides the content/privacy policy section in the sidebar.|2|
|Hide the "Get the best of" Popups|Hide the popups prompting you to turn on notifications.|2|
|Hide the Original Scroll to Top Button|Hides the scroll bar near the bottom of the screen.|2|
|Hide Reddit Premium|Hides the reddit premium section in the sidebar.|2<br />1|
|Hide Username and/or Karma|You can hide your username and/or karma in the top bar.|2<br />1|
|Hide Get New Reddit|Hides the "Get New Reddit" button on old reddit.|1|
|Hide Header subreddit List|Hides the sub reddit list in the header on old reddit.|1|


## Productivity

|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Add 'Scroll To Top' Button|Adds a new button to the header to scroll the page to the top.|All|
|Auto Collapse AutoModerator Comment|Automatically collapses the top comment made by AutoModerator.|All|
|Auto Expand Hidden Comments/Comment Replies|Automatically expand hidden comments on a post as you scroll down.|All|
|Auto Load More Comments|Automatically load more comments on a post if it requires you to click a button to load more comments. (Can cause lag)|All|
|Default Comments Sort Option|Set how you want the comments to be sorted automatically when the page loads.|All|
|Default Feed Sort Option|Set how you want the feed to be sorted automatically when the page loads.|All|
|Show navigation buttons to scroll to the next/previous root comment on a post|Scroll to the next/previous root/first comments on a post.|All|
|Always Show Post Options|Moves the items in the post overflow menu into the header bar for quicker access. You can toggle off any buttons you don't want to see.|3|
|Auto Show Formatting Options When Commenting|Automatically enables the formatting options when commenting on posts.|3|
|Remember Side Menu Section Hidden States|Remember if the sections in the left side menu are open or closed.|3|
|Show Post Author|Shows the missing post author on the home and other feeds.|3|
|Show Post Flair|Shows the missing post flair on the home and other feeds.|3|
|Show Side Menu Toggle Button|Adds a toggle button on the side menu to show/hide the side menu.|3|
|Side Menu Icons Only|A mini version of the side menu where it only shows the icons.|3|
|Side Menu Width|Change the width of the side menu.|3|
|Username Hover Popup Delay|Set a custom delay for when hovering over a username before the user info card pops up.|3|
|Add Post Numbers|Number each post to keep track of how many you have scrolled passed.|3<br />2|
|Show Upvote Percentage in Post View|Show the upvote ratio/percentage next to the post karma.|3<br />2|
|Limit Image Width|Limit the width of the image/video relative to the post when used with "Add Scrollbar To Tall Images" or "Scale Post To Fit Image"|3<br />2|
|Non Sticky Header Bar|Prevents the header bar from staying at the top of the screen as you scroll.|3<br />2|
|Add 'r/All' Button|Adds a new button to the header for 'r/All'.|2|
|Alternative Video Player|Replaces the default reddit video player with videojs. This is more reliable and loads video faster. It also has an option to change the playback speed.|2|
|Always Show Rising Sort Button|The sort by rising button is no longer hidden in a pointless submenu. Can be disabled.|2|
|Break Reminders|Set how often you are reminded how many posts you have scrolled passed.|2|
|Limit Infinity Scroll|This will limit the infinity scroll to show only 25 posts at a time. When you click 'Load More' at the bottom of the feed, it will clear the first 25 posts and show the next 25.|2|
|Move The Feeds Section In The Side Menu To The Top|Move the feeds section in the side menu to the top.|2|
|Open Links to Post in a New Tab|Open posts in a new tab.|2|
|Open Links To Sub Reddit In New Tab|This makes sub reddit links open in a new tab, instead of the current one.|2|
|Post Height|Increase, or decrease, the height of posts on the feed. Default 512px. New range is 304px to 1000px. The post content will adapt to the new size.|2|
|Scale Tall Images To Fit Post|This makes tall images that would otherwise be cropped for being too tall, fit the height of the post.|2|
|Show 'Controversial' Sort Button|Shows the 'Controversial' button in the post sort menus.|2|
|Limit Post Comments|Limit the number of comments on a post, when opened in a dedicated tab/window.|2<br />1|
|Sticky Sort|This keeps the feed sort options "Best, Hot, New, etc" at the top even when you scroll down the page.|2<br />1|
|Show Profile Pictures On Comments|Add user profile pictures to the author's name on comments on Old Reddit.|1|

## Font

|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Resize Font|Individually change the post title, text content and comments font size.|All|
|Font Weight|Change the font weight (boldness) of the post content and comments.|3<br />1|
|Set "san-serif" as UI Font|Sets the user interface font style to "sans-serif".|1|

## Style

|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Add Border to Tables in Posts|Adds a border to tables in post to make them easier to read.|3|
|Border Radius Amount|Sets the border (corner) radius amount for certain elements on the page.|3|
|Compact Header Bar & Side Menu|Compact the spacing in the header bar and side menu.|3|
|Compact Subreddit Rule List|Compact the spacing in the subreddit rule list.|3|
|Custom Header Logo|Set a custom image URL to replace the Reddit header logo.|3 <br />1|
|Display page and user info in the header|Show username and karma in the top right of the header, and add the side menu as a dropdown menu in the header.|3|
|Full Width Subreddit Banner|Stretch the subreddit banners to take the entire width of browser window.|3|
|Hide recommended posts when video ends|Hide the end card of recommended posts when a video ends.|3|
|Multicoloured Comment Thread Lines|Change the colours of the comment thread lines on the post page. You can set custom colours.|3|
|Show the subreddit display name in its banner|Show the display name in the subreddit banner as well as the sub link name.|3|
|Show vote buttons on the left|Move the post vote buttons to the left of the post instead of at the bottom.|3|
|Drop Shadows|This adds a drop shadow around the feed, post and other elements so that they stand out more if you use a background image, or light mode. You can also use custom CSS.|2|
|Hide The Interface Gaps|This will remove all the gaps between the interface elements if you don't like that style.|3<br />2|
|Theme Colours + Blur|You can change various theme colours for the website, and add blur to translucent UI elements.|3<br />2|
|Auto Dark Mode|You can either set it to enable light/dark mode automatically based on your browser theme, or during a certain period of time in the day between user specified times.|2|
|Dark Mode|Auto enable dark mode if not already set on Reddit.|2|
|Larger Classic Post View|Makes the classic post view style slightly larger and more readable.|2<br />1|
|Modernise old reddit|Makes old reddit look more like new reddit.|1|



## Accessibility

|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Bionic Reader|Enable bionic reading for posts and comments. You can also override the font and text background colours.|3<br />2|
|Underline Links|Underline the links in the post content and comments.|3<br />2|

## Other
|Feature|Description|
|---|---|
|Browser Sync|Syncs with your browser account so you can automatically use the same Reddit Enhancer settings on multiple computers.|


# Localisation
Translations are initially done with Google Translate and AI, so there may be errors.

If you speak any of these languages and would like to help correct any issues, that would be greatly appreciated.

Locales for the addon store pages are [here](https://github.com/joelacus/RedditEnhancer/tree/main/store_page_locales).

Feel free to add any new languages and/or region differences.

|Language|Completion|
|---|---|
|[English](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/en/messages.json)|100%|
|[Spanish](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/es/messages.json)|95.2%|
|[German](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/de/messages.json)|100%|
|[French](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/fr/messages.json)|100%|
|[Italian](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/it/messages.json)|95.2%|
|[Dutch](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/nl/messages.json)|95.2%|
|[Portuguese](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/pt/messages.json)|95.2%|
|[Polish](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/pl/messages.json)|83%|
|[Norwegian](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/no/messages.json)|69.9%|
|[Ukrainian](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/uk/messages.json)|69.9%|
|[Swedish](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/sv/messages.json)|51.2%|
|[Finnish](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/fi/messages.json)|33.9%|
|[Czech](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/cs/messages.json)|31.8%|
|[Hungarian](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/hu/messages.json)|27.1%|


# Build
Clone repo and cd to build directory:
```
git clone https://github.com/joelacus/RedditEnhancer.git;cd RedditEnhancer/src-webpack
```
Install dependencies:
```
npm update
```
Build for Firefox:
```
npm run build-m2
```
Build for Chrome:
```
npm run build-m3c
```
Build for Edge:
```
npm run build-m3e
```

# Privacy Policy

Reddit Enhancer is a browser extension that provides tweaks and features for reddit.com. It is in no way officially endorsed or affiliated with Reddit in any way. 

Data Collection:

- Reddit Enhancer does *not* collect or store any personally identifiable information.
- The only data stored are the settings the user enables.

Data Security:

- User settings are stored locally in the browser and are only accessible to Reddit Enhancer  and are not shared externally.
- Reddit Enhancer does *not* use external servers to store or process user data.

Browser Sync:

- If browser sync is enabled by the user, synchronisation of settings is handled by the browser to any other browsers or devices the same user is logged into. Reddit Enhancer does not have any control over the sync process.

Required Permissions:

- Storage. Required for saving and restoring user settings. Reddit Enhancer does not have access to external storage or personal data.
- Tabs. Necessary for communication with open tabs on reddit.com. This is essential for applying features and tweaks within the reddit.com domain. This permission may appear as "Read your browsing history", when installing the extension, but is limited to the current open tabs.
- declarativeNetRequest. Required to redirect the user to their preferred UI if enabled. Also required to open an image directly on its own if opened in a new tab.

Optional Permissions:

- Browser History: "Mark posts as read when opening expandos in Compact view" requires access to the browser history to add the URL of the posts in question to the history, so the browser would see the post as visited and `:visited` CSS pseudo-class would be applied to the post link. Reddit Enhancer does *not* read or modify the browser history in any other way, and this can be later disabled in the browser extension settings.

Third-Party Services:

- None. Reddit Enhancer does *not* utilise any third-party services or APIs.

Contact Information:

- For any privacy-related concerns or inquiries, please open a new Issue.

Changes to This Privacy Policy:

- This privacy policy may be updated to reflect changes in features or legal requirements. Users will be notified of any significant updates via the changelog.

Last Updated: 24/06/2024