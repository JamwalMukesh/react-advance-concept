import './App.css';
import VirtualizedInfiniteList from './VirtualizedInfiniteList';
import VirtualizedList from './VirtualizedList';

function App() {
  return (
    <div className="App">
    <h1>Virtualized List Example</h1>
    <VirtualizedList />
    <h1>Virtualized and Infinite Scrolling List Example</h1>
    <VirtualizedInfiniteList />
  </div>
  );
}

export default App;
