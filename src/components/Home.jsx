
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Indie Flower', cursive;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 0;
  max-width: 100%; /* Prevents overflow */
`;

const Heading = styled.h1`
  font-size: 3rem; /* Default font size for large screens */
  margin-bottom: 10px;
  margin-top: -30px;

  /* Adjust heading size on smaller screens */
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 0; /* Adjust top margin */
  }

  @media (max-width: 480px) {
    font-size: 2rem; /* Further reduce font size on very small screens */
  }
`;

const Subheading = styled.h2`
  font-size: 1.5rem;
  color: #555;
  margin-top: 20px;

  /* Make subheading smaller on smaller screens */
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TrendingImages = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Allow images to wrap on smaller screens */
  justify-content: space-between; /* Center images and create space on larger screens */

  @media (max-width: 768px) {
    gap: 15px; /* Smaller gap between images on medium screens */
  }

  @media (max-width: 480px) {
    gap: 10px; /* Even smaller gap on mobile screens */
  }
`;

const Image = styled.img`
  width: 250px; /* Default image size */
  height: 350px;
  object-fit: cover;
  margin-left: -30px; /* Negative margin for overlap */

  /* Make images scale down for smaller screens */
  @media (max-width: 768px) {
    width: 200px; /* Smaller size for medium screens */
    height: 280px;
  }

  @media (max-width: 480px) {
    width: 150px; /* Even smaller size for mobile screens */
    height: 200px;
    margin-left: 0; /* Remove negative margin on small screens */
  }
`;

const Home = () => {
  return (
    <Container className="home-container">
      <Heading>WELCOME TO BOOKWORM!!</Heading>
      <TrendingImages className="trendingimages">
        <Image src="/images/book1.jpg" alt="Book 1" />
        <Image src="/images/book2.jpg" alt="Book 2" />
        <Image src="/images/book3.jpg" alt="Book 3" />
      </TrendingImages>
      <Subheading className="track">
        Track, Rate, Review, and Remember all the books you love
      </Subheading>
    </Container>
  );
};

export default Home;

