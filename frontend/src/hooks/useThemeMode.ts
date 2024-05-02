import { useColorMode } from '@chakra-ui/react';


const useThemeMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return {
    currentTheme: colorMode,
    updateTheme: toggleColorMode,
  }
}

export default useThemeMode;