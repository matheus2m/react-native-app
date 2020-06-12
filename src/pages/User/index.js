import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';
import api from '../../service/api';

const Skeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      flexDirection="row"
      alignItems="center"
      marginBottom={25}
    >
      <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
      <SkeletonPlaceholder.Item marginLeft={20}>
        <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={80}
          height={20}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

const Loader = () => (
  <>
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </>
);

const User = ({ route }) => {
  const { user } = route.params;
  const [repostiorios, setRepositorios] = React.useState([]);
  const [loading, setloading] = React.useState(true);

  useEffect(() => {
    async function getRepositoriesStarreds() {
      const response = await api.get(`/users/${user.login}/starred`);
      setRepositorios(response.data);
      setloading(false);
    }

    getRepositoriesStarreds();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <Stars
          data={repostiorios}
          keyExtractor={(repositorio) => repositorio.node_id}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
};

User.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};

export default User;
