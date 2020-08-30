import faker from "faker";

const usersArray = ["user1", "user2"];

// generate an array of fake messages
const generateMessages = () => {
  const numberOfMessages = Math.floor(Math.random() * 20) + 5;
  const messages = [];
  for (let i = 0; i < numberOfMessages; i++) {
    messages.push({
      messageId: faker.random.uuid(),
      text: faker.lorem.text(),
      time: faker.date.between("2020-06-1", "2020-08-30"),
      sender: usersArray[Math.floor(Math.random() * 2)],
    });
  }
  return messages;
};

// generate fake chat data using faker
export const generateData = () => {
  const data = [];
  const numberOfChats = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < numberOfChats; i++) {
    data.push({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      image: faker.image.avatar(),
      status: faker.lorem.text(),
      messages: generateMessages(),
    });
  }
  return data;
};
