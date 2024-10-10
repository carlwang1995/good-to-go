export default async function get_photo(
  name: string,
  heightPx: number,
  widthPx: number,
) {
  try {
    const response = await fetch(
      `/api/getPhoto?name=${name}&heightPx=${heightPx}&widthPx=${widthPx}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (process.env.NODE_ENV === "development") {
      console.log("發出Photo fetch");
    }
    const data = await response.json();
    return data.photoUri;
  } catch (e) {
    console.error(e);
  }
}
