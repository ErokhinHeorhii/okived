export async function getData() {
  try {
    const res = await fetch(`./dataOKiVED.json`);
    const materialData = await res.json();

    return materialData;
  } catch (e) {
    throw new Error(`fetchError- ${e}`);
  }
}
