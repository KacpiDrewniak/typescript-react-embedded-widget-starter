import type { CategoryTreeNode } from '../../api'

export function flattenCategories(
  nodes: CategoryTreeNode[],
  depth = 0,
): Array<CategoryTreeNode & { depth: number }> {
  return nodes.flatMap((node) => [
    { ...node, depth },
    ...flattenCategories(node.children, depth + 1),
  ])
}

export function buildCategoryColorMap(
  nodes: CategoryTreeNode[],
): Map<number, string | null> {
  const map = new Map<number, string | null>()

  const walk = (items: CategoryTreeNode[], inheritedColor: string | null) => {
    items.forEach((item) => {
      const color = item.color ?? inheritedColor
      map.set(item.id, color)
      walk(item.children, color)
    })
  }

  walk(nodes, null)
  return map
}

export function getObjectMarkerColor(
  categoryIds: number[] | undefined,
  colorMap: Map<number, string | null>,
): string | null {
  if (!categoryIds?.length) {
    return null
  }

  for (const categoryId of categoryIds) {
    const color = colorMap.get(categoryId)
    if (color) {
      return color
    }
  }

  return colorMap.get(categoryIds[0]) ?? null
}
