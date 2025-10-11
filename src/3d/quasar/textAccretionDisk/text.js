const accretionDiskText = await getAccretionDiskText('/src/3d/focus.js');
let accretionTextProgress = 0;

/**
 * Fetches text to put in the accretion disk.
 * @param path {string} the resource to fetch text from.
 * @return {Promise<string>}
 */
async function getAccretionDiskText(path) {
  return await fetch(path)
    .then(response => response.text())
    .then(text => text.replaceAll('\n', ''));
}

/**
 * Returns part of the accretion text, as much as fits in a given radius and font size.
 * @param radius the radius of the line of text from the centre.
 * @param fontSize the font size of the text.
 */
export function consumeAccretionText(radius, fontSize) {
  const charsToExtract = calculateMaxTextLength(radius, fontSize);
  const textSlice = accretionDiskText.slice(accretionTextProgress, accretionTextProgress + charsToExtract);
  accretionTextProgress += charsToExtract;
  return textSlice;
}

const fontSizeToWidthRatio = 0.832;
/**
 * Determines how many characters can fit in a ring of text, given the radius and font size.
 * @param radius {number}
 * @param fontSize {number}
 * @return {number}
 */
function calculateMaxTextLength(radius, fontSize) {
  const totalDistance = 2 * Math.PI * radius;
  const fontWidth = fontSize * fontSizeToWidthRatio;
  return Math.floor(totalDistance / fontWidth);
}
