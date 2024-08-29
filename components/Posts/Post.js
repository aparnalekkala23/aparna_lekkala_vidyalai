import PropTypes from 'prop-types';
import React, { useRef,useEffect,useState} 
from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));
const UserFeild = styled.div(()=>({
  display:'flex',
  alignItems:'center',

}));

const FnLnPlace = styled.button(()=>({
  border:'none',
  borderRadius:'50%',
  backgroundColor:'grey',
  color:'white',
  fontWeight:700,
  height:50,
  width:50,
  fontSize:18,
  margin:7,
  marginBottom:0,
}));

const UserInfo = styled.div(()=>({
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
}));

const UserNamePlace = styled.div(()=>({
  fontSize:18,
  fontWeight:700,
  marginBottom:0,
}));

const UserEmailPlace = styled.div(()=>({
  fontSize:12,
  fontWeight:600,
  marginTop:0,
}));
const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 130,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [user, setUser] = useState({ name: '', email: '' });


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [post.id]);
  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };
  const getInitials = (name) => {
    return name.split(' ').map((word) => 
word[0]).join('');
  };
  return (
    <PostContainer>
       <UserFeild>
        <FnLnPlace>{getInitials(user.name)}</FnLnPlace>
        <UserInfo>
          <UserNamePlace>{user.name}</UserNamePlace>
          <UserEmailPlace>{user.email}</UserEmailPlace>
        </UserInfo>
      </UserFeild>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
