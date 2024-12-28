type Key = string[][];
type Lock = string[][];

const isKeyMatchingLock = (lock: Lock, key: Key): boolean => {
  let result = true;
  for (let keyY = 0; keyY < key.length; keyY++) {
    for (let keyX = 0; keyX < key[keyY].length; keyX++) {
      if (key[keyY][keyX] === "#" && lock[keyY][keyX] === "#") {
        result = false;
      }
    }
  }
  return result;
};

const getKeysAndLocks = (
  input: string,
): Record<"keys" | "locks", Key[] | Lock[]> => {
  return input.split(/\r?\n\r?\n/).reduce<{ locks: Lock[]; keys: Key[] }>(
    (separatedParts, currentPart) => {
      if (currentPart.startsWith("#####")) {
        separatedParts.locks.push(
          currentPart.split(/\n/).map((line) => line.split("")),
        );
      } else {
        separatedParts.keys.push(
          currentPart.split(/\n/).map((line) => line.split("")),
        );
      }
      return separatedParts;
    },
    { keys: [], locks: [] },
  );
};

export const getFittingLockKeyPairsCount = (input: string): number => {
  const keysAndLocks = getKeysAndLocks(input);

  const compatibleKeyLockCombinations: string[] = [];
  for (let k = 0; k < keysAndLocks.keys.length; k++) {
    for (let l = 0; l < keysAndLocks.locks.length; l++) {
      if (isKeyMatchingLock(keysAndLocks.locks[l], keysAndLocks.keys[k])) {
        compatibleKeyLockCombinations.push(`K${k}-L${l}`);
      }
    }
  }

  return compatibleKeyLockCombinations.length;
};
