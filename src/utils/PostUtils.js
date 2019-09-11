import firebase from "../firestore";
import Serializer from "slate-plain-serializer";
// Strips characters from title
export const parseTitle = title => {
  return title.replace(
    /(\s|~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,
    ""
  );
};

// Post validator
// Returns sum of errors in the doc
// OUTPUT:
// 1 === title missing
// 2 === body missing
// 3 === title and body missing
export const validatePost = (title, body) => {
  const titleValue = title.trim().length === 0 ? 1 : 0;

  const bodyValue = Serializer.serialize(body).trim().length === 0 ? 2 : 0;

  return titleValue + bodyValue;
};

// Get individual post
export const getPostById = id => {
  const db = firebase.firestore();
  const postsRef = db.collection("posts");
  const docRef = postsRef.doc(id);

  return docRef.get();
};
