import { Client, Account, Databases, Storage} from 'appwrite';
import { Enviroment } from '$lib/Env/Enviroment';

export namespace Appwrite {
    const client = new Client();
    
    client
        .setEndpoint(Enviroment.appwrite_endpoint)
        .setProject(Enviroment.appwrite_project); // Replace with your project ID

    console.log(Enviroment.appwrite_endpoint, Enviroment.appwrite_project);
    
    
    export const account = new Account(client);
    export const databases = new Databases(client);
    export const storage = new Storage(client);
}
