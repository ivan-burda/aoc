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

const countChecksum2 = (reorderedBlocks: string[]): number => {
  return reorderedBlocks.reduce((acc, curr, index) => {
    if (!curr.includes(".")) {
      acc += Number(curr) * index;
    }
    return acc;
  }, 0);
};

//part2
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

function parseString(input: string): (number | string)[] {
  const result: (number | string)[] = [];
  let temp = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "-" || char === "." || i === input.length - 1) {
      if (i === input.length - 1 && char !== "-" && char !== ".") {
        temp += char;
      }

      if (temp !== "") {
        if (!Number.isNaN(parseFloat(temp))) {
          result.push(parseFloat(temp));
        } else {
          result.push(temp);
        }
        temp = "";
      }

      if (char === ".") {
        result.push(".");
      }
    } else {
      temp += char; // Add the character to the current segment
    }
  }

  return result;
}

export const getChecksumPart2 = (input: string): number => {
  let blocks = getBlocks2(input);
  const sameNumberBlocks = getSameNumberBlocks(blocks);
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
      }
    }
    blocks = blocks.map((block, index) => ({ ...block, index }));
  }
  const converted = blocks
    .flatMap((block, index) => {
      if (block.block.includes(".")) {
        return block.block;
      }
      if (block.block.includes("_")) {
        return "";
      }
      return splitStringIntoChunks(
        block.block,
        String(block.originalIndex).length,
      );
    })
    .filter((item) => item !== "")
    .join("-")
    .replaceAll("-.-", ".")
    .replaceAll(".-", ".")
    .replaceAll("-.", ".");
  const readyToCount = parseString(converted).map((item) => String(item));

  console.log(countChecksum2(readyToCount));
  return countChecksum2(readyToCount);
};
