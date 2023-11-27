import { Client } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Make Appwrite SDK Client To bring back a List of Users
  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("654a0b9907671ec1d044") // Your project ID
    .setKey("8fc8c13d235b4e717c2ab437f35e267dcf8a21d8aa4ebcb16ae59eb93fc00331418ef7d38224ff6b54cebc866b45f99fb797c1738ff42c32763fb6726cc05e2992842f64485fe33f171d01a6cd814ecb4d0ef6cfdd9808a58cb6dac0140426948ed3cfbac1dbbf1333806175928684cb140d9ffb189e2716d0e38c96ccd7df58"); // Your API key

  try {
    const users = await client.users.list();
    return res.json(users);
  }
  catch (e) {
    return error(e);
  }
};
