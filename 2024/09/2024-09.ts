const countChecksum = (reorderedBlocks: string[]): number => {
  return reorderedBlocks.reduce((acc, curr, index) => {
    acc += Number(curr) * index;
    return acc;
  }, 0);
};

/*
2 3  3  3  13  3  12 14   14   13  14  02
00...111...2...333.44.5555.6666.777.888899

00...222...4...666.88.10101010.12121212.141414.161616161818
 */
export const getBlocks = (input: string): string[] => {
  return input.split("").reduce<string[]>((acc, currentBlock, currentIndex) => {
    if (currentIndex % 2 === 1) {
      if (currentBlock !== "0") {
        for (let i = 0; i < Number(currentBlock); i++) {
          acc.push(String("."));
        }
      }
    } else {
      for (let i = 0; i < Number(currentBlock); i++) {
        acc.push(String(String(currentIndex / 2)));
      }
    }
    return acc;
  }, []);
};

export const getEmptySpaceIndices = (blocks: string[]): number[] => {
  return blocks.reduce<number[]>((acc, currentBlock, currentIndex) => {
    if (currentBlock === ".") {
      acc.push(currentIndex);
    }
    return acc;
  }, []);
};

const findLastNonDotIndex = (blocks: string[]): number => {
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] !== ".") {
      return i;
    }
  }
  return -1;
};

const reorderBlocksToEmptySpaces = (
  blocks: string[],
  emptySpaceIndices: number[],
): string[] => {
  emptySpaceIndices.forEach((emptySpaceIndex) => {
    const lastNonDotIndex = findLastNonDotIndex(blocks);
    [blocks[emptySpaceIndex], blocks[lastNonDotIndex]] = [
      blocks[lastNonDotIndex],
      blocks[emptySpaceIndex],
    ];
  });
  return blocks.filter((block) => block !== ".");
};

//part1
export const getChecksumPart1 = (input: string): number => {
  const blocks = getBlocks(input);
  const emptySpaceIndices = getEmptySpaceIndices(blocks);
  const reorderedBlocks = reorderBlocksToEmptySpaces(blocks, emptySpaceIndices);
  return countChecksum(reorderedBlocks);
};

const getSameNumberBlocks = (
  input: string,
): { block: string; startIndex: number }[] => {
  const matches = [...input.matchAll(/(\d)\1*/g)];
  return matches.map((match) => ({
    block: match[0],
    startIndex: match.index!,
  }));
};

interface EmptySlot {
  length: number;
  startIndex: number;
}

const getEmptySlots = (blocks: string[]): EmptySlot[] => {
  const emptySlots = [];

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === ".") {
      const emptySlot = {
        length: 0,
        startIndex: 0,
      };
      emptySlot.startIndex = i;
      emptySlot.length = 1;
      let l = 1;
      while (blocks[i + l] === ".") {
        emptySlot.length += 1;
        l += 1;
      }
      emptySlots.push(emptySlot);
      i = i + emptySlot.length - 1;
    }
  }
  return emptySlots;
};

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const countChecksum2 = (reorderedBlocks: string[]): number => {
  return reorderedBlocks.reduce((acc, curr, index) => {
    if (numbers.some((num) => num === curr)) {
      acc += Number(curr) * index;
    }
    return acc;
  }, 0);
};

//part2
export const getChecksumPart2 = (input: string): number => {
  const blocks = getBlocks(input);
  const sameNumberBlocks = getSameNumberBlocks(blocks.join(""));

  for (
    let numberBlocksIterator = sameNumberBlocks.length - 1;
    numberBlocksIterator >= 0;
    numberBlocksIterator--
  ) {
    const emptySlots = getEmptySlots(blocks);
    const currentNumberBlockLength =
      sameNumberBlocks[numberBlocksIterator].block.length;
    const firstAvailableEmptySlot = emptySlots.findIndex(
      (slot) => slot.length >= currentNumberBlockLength,
    );
    if (
      firstAvailableEmptySlot >= 0 &&
      emptySlots[firstAvailableEmptySlot].startIndex <
        sameNumberBlocks[numberBlocksIterator].startIndex
    ) {
      for (
        let numberBlockLengthIterator = 0;
        numberBlockLengthIterator <
        sameNumberBlocks[numberBlocksIterator].block.length;
        numberBlockLengthIterator++
      ) {
        [
          blocks[
            emptySlots[firstAvailableEmptySlot].startIndex +
              numberBlockLengthIterator
          ],
          blocks[
            sameNumberBlocks[numberBlocksIterator].startIndex +
              numberBlockLengthIterator
          ],
        ] = [
          blocks[
            sameNumberBlocks[numberBlocksIterator].startIndex +
              numberBlockLengthIterator
          ],
          blocks[
            emptySlots[firstAvailableEmptySlot].startIndex +
              numberBlockLengthIterator
          ],
        ];
      }
    }
  }
  return countChecksum2(blocks);
};
