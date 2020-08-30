import faker from "faker";

export const getFormattedText = (text, maxLength) => {
  if (text.length > maxLength) {
    text = text.slice(1, maxLength);
    text += "...";
  }

  return text;
};

export const getTime = (data) => {
  const tempTime = data.messages.slice(-1)[0];
  const d = new Date(tempTime.time);
  const currentDate = new Date();

  if (currentDate.getFullYear() - d.getFullYear() > 0) {
    return d.toLocaleDateString();
  } else if (currentDate.getMonth() - d.getMonth() > 0) {
    return d.toLocaleDateString();
  } else if (currentDate.getDate() - d.getDate() > 6) {
    return d.toLocaleDateString();
  } else if (currentDate.getDate() - d.getDate() > 0) {
    return d.toLocaleDateString([], {
      weekday: "long",
    });
  }

  const time = d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
};

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