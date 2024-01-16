import { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';


const useDeleteDialogConfig = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    return {
        isOpen,
        onOpen,
        onClose,
        cancelRef,
    }
}

export default useDeleteDialogConfig;