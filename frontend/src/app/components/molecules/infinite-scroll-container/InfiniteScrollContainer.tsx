import { useRef } from "react";

import { useScrollEndCallback } from "@hooks";

import { LoaderCircle } from "lucide-react";

import "./InfiniteScrollContainer.scss";

interface InfiniteScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  observerProps: {
    isLoading: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
  };
}

const InfiniteScrollContainer: React.FC<InfiniteScrollContainerProps> = ({
  children,
  observerProps,
}) => {
  const { isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    observerProps;

  const scrollContainerRef = useRef<HTMLDivElement>(null!);

  const observerTarget = useScrollEndCallback({
    onScrollEnd: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    disabled: !hasNextPage || isFetchingNextPage,
    scrollContainer: scrollContainerRef,
  });

  return (
    <div className="infinite-scroll-container" ref={scrollContainerRef}>
      {isLoading && !isFetchingNextPage ? (
        <div className="loading">
          <LoaderCircle />
        </div>
      ) : (
        <>
          {children}
          <div ref={observerTarget} style={{ height: "50px" }} />
          {isFetchingNextPage && (
            <div className="loading-more">
              <LoaderCircle />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InfiniteScrollContainer;
