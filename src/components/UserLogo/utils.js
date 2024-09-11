export function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name = '', email = '') {
  const firstLetter = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  return {
    sx: {
      bgcolor: stringToColor(name || email),
    },
    children: firstLetter,
  };
}
