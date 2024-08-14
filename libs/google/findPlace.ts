export default async function findPlace(input: string) {
  try {
    const response = await fetch(`/api/findPlace?input=${input}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data.candidates);
    return data;
  } catch (e) {
    console.error(e);
  }
}
