import { failure, Result, success } from "@/types/result";

export const getYouTubeVideoId = (url: string): Result<string, Error> => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  if (match) {
    return success(match[1])
  }

  return failure(new Error("Url inválida"))
};
