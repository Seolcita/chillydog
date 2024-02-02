/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import {
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as S from './DropdownMenu.styles';
import { Typography } from 'sk-storybook';
import { ImagePlaceholder } from '../ImagePlaceholder/ImagePlaceholder';

export interface DropdownItem {
  avatarPath: string;
  avatarName: string;
  label: string;
  url?: string;
  onClick?: VoidFunction;
}

interface DropdownMenProps {
  items: DropdownItem[];
}

const DropdownMenu = ({ items }: DropdownMenProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const noScale = ['corgi', 'husky', 'login', 'logout', 'location', 'logout'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  const handleImageLoad = () => {
    setLoadedImagesCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (loadedImagesCount === items.length) {
      setAllImagesLoaded(true);
    }
  }, [loadedImagesCount]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
        event.stopPropagation();
      }}
    >
      <S.ProfileButton
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup='true'
        aria-expanded={isOpen}
        aria-label='User Profile Menu'
      >
        <S.StyledAccountCircleIcon />
      </S.ProfileButton>
      {isOpen && (
        <S.MenuListContainer role='menu' $isOpen={isOpen}>
          {items.map((item) => (
            <S.ListItem key={item.label} role='menuitem' tabIndex={-1}>
              {item.url && (
                <Link href={item.url} onClick={() => setIsOpen(false)}>
                  <S.ListItemContents>
                    {!allImagesLoaded && (
                      <ImagePlaceholder
                        width={3}
                        height={3}
                        borderRadius={50}
                      />
                    )}
                    <img
                      src={item.avatarPath}
                      width={40}
                      height={40}
                      onLoad={() => handleImageLoad()}
                      style={{
                        display: allImagesLoaded ? 'block' : 'none',
                        borderRadius: '50%',
                        transform: `scale(${
                          noScale.includes(item.avatarName)
                            ? item.avatarName === 'location' ||
                              item.avatarName === 'logout'
                              ? 0.8
                              : 1
                            : 1.8
                        }`,
                      }}
                      alt={item.avatarName}
                      aria-hidden='true'
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
