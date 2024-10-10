export default async function textSearch(input: string) {
  try {
    const response = await fetch("/api/textSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textQuery: input, languageCode: "zh-TW" }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (process.env.NODE_ENV === "development") {
      console.log("發出testSearch fetch");
      console.log(data);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
}
