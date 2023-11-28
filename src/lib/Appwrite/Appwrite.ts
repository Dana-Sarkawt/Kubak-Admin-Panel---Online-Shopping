import {Client, Account, Databases, Storage, Functions} from 'appwrite';
import {Environment} from '$lib/Env/Environment';

export namespace Appwrite {
    const client = new Client();

    client
        .setEndpoint(Environment.appwrite_endpoint)
        .setProject(Environment.appwrite_project); // Replace with your project ID

    export const account = new Account(client);
    export const databases = new Databases(client);
    export const storage = new Storage(client);
    export const functions = new Functions(client);
}
