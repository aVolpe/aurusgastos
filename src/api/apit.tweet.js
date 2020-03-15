import { pubsub } from "./helpers";
import tweetsData from "./data/tweets";
import { createEntity, getEntity, seedStorage } from "./api";

const TWEET_KEY = "TWEET_KEY";
const NEW_TWEET = "NEW_TWEET";

// ----- UTILITIES -----

export async function seedTweets(force = false) {
  seedStorage(TWEET_KEY, tweetsData, force);
}
seedTweets();

// ----- API -----

export async function create({ message, user }) {
  let tweet = {
    message,
    user
  };

  let newTweet = await createEntity(TWEET_KEY, tweet);

  pubsub.publish(NEW_TWEET, { new: newTweet });
  return newTweet;
}

export async function getTweets() {
  let tweets = getEntity(TWEET_KEY);
  let orderedTweets = tweets.reverse();
  return orderedTweets;
}

export function subscribe(cb) {
  return pubsub.subscribe(NEW_TWEET, cb);
}
