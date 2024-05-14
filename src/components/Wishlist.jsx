import BookForm from './Book';

const Wishlist = () => {
    return (
        <div>
            <h1>Wishlist</h1>
            <BookForm type="Wishlist" />
            {/* Add logic to display wishlist books */}
        </div>
    );
};

export default Wishlist;