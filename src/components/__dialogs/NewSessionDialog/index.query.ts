export const geoLocalizationQuery = (street: string, streetNumber: string, city: string) => {
  const fetchedData = fetch(`https://nominatim.openstreetmap.org/search?q=${street}+${streetNumber}%2C+${city}&format=json&limit=1`)
    .then((res: any) => res.json())
    .then((json: any) => {
      return json;
    });
  console.log(fetchedData);
  return fetchedData;
};
