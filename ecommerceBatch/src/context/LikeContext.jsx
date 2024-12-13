import {
    createContext,
    useState,
    useEffect,
    useContext,
    useMemo,
    useCallback,
  } from 'react';
  
  const LikeContext = createContext();
  
  export const useLikeContext = () => useContext(LikeContext);
  
  const LikeContextProvider = ({ children }) => {
    const [likedItems, setLikedItems] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
  
    const getAuthToken = () => {
      return localStorage.getItem('token');
    };
  
    const fetchLikedItems = useCallback(async () => {
      setIsFetching(true);
      try {
        const response = await fetch('http://localhost:3000/user/favorites', {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
          },
        });
        const result = await response.json();
        if (!result.error) {
          setLikedItems(result);
        }
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
      setIsFetching(false);
    }, []);
  
    useEffect(() => {
      fetchLikedItems();
    }, [fetchLikedItems]);
  
    const addToLiked = useCallback(async (productId) => {
      try {
        const response = await fetch('http://localhost:3000/user/like-product', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });
        
        if (response.ok) {
          // Refetch the updated list of favorites
          fetchLikedItems();
        }
      } catch (error) {
        console.error('Failed to add to favorites:', error);
      }
    }, [fetchLikedItems]);
  
    const removeFromLiked = useCallback(async (productId) => {
      try {
        const response = await fetch('http://localhost:3000/user/unlike-product', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });
        
        if (response.ok) {
          // Refetch the updated list of favorites
          fetchLikedItems();
        }
      } catch (error) {
        console.error('Failed to remove from favorites:', error);
      }
    }, [fetchLikedItems]);
  
    const value = useMemo(
      () => ({
        likedItems,
        isFetching,
        addToLiked,
        removeFromLiked,
      }),
      [
        likedItems,
        isFetching,
        addToLiked,
        removeFromLiked,
      ],
    );
  
    return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
  };
  
  export default LikeContextProvider;