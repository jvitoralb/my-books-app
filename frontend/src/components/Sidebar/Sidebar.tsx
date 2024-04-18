import useSidebarStateHandler from './hooks/useSidebarStateHandler';
import useSidebarResponsive from './hooks/useResponsiveSidebar';
import useInputChecked from './hooks/useInputChecked';
import useOutsideClick from './hooks/useOutsideClick';
import './styles/sidebar.css';

type SidebarProps = {
  content: JSX.Element;
  setIsOpen: (val: boolean) => void;
  setIsActive: (val: boolean) => void;
}

function Sidebar({ content, setIsOpen, setIsActive }: SidebarProps) {
  const {
    checked,
    setInputChecked,
    onChangeCheckedHandler
  } = useInputChecked();

  const {
    isOpen,
    isResponsiveSize,
  } = useSidebarResponsive({
    checked,
  });

  const {
    navRef,
    hamburguerMenuRef,
  } = useOutsideClick({
    isOpen,
    isResponsiveSize,
    setInputChecked,
  });

  useSidebarStateHandler({
    setIsOpen,
    setIsActive,
    isResponsiveSize,
    isOpen
  });

  return (
    <>
      <label
        aria-label="Open sidebar" id="hamburguer-menu"
        className="hamburguer-menu" ref={hamburguerMenuRef}
      >
        <input
          id="hamburguer-checkbox" type="checkbox"
          autoComplete="off" onChange={onChangeCheckedHandler} checked={checked}
        />
      </label>

      <nav
        ref={navRef}
        className={'sidebar' + (isOpen ? ' sidebar-open' : '')}
      >
        {content}
      </nav>
    </>
  );
}

export default Sidebar;