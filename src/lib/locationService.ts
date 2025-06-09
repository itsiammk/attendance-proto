
'use server'; // Although this runs client-side when called from client component, marking for consistency if ever imported by server component.

interface NominatimAddress {
  road?: string;
  suburb?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

interface NominatimResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: NominatimAddress;
  boundingbox: string[];
}

/**
 * Fetches a human-readable address from latitude and longitude using the Nominatim API.
 * See Nominatim usage policy: https://operations.osmfoundation.org/policies/nominatim/
 * @param latitude The latitude.
 * @param longitude The longitude.
 * @returns A promise that resolves to the address string or an error message.
 */
export async function getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  try {
    // Important: In a real app, be mindful of Nominatim's usage policy (max 1 req/sec).
    // For high-volume apps, consider a caching layer or a paid service.
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'en', // Optional: to prefer English results
      },
    });

    if (!response.ok) {
      console.error(`Nominatim API error: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error("Error body:", errorBody);
      return `Error: Could not fetch address (status ${response.status}).`;
    }

    const data: NominatimResponse = await response.json();

    if (data && data.display_name) {
      return data.display_name;
    } else if (data && data.address) {
      // Fallback to constructing from parts if display_name is not ideal
      const { road, city, state, country } = data.address;
      const addressParts = [road, city, state, country].filter(Boolean);
      return addressParts.join(', ') || 'Address details not found.';
    }
    return 'Address not found.';
  } catch (error) {
    console.error('Error fetching address from Nominatim:', error);
    return 'Error: Unable to connect to geocoding service.';
  }
}
