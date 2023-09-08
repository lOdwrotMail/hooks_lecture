import cn from 'classnames';

type InetractiveHeaderProps = {
  header: string;
  onClick: () => void;
  isSorted: boolean;
  isReversed: boolean;
  hasFilter?: boolean;
  onFilterChange?: (filter: string) => void;
};

export const InetractiveHeader = ({
  header,
  onClick,
  isSorted,
  isReversed,
  hasFilter,
  onFilterChange,
}: InetractiveHeaderProps) => {
  return (
    <th>
      {header}
      {hasFilter && (
        <input onChange={(e) => {
          if (onFilterChange) {
            onFilterChange(e.target.value);
          }
        }}
        />
      )}
      <a href="#sort" onClick={onClick}>
        <span className="icon">
          <i
            className={cn('fas', {
              'fa-sort': !isSorted,
              'fa-sort-up': isSorted && isReversed,
              'fa-sort-down': isSorted && !isReversed,
            })}
          />
        </span>
      </a>
    </th>
  );
};
