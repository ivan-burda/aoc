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
    if (curr.block === "_") {
      return final;
    }
    final += curr.block;
    return final;
  }, "");
};

const countChecksum2 = (reorderedBlocks: string[]): number => {
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

function mergeDotBlocks(blocks: Block[]) {
  const dots = blocks.filter((block) => block.block.includes("."));

  const sorted = [...dots].sort((a, b) => a.index - b.index);

  const result = [];
  let currentGroup = null;

  for (const item of sorted) {
    if (!currentGroup) {
      currentGroup = { ...item }; // Start a new group
      continue;
    }

    if (item.index === currentGroup.index + currentGroup.length) {
      // Merge the current item into the group
      currentGroup.block += item.block;
      currentGroup.length += item.length;
    } else {
      // Push the completed group to the result and start a new group
      result.push(currentGroup);
      currentGroup = { ...item };
    }
  }

  // Push the final group if it exists
  if (currentGroup) {
    result.push(currentGroup);
  }

  return mergeDotBlocks(result);
}

/*
        const dots = []
        go over blocks
        const temp = []
       if is "."
        - push block to temp
       if is number and temp.length > 0
        - push temp into dots
        - set temp to []

       if i === max and temp.length > = 0
        - push temp into dots

        go over collected dots
        -if item.length > 1
         remove original blocks the source
         transform the array into a joined block and create a block object from it
         insert the new object into the position of the original 1st block


         */

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
  let temp = ""; // Temporary string to build numbers or dots

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "-" || char === "." || i === input.length - 1) {
      // Include the last character if it's not a separator
      if (i === input.length - 1 && char !== "-" && char !== ".") {
        temp += char;
      }

      // Push the current number or dot to the result array
      if (temp !== "") {
        if (!Number.isNaN(parseFloat(temp))) {
          result.push(parseFloat(temp)); // Convert numbers
        } else {
          result.push(temp); // Keep dots as is
        }
        temp = ""; // Reset temp for the next segment
      }

      // Handle dots or empty spots (e.g., `..` or `.`)
      if (char === ".") {
        result.push(".");
      }

      // If it's a `-`, skip because it's just a separator
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
  // console.log(readyToCount);
  // console.log(countChecksum2(readyToCount));
  return countChecksum2(readyToCount);
};
