import { useCallback } from 'react';

import { addMonths, startOfMonth, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button, MonthPicker } from '@/components/ui';
import { cn } from '@/lib/ui/cn';

type MonthNavigatorProps = {
  selectedDate: Date;
  onChange: (newDate: Date) => void;
  className?: string;
};

export function MonthNavigator({ selectedDate, onChange, className }: MonthNavigatorProps) {
  const goToPreviousMonth = useCallback(() => {
    onChange(startOfMonth(subMonths(selectedDate, 1)));
  }, [selectedDate, onChange]);

  const goToNextMonth = useCallback(() => {
    onChange(startOfMonth(addMonths(selectedDate, 1)));
  }, [selectedDate, onChange]);

  const handleRandomSelect = (newDate: Date) => {
    onChange(startOfMonth(newDate));
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <MonthPicker selected={selectedDate} onChange={handleRandomSelect} />

      <Button variant="ghost" size="icon" onClick={goToNextMonth}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
