import { useCounterStore } from '@/stores/counter-store';

describe('useCounterStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCounterStore.setState({ count: 0 });
  });

  it('should have initial count of 0', () => {
    const { count } = useCounterStore.getState();
    expect(count).toBe(0);
  });

  it('should increment count', () => {
    const { increment } = useCounterStore.getState();
    increment();
    expect(useCounterStore.getState().count).toBe(1);
  });

  it('should increment count multiple times', () => {
    const { increment } = useCounterStore.getState();
    increment();
    increment();
    increment();
    expect(useCounterStore.getState().count).toBe(3);
  });

  it('should decrement count', () => {
    useCounterStore.setState({ count: 5 });
    const { decrement } = useCounterStore.getState();
    decrement();
    expect(useCounterStore.getState().count).toBe(4);
  });

  it('should decrement to negative values', () => {
    const { decrement } = useCounterStore.getState();
    decrement();
    expect(useCounterStore.getState().count).toBe(-1);
  });

  it('should reset count to 0', () => {
    useCounterStore.setState({ count: 10 });
    const { reset } = useCounterStore.getState();
    reset();
    expect(useCounterStore.getState().count).toBe(0);
  });
});
