import { Client, Account, Databases } from "appwrite";

const appwriteConfig = {
	project_id: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    project_url: import.meta.env.VITE_APPWRITE_ENDPOINT,
	database_id: import.meta.env.VITE_APPWRITE_DATABASE_ID,
	companies_collection_id: import.meta.env
		.VITE_APPWRITE_COMPANIES_COLLECTION_ID,
	contacts_collection_id: import.meta.env
		.VITE_APPWRITE_CONTACTS_COLLECTION_ID,
	deals_collection_id: import.meta.env
		.VITE_APPWRITE_DEALS_COLLECTION_ID,
	interactions_collection_id: import.meta.env.VITE_APPWRITE_INTERACTIONS_COLLECTION_ID
};
const client = new Client();

client
	.setProject(appwriteConfig.project_id)
	.setEndpoint(appwriteConfig.project_url);

const account = new Account(client);
const database = new Databases(client)

export { account, database, appwriteConfig };