/* eslint-disable @typescript-eslint/no-explicit-any */

export function get<T extends Record<string, any>, K = any>(
  obj: T,
  path: string,
  defaultValue?: K,
): K | undefined {
  const keys = path.split('.');

  if (obj === undefined) {
    return defaultValue;
  }

  if (keys.length === 1) {
    return (obj[keys[0]] || defaultValue) as K;
  }

  return get(obj[keys[0]], keys.slice(1).join('.'), defaultValue);
}

export const hex2rgba = (hex = '', alpha = 1) => {
  let normalizedHex = hex;

  if (hex.length === 4) {
    normalizedHex = hex + hex.replace('#', '');
  }
  const hexMatch = normalizedHex.match(/\w\w/g);
  const [r, g, b] = hexMatch?.map((x) => parseInt(x, 16)) || [];
  return `rgba(${r},${g},${b},${alpha})`;
};

export const shuffleArray = <T>(arr: T[]): T[] =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const secsToTime = (seconds: number, separator = ':') =>
  [
    Math.trunc(seconds / 60 / 60),
    Math.trunc((seconds / 60) % 60),
    Math.trunc(seconds % 60),
  ]
    .join(separator)
    .replace(/\b(\d)\b/g, '0$1')
    .replace(/^00:/, '');

// https://stackoverflow.com/questions/61881598/record-the-highest-quality-video-using-mediarecorder-api-in-html5
export enum VIDEO_MIME_TYPES {
  videoWebm = 'video/webm;codecs=vp8,opus',
  videoMp4 = 'video/mp4',
}

export const supportedVideoMimeType = () =>
  MediaRecorder.isTypeSupported(VIDEO_MIME_TYPES.videoWebm)
    ? VIDEO_MIME_TYPES.videoWebm
    : VIDEO_MIME_TYPES.videoMp4;

export const createFileFromBlobArray = (blobArray: Blob[]) => {
  const blob: Blob[] = [new Blob(blobArray)];
  return new File(blob, 'fileName', { type: supportedVideoMimeType() });
};

export const requestFullscreen = (videoElement: any) => {
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.webkitRequestFullscreen) {
    videoElement.webkitRequestFullscreen();
  } else if (videoElement.mozRequestFullScreen) {
    videoElement.mozRequestFullScreen();
  } else if (videoElement.msRequestFullscreen) {
    videoElement.msRequestFullscreen();
  } else if (videoElement.webkitEnterFullscreen) {
    videoElement.webkitEnterFullscreen();
  }
};

export const isFullscreen = () => {
  const doc = document as any;
  return (
    !doc.webkitIsFullScreen && !doc.mozFullScreen && !doc.msFullscreenElement
  );
};

export const attachFullscreenEvent = (handler: () => void) => {
  window.addEventListener('fullscreenchange', handler);
  window.addEventListener('mozfullscreenchange', handler);
  document.addEventListener('MSFullscreenChange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  return () => {
    window.removeEventListener('fullscreenchange', handler);
    window.removeEventListener('mozfullscreenchange', handler);
    window.removeEventListener('MSFullscreenChange', handler);
    window.removeEventListener('webkitfullscreenchange', handler);
  };
};

export function adjustColor(color: string, percent: number): string {
  // Remove the "#" if it exists
  const hex = color.replace('#', '');

  // Check if the hex code is valid
  if (hex.length !== 6) {
    throw new Error('Invalid hex color format. Use a 6-digit hex color code.');
  }

  // Parse the hex values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Adjust each color channel by the given percentage
  r = Math.min(255, Math.max(0, r + (r * percent) / 100));
  g = Math.min(255, Math.max(0, g + (g * percent) / 100));
  b = Math.min(255, Math.max(0, b + (b * percent) / 100));

  // Convert the adjusted values back to hex and format as a string
  const newColor = `#${(
    (1 << 24) +
    (Math.round(r) << 16) +
    (Math.round(g) << 8) +
    Math.round(b)
  )
    .toString(16)
    .slice(1)
    .toUpperCase()}`;

  return newColor;
}

export default {
  get,
  hex2rgba,
  secsToTime,
  VIDEO_MIME_TYPES,
  supportedVideoMimeType,
  createFileFromBlobArray,
  attachFullscreenEvent,
  isFullscreen,
  requestFullscreen,
  shuffleArray,
  adjustColor,
};
