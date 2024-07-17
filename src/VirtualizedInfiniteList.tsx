import React, { useState, useEffect, useCallback } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

// Define the item type
interface Item {
  id: number;
  title: string;
  description: string;
}

// Generate initial items
const generateItems = (start: number, end: number): Item[] => {
  const items: Item[] = [];
  for (let i = start; i < end; i++) {
    items.push({
      id: i,
      title: `Item ${i + 1}`,
      description: `This is the description for item ${i + 1}.`
    });
  }
  return items;
};

// Row component
const Row: React.FC<ListChildComponentProps> = ({ index, style, data }) => {
  const item: Item = data[index];
  return (
    <div style={{ ...style, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10px' }}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
};

const VirtualizedInfiniteList: React.FC = () => {
  const [items, setItems] = useState<Item[]>(() => generateItems(0, 20));
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);

  // Load more items
  const loadMoreItems = useCallback(() => {
    if (isNextPageLoading) return;
    setIsNextPageLoading(true);
    setTimeout(() => {
      setItems(prevItems => [...prevItems, ...generateItems(prevItems.length, prevItems.length + 20)]);
      setIsNextPageLoading(false);
    }, 1000);
  }, [isNextPageLoading]);

  const itemCount = hasNextPage ? items.length + 1 : items.length;

  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={600}
          itemCount={itemCount}
          itemSize={100}
          width={800}
          onItemsRendered={onItemsRendered}
          ref={ref}
          itemData={items}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default VirtualizedInfiniteList;
