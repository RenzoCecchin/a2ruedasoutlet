import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Category, SubcategoryGroup } from '../types';
import { CATEGORIES as INITIAL_CATEGORIES } from '../constants';

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updated: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addGroupToCategory: (categoryId: string, group: SubcategoryGroup) => void;
  updateGroupInCategory: (categoryId: string, oldGroupName: string, updatedGroup: SubcategoryGroup) => void;
  deleteGroupFromCategory: (categoryId: string, groupName: string) => void;
  addItemToGroup: (categoryId: string, groupName: string, item: string) => void;
  removeItemFromGroup: (categoryId: string, groupName: string, item: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

const STORAGE_KEY = 'a2ruedas_categories_v1';

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error("Categories corrupted, using defaults.", e);
      }
    }
    return INITIAL_CATEGORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error("Failed to save categories", e);
    }
  }, [categories]);

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addGroupToCategory = (categoryId: string, group: SubcategoryGroup) => {
    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return { ...c, groups: [...c.groups, group] };
      }
      return c;
    }));
  };

  const updateGroupInCategory = (categoryId: string, oldGroupName: string, updatedGroup: SubcategoryGroup) => {
    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          groups: c.groups.map(g => g.name === oldGroupName ? updatedGroup : g)
        };
      }
      return c;
    }));
  };

  const deleteGroupFromCategory = (categoryId: string, groupName: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return { ...c, groups: c.groups.filter(g => g.name !== groupName) };
      }
      return c;
    }));
  };

  const addItemToGroup = (categoryId: string, groupName: string, item: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          groups: c.groups.map(g => {
            if (g.name === groupName) {
              return { ...g, items: [...g.items, item] };
            }
            return g;
          })
        };
      }
      return c;
    }));
  };

  const removeItemFromGroup = (categoryId: string, groupName: string, item: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          groups: c.groups.map(g => {
            if (g.name === groupName) {
              return { ...g, items: g.items.filter(i => i !== item) };
            }
            return g;
          })
        };
      }
      return c;
    }));
  };

  return (
    <CategoryContext.Provider value={{
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      addGroupToCategory,
      updateGroupInCategory,
      deleteGroupFromCategory,
      addItemToGroup,
      removeItemFromGroup,
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
