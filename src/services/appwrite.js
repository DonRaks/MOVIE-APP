// ===============================
// Appwrite Setup
// ===============================

import { Client, Databases, ID, Query } from "appwrite";

// ===============================
// ENV VARIABLES
// ===============================
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

// ===============================
/*
CREATE CLIENT CONNECTION
*/
// ===============================
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

// ===============================
/*
DATABASE INSTANCE
*/
// ===============================
const databases = new Databases(client);

// ===============================
// SAVE SEARCH (TRENDING LOGIC)
// ===============================
export const saveSearch = async (movie) => {
  try {

    // Check if movie exists
    const existing = await databases.listDocuments(
      DATABASE_ID,
      TABLE_ID,
      [Query.equal("movieId", movie.id.toString())]
    );

    if (existing.documents.length > 0) {

      const doc = existing.documents[0];

      // update count
      return await databases.updateDocument(
        DATABASE_ID,
        TABLE_ID,
        doc.$id,
        {
          count: doc.count + 1
        }
      );
    }

    // create new row
    return await databases.createDocument(
      DATABASE_ID,
      TABLE_ID,
      ID.unique(),
      {
        movieId: movie.id.toString(),
        title: movie.title,
        posterPath: movie.poster_path,
        count: 1
      }
    );

  } catch (err) {
    console.error(err);
  }
};

// ===============================
// GET TRENDING SEARCHES
// ===============================
export const getTrendingSearches = async () => {
  try {

    const res = await databases.listDocuments(
      DATABASE_ID,
      TABLE_ID,
      [
        Query.orderDesc("count"),
        Query.limit(10)
      ]
    );

    return res.documents;

  } catch (err) {
    console.error(err);
    return [];
  }
};