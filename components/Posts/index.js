import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import {useWindowWidth} from '../contexts/window';
import { fetchUserById } from '../../server/users/users.service';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  
  const [totalPosts, setTotalPosts] = useState(0);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts,headers } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });
      setPosts(posts);
      setTotalPosts(parseInt(headers['x-total-count'], 10));
      setStart(isSmallerDevice ? 5 : 10);
      setLimit(isSmallerDevice ? 5 : 10);
    };

    fetchPost();
  }, [isSmallerDevice]);

  const handleClick = async() => {
    setIsLoading(true);
    const { data: newPosts } = await axios.get('/api/v1/posts', {
      params: { start, limit },
    });

    setPosts(prevPosts => [...prevPosts, ...newPosts]);
    setStart(prevStart => prevStart + limit);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  const hasMorePosts = start < totalPosts;
  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post}
          /> 
        ))}
      </PostListContainer>

      {hasMorePosts &&<div style={{ display: 'flex', justifyContent: 'center' }}>
        {posts &&<LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>}
      </div>}
    </Container>
  );
}
