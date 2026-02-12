import { QueryClient } from '@tanstack/react-query';

/**
 * QueryClient 인스턴스 생성 함수
 */
function queryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });
}

// 브라우저에서는 싱글톤 패턴 사용
let browserQueryClient: QueryClient | undefined;
const isSSR = typeof window === 'undefined';

/**
 * QueryClient 인스턴스 반환 함수
 * - 서버(SSR): 요청마다 새로운 QueryClient를 생성하여 데이터 혼입을 방지
 * - 클라이언트(Browser): 싱글톤 패턴을 사용하여 단일 인스턴스를 재사용
 * @returns {QueryClient} 생성되거나 저장된 QueryClient 인스턴스
 */
function getQueryClient(): QueryClient {
  if (isSSR) {
    // 서버에서는 항상 새 QueryClient 생성
    return queryClient();
  }

  // 브라우저에서는 기존 인스턴스 재사용
  if (!browserQueryClient) {
    browserQueryClient = queryClient();
  }
  return browserQueryClient;
}

export { getQueryClient };
