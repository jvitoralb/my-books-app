import { useState, useRef, useEffect } from 'react';
import { MutationStatus } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';


const useDeleteDialogConfig = (deleteStatus: MutationStatus) => {
    const [overlayClick, setOverlayClick] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    useEffect(() => {
        if (deleteStatus === 'success' || deleteStatus === 'error') {
            onClose();
            setOverlayClick(true);
        }
    }, [deleteStatus]);

    return {
        isOpen,
        onOpen,
        onClose,
        cancelRef,
        overlayClick,
        setOverlayClick,
    }
}

export default useDeleteDialogConfig;