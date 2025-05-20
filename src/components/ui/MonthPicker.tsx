import { forwardRef, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';

import { cn } from '@/lib/ui/cn';
import { getCurrentLanguage } from '@/lib/utils/date';
import { capitalize } from '@/lib/utils/string';

import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const MONTHS = Array.from({ length: 12 }, (_, i) => new Date(2000, i, 1));

type MonthPickerProps = {
  selected: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
} & (
  | { years?: never; startYear: number; endYear: number }
  | { years: number[]; startYear?: never; endYear?: never }
  | { years?: never; startYear?: never; endYear?: never }
);

type PushButtonProps = {
  isActive: boolean;
  children: ReactNode;
  onClick: () => void;
};

const PushButton = forwardRef<HTMLButtonElement, PushButtonProps>(
  ({ isActive, children, onClick }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        className={cn(
          'cursor-pointer text-sm px-2 py-1 rounded-md ',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-accent hover:text-accent-foreground',
        )}
      >
        {children}
      </button>
    );
  },
);

export function MonthPicker({
  selected,
  onChange,
  startYear,
  endYear,
  years,
  disabled,
}: MonthPickerProps) {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [internalDate, setInternalDate] = useState(selected);

  const locale = getCurrentLanguage().locale;
  const selectedYearRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInternalDate(selected);
    }
  }, [isOpen, selected]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => selectedYearRef.current?.scrollIntoView());
    }
  }, [isOpen]);

  const yearOptions = useMemo(() => {
    if (years) {
      return years.sort((a, b) => b - a);
    }

    const from = endYear ?? new Date().getFullYear();
    const to = startYear ?? from - 10;
    const range = [];

    for (let y = from; y >= to; --y) {
      range.push(y);
    }

    return range;
  }, [years, startYear, endYear]);

  const currentMonth = getMonth(internalDate);
  const currentYear = getYear(internalDate);

  function handleMonthClick(month: number) {
    setInternalDate(setMonth(internalDate, month));
  }

  function handleYearClick(year: number) {
    setInternalDate(setYear(internalDate, year));
  }

  function handleToday() {
    const today = new Date();
    onChange(today);
    setIsOpen(false);
  }

  function handleConfirm() {
    onChange(internalDate);
    setIsOpen(false);
  }

  function handleCancel() {
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={disabled} className="min-w-[140px]">
          {capitalize(format(selected, 'MMMM yyyy', { locale }))}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[280px] p-4">
        <div className="flex justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={handleToday}>
            {t('date.today')}
          </Button>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleCancel}>
              {t('cta.cancel')}
            </Button>
            <Button size="sm" onClick={handleConfirm}>
              {t('cta.confirm')}
            </Button>
          </div>
        </div>
        <div className="flex gap-4 pt-4 border-t border-border">
          <div className="flex flex-col overflow-y-auto max-h-48 pr-2 border-r border-border">
            {yearOptions.map((year) => (
              <PushButton
                key={year}
                ref={currentYear === year ? selectedYearRef : null}
                isActive={currentYear === year}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </PushButton>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 flex-1">
            {MONTHS.map((month, index) => (
              <PushButton
                key={index}
                isActive={currentMonth === index}
                onClick={() => handleMonthClick(index)}
              >
                {capitalize(format(month, 'MMM', { locale }))}
              </PushButton>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
