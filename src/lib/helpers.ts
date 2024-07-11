export const initiateOAuth = (provider: "google" | "github") => {
  window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/${provider}/callback`;
};
