import React, { useEffect, useRef, useCallback } from 'react';
import { Spinner } from './Spinner';

interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 100,
  className
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [hasMore, isLoading, onLoadMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: `${threshold}px`,
    });

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
    };
  }, [handleIntersection, threshold]);

  return (
    <div className={className}>
      {children}
      
      {/* Sentinel element for intersection observer */}
      <div ref={sentinelRef} className="h-1" />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-3">
            <Spinner size="md" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Loading more...
            </span>
          </div>
        </div>
      )}
      
      {/* End of list indicator */}
      {!hasMore && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No more items to load
          </p>
        </div>
      )}
    </div>
  );
};

export { InfiniteScroll };

