import faker from "faker";

//if text length is greater than max length return trimmed text
export const getFormattedText = (text, maxLength) => {
  if (text.length > maxLength) {
    text = text.slice(1, maxLength);
    text += "...";
  }

  return text;
};

// return time of the last message
//the time is formated in such a way that if difference between current and last message date
// is greater than 6 days it will show date else it will show day and if date is same then it will show time
export const getTime = (data) => {
  if (data.messages.length === 0) {
    return "";
  }
  const lastMessageTime = data.messages.slice(-1)[0].time;
  const lastMessageDate = new Date(lastMessageTime);
  const currentDate = new Date();

  if (currentDate.getFullYear() - lastMessageDate.getFullYear() > 0) {
    return lastMessageDate.toLocaleDateString(["en-GB"]);
  } else if (currentDate.getMonth() - lastMessageDate.getMonth() > 0) {
    return lastMessageDate.toLocaleDateString(["en-GB"]);
  } else if (currentDate.getDate() - lastMessageDate.getDate() > 6) {
    return lastMessageDate.toLocaleDateString(["en-GB"]);
  } else if (currentDate.getDate() - lastMessageDate.getDate() > 0) {
    return lastMessageDate.toLocaleDateString(["en-GB"], {
      weekday: "long",
    });
  }

  const time = lastMessageDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
};

//add message to the chat in the data
export const addMessage = (data, message, chatId) => {
  const updatedData = data.map((ele) => {
    if (ele.id === chatId) {
      return {
        ...ele,
        messages: [
          ...ele.messages,
          {
            messageId: faker.random.uuid(),
            text: message,
            time: new Date(),
            sender: "user2",
          },
        ],
      };
    }
    return ele;
  });
  return updatedData;
};

export const addChatUser = (data, name) => {
  return [
    ...data,
    {
      id: faker.random.uuid(),
      name: name,
      image: faker.image.avatar(),
      status: faker.lorem.text(),
      messages: [],
    },
  ];
};
