import { database } from '../firebase';

const setPlayersInLobby = array => ({
  type: 'UPDATE_PLAYERS_IN_LOBBY',
  playerArray: array,
});


export const playersInLobby = game => (dispatch) => {
  const playerList = game.playerPosition;
  const userList = [];

  playerList.forEach((uid) => {
    userList.push(database.ref(`users/${uid}`).once('value'));
  });

  Promise.all(userList)
    .then((resolvedUserList) => {
      const userNameList = resolvedUserList.map(user => user.val().displayName);
      return userNameList;
    })
    .then(userNameList => dispatch(setPlayersInLobby(userNameList)));
};

