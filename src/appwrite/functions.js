import { ID } from "appwrite";
import { account, database, appwriteConfig } from "./config";


// Authentication functions
export async function createContact({
    name,
    email,
    password,
    phone_number,
    role
}){
    try {
        
        const contactInAuth = await account.create(
            ID.unique(),
            email,
            password
        )

        if (!contactInAuth) {
            throw "Failed to create contact in Auth"
        }

        const contactInDB = await database.createDocument(
            appwriteConfig.database_id,
            appwriteConfig.contacts_collection_id,
            contactInAuth.$id,
            {
                name,
                email,
                phone_number,
                role
            }
        )

        if (!contactInDB) {
            throw "Failed to create new contact in Database"
        }

        return {
            success: true,
            message: "New contact created",
            data: contactInDB
        }

    } catch (error) {
        console.log("Failed to create new contact", error)
        throw error
    }
}

export async function loginContact({email,password}) {
    try {

        const session = await account.createEmailPasswordSession(email, password)

        if (!session) {
            throw "Failed to login contact"
        }

        return {
            success: true,
            message: "contact logged in",
            data: session
        }
        
    } catch (error) {
        console.log("Failed to login contact", error)
        throw error
    }
}

export async function logoutContact(){
    try {

        await account.deleteSession('current')

        return {
            success: true,
            message: "Logged Out"
        }
        
    } catch (error) {
        console.log("Failed to logout contact", error)
        throw error
    }
}

// Database functions
export async function createCompany({
    name,
    description,
    address,
    type,
    founded_at,
    contactId
}){
    try {
        
        const companyInDB = await database.createDocument(
            appwriteConfig.database_id,
            appwriteConfig.companies_collection_id,
            ID.unique(),
            {
                name,
                description,
                address,
                type,
                founded_at
            }
        )

        if(!companyInDB) {
            throw "Failed to create company"
        }

        const contactInDB = await database.updateDocument(
            appwriteConfig.database_id,
            appwriteConfig.contacts_collection_id,
            contactId,
            {
                company: companyInDB.$id
            }
        )

        if (!contactInDB) {
            throw "Contact not found with given contactId"
        }

        return {
            success: true,
            message: "New company created",
            data: companyInDB
        }

    } catch (error) {
        console.log("Failed to create new company", error)
        throw error
    }
}