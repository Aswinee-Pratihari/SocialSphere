const conf = {
  appwrite_url: String(import.meta.env.VITE_APPWRITE_URL),
  appwrite_database_id: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwrite_post_collection_id: String(
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID
  ),
  appwrite_bucket_id: String(
    import.meta.env.VITE_APPWRITE_POST_IMAGE_BUCKET_ID
  ),
  appwrite_project_id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwrite_user_collection_id: String(
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
  ),
  appwrite_chat_collection_id: String(
    import.meta.env.VITE_APPWRITE_CHATS_COLLECTION_ID
  ),
  appwrite_messsages_collection_id: String(
    import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID
  ),
};

export default conf;
