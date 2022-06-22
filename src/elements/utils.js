import { Types } from './Element';

const weightsFromTopToBot = [
  Types.Empty,
  Types.Water,
  Types.Sand,
  Types.Dirt,
];

export const isHeavierThan = (element, than) => {
  if (element.type === than.type) {
    return false;
  }

  const pI = weightsFromTopToBot.findIndex((t) => t === element.type);
  const tI = weightsFromTopToBot.findIndex((t) => t === than.type);

  return pI > tI;
};
