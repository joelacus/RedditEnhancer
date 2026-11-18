# Reddit Enhancer

A browser extension to tweak the user interface on Reddit.

Supports Reddit Version 1 (Old) and Version 3 (Reddit's current UI).<br>
*Not all features support both versions.*

Feel free to suggest new features and report any bugs on the Issues page.

Some features may stop working due to website updates. Please let me know if you find any issues.

I welcome any help if you would like to improve or contribute new language translations. [Completion List](#localisation)

# Download

<table class="download">
    <thead>
        <tr>
            <th class="cell"></th>
            <th class="cell" colspan="5">Chromium Based</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="cell">Firefox</td>
            <td class="cell">Edge</td>
            <td class="cell">Chrome</td>
            <td class="cell">Brave</td>
            <td class="cell">Opera</td>
            <td class="cell">Vivaldi</td>
        </tr>
        <tr>
            <td class="cell"><a href="https://addons.mozilla.org/en-GB/firefox/addon/reddit-enhancer/"><img src="/icons/firefox_64x64.png"></a></td>
            <td class="cell"><a href="https://microsoftedge.microsoft.com/addons/detail/reddit-enhancer/cghbjpnahcbdbjokkcfibagpjdjhpdlk"><img src="/icons/edge_64x64.png"></a></td>
            <td class="cell"><a href="https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa"><img src="/icons/chrome_64x64.png"></a></td>
            <td class="cell"><a href="https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa"><img src="/icons/brave_64x64.png"></a></td>
            <td class="cell"><a href="https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa"><img src="/icons/opera_64x64.png"></a></td>
            <td class="cell"><a href="https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa"><img src="/icons/vivaldi_64x64.png"></a></td>
        </tr>
        <tr>
            <td class="cell"><a href="https://addons.mozilla.org/en-GB/firefox/addon/reddit-enhancer/">Download</a></td>
            <td class="cell"><a href="https://microsoftedge.microsoft.com/addons/detail/reddit-enhancer/cghbjpnahcbdbjokkcfibagpjdjhpdlk">Download</a></td>
            <td class="cell" colspan="5"><a href="https://chrome.google.com/webstore/detail/reddit-enhancer/onglbklimdjicpdadjieknodkkmjldoa">Download</a></td>
        </tr>
    </tbody>
</table>

# Features
[Redirect](#redirect) |[User Tagging](#user-tagging) |[Block](#block) | [Resize Feed](#resize-feed-and-posts) | [Background](#background) | [Hide Elements](#hide-elements) | [Productivity](#productivity) | [Font](#font) | [Style](#style) | [Accessibility](#accessibility) | [Other](#other)

## Version Info
|Reddit Version|Common Name|Official Name|
|:---:|:---:|:---:|
|3|New New UI|Mobile Web UI|
|1|Old UI|Old|

## Redirect
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Auto Redirect To Preferred Reddit Version/UI|Automatically redirect Reddit pages to the Reddit UI version you prefer. (Version 2 is no longer supported.)|3<br>1|

## User Tagging
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Enable User Tagging|Adds options to create and show custom tags/labels next to usernames. Optionally add a longer note for more information. User tags are only stored locally and not synced with the browser, but supports exporting to a backup file. Also supports importing user tags from RES backup files. Create preset tags to quickly add frequently used tags to users.|3<br>1|

## Block
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Hide Posts with Blocked Keywords|Hide all posts whose title contains a certain keyword(s). Supports regex (regular expressions) and `*` wildcards.|3<br>1|
|Hide Posts by Blocked Users|Hide all posts that are created by a certain user(s). Supports regex (regular expressions) and `*` wildcards. An inline "Block user" button is added next to each post author.|3<br>1|
|Hide "Link" Posts by Keywords in URL|Hide all posts that link to a URL containing certain keyword(s). Supports regex (regular expressions) and `*` wildcards.|3<br>1|
|Hide Posts by Subreddit|Hide all posts from a certain subreddit(s). Supports regex (regular expressions) and `*` wildcards. Not enabled for subreddit feeds. An inline "Block subreddit" button is added next to the subreddit name.|3<br>1|
|Hide Comments by Keyword|Hide all comments whose text contains a certain keyword(s). Supports regex (regular expressions) and `*` wildcards.|3<br>1|
|Hide Comments by User|Hide all comments created by a certain user(s). Supports regex (regular expressions) and `*` wildcards. An inline "Block user" button is also added next to each comment author.|3<br>1|

## Resize Feed and Posts
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Resize Feed/Post|Makes the feed/post wider so you can see more content and make more use of your screen.|3<br>1|
|Snap Sidebar to the Right Edge|Removes the width limit on the v3 content container so the side menu sits flush against the right-hand edge. The change is applied the next time the page loads.|3|
|Adjust Feed/Post Width|Individually change how wide/narrow the 'Resize Feed' feature makes the home feed, subreddit feed, user profile, post page etc. The topic feed width is v3 only.|3<br>1|
|Auto Expand|Automatically expand the feed/post to 100%, overriding the 'Adjust Feed/Post Width' option if the screen/window is less than the set value (default 1000px).|3|
|Offset Feeds|Individually adjust the horizontal offset for each feed to position it where you want.|3|
|Resize Main Container|Resize the entire content container instead of just the feeds.|3|
|Center Feed/Post|Centers the feed/post to the middle of the screen.|1|
|Side Menu Width|Set the width of the v3 side menu.|3|

## Background
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Solid Colour|Set a simple solid colour as the page background.|3<br>1|
|Image|Add a custom background image to the webpage. You can paste and store multiple image links.|3<br>1|
|Blur Background|Adds a blur filter to the custom background image.|3<br>1|

## Media
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Autoplay Videos|Autoplay videos on feeds (not GIFs).|3|
|Autoplay GIFs|Autoplay GIFs on feeds (not videos).|3|
|Autoplay Comment GIFs|Autoplay GIFs in comments on post pages.|3|
|Numbered Post Images|Append numbers to each image in a post gallery.|3<br>1|
|Add "Download Video" Button|Adds a button to video posts to download the video. It currently only supports mp4 URLs, not m3u8, so some posts will not have the download button.|3|
|Add fade effect to text post previews|Adds a fade effect to the bottom of long text posts.|3|
|Add Scrollbars To Images|Add a scrollbar to tall images so you can see the full width of the image, but scroll on the image to see more.|3|
|Compact Post Link Previews|Makes the website image preview of link posts smaller and more compact.|3|
|Hide Background Blur Behind Image Previews|Hides the blurred background on image posts.|3|
|Just Open The Image|Opens just the image in a new tab when you click on it, instead of embedding it in a page.|3<br>1|
|Max Image Post Height|Sets the maximum height of the post content. Note: This may set the image width to less than the "Max Image Width" value to keep the correct aspect ratio if "Scale Post To Fit Image" is enabled.|3|
|Max Image Width|Limits the maximum post image content width relative to the post.|3|
|Max Video Post Height|Sets the maximum height of the post content. Note: This may set the video width to less than the "Max Video Width" value to keep the correct aspect ratio if "Scale Post To Fit Video" is enabled.|3|
|Max Video Width|Limits the maximum post video content width relative to the post.|3|
|Gallery Keyboard Navigation|Use the left and right arrow keys to navigate post image galleries.|3|
|Replace Images with Links on Feeds|Hide post images and show text links instead on feeds. (Currently does not work with NSFW images).|3|
|Replace Videos with Links on Feeds|Hide post videos and show text links instead on feeds. (Only works with .mp4 and .gif videos, .m3u8 links may be unplayable in other players).|3|
|Scale Post To Fit Image|Dynamically scale the post vertically to fit the maximum height of the image.|3|
|Scale Post To Fit Video|Dynamically scale the post vertically to fit the maximum height of the video.|3|
|Hide recommended posts when video ends|Hide the end card of recommended posts when a video ends.|3|

## Hide Elements
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Hide all the comments under a post|Completely hide all the comments under a post. On v1 the create new comment input is hidden as well.|3<br>1|
|Hide Announcement Notifications|Hide Reddit announcement notifications (u/reddit) from your notifications list.|3|
|Hide Gamification Notifications|Hide Reddit gamification notifications from your notifications list.|3|
|Hide Blank Thumbnails in Compact View|Hides the blank thumbnails on text posts in "compact view" feeds.|3<br>1|
|Hide Thumbnails in Compact View|Hides the thumbnails on posts when viewing a feed in compact view.|3<br>1|
|Hide Comment Karma|Hide the karma on comments.|3<br>1|
|Hide Post Karma|Hide the karma on posts.|3<br>1|
|Hide "Community Highlights"|Hide the "Community Highlights" section at the top of some subreddits.|3|
|Hide Community Status|Hide the community status icons next to the subreddit name in feeds and the sidebar.|3|
|Hide Get New Reddit|Hides the "Get New Reddit" button on old reddit.|1|
|Hide Header subreddit List|Hides the subreddit list in the header on old reddit.|1|
|Hide "Join the conversation"|Hide the create new comment "Join the conversation" input box from the post page.|3|
|Hide "Join the conversation" at the bottom of the page|Hide the create new comment "Join the conversation" input box from appearing at the bottom of the post page as you scroll.|3|
|Hide Username and/or Karma|Hide the username and/or the karma in the top bar.|1|
|Hide NSFW in the Search Results|Hide the type-ahead NSFW search results in the search bar.|3|
|Hide NSFW Users in the Search Page Sidebar|Hide the found NSFW users in the search results page sidebar.|3|
|Hide NSFW/L Posts|Hide any posts marked as NSFW/L.|3<br>1|
|Hide post and sidebar dividers|Hides the line between posts in feeds, and the dividers in the subreddit and post sidebars. A "Post Gap" slider sets the spacing between posts.|3|
|Hide profile pictures in the comments|Simply hides the user profile pictures in the comments of a post.|3|
|Hide Promoted Links|Hides the promoted links/posts in the main feed.|3<br>1|
|Hide Recent Posts|Hide the recent posts section in the sidebar.|3|
|Hide Recommended Posts|Hides recommended/suggested posts in the feed.|3|
|Hide Reddit Premium|Hides the Reddit Premium section in the sidebar.|1|
|Hide Related Communities|Hide the 'Related Communities' section on subreddit pages.|3|
|Hide Related Posts|Hide the "Related Posts" section in the sidebar.|3|
|Hide Buttons In The Header|Individually hide the buttons in the header you do not use to clean up the interface. The Moderation button is v1 only, the Advertise and Create Post buttons are v3 only, and the Chat and Notification buttons are available on both.|3<br>1|
|Hide "Give Awards" Button|Hides the 'Give Awards' button on comments and posts.|3|
|Hide "Get App" Button|Hides the "Get App" button in the header bar.|3|
|Hide the Favourite Buttons|Hide the favourite buttons (star icons) on subreddits in the side menu.|3|
|Hide the Header Bar|Hide the header bar/panel at the top.|3|
|Hide the Home Feed|Hides the home feed entirely.|3<br>1|
|Hide the Home Sidebar|Hides the sidebar on the reddit home page.|3<br>1|
|Hide the "Join" Button On Posts|Hides the 'Join' button on posts on r/all and r/popular.|3|
|Hide the page footer text|Hide the text at the bottom of the sidebars.|3|
|Hide the Post Back Button|Hides the back button on posts.|3|
|Hide the "Post Hidden" Message|Hides the "Post Hidden" message when you hide a post.|3|
|Hide the Post Sidebar|Hides the sidebar on post pages.|3|
|Hide The Sub Reddit Sidebar|Hides the sidebar on sub reddit pages.|3|
|Hide the User Sidebar|Hides the sidebar on profile/user pages.|3|
|Hide the "Repost" Button|Hide the "Repost" button on posts.|3|
|Hide Logo in the Search Bar|Hides the Reddit logo in the search bar.|3|
|Hide Search Bar Trending Sections|Hide the trending searches and subreddits in the search bar.|3|
|Hide username in the subreddit sidebar flair section|Hides the username and profile picture in the edit flair section of the subreddit sidebar.|3|
|Hide Vote Buttons|Hide the vote buttons on posts and comments.|3<br>1|
|Hide the Side Menu|Hides the side menu (on v1 the feed side menu, on v3 the left side menu).|3<br>1|
|Side Menu Toggle Button|Adds a toggle button to show/hide the side menu.|3<br>1|
|Side Menu Icons Only|A mini version of the side menu where it only shows the icons.|3|
|Hide Side Menu Sections|Hide individual sections of the side menu (Top, Games, Moderation, Recent Subreddit, Custom Feeds, Communities, Topics and Resources).|3|
|Remember Side Menu Section Hidden States|Remember if the sections in the left side menu are open or closed.|3|
|Replace Search Bar Placeholder|Change the "Find Anything" placeholder text in the search bar back to "Search Reddit". Only applies to the home and popular feeds.|3|
|Use the Original Search Bar|Hides the new AI "Ask" button and the orange glow from the search bar, returning it to how it was before.|3|
|Hide the Search Sidebar|Hide the sidebar on the search results page.|3|
|Hide the Custom Feed Sidebar|Hide the sidebar on custom feeds.|3|
|Subreddit Sidebar Whitelist / Blacklist|Only hide (or only show) the subreddit sidebar for the subreddits you list.|3|

## Productivity
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Add "Scroll To Top" Button|Adds a new button to the header to scroll the page to the top.|3<br>1|
|Add floating "Scroll To Top" button|Adds a draggable scroll to top button on the webpage.|3<br>1|
|Feed Keyboard Navigation|Scroll to the next/previous post in the feed with (J / Down Arrow) and (K / Up Arrow). Differs from Reddit's version by using smooth scroll, and skips over any hidden posts by RE (e.g. "Hide NSFW posts" or "Hide posts containing a keyword" etc).|3<br>1|
|Auto Expand Compact Posts|Automatically expand compact posts when scrolling to them with the feed keyboard navigation.|3<br>1|
|Add a button to each post to mark it as read|Adds a button to each post in Compact view to mark it as read by adding the post URL to the browser history (requires the history permission). Requires "Mark posts as read when opening expandos" to be enabled.|3|
|Mark posts as read when opening expandos in Compact view|When you open a Compact view comment, it will add the post URL to your browser history to mark it as visited/read.|3|
|Add link to view crossposts in other subreddits|View crossposts of a post on the comments page, bringing back the "View discussions in other communities" link.|3|
|Add Post Numbers|Number each post to keep track of how many you have scrolled passed.|3|
|Always Show Post Options|Moves the items in the post overflow menu into the post action bar for quicker access. You can toggle off any buttons you do not want to see.|3|
|Always Show Comment Options|Moves the items in the comment overflow menu into the comment action bar for quicker access. You can toggle off any buttons you do not want to see.|3|
|Remove icons from most comment buttons|This will hide any icons from the buttons in the action bar, if "Always Show Comment Options" is enabled.|3|
|Auto Collapse AutoModerator Comment|Automatically collapses the top comment made by AutoModerator.|3<br>1|
|Auto Expand & Load More Comments|Automatically load more and expand hidden comments on a post as you scroll down the page. This optionally can just be applied to negative karma comments that are collapsed by default.|3<br>1|
|Show Profile Pictures On Comments|Add user profile pictures to the author's name on comments on Old Reddit.|1|
|Better Comment Box|Automatically shows the formatting options when commenting, adds a Ctrl/Cmd + Enter shortcut to submit the comment, and hides the rich-text-editor toolbar toggle.|3|
|Canned Messages|Create a list of frequently used messages/comments and copy them to the clipboard from the right click menu.|3<br>1|
|Clean Link|Add a share option to copy post/comment links without tracking parameters. Optionally shorten to redd.it format.|3<br>1|
|Default Home Feed Sort Option|Set how you want the home feed to be sorted automatically when the page loads.|3<br>1|
|Default Feed Sort Option|Set how you want the subreddit and custom feeds to be sorted automatically when the page loads.|3<br>1|
|Default Comments Sort Option|Set how you want the comments to be sorted automatically when the page loads.|3<br>1|
|Filter Communities List|Adds a filter input at the top of the communities list in the side menu to quickly filter subreddits.|3|
|Force Show Vote Buttons|Show the upvote and downvote buttons on old Reddit, even when certain subreddits choose to hide them.|1|
|Limit Post Comments|Limit the number of comments on a post, when opened in a dedicated tab/window.|1|
|Non Sticky Header Bar|Prevents the header bar from staying at the top of the screen as you scroll.|3|
|Open Links to Post in a New Tab|Open posts in a new tab.|3|
|Open Links To Sub Reddit In New Tab|This makes sub reddit links open in a new tab, instead of the current one.|3|
|Show Absolute Timestamps On Comments|Show the full time and date a comment was published next to the relative timestamp. The date and time format can be customised.|3<br>1|
|Show Absolute Timestamps On Posts|Show the full time and date a post was published next to the relative timestamp in the post credit bar. The date and time format can be customised.|3<br>1|
|Show navigation buttons to scroll to the next/previous root comment on a post|Scroll to the next/previous root/first comments on a post.|3<br>1|
|Show Post Author|Shows the missing post author on the home and other feeds.|3|
|Show Post Flair|Shows the missing post flair on the home and other feeds.|3|
|Show Subreddit Member Count|Show the legacy subreddit member count on subreddit pages.|3<br>1|
|Show Upvote Percentage in Post View|Show the upvote ratio/percentage next to the post karma. Also applied to comment pages.|3|
|Sticky Sort|This keeps the feed sort options "Best, Hot, New, etc" at the top even when you scroll down the page.|1|
|Username Hover Popup Delay|Set a custom delay for when hovering over a username before the user info card pops up.|3|

## Font
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Resize Font|Individually change the post title, text content and comments font size.|3<br>1|
|Font Weight|Change the font weight (boldness) of the post content and comments.|3<br>1|
|Set "sans-serif" as UI Font|Sets the user interface font style to "sans-serif".|1|

## Style
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Add Border to Tables in Posts|Adds a border to tables in posts to make them easier to read.|3|
|Border Radius Amount|Sets the border (corner) radius amount for certain elements on the page.|3|
|Compact Header Bar & Side Menu|Compact the spacing in the header bar, the side menu and the subreddit rule list.|3|
|Custom Header Logo|Set a custom image URL to replace the Reddit header logo.|3<br>1|
|Display page and user info in the header|Show username and karma in the top right of the header, and add the side menu as a dropdown menu in the header.|3|
|Opt Out of the Header Side Menu|Turn off the side menu being added to the header, keeping the username and karma.|3|
|Drop Shadows|This adds a drop shadow around the feed, post and other elements so that they stand out more if you use a background image, or light mode. You can also use custom CSS.|3|
|Force Reddit Dark Mode|Force Reddit to use dark mode by replacing the theme-light and theme-beta classes with theme-dark.|3|
|Full Width Subreddit Banner|Stretch the subreddit banners to take the entire width of the browser window. Also moves the sort dropdown.|3|
|Multicoloured Comment Thread Lines|Change the colours of the comment thread lines on the post page. You can set custom colours.|3|
|Show the subreddit display name in its banner|Show the display name in the subreddit banner as well as the sub link name. Only applies on screens 960px wide or wider.|3|
|Show vote buttons on the left|Move the post vote buttons to the left of the post instead of at the bottom.|3|
|Highlight comments from the original poster (OP)|On a post comment page, highlight any comments made by the original poster.|3|
|Hide The Interface Gaps|This will remove all the gaps between the interface elements if you do not like that style.|3|
|Theme Colours + Blur|You can change various theme colours for the website, and add blur to translucent UI elements.|3|
|Theme Colour Whitelist / Blacklist|Apply the custom theme colours only to the subreddits you list, or to all of them except the ones you list.|3|
|Hide Avatar Border|Remove the border around the profile avatar.|3|
|Scale Profile Avatar|Make the profile page avatar in the header up to 5 times larger.|3|
|Show Post Thumbnails on the Right Side|Move the post thumbnails to the right-hand side of the post listing.|1|
|Larger Classic Post View|Makes the classic post view style slightly larger and more readable.|1|
|Modernise old reddit|Makes old reddit look more like new reddit.|1|
|Classic Old UI|Attempt to replicate the 2005-2008 Reddit interface design.|1|

## Accessibility
|Feature|Description|Reddit Version Support|
|---|---|:---:|
|Bionic Reader|Enable bionic reading for posts and comments. You can also override the font and text background colours.|3|
|Underline Links|Underline the links in the post content and comments.|3|

## Other
|Feature|Description|
|---|---|
|Browser Sync|Syncs with your browser account so you can automatically use the same Reddit Enhancer settings on multiple computers. (Always enabled if you have browser sync enabled in your browser).|
|Backup & Restore Settings|Export your settings to a JSON file (everything, settings only, blocks only or user tags only) and restore them later.|
|Extension Settings|Set the language of the extension, the extension theme, the background upload resolution, view your storage usage and reset your settings.|
|Options Page|A full-page version of the popup, for when the popup is too small to work in comfortably.|
|Block Manager|Manage your block lists (users, subreddits and keywords) in a dedicated page with search, sorting and bulk editing.|
|User Tag Manager|Manage your user tags in a dedicated page with search, sorting and bulk editing.|
|Changelog & Update Check|See what has changed in the latest version, and check GitHub for a newer release.|

# Localisation
Translations are initially done with Google Translate and AI, so there may be errors.

If you speak any of these languages and would like to help correct any issues, that would be greatly appreciated.

Locales for the addon store pages are [here](https://github.com/joelacus/RedditEnhancer/tree/main/store_page_locales).

Feel free to add any new languages and/or region differences.

|Language|Completion|
|---|---|
|[English](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/en/messages.json)|100%|
|[Czech](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/cs/messages.json)|100%|
|[Dutch](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/nl/messages.json)|100%|
|[Finnish](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/fi/messages.json)|100%|
|[French](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/fr/messages.json)|100%|
|[German](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/de/messages.json)|100%|
|[Hungarian](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/hu/messages.json)|100%|
|[Italian](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/it/messages.json)|100%|
|[Norwegian](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/no/messages.json)|100%|
|[Polish](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/pl/messages.json)|100%|
|[Portuguese](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/pt/messages.json)|100%|
|[Simplified Chinese](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/zh-CN/messages.json)|100%|
|[Spanish](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/es/messages.json)|100%|
|[Swedish](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/sv/messages.json)|100%|
|[Ukrainian](https://github.com/joelacus/RedditEnhancer/blob/main/src-webpack/src/common/_locales/uk/messages.json)|100%|

# Build
Clone repo and cd to build directory:
```
git clone https://github.com/joelacus/RedditEnhancer.git;cd RedditEnhancer/src-webpack;git switch dev
```
Install dependencies:
```
npm i
```
Build for Firefox:
- development: `npm run build-dev-f`
- production: `npm run build-f`

Build for Chromium based browsers:
- development: `npm run build-dev-c`
- production: `npm run build-c`

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

- Storage: Required for saving and restoring user settings. Reddit Enhancer does not have access to external storage or personal data.
- Tabs: Necessary for communication with open tabs on reddit.com. This is essential for applying features and tweaks within the reddit.com domain. This permission may appear as "Read your browsing history", when installing the extension, but is limited to the current open tabs.
- declarativeNetRequest: Required to redirect the user to their preferred UI if enabled. Also required to open an image directly on its own if opened in a new tab.
- contextMenus: Required for the "Canned Messages" feature. This feature creates a submenu with frequently used messages, added by the user, to quickly copy them to the clipboard. This permission cannot be optional, but is considered a "safe" permission.

Optional Permissions:

- Browser History: "Mark posts as read when opening expandos in Compact view" requires access to the browser history to add the URL of the posts in question to the history. This is so that the browser would see the post/URL as visited and the `:visited` CSS pseudo-class would be applied to the post link. Reddit Enhancer does *not* read the browser history, nor modify it in any other way. This permission can be revoked in the browser extension settings at any time (Firefox only).
- Downloads: "Add 'Download Video' button to posts" requires this permission to download post videos to your computer. This permission can be revoked in the browser extension settings at any time (Firefox only).

Third-Party Services:

- None. Reddit Enhancer does *not* utilise any third-party services or APIs. Only Reddit APIs are used for certain features.

Contact Information:

- For any privacy-related concerns or inquiries, please open a new Issue.

Changes to This Privacy Policy:

- This privacy policy may be updated to reflect changes in features or legal requirements. Users will be notified of any significant updates via the changelog.

Last Updated: 08/04/2026
