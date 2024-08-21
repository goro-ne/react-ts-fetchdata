import { useState } from 'react';
import './App.css';
import { UserCard } from './conponents/UserCard';
import { UserProfile } from './types/userProfile';
import axios from 'axios';
import { User } from './types/api/user';

function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const onClickFetchData = () => {
    axios
      .get<Array<User>>('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        const data = res.data.map((user) => {
          return {
            id: user.id,
            name: `${user.name}(${user.username})`,
            email: user.email,
            address: `${user.address.city}${user.address.suite}${user.address.street}`,
          };
        });
        setUserProfiles(data);
      });
  };
  return (
    <>
      <div>
        <button onClick={onClickFetchData}>データ取得</button>
        {userProfiles.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}

export default App;
