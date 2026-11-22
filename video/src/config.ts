// ---- Edit these to personalise the video ----

export const person = {
  name: "Roel Delos Reyes",
  firstName: "Roel",
  initials: "RD",
  title: "IT Technical Support | Web & Systems Developer",
  location: "Metro Manila",
  email: "roeldelosreyes0105@gmail.com",
  site: "roeldelosreyes.netlify.app",
};

// Photos of you, in public/photos/. Add more files (photo-2.webp, photo-3.jpg, …) and list them here.
// Use photos where you're the only identifiable person (no classmates/clients, no school logos or IDs).
export const photos: string[] = ["photos/photo-1.webp"];

export const photo = (i: number) => photos[i % photos.length];
