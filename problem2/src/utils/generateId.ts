import { customAlphabet } from "nanoid";

const UUID_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const UUID_LENGTH = 8;

export const generateCustomId = () => {
  return customAlphabet(UUID_ALPHABET, UUID_LENGTH)();
};
