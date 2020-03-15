import usersData from "./data/users.json";
import {
  getEntity,
  createEntity,
  getSingleEntity,
  seedStorage,
  getEntityById
} from "./api";

const USER_KEY = "USERS";
const ACTIVE_USER = "ACTIVE_USER";

// -------- UTILTIES ---------

export function seedUsers(force = false) {
  seedStorage(USER_KEY, usersData, force);
}
seedUsers();

export function removePassword(user) {
  delete user.password;
  return JSON.parse(JSON.stringify(user));
}
export function getUsersWithPassword() {
  return getEntity(USER_KEY);
}

// -------- API ---------

export function getUsers() {
  const users = getEntity(USER_KEY);
  const passwordLessUsers = users.map(removePassword);
  return passwordLessUsers;
}

export function createUser({ email, firstName, lastName, avatar, password }) {
  const user = createEntity(USER_KEY, {
    email,
    firstName,
    lastName,
    avatar,
    password
  });
  return user;
}

export function getActiveUser() {
  return getSingleEntity(ACTIVE_USER);
}

export function getUserById(id) {
  try {
    return getEntityById(USER_KEY, id);
  } catch (error) {
    console.log(error);
  }
  return;
}

// export async function updateUser({ id, email, firstName, lastName, avatar }) {
//   return updateEntity(USER_KEY, {
//     id,
//     email,
//     firstName,
//     lastName,
//     avatar
//   });
// }
// export async function deleteUserById(id) {
//   return deleteEntity(USER_KEY, id);
// }

// export async function signup({ email, firstName, lastName, password }) {
//   let users = await getUsersWithPassword();
//   let userExists = users.find(item => item.email === email);
//   if (userExists) {
//     throw new Error("User with this e-mail already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const defaultAvatar =
//     "https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png";

//   const user = createEntity(USER_KEY, {
//     email,
//     firstName,
//     lastName,
//     avatar: defaultAvatar,
//     password: hashedPassword
//   });

//   const stripedUser = removePassword(user);
//   setSingleEntity(ACTIVE_USER, stripedUser);
//   return stripedUser;
// }
// export async function login({ email, password }) {
//   let users = await getUsersWithPassword();
//   let user = users.find(item => item.email === email);
//   if (!user) {
//     throw new Error("Invalid user or password");
//   }

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) {
//     throw new Error("Invalid user or password");
//   }

//   const stripedUser = removePassword(user);
//   createEntity(ACTIVE_USER, stripedUser);
//   return stripedUser;
// }
