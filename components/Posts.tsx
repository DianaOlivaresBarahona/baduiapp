import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  type Post = {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
  };
  useEffect(() => {
    axios
      .get("https://dummyjson.com/posts")
      .then((response) => {
        setPosts(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fel vid API-anrop:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <Text style={styles.tags}>Tags: {item.tags.join(", ")}</Text>
      <Text style={styles.meta}>
        👍 {item.reactions.likes} | 👎 {item.reactions.dislikes} | 👁️{" "}
        {item.views}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: "#f4f4f4",
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    marginBottom: 6,
  },
  tags: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: "#999",
  },
});

export default PostsList;
