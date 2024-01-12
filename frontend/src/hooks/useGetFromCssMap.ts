import { useTheme } from '@chakra-ui/react';

export function useGetFromCssMap(key: string) {
  const styles = useTheme();

  return styles.__cssMap[key].value;
}
