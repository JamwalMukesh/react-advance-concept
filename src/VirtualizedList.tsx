import React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

const items: string[] = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);

const Row: React.FC<ListChildComponentProps> = ({ index, style }) => (
  <div style={style}>
    {items[index]}
  </div>
);

const VirtualizedList: React.FC = () => (
  <List
    height={400}        // Height of the list container
    itemCount={items.length} // Number of items in the list
    itemSize={35}       // Height of each list item
    width={300}         // Width of the list container
  >
    {Row}
  </List>
);

export default VirtualizedList;
