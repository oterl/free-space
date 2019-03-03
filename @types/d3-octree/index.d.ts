/// <reference types="node" />

declare module 'd3-octree' {
  /**
   * Leaf node of the octree.
   */
  export interface OctreeLeaf<T> {
    /**
     * The data associated with this point, as passed to octree.add.
     */
    data: T

    /**
     * The next datum in this leaf, if any.
     */
    next?: OctreeLeaf<T>

    /**
     * The length property may be used to distinguish leaf nodes from internal nodes:
     * it is undefined for leaf nodes, and 4 for internal nodes.
     */
    length?: undefined
  }

/* Internal nodes of the octree are represented as eight-element arrays in
   left-to-right, top-to-bottom, front-to-back order:

   0 - the top-left-front octant, if any.
   1 - the top-right-front octant, if any.
   2 - the bottom-left-front octant, if any.
   3 - the bottom-right-front octant, if any.
   4 - the top-left-back octant, if any.
   5 - the top-right-back octant, if any.
   6 - the bottom-left-back octant, if any.
   7 - the bottom-right-back octant, if any.
   A child octant may be undefined if it is empty.*/
  export interface OctreeInternalNode<T> extends Array<OctreeInternalNode<T> | OctreeLeaf<T> | undefined> {
    /**
     * The length property may be used to distinguish leaf nodes from internal nodes:
     * it is undefined for leaf nodes, and 8 for internal nodes.
     */
    // tslint:disable-next-line:no-magic-numbers
    length: 8
  }

  export interface Octree<TDatum> {
    /**
     * Returns the current x-accessor, which defaults to: `x(d) => d[0]`.
     */
    x(): (d: TDatum) => number
    /**
     * Sets the current x-coordinate accessor and returns the octree.
     * The x-accessors must be consistent, returning the same value given the same input.
     *
     * @param x The x-coordinate accessor.
     */
    x(x: (d: TDatum) => number): this

    /**
     * Returns the current y-accessor, which defaults to: `y(d) => d[1]`.
     */
    y(): (d: TDatum) => number
    /**
     * Sets the current y-coordinate accessor and returns the octree.
     * The y-accessors must be consistent, returning the same value given the same input.
     *
     * @param y The y-coordinate accessor.
     */
    y(y: (d: TDatum) => number): this

    /**
     * Returns the current z-accessor, which defaults to: `z(d) => d[2]`.
     */
    z(): (d: TDatum) => number
    /**
     * Sets the current z-coordinate accessor and returns the octree.
     * The z-accessors must be consistent, returning the same value given the same input.
     *
     * @param z The z-coordinate accessor.
     */
    z(z: (d: TDatum) => number): this

    /**
     * Returns the octree's current extent `[[x0, y0, z0], [x1, y1, z1]]`,
     * where `x0` and `y0` and `z0` are the inclusive lower bounds and `x1` and `y1`
     * and `z1` are the inclusive upper bounds,
     * or `undefined` if the octree has no extent.
     */
    extent(): [[number, number, number], [number, number, number]] | undefined
    /**
     * Expands the octree to cover the specified points `[[x0, y0, z0], [x1, y1, z1]]` and returns the octree.
     * The extent may also be expanded by calling `octree.cover` or `oc.add`.
     *
     * @param extend The specified points to cover.
     */
    extent(extend: [[number, number, number], [number, number, number]]): this

    /**
     * Expands the octree to cover the specified point ⟨x, y, z⟩, and returns the octree.
     * * If the octree’s extent already covers the specified point, this method does nothing.
     * * If the octree has an extent, the extent is repeatedly doubled to cover the specified
     * * point, wrapping the root node as necessary.
     * * If the octree is empty, the extent is initialized to the extent `[[⌊x⌋, ⌊y⌋, ⌊z⌋], [⌈x⌉, ⌈y⌉, ⌈z⌉]]`.
     * Rounding is necessary such that if the extent is later doubled, the boundaries of
     * existing quadrants do not change due to floating point error.
     *
     * @param x The x-coordinate for the specified point to cover.
     * @param y The y-coordinate for the specified point to cover.
     * @param z The z-coordinate for the specified point to cover.
     */
    cover(x: number, y: number, z: number): this

    /**
     * Adds the specified datum to the octree, deriving its coordinates ⟨x,y,z⟩ using the current x-, y-
     * and z-accessors, * and returns the octree. If the new point is outside the current extent of the
     * octree, the octree is automatically expanded to cover the new point.
     *
     * @param datum The specified datum to add.
     */
    add(datum: TDatum): this

    /**
     * Adds the specified array of data to the octree, deriving each element’s coordinates ⟨x,y⟩
     * using the current x- and y-accessors, and return this octree.
     * This is approximately equivalent to calling octree.add repeatedly.
     * However, this method results in a more compact octree because the extent of the data is
     * computed first before adding the data.
     *
     * @param data The specified array of data to add.
     */
    addAll(data: TDatum[]): this

    /**
     * Removes the specified datum to the octree, deriving its coordinates ⟨x,y⟩ using
     * the current x- and y-accessors, and returns the octree.
     * If the specified datum does not exist in this octree, this method does nothing.
     *
     * @param datum The specified datum to remove.
     */
    remove(datum: TDatum): this

    /**
     * Removes the specified data to the octree, deriving their coordinates
     * ⟨x,y, z⟩ using the current x- and y-accessors and z-accessors, and returns the octree.
     * If a specified datum does not exist in this octree, it is ignored.
     *
     * @param data The specified array of data to remove.
     */
    removeAll(data: TDatum[]): this

    /**
     * Returns a copy of the octree. All nodes in the returned octree are identical copies
     * of the corresponding node in the octree;
     * however, any data in the octree is shared by reference and not copied.
     */
    copy(): Octree<TDatum>

    /**
     * Returns the root node of the octree.
     */
    root(): OctreeInternalNode<TDatum> | OctreeLeaf<TDatum>

    /**
     * Returns an array of all data in the octree.
     */
    data(): TDatum[]

    /**
     * Returns the total number of data in the octree.
     */
    size(): number

    /**
     * Returns the datum closest to the position ⟨x,y,z⟩ with the given search radius.
     * If radius is not specified, it defaults to infinity.
     * If there is no datum within the search area, returns undefined.
     *
     * @param x The x-coordinate for the search position.
     * @param y The y-coordinate for the search position.
     * @param z The z-coordinate for the search position.
     * @param radius The optional search radius.
     */
    find(x: number, y: number, z: number, radius?: number): TDatum | undefined

    /**
     * Visits each node in the octree in pre-order traversal, invoking the specified callback
     * with arguments `node`, `x0`, `y0`, `z0`, `x1`, `y1`, `z1` for each node,
     * where `node` is the node being visited, ⟨x0, y0, z0⟩ are the lower bounds of the node,
     * and ⟨x1, y1, z1⟩ are the upper bounds, and returns the octree.
     *
     * If the callback returns true for a given node, then the children of that node
     * are not visited; otherwise, all child nodes are visited.
     * This can be used to quickly visit only parts of the tree.
     * Note, however, that child quadrants are always visited in sibling
     * order: top-left, top-right, bottom-left, bottom-right.
     * In cases such as search, visiting siblings in a specific order may be faster.
     *
     * @param callback The callback invoked for each node.
     */
    visit(callback: (
      node: OctreeInternalNode<TDatum> | OctreeLeaf<TDatum>,
      x0: number, y0: number, z0: number,
      x1: number, y1: number, z1: number) => void | boolean): this

    /**
     * Visits each node in the octree in post-order traversal, invoking the specified
     * callback with arguments `node`, `x0`, `y0`, `z0`, `x1`, `y1`, `z1` for each node,
     * where `node` is the node being visited, ⟨x0, y0, z0⟩ are the lower bounds of the
     * node, and ⟨x1, y1, z1⟩ are the upper bounds, and returns the octree.
     *
     * @param callback The callback invoked for each node.
     */
    visitAfter(callback: (
      node: OctreeInternalNode<TDatum> | OctreeLeaf<TDatum>,
      x0: number, y0: number, z0: number,
      x1: number, y1: number, z1: number) => void): this
  }

  /**
   * Creates a new octree with the specified array of data.
   * If `x` and `y` and 'z' are also specified, sets the x- and y- accessors and z- accessors to the
   * specified functions before adding the specified array of data to the octree, otherwise use the
   * default x- and y-accessors and z-accessors.
   *
   * The generic refers to the data type. If omitted, the default setting assumes that,
   * the data used with the octree are 3-element arrays.
   * The first element corresponds to the x-dimension, the second to the y-dimension, third to the z-dimension
   * When using another type, The x- and y-accessors and z-accessors must be specified.
   *
   * @param data The specified array of data to add.
   * @param x The x-coordinate accessor.
   * @param y The y-coordinate accessor.
   * @param z The z-coordinate accessor.
   */
  export function octree<T = [number, number, number]>(
    data?: T[],
    x?: (d: T) => number,
    y?: (d: T) => number,
    z?: (d: T) => number,
  ): Octree<T>
}
