export const NODE_WIDTH = 150;
export const NODE_HEIGHT = 40;

export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 2;
export const ZOOM_IN_FACTOR = 1.2;
export const ZOOM_OUT_FACTOR = 0.8;
export const WHEEL_SENSITIVITY = 0.2;
export const FIT_PADDING = 20;

export const LAYOUT_OPTIONS = {
  name: "dagre",
  rankDir: "TB",
  nodeSep: 40,
  rankSep: 60,
  ranker: "tight-tree",
  padding: FIT_PADDING,
  fit: true
};
