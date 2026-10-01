import { useRef, useState } from 'react';

import styles from './Dropdown.module.scss';
import Modal from '../Modal/Modal';

interface DropdownProps<T> {
  isMultiple?: boolean;
  list: T[];
  name: string;
  placeholder?: string;
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
}

export default function Dropdown<T>({
  isMultiple = false,
  list,
  name,
  placeholder = 'Select...',
  getValue,
  getLabel,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     function handleClickOutside(event: MouseEvent) {
  //       if (
  //         dropdownRef.current &&
  //         !dropdownRef.current.contains(event.target as Node)
  //       ) {
  //         setIsOpen(false);
  //       }
  //     }

  //     function handleEscape(event: KeyboardEvent) {
  //       if (event.key === 'Escape') {
  //         setIsOpen(false);
  //       }
  //     }

  //     document.addEventListener('mousedown', handleClickOutside);
  //     document.addEventListener('keydown', handleEscape);

  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutside);
  //       document.removeEventListener('keydown', handleEscape);
  //     };
  //   }, []);

  function isSelected(item: T) {
    return selected.some(
      (selectedItem) => getValue(selectedItem) === getValue(item),
    );
  }

  function handleSelect(item: T) {
    if (isMultiple) {
      setSelected((current) => {
        if (isSelected(item)) {
          return current.filter(
            (selectedItem) => getValue(selectedItem) !== getValue(item),
          );
        }

        return [...current, item];
      });

      return;
    }

    setSelected([item]);
    // setIsOpen(false);
  }

  function handleRemove(item: T) {
    setSelected((current) =>
      current.filter(
        (selectedItem) => getValue(selectedItem) !== getValue(item),
      ),
    );
  }

  const selectedLabels = selected.map(getLabel);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      {selected.map((item) => (
        <input
          key={getValue(item)}
          type='hidden'
          name={name}
          value={getValue(item)}
          readOnly
        />
      ))}

      <button
        type='button'
        className={`${styles.dropdown__trigger} ${
          isOpen ? styles['dropdown__trigger--open'] : ''
        }`}
        onClick={() => setIsOpen((current) => !current)}
      >
        <div className={styles.dropdown__value}>
          {selected.length === 0 ? (
            <span className={styles.dropdown__placeholder}>{placeholder}</span>
          ) : isMultiple ? (
            <div className={styles.dropdown__chips}>
              {selected.map((item) => (
                <span key={getValue(item)} className={styles.dropdown__chip}>
                  {getLabel(item)}

                  <span
                    className={styles.dropdown__chipRemove}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemove(item);
                    }}
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <span>{selectedLabels[0]}</span>
          )}
        </div>

        <span
          className={`${styles.dropdown__arrow} ${
            isOpen ? styles['dropdown__arrow--open'] : ''
          }`}
        />
      </button>

      {isOpen && (
        <Modal>
          <div className={styles.dropdown__menu}>
            {list.length === 0 ? (
              <div className={styles.dropdown__empty}>Nothing found</div>
            ) : (
              list.map((item) => {
                const value = getValue(item);
                const label = getLabel(item);
                const active = isSelected(item);

                return (
                  <button
                    type='button'
                    key={value}
                    className={`${styles.dropdown__option} ${
                      active ? styles['dropdown__option--selected'] : ''
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    {isMultiple && (
                      <span
                        className={`${styles.dropdown__checkbox} ${
                          active ? styles['dropdown__checkbox--checked'] : ''
                        }`}
                      >
                        {active && '✓'}
                      </span>
                    )}

                    <span>{label}</span>

                    {!isMultiple && active && (
                      <span className={styles.dropdown__check}>✓</span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
