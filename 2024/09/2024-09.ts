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

export const getChecksum = (input: string): number => {
  const blocks = getBlocks(input);
  const emptySpaceIndices = getEmptySpaceIndices(blocks);
  const reorderedBlocks = reorderBlocksToEmptySpaces(blocks, emptySpaceIndices);
  return countChecksum(reorderedBlocks);
};


/*
go over empty space indices and for each
-remove the last item from the block-representation array
-place the item to the index of the empty space

use countChecksum for the re-ordered file
 */