export default async function textSearch(input: string) {
  try {
    const response = await fetch("/api/textSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textQuery: input }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("發出testSearch fetch");
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
