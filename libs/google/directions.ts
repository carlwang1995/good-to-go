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
    if (process.env.NODE_ENV === "development") {
      console.log("發出directions fetch");
    }
    const data = await response.json();
    if (data.routes.status === "ZERO_RESULTS") {
      return false;
    }
    const { distance, duration, steps } = data.routes[0].legs[0];
    return { distance, duration, steps };
  } catch (e) {
    console.error(e);
  }
}
