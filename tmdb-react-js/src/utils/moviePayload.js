export function cleanMoviePayload(values) {
  const payload = { ...values };

  if (!payload.companies?.length) {
    delete payload.companies;
  }

  if (!payload.genres?.length) {
    delete payload.genres;
  }

  if (!payload.collections?.length) {
    delete payload.collections;
  }

  if (!payload.credits?.length) {
    delete payload.credits;
  }

  payload.collections = payload.collections?.map(
    (collection) => {
      const cleanedCollection = { ...collection };

      if (!cleanedCollection.posterData?.filePath) {
        delete cleanedCollection.posterData;
      }

      if (!cleanedCollection.backdropData?.filePath) {
        delete cleanedCollection.backdropData;
      }

      return cleanedCollection;
    }
  );

  return payload;
}
