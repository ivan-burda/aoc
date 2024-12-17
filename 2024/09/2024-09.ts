const countChecksum = (reorderedBlocks: string[]): number => {
  console.log(reorderedBlocks);
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
export const getChecksumPart1 = (input: string): number => {
  const blocks = getBlocks(input);
  const emptySpaceIndices = getEmptySpaceIndices(blocks);
  const reorderedBlocks = reorderBlocksToEmptySpaces(blocks, emptySpaceIndices);
  return countChecksum(reorderedBlocks);
};

//////
interface Block {
  block: string;
  length: number;
  index: number;
  originalIndex: number;
}

export const getBlocks2 = (input: string): Block[] => {
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
          block: "noGap",
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

export const getSameNumberBlocks2 = (input: string): string[] => {
  return [];
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
    if (!blocks[i].block.includes(".") && !blocks[i].block.includes("noGap")) {
      results.push({
        block: blocks[i].block,
        length: blocks[i].block.length,
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

const recreateAsString = (blocks: Block[]): string => {
  return blocks.reduce((final, curr) => {
    if (curr.block === "noGap") {
      return final;
    }
    final += curr.block;
    return final;
  }, "");
};

const countChecksum2 = (reorderedBlocks: string[]): number => {
  console.log(reorderedBlocks);
  return reorderedBlocks.reduce((acc, curr, index) => {
    if (!curr.includes(".")) {
      acc += Number(curr) * index;
    }
    return acc;
  }, 0);
};

function splitStringByLength(str: string, chunkSize: number): string[] {
  const result = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    result.push(str.slice(i, i + chunkSize));
  }
  return result;
}

//part2
export const getChecksumPart2 = (input: string): number => {
  let blocks = getBlocks2(input);
  const sameNumberBlocks = getSameNumberBlocks(blocks);
  let joinedBlocks: string[] = [];
  for (let i = 0; i < sameNumberBlocks.length; i++) {
    const sameNumberBlock = getSameNumberBlocks(blocks)[i];
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

      const indexToPlaceTheEmptySpacesTo = sameNumberBlock.index;
      if (indexToPlaceTheNumbersTo < indexToPlaceTheEmptySpacesTo) {
        blocks[indexToPlaceTheNumbersTo] = sameNumberBlock;
        blocks[indexToPlaceTheEmptySpacesTo] = firstSuitableEmptyBlock;

        if (remainingEmptyBlockSpaces.length > 0) {
          blocks.splice(indexToPlaceTheNumbersTo + 1, 0, {
            block: remainingEmptyBlockSpaces,
            length: remainingEmptyBlockSpaces.length,
            index: indexToPlaceTheNumbersTo + 1,
            originalIndex: -1,
          });
        }

        joinedBlocks = blocks
          .filter((item) => item.block !== "noGap")
          .flatMap((item) => {
            if (item.block.includes(".")) {
              return String(item.block);
            }

            return item.block;
          });
      }
    }
  }
  const result = countChecksum2(joinedBlocks);
  console.log(result);
  return result;
};
