import React, { useMemo, useState, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  searchTerm?: string;
  searchFilter?: (item: T, term: string) => boolean;
}

function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  searchTerm = '',
  searchFilter
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm || !searchFilter) return items;
    return items.filter(item => searchFilter(item, debouncedSearchTerm));
  }, [items, debouncedSearchTerm, searchFilter]);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      filteredItems.length
    );

    return filteredItems.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index
    }));
  }, [filteredItems, scrollTop, itemHeight, containerHeight]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = filteredItems.length * itemHeight;
  const offsetY = Math.floor(scrollTop / itemHeight) * itemHeight;

  return (
    <div
      className="overflow-auto custom-scrollbar"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(({ item, index }) => (
            <div key={index} style={{ height: itemHeight }}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualizedList;