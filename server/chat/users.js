const users = [];

const addUser = (id, room, name, picture, userId) => {
  const existingUser = users.find(
    (user) => user.room === room && user.userId === userId
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) {
    console.log("Username is taken.")
  }
  else {
    const user = { id, name, picture, room, userId };
    users.push(user);
    return { id, name: user.name, picture: user.picture, userId: user.userId };
  }

  return{} ;
};

const removeUser = (userId) => {
  console.log("userId", userId)
  const index = users.findIndex((user) => user.userId === userId);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
