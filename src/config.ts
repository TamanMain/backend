export default {
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://raja:Fb9ydV.xy@j8fG2@tamanmain-seep8.gcp.mongodb.net/tamanmain",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "somethingsecret",
};
