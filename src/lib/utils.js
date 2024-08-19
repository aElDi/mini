const YOUTUBE_REGEX = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;

export const getVideoId = (link) => YOUTUBE_REGEX.exec(link)[1];
export const testVideoId = (link) => YOUTUBE_REGEX.test(link);