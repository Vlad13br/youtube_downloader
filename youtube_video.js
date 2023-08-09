const fs = require("fs");
const ytdl = require("ytdl-core");

const videoUrl =
  "https://www.youtube.com/watch?v=8E9TUT0f8UY&list=RDGMEMJQXQAmqrnmK1SEjY_rKBGA&index=4";
const destinationPath = "./video.mp4";

const downloadVideo = async (url, dest) => {
  const videoReadableStream = ytdl(url, { filter: "videoandaudio" });
  const videoWriteableStream = fs.createWriteStream(dest);

  videoReadableStream.pipe(videoWriteableStream);

  return new Promise((resolve, reject) => {
    videoWriteableStream.on("finish", resolve);
    videoWriteableStream.on("error", reject);
  });
};

downloadVideo(videoUrl, destinationPath)
  .then(() => {
    console.log("Видео успешно скачано.");
  })
  .catch((error) => {
    console.error("Ошибка при скачивании видео:", error);
  });
