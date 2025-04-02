import axios from "axios";

const url = "http://localhost:3000";

export const topUsers = async () => {
  const response = await axios.get(`${url}/users`);
  return response.data;
};

export const topTrendingPosts  = async () => {
    const response = await axios.get(`${url}/posts?type=popular`);
    return response.data;
}

export const latestPosts = async () => {
    const response = await axios.get(`${url}/posts?type=latest`);
    return response.data;
}
