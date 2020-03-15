import bcrypt from "bcryptjs";

import { pubsub } from "./helpers";
import { getUsersWithPassword, removePassword, createUser } from "./api.user";

import { setSingleEntity } from "./api";

const ACTIVE_USER = "ACTIVE_USER";
const EVENT_AUTH_STATUS = "AUTH_STATUS";

export function logout() {
  setSingleEntity(ACTIVE_USER, null);
  pubsub.publish(EVENT_AUTH_STATUS, { isAuthenticated: false });
}

export function authSubscribe(cb) {
  return pubsub.subscribe(EVENT_AUTH_STATUS, cb);
}

export async function login({ email, password }) {
  let users = getUsersWithPassword();
  let user = users.find(item => item.email === email);
  if (!user) {
    throw new Error("Invalid user or password");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid user or password");
  }

  const stripedUser = removePassword(user);
  setSingleEntity(ACTIVE_USER, stripedUser);
  return stripedUser;
}

export async function signup({ email, firstName, lastName, password }) {
  let users = getUsersWithPassword();
  let userExists = users.find(item => item.email === email);
  if (userExists) {
    throw new Error("User with this e-mail already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const defaultAvatar =
    "https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png";

  const user = createUser({
    email,
    firstName,
    lastName,
    avatar: defaultAvatar,
    password: hashedPassword
  });

  const stripedUser = removePassword(user);
  setSingleEntity(ACTIVE_USER, stripedUser);
  pubsub.publish(EVENT_AUTH_STATUS, { isAuthenticated: true });
  return stripedUser;
}
