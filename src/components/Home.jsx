import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Indie Flower', cursive; /* Apply Indie Flower font */
  /* Other styles */
`;

const Home = () => {
  return (
    <div className="home-container">
      <img src="/images/libraryimage.jpg" className="home-image"/>
      <div className="text-container">
        <h1 >WELCOME TO BOOKWORM!!</h1>
        <h2>WRITE, SHARE AND DISCPVER: YOUR HOME FOR BOOKISH EXPLORATION</h2>
        <h2>we can't wait to see what books you bring to the community :)</h2>
      </div>
      <h3>TRENDING READS</h3>
    </div>
  );
};

export default Home;