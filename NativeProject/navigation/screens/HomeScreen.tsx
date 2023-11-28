import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { styles } from './styles';

interface Post {
  id: number;
  title: string;
  body: string;
}

const renderJumbotron = () => (
  <View style={styles.jumbotron}>
    <Text style={styles.display4}>Postings</Text>
  </View>
);

const renderCardHeader = (post: Post) => {
  const { id, title } = post;

  return (
    <View style={styles.cardHeader}>
      <Text>#{id}{title}</Text>
    </View>
  );
};

const renderCardBody = (post: Post) => {
  const { body } = post;

  return (
    <View style={styles.cardBody}>
      <Text>{body}</Text>
    </View>
  );
};

const handleClick = (setModalDisplay: React.Dispatch<React.SetStateAction<boolean>>, setSelectedPost: React.Dispatch<React.SetStateAction<Post>>, post: Post) => {
  setModalDisplay(true);
  setSelectedPost(post);
};

const renderCard = (posts: Post[], setModalDisplay: React.Dispatch<React.SetStateAction<boolean>>, setSelectedPost: React.Dispatch<React.SetStateAction<Post>>) => (
  <ScrollView style={styles.container}>
    {posts.slice(0, 15).map((post) => (
      <View style={styles.card} key={post.id}>
        {renderCardHeader(post)}
        {renderCardBody(post)}
        <TouchableOpacity style={styles.openButton} onPress={() => handleClick(setModalDisplay, setSelectedPost, post)}>
          <Text style={styles.openButtonText}>View More</Text>
        </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
);

const renderModal = (isModalDisplayed: boolean, setModalDisplay: React.Dispatch<React.SetStateAction<boolean>>, selectedPost: Post) => (
  <Modal
    visible={isModalDisplayed}
    animationType='slide'
    transparent={true}
  >
    <View style={styles.modal}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalDisplay(false)}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
      <Text style={styles.modalTitle}>{selectedPost.title}</Text>
      <Text style={styles.modalBody}>{selectedPost.body}</Text>
    </View>
  </Modal>
);

const usePostList = (setPosts: React.Dispatch<React.SetStateAction<Post[]>>) => {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=30')
      .then(response => response.json())
      .then((result: Post[]) => setPosts(result));
  }, []);
};

const Postings = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalDisplayed, setModalDisplay] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post>({ id: 0, title: '', body: '' });

  usePostList(setPosts);

  return (
    <View style = {styles.container}>
      {renderJumbotron()}
      {renderCard(posts, setModalDisplay, setSelectedPost)}
      {renderModal(isModalDisplayed, setModalDisplay, selectedPost)}
    </View>
  );
};

export default Postings;