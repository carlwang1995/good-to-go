export default async function textSearch(input: string) {
  try {
    const response = await fetch(`/api/textSearch?input=${input}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
}
