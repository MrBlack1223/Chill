import './home.css';
import Friendlist from './homeComponents/friendlist/friendList';
import SearchFriends from './homeComponents/searchFriends/searchFriends';
import FriendsRq from './homeComponents/friendReq/friendReq';

function Home(){
  
  return (
    <div className = 'homePageContainer'>
      <Friendlist />
      <SearchFriends />
      <FriendsRq />
    </div>
  );
}

export default Home;