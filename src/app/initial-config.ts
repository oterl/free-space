const initialSpace = 20
const initialMaxTry = 100
const initialStep = 1
const initialEps = 1
const initialK = 3
const initialSphereSize = 2
const initialMaxSphereCount = 100

export const initialConfig = {
  lenx: initialSpace,
  leny: initialSpace,
  lenz: initialSpace,
  // Sphere generation
  size: initialSphereSize,
  maxTry: initialMaxTry,
  maxCount: initialMaxSphereCount,
  // Clustering configuration
  step: initialStep,
  eps: initialEps,
  k: initialK,
}

export type Config = typeof initialConfig
