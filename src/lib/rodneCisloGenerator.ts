export type GenderType = "MALE" | "FEMALE";
export type BirthIdGeneratorResult = { withDelimeter: string; pure: string };

export const generateBirthId = (
  birthDate: Date,
  gender: GenderType,
): BirthIdGeneratorResult => {
  const year = String(birthDate.getFullYear()).substring(2);
  let month = birthDate.getMonth() + 1;
  if (gender === "FEMALE") {
    month += 50;
  }
  const day = birthDate.getDate();

  const firstPart = [year, paddingLeft(month), paddingLeft(day)].join("");

  let suffixLength = 4;
  let randomSeed = Math.floor(Math.random() * 9980);
  if (birthDate.getFullYear() <= 1954) {
    suffixLength = 3;
    randomSeed = Math.floor(Math.random() * 980);
  }
  const tempBirthId = paddingRight(firstPart, suffixLength);

  const originalLength = tempBirthId.length; //by converting string to Number, we may loose leading 0
  let birthId = String(nextNumberDivided11(Number(tempBirthId) + randomSeed));
  if (originalLength !== birthId.length) {
    //we have lost leading zeroes
    birthId = birthId.padStart(originalLength, "0");
  }
  return {
    pure: birthId,
    withDelimeter: addDelimeter(birthId),
  };
};

const addDelimeter = (birthId: string): string => {
  const firstPart = birthId.substring(0, 6);
  const secondPart = birthId.substring(6);
  return `${firstPart}/${secondPart}`;
};

const nextNumberDivided11 = (value: number) => {
  return Math.ceil(value / 11) * 11;
};

const paddingLeft = (digit: number): string => {
  return String(digit).padStart(2, "0");
};

const paddingRight = (value: number | string, paddingCount: number): string => {
  return String(value).padEnd(String(value).length + paddingCount, "0");
};
