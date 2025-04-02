import express from 'express';
import axios from 'axios';
import cors from 'cors';


const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors());
const PORT = 3000;


const BASE_URL = 'http://20.244.56.144/evaluation-service';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA3ODc3LCJpYXQiOjE3NDM2MDc1NzcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE2ZGJkOGNkLTI5NGItNDgyMS1iNTVmLTZhMjVjM2MxNWQ1ZCIsInN1YiI6IjIyMDUxNDc0QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MTQ3NEBraWl0LmFjLmluIiwibmFtZSI6InV0dGFtIGt1bWFyIiwicm9sbE5vIjoiMjIwNTE0NzQiLCJhY2Nlc3NDb2RlIjoibndwd3JaIiwiY2xpZW50SUQiOiJhNmRiZDhjZC0yOTRiLTQ4MjEtYjU1Zi02YTI1YzNjMTVkNWQiLCJjbGllbnRTZWNyZXQiOiJZUlNjWWV3d1Z6YmFmQlZEIn0.DGjntdUMyUvDtObvBrV_bTYBKMnwsX1P9M2W7wenprk';

const fetchData = async (url) => {
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });
      return data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
      return null;
    }
  };
  

app.get('/users', async (req, res) => {
    try{
        const users = await fetchData(`${BASE_URL}/users`);
        if (!users) return res.status(500).json({ error: "Failed to fetch users" });

        if(users){
            const postCounts = await Promise.all(
            Object.keys(users.users).map(async (id) => {
            const posts = await fetchData(`${BASE_URL}/users/${id}/posts`);
            return { user: users.users[id], postCount: posts?.posts.length || 0 };
                })
            );

            const topUsers = postCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
            res.status(200).json(topUsers);
        }else{
            res.status(500).json({ message: 'Error fetching users' });
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.get('/posts', async (req, res) => {
    try{
        const { type } = req.query;
        if (!["latest", "popular"].includes(type?.toLowerCase())) {
            return res.status(400).json({ error: "Invalid type. Use 'latest' or 'popular'" });
        }
        const users = await fetchData(`${BASE_URL}/users`);
        let allPosts = [];
        await Promise.all(
            Object.keys(users.users).map(async (id) => {
              const posts = await fetchData(`${BASE_URL}/users/${id}/posts`);
              if (posts) allPosts.push(...posts.posts);
            })
          );
          
        if (type.toLowerCase() === "popular") {
            const commentCounts = await Promise.all(
            allPosts.map(async (post) => {
                const comments = await fetchData(`${BASE_URL}/posts/${post.id}/comments`);
                return { ...post, commentCount: comments?.comments.length || 0 };
            })
            );
            allPosts = commentCounts.sort((a, b) => b.commentCount - a.commentCount);
        } else {
            allPosts = allPosts.sort((a, b) => b.id - a.id); // Assuming higher ID = newer post
        }

        res.status(200).json(allPosts.slice(0, 5));
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
