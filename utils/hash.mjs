import JSSHA from 'jssha';

const getPasswordHash = (input) => {
  const shaObj = new JSSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(input);
  return shaObj.getHash('HEX');
};

export default getPasswordHash;
