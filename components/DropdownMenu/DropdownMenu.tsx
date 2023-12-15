import Link from 'next/link';
import {
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';

import * as S from './DropdownMenu.styles';
import { Typography } from 'sk-storybook';

export interface DropdownItem {
  avatarPath: string;
  label: string;
  url?: string;
  onClick?: VoidFunction;
}

interface DropdownMenProps {
  items: DropdownItem[];
  menuLabel: string;
}

const DropdownMenu = ({ items, menuLabel }: DropdownMenProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [off, setOff] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    setOff(false);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        break;
      case 'ArrowUp':
        event.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      ref={menuRef}
      onKeyDown={handleKeyDown}
      style={{ position: 'relative' }}
      onClick={(event) => {
        event.stopPropagation(), setOff(true);
      }}
    >
      {/* TODO: Change Colors */}
      <S.ProfileButton
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup='true'
        aria-expanded={isOpen}
      >
        <S.StyledAccountCircleIcon />
      </S.ProfileButton>
      {isOpen && (
        <S.MenuListContainer role='menu' aria-label={menuLabel} isOpen={isOpen}>
          {items.map((item, index) => (
            <S.ListItem
              key={item.label}
              role='menuitem'
              tabIndex={-1}
              off={off}
            >
              {item.url && (
                <Link href={item.url}>
                  <S.ListItemContents>
                    <Image
                      src={item.avatarPath}
                      width={40}
                      height={40}
                      alt='avatar'
                    />
                    <Typography variant='textS' fontWeight='bold'>
                      {item.label}
                    </Typography>
                  </S.ListItemContents>
                </Link>
              )}
            </S.ListItem>
          ))}
        </S.MenuListContainer>
      )}
    </div>
  );
};

export default DropdownMenu;
