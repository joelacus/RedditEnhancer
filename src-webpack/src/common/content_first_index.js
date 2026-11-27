/* ===== Content First Index ===== */

// Loads before the DOM has finished loading.

import './content_first/functions/comment_limiter';
import './content_first/functions/default_sort_option';
import { checkBlockedSubredditPage, watchForBlockedSubredditPage } from './content_first/functions/block_subreddit_page';
import './content_first/init';

// Redirect away from page-scoped blocked subreddits before Reddit paints them.
checkBlockedSubredditPage({ initial: true });
watchForBlockedSubredditPage();
