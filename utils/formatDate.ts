export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

export const formatTime = (date: Date) => {
  const formatted = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return formatted;
};
