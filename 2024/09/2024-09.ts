//part1 - helper functions
const countChecksum = (reorderedBlocks: string[]): number => {
  return reorderedBlocks.reduce((acc, curr, index) => {
    acc += Number(curr) * index;
    return acc;
  }, 0);
};

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
export const getPart1Checksum = (input: string): number => {
  const blocks = getBlocks(input);
  const emptySpaceIndices = getEmptySpaceIndices(blocks);
  const reorderedBlocks = reorderBlocksToEmptySpaces(blocks, emptySpaceIndices);
  return countChecksum(reorderedBlocks);
};

//part2 - helper functions
interface Block {
  block: string;
  length: number;
  index: number;
  originalIndex: number;
}

export const getPart2Blocks = (input: string): Block[] => {
  return input.split("").reduce<Block[]>((acc, currentBlock, currentIndex) => {
    if (currentIndex % 2 === 1) {
      if (currentBlock !== "0") {
        let newBlock = "";
        for (let i = 0; i < Number(currentBlock); i++) {
          newBlock += String(".");
        }
        acc.push({
          block: newBlock,
          length: newBlock.length,
          index: currentIndex,
          originalIndex: currentIndex / 2,
        });
      } else {
        acc.push({
          block: "_",
          length: 0,
          index: currentIndex,
          originalIndex: currentIndex / 2,
        });
      }
    } else {
      let newBlock = "";
      for (let i = 0; i < Number(currentBlock); i++) {
        newBlock += String(String(currentIndex / 2));
      }
      acc.push({
        block: newBlock,
        length: newBlock.length,
        index: currentIndex,
        originalIndex: currentIndex / 2,
      });
    }
    return acc;
  }, []);
};

interface EmptyBlockInfo {
  block: string;
  length: number;
  index: number;
  originalIndex: number;
}

interface SameNumberBlockInfo {
  block: string;
  length: number;
  index: number;
  originalIndex: number;
}

const getFirstSuitableEmptyBlock = (
  blocks: Block[],
  minCapacity: number,
): EmptyBlockInfo | undefined => {
  return blocks.find(
    (block) => block.length >= minCapacity && block.block.includes("."),
  );
};

const getSameNumberBlocks = (blocks: Block[]): SameNumberBlockInfo[] => {
  const results = [];
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (!blocks[i].block.includes(".") && !blocks[i].block.includes("_")) {
      results.push({
        block: blocks[i].block,
        length: blocks[i].block.length / String(blocks[i].originalIndex).length,
        index: i,
        originalIndex: blocks[i].originalIndex,
      });
    }
  }
  return results;
};

const getEmptySpace = (length: number): string => {
  let remainingSpace = "";
  for (let i = 0; i < length; i++) {
    remainingSpace += ".";
  }
  return remainingSpace;
};

const getRemainingEmptyBlockSpaces = (
  sameNumberBlock: SameNumberBlockInfo,
  firstSuitableEmptyBloc: EmptyBlockInfo,
): string => {
  const difference = firstSuitableEmptyBloc.length - sameNumberBlock.length;
  if (difference === 0) {
    return "";
  }
  return getEmptySpace(difference);
};

const calculateChecksum = (reorderedBlocks: string[]): number => {
  return reorderedBlocks.reduce((acc, curr, index) => {
    if (!curr.includes(".")) {
      acc += Number(curr) * index;
    }
    return acc;
  }, 0);
};

function splitStringIntoChunks(str: string, chunkSize: number) {
  if (chunkSize <= 0) {
    throw new Error("Chunk size must be greater than 0.");
  }

  const result = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    result.push(str.slice(i, i + chunkSize));
  }
  return result;
}

//part2
export const getPart2Checksum = (input: string): number => {
  let blocks = getPart2Blocks(input);
  const sameNumberBlocks = getSameNumberBlocks(blocks);

  for (let i = 0; i < sameNumberBlocks.length; i++) {
    const sameNumberBlock = sameNumberBlocks[i];
    const firstSuitableEmptyBlock = getFirstSuitableEmptyBlock(
      blocks,
      sameNumberBlock.length,
    );
    if (firstSuitableEmptyBlock) {
      const remainingEmptyBlockSpaces = getRemainingEmptyBlockSpaces(
        sameNumberBlock,
        firstSuitableEmptyBlock,
      );
      firstSuitableEmptyBlock.length = sameNumberBlock.length;
      firstSuitableEmptyBlock.block = getEmptySpace(sameNumberBlock.length);

      const indexToPlaceTheNumbersTo = blocks.findIndex(
        (item) => item.index === firstSuitableEmptyBlock.index,
      );

      let indexToPlaceTheEmptySpacesTo = -1;
      for (let j = blocks.length - 1; j > 0; j--) {
        if (blocks[j].block === sameNumberBlock.block) {
          indexToPlaceTheEmptySpacesTo = j;
          break;
        }
      }
      if (indexToPlaceTheNumbersTo < indexToPlaceTheEmptySpacesTo) {
        [
          blocks[indexToPlaceTheNumbersTo],
          blocks[indexToPlaceTheEmptySpacesTo],
        ] = [
          blocks[indexToPlaceTheEmptySpacesTo],
          blocks[indexToPlaceTheNumbersTo],
        ];

        if (remainingEmptyBlockSpaces.length > 0) {
          blocks.splice(indexToPlaceTheNumbersTo + 1, 0, {
            block: remainingEmptyBlockSpaces,
            length: remainingEmptyBlockSpaces.length,
            index: indexToPlaceTheNumbersTo + 1,
            originalIndex: -1,
          });
        }
      }
    }
    blocks = blocks.map((block, index) => ({ ...block, index }));
  }

  const convertedForChecksumCounting = blocks
    .flatMap((block) => {
      if (block.block.includes(".")) {
        return block.block.split("");
      }
      if (block.block.includes("_")) {
        return "_";
      }
      return splitStringIntoChunks(
        block.block,
        String(block.originalIndex).length,
      );
    })
    .filter((block) => block !== "_");

  return calculateChecksum(convertedForChecksumCounting);
};
