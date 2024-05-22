import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Indie Flower', cursive; /* Apply Indie Flower font */
  /* Other styles */
`;

const Home = () => {
  return (

    <div className="home-container">
      <h1 >WELCOME TO BOOKWORM!!</h1>
        <div class = 'trendingimages'>
        <img src="/images/book1.jpg" />
        <img src="/images/book2.jpg" />
        <img src="/images/book3.jpg"/>
      </div>
      <h2 class = 'track'> Track, Rate, Review and Remember all the books you love </h2>
    </div>
  );
};

export default Home;