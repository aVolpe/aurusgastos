// https://reqres.in/
import { uuid, storage } from "./helpers";

export function seedStorage(key, data, force = true) {
  let dataExists = storage.get(key);
  if (!dataExists) {
    storage.set(key, data);
  }
}

//  ----------- DATABASE ---------
let deepClone = data => {
  return JSON.parse(JSON.stringify(data));
};

export function setSingleEntity(entity, data) {
  storage.set(entity, data);
  return data;
}
export function getSingleEntity(entity) {
  return storage.get(entity);
}

export function getEntity(entity) {
  let data = storage.get(entity) || [];
  return deepClone(data);
}
export function getEntityById(entity, id) {
  let entities = storage.get(entity);
  const data = entities.find(item => item.id === id);
  if (!data) throw new Error("User not found");
  return data;
}
export function createEntity(entity, data) {
  let newEntity = {
    ...data,
    id: uuid(),
    createdAt: new Date()
  };

  let items = storage.get(entity) || [];
  items.push(newEntity);
  storage.set(entity, items);

  return deepClone(newEntity);
}
export function updateEntity(entity, newData) {
  let entities = storage.get(entity);

  let exists = entities.find(item => item.id === newData.id);
  if (!exists)
    throw new Error(`${entity} with id ${newData.id} does not exists.`);

  entities = entities.map(item => {
    return item.id === newData.id ? newData : item;
  });

  storage.set(entity, entities);
  return deepClone(newData);
}
export function deleteEntity(entity, id) {
  let entities = storage.get(entity);
  let item = entities.find(item => item.id === id);
  if (!item) throw new Error("Item not found");
  entities = entities.filter(item => item.id !== id);

  storage.set(entity, entities);
  return { id };
}

export default {
  getEntity: getEntity,
  getEntityById: getEntityById,
  createEntity: createEntity,
  updateEntity: updateEntity,
  deleteEntity: deleteEntity
};
