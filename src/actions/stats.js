import {database} from '../firebase';


export const increaseHealth = (uid) =>{
  //do some stuff in firebase
  return (dispatch) =>{
    let health;
    database.ref('users/' + uid).once('value', snapshot => {
      health = snapshot.val().stats.health;
      console.log(health);
    });
    health = health + 1;
    database.ref('users/' + uid + '/stats/health').set(health);
    
  };
  //call the increase health thing
};


export const decreaseHealth = (uid) =>{
  //do some stuff in firebase
  return (dispatch) =>{
    let health;
    database.ref('users/' + uid).once('value', snapshot => {
      health = snapshot.val().stats.health;
      console.log(health);
    });
    health = health - 1;
    database.ref('users/' + uid + '/stats/health').set(health);
    
  };
  //call the increase health thing
};



// export const decreaseHealth = (user) => {
//   return {
//     type: 'DECREASE_HEALTH',
//     uid: user.uid    
//   };
// };

