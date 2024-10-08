import { useState } from 'react';
import './App.css';
import { UserCard } from './conponents/UserCard';
import { UserProfile } from './types/userProfile';
import axios from 'axios';
import { User } from './types/api/user';

function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  
  const onClickFetchData = () => {
    setLoading(true);
    setError(false);
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
      }).catch(() => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div>
        <button onClick={onClickFetchData}>データ取得</button>
        <br />
        {error ? (
          <p style={{color: "red"}}>データの取得に失敗しました</p>
        ) : loading? (
          <p>Loading...</p>
        ) : (
          <>
            {userProfiles.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
