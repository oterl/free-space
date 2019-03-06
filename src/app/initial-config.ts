const initialSpace = 10
const initialMaxTry = 100
const initialStep = 1
const initialEps = 2
const initialK = 30
const initialSphereSize = 2
const initialMaxSphereCount = 1000

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
