import { useState } from 'react';
import { useNavigate } from 'react-router';
import supabase  from '../Client';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from('Post')
        .select('id, Post_Title')
        .ilike('Post_Title', `%${searchTerm}%`);

      if (error) throw error;

      if (data.length > 0) {
        const postId = data[0].id;
        navigate(`/PostChat/${postId}`);
      } else {
        alert('No post found with that title.');
      }
    } catch (err) {
      console.error('Error searching for post:', err);
      alert('An error occurred while searching for the post.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;