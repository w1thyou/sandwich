export async function loadJson() {
  let jsonData;
  try {
    const response = await fetch('/data.json');
    jsonData = await response.json();
  } catch (error) {
    console.error(`Не удается прочитать data.json\n\n${error}`);
  }
  return jsonData;
}
