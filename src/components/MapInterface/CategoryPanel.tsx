import React from 'react'
import type { CategoryTreeNode } from '../../api'
import {
  CategoryButton,
  CategoryChip,
  CategoryChipsRow,
  CategoryDot,
  CategoryItem,
  CategoryList,
  CategorySidebar,
} from './styles'
import { flattenCategories } from './utils'

interface CategoryPanelProps {
  categories: CategoryTreeNode[]
  selectedIds: number[]
  variant: 'sidebar' | 'chips'
  onToggle: (categoryId: number) => void
}

const CategoryPanel = ({
  categories,
  selectedIds,
  variant,
  onToggle,
}: CategoryPanelProps) => {
  const flatCategories = flattenCategories(categories)

  if (variant === 'chips') {
    return (
      <CategoryChipsRow>
        {flatCategories.map((category) => {
          const active = selectedIds.includes(category.id)

          return (
            <CategoryChip
              key={category.uuid}
              type="button"
              $active={active}
              $color={category.color}
              onClick={() => onToggle(category.id)}
            >
              <CategoryDot $color={category.color} />
              {category.name}
            </CategoryChip>
          )
        })}
      </CategoryChipsRow>
    )
  }

  return (
    <CategorySidebar>
      <CategoryList>
        {flatCategories.map((category) => {
          const active = selectedIds.includes(category.id)

          return (
            <CategoryItem key={category.uuid} $depth={category.depth}>
              <CategoryButton
                type="button"
                $active={active}
                $color={category.color}
                onClick={() => onToggle(category.id)}
              >
                <CategoryDot $color={category.color} />
                {category.name}
              </CategoryButton>
            </CategoryItem>
          )
        })}
      </CategoryList>
    </CategorySidebar>
  )
}

export default CategoryPanel
