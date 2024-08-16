export default async function get_directions(
  originId: string,
  destinationId: string,
  mode: string,
) {
  try {
    const response = await fetch(
      `/api/directions?origin=place_id:${originId}&destination=place_id:${destinationId}&mode=${mode}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const { distance, duration } = data.routes[0].legs[0];
    return { distance, duration };
  } catch (e) {
    console.error(e);
  }
}
