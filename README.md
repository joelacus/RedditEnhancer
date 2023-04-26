# Reddit Enhancer

A browser extension to tweak the user interface on Reddit.

Supports New Reddit and Old Reddit.

Feel free to suggest new features and report any bugs on the Issues page.

I welcome any help if you would like to improve or contribute new language translations.

## Download
|Firefox|Chrome|Edge|Opera|
|---|---|---|---|
|<p align="center"><a href="https://addons.mozilla.org/en-GB/firefox/addon/reddit-enhancer/" ><img src="/icons/firefox_64x64.png"></a></p>|<p align="center"><a href="https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa"><img src="/icons/chrome_64x64.png"></a></p>|<p align="center"><a href="https://microsoftedge.microsoft.com/addons/detail/reddit-enhancer/cghbjpnahcbdbjokkcfibagpjdjhpdlk"><img src="/icons/edge_64x64.png"></a></p>|<p align="center"><a href="" ><img src="/icons/opera_64x64.png"></a></p>|
|[Download](https://addons.mozilla.org/en-GB/firefox/addon/reddit-enhancer/)|[Download](https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa)|[Download](https://microsoftedge.microsoft.com/addons/detail/reddit-enhancer/cghbjpnahcbdbjokkcfibagpjdjhpdlk)|Pending Review|

## Features
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Expand Feed/Post|This makes the feed/post wider so you can see more content and make more use of your screen.|New/Old|
|Adjust Feed/Post Width|Change how wide/narrow the above feature makes the feed/post.|New/Old|
|Auto Expand|This will automatically expand the feed/post to 100%, overriding the above option if the screen/window is less than the set value (default 1000px).|New|
|Center Feed/Post|Centers the feed/post to the middle of the screen.|New/Old|
|Scale Tall Images To Fit Post|This makes tall images that would otherwise be cropped for being too tall, fit the height of the post.|New|
|Add Scrollbar To Tall Images|This, alternatively from above, adds a scrollbar to tall images so you can see the full width of the image, but scroll on the image to see more.|New|
|Drop Shadows|This adds a drop shadow around the feed, post and other elements so that they stand out more if you use a background image, or light mode.|New|
|Dark Mode|Auto enable dark mode if not already set on Reddit.|New|
|Auto Dark Mode|You can either set it to enable light/dark mode automatically based on your browser theme, or during a certain period of time in the day between user specified times.|New|
|Browser Sync|Syncs with your browser account so you can automatically use the same settings on multiple computers.|New/Old|
|Auto hide cookie prompt|Automatically hides the cookie popup if you haven't already accepted/dismissed it.|New|
|Hide The Interface Gaps|This will remove all the gaps between the interface elements if you don't like that style.|New|
|Hide Create Post|You can hide the 'Create Post' bar at the top of your feed if you don't use or want to see it.|New|
|Sticky Sort|This keeps the feed sort options "Best, Hot, New, etc" at the top even when you scroll down the page.|New/Old|
|Hide The Home Sidebar|Hides the sidebar on the reddit home page.|New/Old|
|Hide The Sub Reddit Sidebar|Hides the sidebar on sub reddit pages.|New|
|Hide Reddit Premium|Hides the reddit premium section in the sidebar.|New/Old|
|Hide Policies Section|Hides the content/privacy policy section in the sidebar.|New|
|Hide Get New Reddit|Hides the "Get New Reddit" button on old reddit.|Old|
|Hide Username and/or Karma|You can hide your username and/or karma in the top bar.|New/Old|
|Hide Buttons In The Header|This allows you to individually hide the buttons in the header you don't use to clean up the interface.|New|
|Always Show Rising Sort Button|The sort by rising button is no longer hidden in a pointless submenu. Can be disabled.|New|
|Open Links To Sub Reddit In New Tab|This makes sub reddit links open in a new tab, instead of the current one.|New|
|Hide Promoted Links|Hides the promoted links/posts in the main feed.|New|
|Add 'Scroll To Top' Button|Adds a new button to the header to scroll the page to the top.|New/Old|
|Add 'r/All' Button|Adds a new button to the header for 'r/All'.|New|
|Move The Feeds Section In The Side Menu To The Top|Move the feeds section in the side menu to the top.|New|
|Alternative Video Player|Replaces the default reddit video player with videojs. This is more reliable and loads video faster. It also has an option to change the playback speed.|New|
|Modernise old reddit|Makes old reddit look more like new reddit.|Old|
|Hide "See Full Image"|Hides the "See Full Image" button on tall image posts.|New|
|Add Scrollbar To Long Text Posts|This adds a scrollbar to long text posts on the feed so you can read a bit more. There is a limit.|New|
|Hide Side Menu|This hides the side menu on the old reddit feed.|Old|
|Hide Header subreddit List|Hides the sub reddit list in the header on old reddit.|Old|
|Limit Post Comments|Limit the number of comments on a post, when opened in a dedicated tab/window.|New/Old|
|Custom Background|Add a custom background to the webpage. You can paste and store multiple image links.|New/Old|
|Blur Background|Adds a blur filter to the custom background image.|New/Old|

## Build
Clone repo and cd to build directory:
```
git clone https://github.com/joelacus/RedditEnhancer.git;cd RedditEnhancer/src-webpack
```
Install dependencies:
```
npm install --save-dev webpack terser-webpack-plugin mini-css-extract-plugin html-minimizer-webpack-plugin css-minimizer-webpack-plugin css-loader copy-webpack-plugin path
```
```
npm --save install video.js
```
Build for manifest version 2:
```
npm run build-m2
```
Build for manifest version 3:
```
npm run build-m3
```
