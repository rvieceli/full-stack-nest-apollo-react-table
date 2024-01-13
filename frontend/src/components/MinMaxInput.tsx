import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { HeaderContext } from '@tanstack/react-table';
import { useDebouncedCallback } from 'use-debounce';
import { capitalize } from '../utils/capitalize';
import { useSearchParams } from 'react-router-dom';

function DebouncedNumberInput({
  columnId,
  onChange,
  placeholder,
  ...props
}: NumberInputProps & { columnId: string }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValue = Number(searchParams.get(columnId)) || undefined;

  const handleDebouncedOnChange = useDebouncedCallback<
    Exclude<NumberInputProps['onChange'], undefined>
  >((_, valueAsNumber) => {
    if (valueAsNumber === defaultValue) return;

    if (isNaN(valueAsNumber)) {
      searchParams.delete(columnId);
    } else {
      searchParams.set(columnId, valueAsNumber.toFixed(2));
    }

    if (searchParams.has('page')) {
      searchParams.set('page', '1');
    }

    setSearchParams(searchParams);
  }, 500);

  return (
    <NumberInput
      defaultValue={defaultValue}
      size="xs"
      min={0}
      step={0.01}
      onChange={handleDebouncedOnChange}
      {...props}
    >
      <NumberInputField w="5rem" placeholder={placeholder} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}

export function headerWithMinMaxFilterHelper<
  T extends HeaderContext<any, number>,
>(info: T) {
  const { id } = info.column;

  return (
    <HStack>
      <Text>{info.column.id}</Text>
      <HStack>
        <DebouncedNumberInput
          columnId={`min${capitalize(id)}`}
          placeholder="Min"
        />
        <DebouncedNumberInput
          columnId={`max${capitalize(id)}`}
          placeholder="Max"
        />
      </HStack>
    </HStack>
  );
}
