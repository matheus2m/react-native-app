import React from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../service/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileText,
} from './styles';

const Main = () => {
  const [users, setUsers] = React.useState('');
  const [newUser, setNewUser] = React.useState('');

  const handleAdduser = async () => {
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    setUsers([...users, data]);
    setNewUser('');

    Keyboard.dismiss();
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={(text) => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={() => handleAdduser()}
        />
        <SubmitButton onPress={() => handleAdduser()}>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={(user) => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => {}}>
              <ProfileText>Ver perfil</ProfileText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
};

export default Main;
