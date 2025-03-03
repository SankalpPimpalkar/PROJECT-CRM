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
            password,
            name
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

export async function getCurrentUserDetails() {
    try {

        const userAuth =  await account.get()

        if(!userAuth) {
            throw "Failed to get user details"
        }

        const userDetails = await database.getDocument(
            appwriteConfig.database_id,
            appwriteConfig.contacts_collection_id,
            userAuth.$id
        )

        return {
            success: true,
            message: "User details fetched successfully",
            data: userDetails
        }
        
    } catch (error) {
        console.log("Failed to get user", error)
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

export async function createInteraction({type, notes, contactId}) {
    try {

        const newInteraction = await database.createDocument(
            appwriteConfig.database_id,
            appwriteConfig.interactions_collection_id,
            ID.unique(),
            {
                type,
                notes,
                contact: contactId
            }
        )

        if (!newInteraction) {
            throw "Failed to create new interaction"
        }

        return {
            success: true,
            message: "New Interaction created",
            data: newInteraction
        }
        
    } catch (error) {
        console.log("Failed to create new interaction", error)
        throw error
    }
}

export async function createDeal({contactId, expected_close_date, deal_amount}) {
    try {
        
        const newDeal = await database.createDocument(
            appwriteConfig.database_id,
            appwriteConfig.deals_collection_id,
            ID.unique(),
            {
                contact: contactId,
                expected_close_date,
                deal_amount
            }
        )

        if(!newDeal){
            throw "Failed to create new deal"
        }

        return {
            success: true,
            message: "New deal created",
            data: newDeal
        }

    } catch (error) {
        console.log("Failed to create new deal", error)
        throw error
    }
}