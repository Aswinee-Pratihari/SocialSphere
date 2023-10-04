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
};

export default conf;