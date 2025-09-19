import Chat from "../models/Chat.js";

//API  Controller for creating a new Chat
export const createChat = async (req, res) =>{
    try {
        const userId = req.user._id;

        const chatData = {
            userId,
            userName:req.user.name,
            name:"New Chat",
            messages:[],
        }

        await Chat.create(chatData);
        res.json({sucess: true, message: "Chat created"});
    }
    catch (error) {
        res.json({sucess: false, message: error.message});
    }
}

//API Controller for getting all chats
export const getChats = async (req, res) =>{
    try {
        const userId = req.user._id;
        const chats = Chat.find({userId}).sort({updatedAt: -1})

        await Chat.create(chatData);
        res.json({sucess: true, chats});
    }
    catch (error) {
        res.json({sucess: false, message: error.message});
    }
}

//API Controller for deleting a chat
export const deleteChat = async (req, res)=>{
    try {
        const userId = req.user._id;
        const {chatId} = req.body;
        await Chat.findOneAndDelete({_id: userId, userId});
        res.json({sucess: true, message: "Chat Deleted"});
    }
    catch (error) {
        res.json({sucess: false, message: error.message});
    }
}